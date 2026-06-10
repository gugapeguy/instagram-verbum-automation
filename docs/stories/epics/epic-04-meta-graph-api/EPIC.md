# Epic 04 — Publicação Automatizada via Meta Graph API
**Status:** Ready for story creation
**Prioridade:** P2 — Estruturar agora, ativar com credenciais Meta
**PRD:** [docs/prd/verbum-instagram-prd-v2.md](../../../prd/verbum-instagram-prd-v2.md)
**Criado por:** Morgan (PM)
**Data:** 2026-06-09
**Dependência:** Epic 02 (Pipeline) + Epic 03 (Design) — ambos operacionais para uso em produção

---

## Objetivo do Épico

Implementar o pipeline completo de publicação no Instagram via Meta Graph API — do recebimento da aprovação de Gustavo até o post publicado com confirmação. Após este épico, Gustavo responde "aprovado · [horário] · A" e o post vai ao ar automaticamente, sem nenhuma ação manual adicional.

**Por que é P2:** A estrutura e os scripts podem ser implementados antes das credenciais estarem prontas. Gustavo precisa criar a Página do Facebook e o App no Meta for Developers — ação única, 30 minutos. Após isso, este épico entra em produção imediatamente.

---

## Contexto do Sistema Existente

- **Pacote de aprovação:** `docs/ceo-master-flow.md` — gate de aprovação documentado; CEO Operações aguarda `aprovado · [horário] · [A ou B]`
- **Log:** `logs/publicacoes.json` criado (array vazio, schema documentado)
- **Scripts existentes:** nenhum em `api/` — greenfield dentro do projeto brownfield
- **Variáveis de ambiente:** `.env` necessário (NUNCA commitar) com `META_PAGE_ID`, `META_ACCESS_TOKEN`, `META_APP_ID`, `META_APP_SECRET`
- **Formatos suportados v1:** Carrossel (múltiplos slides) + Feed estático (1 imagem)

---

## Pré-requisitos de Gustavo (ação única)

| Ação | Onde | Saída necessária |
|------|------|-----------------|
| Criar Página do Facebook vinculada ao @verbumcontabilidade | facebook.com/pages/create | `META_PAGE_ID` |
| Criar App no Meta for Developers | developers.facebook.com | `META_APP_ID` + `META_APP_SECRET` |
| Gerar Page Access Token com permissão `instagram_basic` + `instagram_content_publish` | Graph API Explorer | `META_ACCESS_TOKEN` |
| Salvar os 4 valores no arquivo `.env` | raiz do projeto | `.env` preenchido |

O CEO Operações valida se o `.env` está configurado antes de qualquer execução.

---

## Arquitetura de Pastas (estado final deste épico)

```
api/
├── config.js            ← Lê e valida .env
├── upload-media.js      ← Envia PNG ao Meta → retorna media_id
├── publish-carousel.js  ← Monta container + publica/agenda carrossel
├── publish-feed.js      ← Publica feed estático
└── check-status.js      ← Verifica status da publicação + atualiza log
```

---

## Stories Propostas

### Story 4.1 — Infraestrutura da API (`api/config.js` + `.env`)
**Executor:** @dev
**Quality Gate:** @architect
**Dependência:** —
**Descrição:** Implementar a camada de configuração da API. `api/config.js` lê as variáveis do `.env`, valida que estão presentes, e exporta um objeto de configuração usado pelos demais módulos. `.gitignore` deve ter `.env` listado — verificar e garantir.

**ACs principais:**
- `api/config.js` criado: lê `META_PAGE_ID`, `META_ACCESS_TOKEN`, `META_APP_ID`, `META_APP_SECRET` do `.env`
- Se qualquer variável estiver ausente: lança erro descritivo com instrução de como configurar
- `.env.example` criado com as 4 variáveis sem valores reais (referência para onboarding)
- `.gitignore` contém `.env` — se não contiver, adicionar
- `api/config.js` exporta objeto: `{ pageId, accessToken, appId, appSecret, baseUrl }`
- Teste de conexão básico: função `testConnection()` que bate no endpoint `/me` do Graph API e retorna `{ connected: true/false, page_name }`

---

### Story 4.2 — Upload de Mídia (`api/upload-media.js`)
**Executor:** @dev
**Quality Gate:** @architect
**Dependência:** Story 4.1
**Descrição:** Implementar módulo que recebe o path de um PNG e faz upload ao Meta, retornando o `media_id` necessário para montar o carrossel/feed. Suporta múltiplos uploads em sequência para carrosséis.

**ACs principais:**
- `api/upload-media.js` criado: aceita `filePath` (local PNG) e retorna `media_id`
- Usa endpoint `POST /{instagram-user-id}/media` com parâmetro `image_url` ou multipart
- Para imagem local: primeiro hospeda no servidor ou usa URL temporária (documentar abordagem)
- Upload em lote: função `uploadMultiple(filePaths)` retorna array de `media_id` na ordem dos slides
- Tratamento de erro silencioso: falha no upload → log interno + retry uma vez → se falhar novamente, notifica CEO Master com motivo sem expor stack trace ao Gustavo
- Timeout: 30 segundos por upload

---

### Story 4.3 — Publicação e Agendamento (`api/publish-carousel.js` + `api/publish-feed.js` + `api/check-status.js`)
**Executor:** @dev
**Quality Gate:** @architect
**Dependência:** Story 4.2
**Descrição:** Implementar os módulos de publicação para carrossel e feed estático, mais o verificador de status. O CEO Operações usa estes módulos para publicar imediatamente ou agendar a publicação para o horário aprovado por Gustavo.

**ACs principais:**
- `api/publish-carousel.js`: aceita `[media_ids]` + `legenda` + `timestamp_unix` → cria container de carrossel → publica ou agenda
- `api/publish-feed.js`: aceita `media_id` + `legenda` + `timestamp_unix` → publica feed estático
- Timestamp Unix calculado a partir do horário informado por Gustavo no formato do gate de aprovação (`09:00`, `18h30`, `amanhã 8h`)
- `api/check-status.js`: verifica se publicação foi confirmada pelo endpoint de status do Graph API → retorna `{ published: true/false, url, timestamp }`
- Ao confirmar publicação: atualiza entrada em `logs/publicacoes.json` com `status: "publicado"`, `publicado_em` e `url` do post
- Suporte a publicação imediata (horário = agora + 5 min) e agendamento futuro (até 75 dias)

---

### Story 4.4 — CEO Operações — Fluxo de Integração
**Executor:** @dev
**Quality Gate:** @architect
**Dependência:** Story 4.3
**Descrição:** Documentar e implementar o fluxo completo do CEO Operações como agente orquestrador da publicação. Ele recebe a aprovação de Gustavo, coordena export → upload → publicação → verificação → log, e reporta ao CEO Master apenas o resultado final.

**ACs principais:**
- Skill `skills/ceo-operacoes.md` criada documentando o fluxo completo
- Fluxo obrigatório de 6 passos:
  ```
  1. Receber aprovação válida: aprovado · [horário] · [A ou B]
  2. Selecionar design aprovado (A = HTML da Story 3.3 exportado / B = prompt Canva)
  3. Exportar PNGs via api/export-html-to-png.js (se Design A)
  4. Upload dos PNGs via api/upload-media.js → coletar media_ids
  5. Publicar via api/publish-carousel.js ou api/publish-feed.js com horário aprovado
  6. Verificar publicação via api/check-status.js → atualizar logs/publicacoes.json
  ```
- Tratamento de erro silencioso: nenhum erro interno chega ao Gustavo; o CEO Master recebe apenas "✅ Publicado" ou "⚠️ Publicação com problema — verificando" (com resolução interna)
- Validação de `.env`: CEO Operações verifica se config está completa antes de iniciar — se não estiver, retorna mensagem de setup ao CEO Master
- Relatório ao CEO Master após publicação:
  ```
  ✅ Publicado — @verbumcontabilidade
  Post: [URL do Instagram]
  Horário: [horário publicado]
  Design: [A ou B]
  ```

---

## Critérios de Aceite do Épico

- [ ] `.env.example` criado com as 4 variáveis documentadas
- [ ] `testConnection()` retorna `{ connected: true, page_name }` com credenciais válidas
- [ ] Upload de PNG funciona e retorna `media_id` válido
- [ ] Carrossel de 6 slides publicado com sucesso via API
- [ ] Feed estático publicado com sucesso via API
- [ ] Agendamento funciona: post publicado no horário definido por Gustavo
- [ ] `logs/publicacoes.json` atualizado após cada publicação com URL confirmada
- [ ] Gustavo nunca vê erro técnico — só resultado ou encaminhamento limpo

---

## Riscos e Mitigação

| Risco | Mitigação |
|---|---|
| Access Token expira (validade: 60 dias) | CEO Operações verifica validade antes de cada execução; avisa CEO Master com 7 dias de antecedência |
| Rate limit da API (200 posts/dia) | Limite muito acima do necessário (5 posts/semana) — sem preocupação |
| Meta bloqueia conta por atividade suspeita | Intervalo mínimo de 1 hora entre publicações via API; padrão humano de horários |
| PNG muito grande para upload | Playwright exporta com qualidade otimizada; limite da API é 8MB por imagem |
| `api/upload-media.js` falha no primeiro slide de um carrossel | Retry automático 1x; se falhar novamente, reportar ao CEO Master com slide problemático identificado |

---

## Handoff para @sm

**Tecnologia:** Node.js, Meta Graph API, axios/node-fetch, Playwright (integração com E3)
**Segurança crítica:** `.env` NUNCA commitado. `api/config.js` valida ausência de credenciais antes de qualquer operação.
**Formatos suportados na v1:** Carrossel (5–8 slides) + Feed estático (1 imagem)
**Sequência das stories:** 4.1 → 4.2 → 4.3 → 4.4 (sequência estritamente linear — cada uma depende da anterior)
**Pré-condição de produção:** Gustavo precisa completar as ações de setup do Meta antes da Story 4.2 poder ser testada em produção. Os scripts podem ser desenvolvidos e testados com mocks antes disso.

"River, as stories deste épico têm dependência linear obrigatória: 4.1 → 4.2 → 4.3 → 4.4. Não há paralelismo possível. O executor padrão é @dev para todas. Atenção especial: a Story 4.1 deve garantir que `.env` nunca seja commitado — verificar `.gitignore` na primeira tarefa. O fluxo de aprovação documentado em `docs/ceo-master-flow.md` é a referência para a Story 4.4. Use o PRD em `docs/prd/verbum-instagram-prd-v2.md` Épico 4 como referência de requisitos."
