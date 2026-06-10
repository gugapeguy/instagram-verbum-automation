# Epic 01 — Motor de Inteligência Legislativa
**Status:** Ready for story creation
**Prioridade:** P0 — Bloqueador de E2, E3, E4
**PRD:** [docs/prd/verbum-instagram-prd-v2.md](../../../prd/verbum-instagram-prd-v2.md)
**Criado por:** Morgan (PM)
**Data:** 2026-06-09

---

## Objetivo do Épico

Criar um sistema que monitora automaticamente mudanças na legislação tributária, fiscal, trabalhista e contábil brasileira, categoriza as atualizações por relevância para o público do @verbumcontabilidade, e abastece o pipeline de conteúdo com temas fundamentados em fontes reais.

**Por que é P0:** Sem inteligência legislativa, o CEO Conteúdo gera posts genéricos sem profundidade técnica. Toda geração de conteúdo depende deste épico.

---

## Contexto do Sistema Existente

- **Stack atual:** Node.js (package.json existe), sem backend ainda implementado
- **Arquivos relevantes:** `skills/humanizer.md`, `branding/brand-guide.md`
- **Integração:** Alimenta diretamente o Épico 2 (Pipeline de Conteúdo)
- **Pilares editoriais definidos:** `branding/brand-guide.md` Seção 9

---

## Fontes Legislativas a Monitorar

### Fontes Primárias (gov.br)
- Receita Federal do Brasil — normas e instruções normativas
- Portal da Legislação — leis, decretos, medidas provisórias
- Ministério do Trabalho e Emprego — portarias e regulamentos
- CONFAZ — ICMS e legislação estadual
- Senado Federal — tramitação de PL/PEC

### Fontes Secundárias (portais especializados)
- JOTA (jota.info) — tributário e regulatório
- Tributário nos Bastidores
- Valor Econômico — caderno de tributação
- Contábeis.com.br

### Categorias de Conteúdo
| Categoria | Exemplos | Pilar |
|---|---|---|
| Reforma Tributária | IBS, CBS, IS, split payment, cashback | Pilar 1 |
| IRPF / IRPJ | Tabela progressiva, deduções, declaração | Pilar 2 / 3 |
| Simples Nacional | Limites, anexos, exclusão | Pilar 3 |
| eSocial / FGTS Digital | Obrigações do empregador | Pilar 3 |
| Obrigações Acessórias | DCTF, ECD, ECF, REINF, DIRF | Pilar 3 |
| CLT / Trabalhista | Férias, 13º, horas extras, demissão | Pilar 2 / 3 |
| Calendário Fiscal | Vencimentos e datas obrigatórias | Pilar 6 |

---

## Stories Propostas

### Story 1.1 — Base de Conhecimento Legislativo (knowledge/)
**Executor:** @dev
**Quality Gate:** @architect
**Descrição:** Criar estrutura `knowledge/legislacao/` com documentos base sobre os principais temas (Reforma Tributária, Simples Nacional, Calendário Fiscal 2026, eSocial/Trabalhista). Esta base serve como contexto injetável no CEO Conteúdo.

**ACs principais:**
- Arquivos Markdown estruturados por tema em `knowledge/legislacao/`
- Arquivo `knowledge/sources.md` com fontes monitoradas e frequência
- Conteúdo factual e rastreável a fontes oficiais
- Formato padronizado: título, resumo, impacto para MEI/PJ/PF, data de vigência

---

### Story 1.2 — Monitor de Atualizações via Web Search
**Executor:** @dev
**Quality Gate:** @architect
**Descrição:** Implementar skill/módulo que usa web search (EXA MCP) para buscar atualizações legislativas em fontes definidas em `knowledge/sources.md`. Retorna lista de atualizações categorizadas por pilar editorial e relevância.

**ACs principais:**
- Skill `skills/monitor-legislativo.md` documentando o comportamento
- Função de busca que aceita categoria e retorna atualizações recentes
- Classificador de relevância (alta/média/baixa para o público Verbum)
- Integração com fontes definidas em `knowledge/sources.md`
- Output estruturado: título, resumo, fonte, pilar, relevância

---

### Story 1.3 — Injeção Manual por Gustavo + Sugestão de Pauta Semanal
**Executor:** @dev
**Quality Gate:** @architect
**Descrição:** Criar mecanismo para Gustavo injetar atualizações manualmente (encaminhar texto/link ao CEO Master) e para o sistema sugerir uma pauta semanal de 7 temas toda segunda-feira.

**ACs principais:**
- CEO Master aceita formato: `[atualização] · [texto ou link]` para injeção manual
- Injeção manual é incorporada ao pool de temas disponíveis
- Sugestão de pauta semanal gerada com base em: novidades monitoradas + pilares + datas fiscais
- Output da pauta: 7 temas ranqueados com pilar, formato sugerido e justificativa

---

## Critérios de Aceite do Épico

- [ ] `knowledge/legislacao/` existe com pelo menos 4 documentos base
- [ ] Monitor busca e retorna atualizações de pelo menos 3 fontes
- [ ] Classificador de relevância opera corretamente por pilar
- [ ] Injeção manual por Gustavo funciona via comando ao CEO Master
- [ ] Pauta semanal gerada com 7 temas fundamentados

---

## Riscos e Mitigação

| Risco | Mitigação |
|---|---|
| Fontes gov.br mudam estrutura/URL | Usar múltiplas fontes; fallback para secundárias |
| Conteúdo não rastreável a fonte real | Classificador exige fonte obrigatória no output |
| Volume de atualizações muito alto | Filtro de relevância elimina ruído |

---

## Handoff para @sm

**Tecnologia:** Node.js, EXA MCP (via Docker), Markdown
**Padrões existentes:** Sem padrões de código ainda — definir na Story 1.1
**Compatibilidade:** Não há sistema legado — greenfield dentro do projeto brownfield
**Integração crítica:** Output do épico deve ser consumível pelo Épico 2 (CEO Conteúdo)

"River, este épico tem 3 stories em ordem sequencial obrigatória: 1.1 → 1.2 → 1.3. A 1.1 cria a base de conhecimento que as demais usam. O executor padrão é @dev. Use o PRD em `docs/prd/verbum-instagram-prd-v2.md` Épico 1 como referência de requisitos."
