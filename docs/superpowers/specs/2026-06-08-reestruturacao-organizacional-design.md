# Spec — Reestruturação Organizacional Instagram Verbum
**Data:** 2026-06-08  
**Status:** Aprovado por Gustavo Peguy  
**Repositório:** instagram-verbum-automation  
**Perfil:** @verbumcontabilidade  

---

## Problema

O fluxo organizacional atual quebra a autonomia da equipe: agentes concluem etapas parciais e devolvem execução para Gustavo, que deveria atuar apenas como requisitante e aprovador. O exemplo concreto que motivou esta reestruturação: após construção de roteiro, o sistema sugeriu que Gustavo abrisse o Canva manualmente para criar os slides — quando isso deve ser responsabilidade exclusiva da organização.

**Princípio fundamental:** A força de trabalho pertence à organização. Gustavo pede. A organização executa.

---

## Arquitetura Organizacional

### Hierarquia

```
Gustavo (requisitante + aprovador)
        ↓
CEO Master (Claude Code — orquestrador)
        ↓
┌───────────────┬────────────────┬──────────────────┬──────────────┐
CEO Conteúdo   CEO Criativo    CEO Operações      CEO Dados
(copy/copy)    (design visual)  (Meta Graph API)   (métricas/KPI)
```

### Papéis e Responsabilidades

| Agente | Ferramentas | Entrega obrigatória |
|---|---|---|
| **CEO Master** | Claude Code | Pacote de aprovação formatado; orquestração completa do fluxo |
| **CEO Conteúdo** | ai-social-media-content, marketing-strategy-pmm, humanizer | Copy finalizado, legenda humanizada, hashtags |
| **CEO Criativo** | Canva MCP (Abordagem A) + prompt Canva manual (Abordagem B) | Dois designs sempre — A e B simultâneos |
| **CEO Operações** | Meta Graph API (scripts Node.js em `api/`) | Agendamento confirmado após aprovação |
| **CEO Dados** | business-intelligence | Dashboard mensal de métricas |

---

## Fluxo de Produção

### Comando de entrada (padrão fixo)

```
[perfil] · [tipo] · [tema]
```

Exemplo:
```
verbum · carrossel · Reforma Tributária — o que muda em 2026
```

### Fluxo completo

```
Gustavo envia comando
        ↓
CEO Master lê o brief → aciona CEO Conteúdo
        ↓
CEO Conteúdo produz:
  - Legenda completa (humanizada via skill humanizer)
  - Bloco de hashtags
  - Sugestão de primeiro comentário
        ↓
CEO Master passa copy para CEO Criativo
        ↓
CEO Criativo produz simultaneamente:
  - Design A: criado via Canva MCP (thumbnail gerado aqui)
  - Design B: prompt completo para uso manual no Canva
        ↓
CEO Master monta pacote de aprovação e apresenta a Gustavo
        ↓
Gustavo responde: "aprovado · [horário] · [A ou B]"
        ↓
CEO Operações:
  - Exporta design escolhido
  - Salva em templates/ no repositório
  - Publica via Meta Graph API no horário informado
  - Registra confirmação em logs/
        ↓
Fluxo encerrado
```

### Regra de falha interna

Se qualquer agente encontrar um obstáculo, o CEO Master tenta resolver internamente. Gustavo só é informado do **resultado** — nunca do problema operacional.

---

## Pacote de Aprovação (formato fixo)

Toda entrega segue esta estrutura exata:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTREGA — @verbumcontabilidade
[tipo] · [pilar] · [data sugerida]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COPY
[legenda completa, pronta para publicar]

HASHTAGS
[bloco de hashtags]

DESIGN A — Canva MCP
[thumbnail] · [link Canva]
Status: ✅ pronto / ⚠️ revisar

DESIGN B — Prompt para Canva manual
[prompt completo, pronto para colar]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Para aprovar: aprovado · [horário] · [A ou B]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Meta Graph API — Camada de Publicação

### Pré-requisitos (ação manual de Gustavo — única vez)

1. Criar Página do Facebook vinculada ao @verbumcontabilidade
2. Criar App no Meta for Developers
3. Gerar Page Access Token e salvar em `.env`

### Scripts a construir em `api/`

| Arquivo | Função |
|---|---|
| `config.js` | Lê variáveis do `.env` — nunca vai ao GitHub |
| `upload-media.js` | Envia cada imagem ao Meta → retorna `media_id` |
| `publish-carousel.js` | Monta container de carrossel com os `media_id` + agenda publicação |
| `check-status.js` | Verifica se o post foi publicado corretamente |

### Fluxo técnico de publicação

```
Design exportado (PNG por slide)
        ↓
upload-media.js → [media_id_1, media_id_2, ..., media_id_N]
        ↓
publish-carousel.js → container_id + scheduled_publish_time (Unix)
        ↓
Meta Graph API agenda automaticamente
        ↓
check-status.js → confirma → registra em logs/publicacoes.json
```

### Variáveis de ambiente (`.env` — nunca commitar)

```
META_PAGE_ID=
META_ACCESS_TOKEN=
META_APP_ID=
META_APP_SECRET=
```

---

## Regras Invioláveis da Organização (CLAUDE.md)

1. **Nenhum agente encerra sem artefato.** Cada etapa entrega algo concreto ao próximo agente.
2. **Gustavo é acionado uma única vez por fluxo.** Apenas no pacote de aprovação.
3. **CEO Criativo sempre entrega A e B simultaneamente.** Sem exceção.
4. **CEO Operações só publica após "aprovado" + horário explícito.**
5. **Erros não chegam a Gustavo como perguntas.** Chegam como resultado de resolução interna.
6. **Brand guide é lei.** Toda entrega segue `branding/brand-guide.md` — paleta, tipografia, formatos.
7. **Maria Clara é a única porta-voz.** Gustavo nunca aparece publicamente vinculado ao @verbumcontabilidade.
8. **Humanizer obrigatório.** Todo copy passa pelo skill humanizer antes de entrar no pacote de aprovação.

---

## Estrutura de Pastas (pós-implementação)

```
instagram-verbum-automation/
├── api/
│   ├── config.js
│   ├── upload-media.js
│   ├── publish-carousel.js
│   └── check-status.js
├── branding/
│   └── brand-guide.md
├── docs/
│   └── superpowers/specs/
│       └── 2026-06-08-reestruturacao-organizacional-design.md
├── logs/
│   └── publicacoes.json
├── roteiros/
│   └── 01-apresentacao-maria-clara.md
├── skills/
│   └── humanizer.md
├── templates/
│   ├── post-01-apresentacao-marca.md
│   └── post-01-carrossel.html
├── .env              ← nunca commitar
├── .gitignore        ← inclui .env
└── README.md
```

---

## Abordagens de Design em Produção Simultânea

Durante o período inicial, CEO Criativo sempre entrega A e B:

| Abordagem | Ferramenta | Vantagem | Limitação |
|---|---|---|---|
| **A** | Canva MCP (automático) | Zero intervenção manual | Qualidade sujeita a validação |
| **B** | Prompt para Canva manual | Controle total sobre output | Requer 2 min de ação de Gustavo |

Gustavo escolhe A ou B na aprovação. Os dados de preferência ao longo do tempo informarão a decisão de padronização futura.

---

## O que está fora do escopo deste spec

- Perfis @gustavopeguy e @gugapeguy — spec separado quando @verbumcontabilidade estiver operacional
- HeyGen / vídeos da Maria Clara — dependem de foto aprovada e plano Creator ativo (renovação 21/06/2026)
- CEO de Dados / métricas — ativado após 30 dias de publicações consistentes
- Make.com — descartado; Meta Graph API nativa resolve o agendamento
