# PRD — Verbum Instagram Automation v2.0
**Projeto:** instagram-verbum-automation
**Perfil:** @verbumcontabilidade
**Status:** Aprovado para desenvolvimento
**Data:** 2026-06-09
**PM:** Morgan (AIOX)
**Aprovado por:** Gustavo Peguy

---

## Visão do Produto

Um pipeline de conteúdo autônomo para o @verbumcontabilidade — alimentado por inteligência legislativa em tempo real, produzido pela equipe interna com Maria Clara como porta-voz, publicado automaticamente via Meta Graph API, com intervenção de Gustavo limitada exclusivamente a aprovações.

**Meta de estado final:** Gustavo envia 1 comando por post. A organização entrega o pacote de aprovação. Gustavo aprova. O post vai ao ar. Nada mais.

---

## Contexto do Projeto (Brownfield)

### O que já existe e funciona

| Artefato | Estado | Qualidade |
|---|---|---|
| Brand guide (`branding/brand-guide.md`) | Finalizado | Alta — paleta, tipografia, logo canônicas definidas |
| Persona Maria Clara | Definida | Visual OK; voz ElevenLabs (Malu) operacional; HeyGen pendente renovação 21/06/2026 |
| Spec organizacional | Aprovada | Arquitetura CEO Master/Conteúdo/Criativo/Operações definida |
| Roteiro de apresentação | Concluído | Áudio gerado; vídeo pendente |
| Template carrossel HTML | Existe | Qualidade a melhorar (Épico 3) |
| CLAUDE.md organizacional | Ativo | Regras invioláveis em vigor |

### O que não existe e bloqueia o funcionamento

| Gap | Impacto |
|---|---|
| Motor de inteligência legislativa | Sem fonte de conteúdo relevante e atualizado |
| Pipeline de geração 5x/semana | Conteúdo não flui sem orientação temática |
| Design system de qualidade | Templates inconsistentes, processo manual |
| Meta Graph API | Publicação 100% manual |
| Calendário editorial | Sem planejamento de frequência |

---

## Problema Central

> O @verbumcontabilidade opera num momento histórico único: a Reforma Tributária brasileira (2025–2033) está gerando mudanças legislativas contínuas que afetam diretamente o público-alvo (empreendedores, MEIs, autônomos). A equipe atual não tem mecanismo para capturar essas mudanças, transformá-las em conteúdo educativo e publicá-las com consistência de 5x/semana.

**Consequência:** Oportunidade de posicionamento desperdiçada. O público precisa de informação agora.

---

## Objetivos (OKRs)

### Objetivo 1 — Operacionalizar conteúdo legislativo (Q3 2026)
- KR1: 5 posts/semana publicados com 0 intervenção de Gustavo além da aprovação
- KR2: 100% dos posts rastreáveis a uma fonte legislativa real (lei, IN, resolução)
- KR3: Monitor captura e categoriza mínimo 3 atualizações relevantes/semana

### Objetivo 2 — Design premium consistente (Q3 2026)
- KR1: 0 posts com inconsistência de brand guide
- KR2: Tempo de produção de design < 2 min (geração automatizada)
- KR3: Maria Clara presente em ≥ 80% dos criativos (via HeyGen quando ativo)

### Objetivo 3 — Publicação autônoma (Q4 2026)
- KR1: Meta Graph API funcional com agendamento automático
- KR2: 100% dos posts aprovados publicados sem ação manual de Gustavo
- KR3: Logs de publicação completos em `logs/publicacoes.json`

---

## Épicos

### Épico 1 — Motor de Inteligência Legislativa
**Prioridade:** P0 — Bloqueador de tudo
**Objetivo:** Criar sistema de monitoramento e base de conhecimento para mudanças tributárias, fiscais, trabalhistas e contábeis brasileiras.

**Contexto:**
O Brasil passa pela maior reforma tributária em décadas (IBS, CBS, IS, split payment, cashback). Paralelamente, há mudanças contínuas em:
- IRPF / IRPJ / CSLL
- eSocial / FGTS Digital
- Simples Nacional e anexos
- Obrigações acessórias (ECD, ECF, DCTF, REINF, DIRF)
- CLT e legislação trabalhista

**Funcionalidades:**

| ID | Funcionalidade | Descrição |
|---|---|---|
| E1-F1 | Monitor de atualizações legislativas | Web search automático em fontes oficiais (gov.br, Receita Federal, MTE, Confaz) e portais especializados (Valor Econômico, JOTA, Tributário nos Bastidores) |
| E1-F2 | Classificador de relevância | Avalia se uma atualização é relevante para o público do @verbumcontabilidade (empreendedores, MEI, autônomos) |
| E1-F3 | Base de conhecimento local | Arquivo estruturado `knowledge/legislacao/` com tópicos organizados por pilar editorial |
| E1-F4 | Injeção manual por Gustavo | Gustavo pode encaminhar notícias/textos relevantes que o CEO Master incorpora ao pipeline automaticamente |
| E1-F5 | Sugestão de pauta semanal | A cada segunda-feira, sistema gera lista de 7 temas sugeridos para a semana com base em novidades + pilares |

**Pilares editoriais mapeados:**
1. Reforma Tributária (central 2026–2033)
2. Educação Fiscal Pessoa Física
3. Educação Fiscal Pessoa Jurídica
4. Consciência Financeira
5. Autoridade, Bastidores e Humanização
6. Formatos Recorrentes (alertas, agenda fiscal, Q&A)

---

### Épico 2 — Pipeline de Conteúdo 5x/Semana
**Prioridade:** P0 — Core do produto
**Objetivo:** Fluxo automatizado de geração de conteúdo orientado por inteligência legislativa, com Maria Clara como porta-voz.

**Funcionalidades:**

| ID | Funcionalidade | Descrição |
|---|---|---|
| E2-F1 | Calendário editorial automatizado | Planejamento semanal gerado automaticamente com base em E1-F5 + datas fiscais relevantes |
| E2-F2 | CEO Conteúdo atualizado | Geração de copy orientada por domínio contábil/fiscal — não copy genérico |
| E2-F3 | Skill de domínio contábil | Contexto especializado injetado no CEO Conteúdo: glossário fiscal, regras de comunicação para contabilidade, restrições legais |
| E2-F4 | Voz de Maria Clara | Copy escrito na primeira pessoa de Maria Clara — didático, acolhedor, nunca frio |
| E2-F5 | Humanizer obrigatório | Todo copy passa pelo skill `humanizer` antes do pacote de aprovação |
| E2-F6 | Formatos de conteúdo suportados | Carrossel, Feed estático, Stories, Reels cover |
| E2-F7 | Agenda fiscal integrada | Alertas automáticos para datas obrigatórias (DCTF, DEFIS, DASN, etc.) |

**Regras de conteúdo invioláveis (brand guide Seção 8):**
- Nunca prometer resultados específicos
- Nunca dar orientação tributária categórica
- Sempre convidar à análise personalizada
- Porta-voz exclusiva: Maria Clara

---

### Épico 3 — Design Premium Consistente
**Prioridade:** P1 — Após E1/E2 operacionais
**Objetivo:** Sistema de geração de design HTML/CSS de qualidade premium, com consistência de brand guide em 100% dos posts.

**Contexto:** A abordagem atual com Canva MCP foi descartada. CEO Criativo usa HTML/CSS via Claude como ferramenta principal. O template `carrossel-01-apresentacao.html` existe mas precisa evoluir para um sistema reutilizável.

**Funcionalidades:**

| ID | Funcionalidade | Descrição |
|---|---|---|
| E3-F1 | Sistema de templates HTML/CSS | Biblioteca de templates por formato (carrossel, feed, stories, reels cover) — reutilizáveis e parametrizáveis |
| E3-F2 | Variáveis de design dinâmicas | Templates recebem título, corpo, cor de destaque, posição de logo como parâmetros |
| E3-F3 | Maria Clara nos criativos | Placeholder estrutural para inserção do avatar (imagem estática ou HeyGen quando ativo) |
| E3-F4 | Export para PNG | Script de exportação dos slides HTML para PNG via Puppeteer/playwright |
| E3-F5 | Checklist de brand guide | Validação automática: paleta correta? Logo presente? Tipografia certa? Margem de segurança respeitada? |
| E3-F6 | Fallback Design B | Prompt completo para Canva manual sempre gerado como alternativa |

**Templates a construir (por pilar):**
- Carrossel educativo (5–8 slides)
- Post de alerta/data fiscal
- Post de frase/autoridade
- Stories de CTA
- Reels cover (Maria Clara)

---

### Épico 4 — Publicação Automatizada via Meta Graph API
**Prioridade:** P2 — Estruturar agora, ativar com Meta credentials
**Objetivo:** Pipeline completo de publicação que funciona sem intervenção manual após aprovação de Gustavo.

**Contexto:** A spec de junho/2026 já definiu a arquitetura técnica. Este épico implementa o que foi especificado.

**Funcionalidades:**

| ID | Funcionalidade | Descrição |
|---|---|---|
| E4-F1 | `api/config.js` | Lê variáveis do `.env` — Page ID, Access Token, App ID |
| E4-F2 | `api/upload-media.js` | Envia cada imagem ao Meta → retorna `media_id` |
| E4-F3 | `api/publish-carousel.js` | Monta container + agenda com timestamp Unix informado por Gustavo |
| E4-F4 | `api/check-status.js` | Verifica publicação + registra em `logs/publicacoes.json` |
| E4-F5 | Fluxo de aprovação integrado | CEO Operações só age após "aprovado · [horário] · [A ou B]" |
| E4-F6 | Tratamento de erros silencioso | Falhas são resolvidas internamente; Gustavo recebe resultado, nunca problema |
| E4-F7 | Suporte a carrossel + feed estático | Dois formatos de publicação suportados na v1 |

**Pré-requisitos (ação única de Gustavo):**
1. Criar Página do Facebook vinculada ao @verbumcontabilidade
2. Criar App no Meta for Developers
3. Gerar Page Access Token → salvar em `.env`

---

## Arquitetura de Pastas (Estado Final)

```
instagram-verbum-automation/
├── api/
│   ├── config.js
│   ├── upload-media.js
│   ├── publish-carousel.js
│   └── check-status.js
├── branding/
│   ├── brand-guide.md          ← existente, não alterar
│   └── logos/                  ← variantes existentes
├── docs/
│   ├── prd/
│   │   └── verbum-instagram-prd-v2.md   ← este documento
│   └── superpowers/specs/
│       └── 2026-06-08-reestruturacao-organizacional-design.md
├── knowledge/
│   ├── legislacao/
│   │   ├── reforma-tributaria.md
│   │   ├── calendario-fiscal-2026.md
│   │   ├── simples-nacional.md
│   │   └── trabalhista.md
│   └── sources.md              ← fontes monitoradas
├── logs/
│   └── publicacoes.json
├── roteiros/
│   └── 01-apresentacao-maria-clara.md
├── skills/
│   ├── humanizer.md
│   └── dominio-contabil.md     ← novo: contexto especializado
├── templates/
│   ├── carrossel-educativo.html
│   ├── post-alerta.html
│   ├── post-frase.html
│   ├── stories-cta.html
│   └── reels-cover.html
├── .env                        ← nunca commitar
├── .gitignore
└── README.md
```

---

## Fora do Escopo desta v2.0

| Item | Quando |
|---|---|
| Perfis @gustavopeguy / @gugapeguy | Após @verbumcontabilidade estável |
| HeyGen vídeos da Maria Clara | Após renovação do plano Creator (21/06/2026) |
| CEO Dados / métricas | Após 30 dias de publicações consistentes |
| Stories interativos (enquetes, perguntas) | v3.0 |
| LinkedIn / TikTok | Fora do escopo — Instagram first |

---

## Priorização MoSCoW

### Must Have (v2.0 — Q3 2026)
- E1: Motor de inteligência legislativa (monitor + base de conhecimento)
- E2: Pipeline de conteúdo 5x/semana com voz de Maria Clara
- E3: Templates HTML/CSS premium (carrossel + feed)

### Should Have (v2.0 — Q3/Q4 2026)
- E4: Meta Graph API estruturada e funcional

### Could Have (v2.1)
- Pauta semanal gerada automaticamente toda segunda-feira
- Agenda fiscal com alertas proativos

### Won't Have (v2.0)
- HeyGen automático
- Múltiplas redes sociais
- CEO Dados ativo

---

## Critérios de Sucesso

1. Gustavo consegue enviar 1 comando e receber o pacote de aprovação completo em < 5 min
2. 100% do conteúdo rastreável a uma fonte legislativa real
3. 0 posts com violação de brand guide
4. Publicação confirmada via API sem intervenção manual após aprovação

---

## Próximos Passos

1. **@sm** → Criar stories do Épico 1 (Motor Legislativo)
2. **@sm** → Criar stories do Épico 2 (Pipeline de Conteúdo)
3. **@dev** → Implementar E1 primeiro (bloqueador)
4. **@dev** → Implementar E2 sobre E1 operacional
5. **@dev** → Implementar E3 em paralelo com E2
6. **@dev** → Implementar E4 após E2 estável
