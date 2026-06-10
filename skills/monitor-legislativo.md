# Skill de Monitor Legislativo — CEO Master

**Versão:** 1.0
**Criado em:** 2026-06-09
**Atualizado em:** 2026-06-09
**Uso:** Buscar atualizações legislativas via EXA MCP e classificar por pilar editorial

---

## Propósito

Esta skill executa buscas web nas fontes legislativas monitoradas pelo @verbumcontabilidade, classifica os resultados por relevância e pilar editorial, e entrega uma lista estruturada pronta para ser injetada no CEO Conteúdo (Story 2.2) ou na geração de pauta semanal (Story 1.3).

**Dependências de execução:**
- `knowledge/sources.md` — lista de fontes e categorias de monitoramento
- `knowledge/legislacao/*.md` — base de conhecimento para contextualizar achados
- EXA MCP via Docker gateway (`mcp__docker-gateway__web_search_exa`)

**Pré-condição:** Story 1.1 Done. Se `knowledge/sources.md` não existir, parar e alertar CEO Master.

---

## Pré-condição: Verificar EXA MCP

Antes de executar qualquer busca, verificar se o Docker gateway está respondendo:

```
Verificação: curl http://localhost:8080/health
Resposta esperada: {"status":"ok"} ou similar

Se INDISPONÍVEL:
→ Retornar ao CEO Master: "EXA MCP indisponível — Docker gateway não respondeu em localhost:8080.
   Opções: (1) verificar se Docker Desktop está rodando, (2) prosseguir com base de conhecimento
   local apenas (knowledge/legislacao/), (3) agendar nova tentativa."
→ NÃO travar o pipeline. NÃO inventar resultados.
```

---

## Categorias de Monitoramento

| Categoria (parâmetro) | Pilares primários | Fontes prioritárias |
|---|---|---|
| `reforma-tributaria` | Pilar 1 | JOTA, Tributário nos Bastidores, Planalto, Receita Federal |
| `simples-nacional` | Pilar 3 | Receita Federal, Contábeis.com.br, Portal Simples |
| `esocial` | Pilar 3 | gov.br/esocial, MTE, Contábeis.com.br |
| `trabalhista` | Pilar 3, Pilar 2 | MTE, Contábeis.com.br, Valor Econômico |
| `obrigacoes-acessorias` | Pilar 3, Pilar 6 | Receita Federal, Contábeis.com.br |
| `irpf-declaracao` | Pilar 2 | Receita Federal, Contábeis.com.br |
| `calendario-fiscal` | Pilar 6 | Receita Federal, Contábeis.com.br |
| `consciencia-financeira` | Pilar 4 | Valor Econômico, JOTA |

**Nota:** Uma consulta pode aceitar múltiplas categorias separadas por vírgula: `reforma-tributaria,simples-nacional`

---

## Queries por Categoria

Cada categoria tem um template de query principal e queries complementares para cobrir múltiplas fontes.

---

### `reforma-tributaria`

```
Query principal:
"Reforma Tributária IBS CBS site:jota.info OR site:tributariosnosbastidores.com.br OR site:planalto.gov.br"

Queries complementares:
- "LC 214 2024 regulamentação nova"
- "IBS CBS split payment 2026"
- "Imposto Seletivo IS regulamentação"
- "Comitê Gestor IBS resolução"

Período: últimos 30 dias
numResults: 10
type: "neural"
```

---

### `simples-nacional`

```
Query principal:
"Simples Nacional MEI 2026 site:receita.fazenda.gov.br OR site:contabeis.com.br OR site:tributariosnosbastidores.com.br"

Queries complementares:
- "DAS Simples Nacional alíquota tabela 2026"
- "MEI limite faturamento 2026 alteração"
- "exclusão Simples Nacional 2026"
- "Resolução CGSN 2026"

Período: últimos 30 dias
numResults: 10
type: "neural"
```

---

### `esocial`

```
Query principal:
"eSocial FGTS Digital obrigação 2026 site:gov.br OR site:contabeis.com.br"

Queries complementares:
- "FGTS Digital prazo recolhimento 2026"
- "eSocial evento S-1200 alteração"
- "eSocial doméstico 2026"
- "DAE FGTS Digital instrução normativa"

Período: últimos 30 dias
numResults: 10
type: "neural"
```

---

### `trabalhista`

```
Query principal:
"CLT trabalhista legislação portaria 2026 site:gov.br/trabalho OR site:contabeis.com.br OR site:valor.globo.com"

Queries complementares:
- "home office teletrabalho 2026 lei"
- "demissão aviso prévio 2026 alteração"
- "NR norma regulamentadora 2026"
- "salário mínimo 2026"

Período: últimos 30 dias
numResults: 10
type: "neural"
```

---

### `obrigacoes-acessorias`

```
Query principal:
"DCTF ECD ECF REINF DIRF prazo obrigação 2026 site:receita.fazenda.gov.br OR site:contabeis.com.br"

Queries complementares:
- "Instrução Normativa RFB 2026"
- "SPED obrigação acessória 2026 prazo"
- "RAIS CAGED 2026 portaria"
- "DEFIS DASN-SIMEI 2026 prazo"

Período: últimos 30 dias
numResults: 10
type: "neural"
```

---

### `irpf-declaracao`

```
Query principal:
"IRPF declaração imposto de renda pessoa física 2026 site:receita.fazenda.gov.br OR site:contabeis.com.br"

Queries complementares:
- "prazo declaração IRPF 2026"
- "isenção IRPF tabela 2026"
- "carnê-leão 2026 alteração"
- "dedução IRPF 2026 dependentes"

Período: últimos 30 dias
numResults: 10
type: "neural"
```

---

### `calendario-fiscal`

```
Query principal:
"calendário fiscal vencimento obrigação tributária 2026 site:receita.fazenda.gov.br OR site:contabeis.com.br"

Queries complementares:
- "DAS MEI vencimento 2026 prorrogação"
- "DARF prazo vencimento 2026"
- "feriado fiscal 2026 prorrogação prazo"

Período: últimos 30 dias
numResults: 8
type: "keyword"
```

---

### `consciencia-financeira`

```
Query principal:
"planejamento financeiro MEI pequena empresa 2026 site:valor.globo.com OR site:contabeis.com.br"

Queries complementares:
- "fluxo de caixa pequena empresa 2026"
- "reserva de emergência MEI 2026"

Período: últimos 30 dias
numResults: 8
type: "neural"
```

---

## Classificador de Relevância

Após receber os resultados do EXA, cada item deve ser avaliado com este critério:

### Alta Relevância

Aplicar quando o item contém um ou mais dos seguintes:
- Nova lei, emenda constitucional, lei complementar ou instrução normativa **aprovada**
- Mudança de prazo de obrigação existente (novo vencimento confirmado)
- Nova obrigação criada para MEI, PJ ou PF
- Mudança de alíquota ou limite de faturamento confirmada
- Aprovação de regulamentação que estava pendente (ex: resolução do Comitê Gestor do IBS)

**Keywords de alta:** "aprovado", "publicado", "promulgado", "entra em vigor", "novo prazo", "nova obrigação", "instrução normativa", "lei complementar", "emenda constitucional", "portaria ministerial"

---

### Média Relevância

Aplicar quando o item contém:
- Proposta de lei em votação final no Congresso (plenário)
- Regulamentação complementar (portaria, resolução) de lei já aprovada
- Decisão do STF ou CARF com impacto tributário
- Nota técnica ou esclarecimento da Receita Federal sobre lei vigente

**Keywords de média:** "em votação", "aprovado em comissão", "STF decidiu", "CARF acórdão", "esclarecimento Receita", "regulamentação prevista", "consulta pública"

---

### Baixa Relevância

Aplicar quando o item contém:
- Proposta em fase inicial (apresentada, em comissão preliminar)
- Notícia especulativa ou análise sem base em lei aprovada
- Conteúdo que não afeta diretamente o público MEI/PJ/PF do @verbumcontabilidade
- Repetição de informação já na base de conhecimento (knowledge/legislacao/)

**Keywords de baixa:** "proposta", "pode ser aprovado", "estuda-se", "projeto de lei", "PL apresentado", "expectativa de"

---

## Mapeamento de Pilar por Palavras-Chave

| Palavras no título/resumo | Pilar |
|---|---|
| IBS, CBS, IS, Reforma Tributária, split payment, cashback tributário, LC 214, EC 132 | **Pilar 1** |
| IRPF, imposto de renda pessoa física, carnê-leão, declaração anual, malha fina, restituição | **Pilar 2** |
| Simples Nacional, DAS, MEI, CNPJ, IRPJ, CSLL, Lucro Real, Lucro Presumido, obrigação fiscal PJ | **Pilar 3** |
| CLT, eSocial, FGTS, trabalhista, férias, 13º, demissão, home office, NR | **Pilar 3** (empregador) |
| planejamento financeiro, fluxo de caixa, reserva de emergência, investimento PME | **Pilar 4** |
| DCTF, ECD, ECF, REINF, DIRF, RAIS, SPED, DEFIS, DASN, obrigação acessória | **Pilar 3** (preferencial) ou **Pilar 6** |
| calendário fiscal, vencimento, prazo, DAS vence, alerta fiscal | **Pilar 6** |
| Sem encaixe claro nos anteriores | **Pilar 6** (fallback) |

**Regra de desempate:** quando um item se enquadra em 2 pilares, usar o de numeração menor (ex: Pilar 1 > Pilar 3).

---

## Schema de Output

Cada resultado retornado deve seguir este schema:

```
---
titulo: string
  → Título da notícia/atualização (máximo 100 caracteres)
  → Se o título original for muito técnico, reescrever em linguagem clara para empreendedor

resumo: string
  → Resumo do conteúdo em no máximo 150 palavras
  → Linguagem direta, sem juridiquês
  → Focar no impacto prático para o público (MEI / PJ / PF)
  → Se o impacto ainda não for claro, indicar: "[impacto a confirmar]"

fonte_url: string
  → URL completa do artigo original

fonte_nome: string
  → Nome legível da fonte: "Receita Federal", "JOTA", "Contábeis.com.br", etc.

pilar: "Pilar 1" | "Pilar 2" | "Pilar 3" | "Pilar 4" | "Pilar 5" | "Pilar 6"
  → Pilar editorial primário do item (usar tabela de mapeamento acima)

relevancia: "alta" | "média" | "baixa"
  → Classificação conforme critérios da seção anterior

data: string (formato DD/MM/AAAA)
  → Data de publicação do artigo
  → Se não disponível: "[data não informada]"

publico: "MEI" | "PJ" | "PF" | "todos"
  → Público mais afetado pelo item
---
```

---

## Formato de Resposta Completo

O monitor deve retornar os resultados no seguinte formato markdown:

```markdown
## Monitor Legislativo — Resultados
**Categoria consultada:** [categoria]
**Data da consulta:** [DD/MM/AAAA]
**Total de itens encontrados:** [N]
**Fontes cobertas:** [N] fontes diferentes

---

### [N]. [TÍTULO DO ITEM]
**Relevância:** 🔴 Alta / 🟡 Média / 🟢 Baixa
**Pilar:** Pilar [N] — [Nome do pilar]
**Público:** [MEI / PJ / PF / todos]
**Fonte:** [Nome da fonte] — [URL]
**Data:** [DD/MM/AAAA]

**Resumo:**
[Até 150 palavras descrevendo o impacto prático]

---

[próximo item...]

---

## Itens de Alta Relevância (resumo executivo)
[Lista apenas dos itens com relevância = alta, em formato bullet, para injeção rápida no CEO Conteúdo]

- [Título] · [Pilar] · [Fonte] · [Data]
- [Título] · [Pilar] · [Fonte] · [Data]

## Sugestão de Pauta
[2-3 temas de alta relevância que têm potencial para post imediato, com pilar sugerido]
```

---

## Instruções de Execução Passo a Passo

### Para executar o monitor:

**Passo 1 — Verificar pré-condições**
```
1. Confirmar que knowledge/sources.md existe
2. Verificar EXA MCP: curl http://localhost:8080/health
3. Se EXA indisponível: retornar fallback (ver seção de fallback abaixo)
```

**Passo 2 — Selecionar categoria**
```
Receber parâmetro de categoria do CEO Master.
Exemplos válidos: "reforma-tributaria", "simples-nacional,esocial", "all" (todas)
Se categoria = "all": executar todas as 7 categorias sequencialmente
```

**Passo 3 — Executar buscas EXA**
```
Para cada categoria:
1. Executar query principal via mcp__docker-gateway__web_search_exa
2. Executar ao menos 1 query complementar
3. Combinar resultados, remover duplicatas (mesmo URL)
4. Verificar se há pelo menos 3 fontes diferentes nos resultados
   - Se < 3 fontes: executar query complementar adicional
```

**Passo 4 — Classificar resultados**
```
Para cada item retornado pelo EXA:
1. Ler título e snippet
2. Aplicar mapeamento de pilar (tabela acima)
3. Aplicar classificador de relevância (keywords acima)
4. Preencher schema de output completo
```

**Passo 5 — Ordenar e entregar**
```
Ordenar por: (1) relevância [alta → baixa], (2) data [mais recente primeiro]
Montar resposta no formato de saída completo
Incluir "Itens de Alta Relevância" e "Sugestão de Pauta" ao final
```

---

## Comportamento de Fallback

### EXA indisponível

```
AVISO: EXA MCP indisponível (Docker gateway não respondeu)

Usando base de conhecimento local como alternativa:
- knowledge/legislacao/reforma-tributaria.md
- knowledge/legislacao/simples-nacional.md
- knowledge/legislacao/calendario-fiscal-2026.md
- knowledge/legislacao/esocial-trabalhista.md

LIMITAÇÃO: informações da base local podem não refletir atualizações
recentes. Recomendo tentar novamente quando o Docker gateway estiver
disponível, ou solicitar verificação ao @devops.
```

### EXA retorna < 3 fontes

```
AVISO: Apenas [N] fonte(s) encontrada(s) para a categoria "[categoria]".
Executando queries complementares para ampliar cobertura...
[executa queries complementares]
Se ainda < 3: retornar o que foi encontrado com o aviso documentado.
```

### EXA retorna 0 resultados

```
AVISO: Nenhum resultado encontrado para "[categoria]" nos últimos 30 dias.
Possíveis causas:
- Não houve atualizações recentes nesta categoria
- Query muito específica — tente ampliar o período ou usar categoria adjacente
Retornando base de conhecimento local como referência.
```

---

## Exemplos de Uso

### Exemplo 1 — Busca categoria única

**Input do CEO Master:**
```
Monitor, buscar: reforma-tributaria
```

**Execução:**
1. Verifica EXA ✅
2. Executa query: `"Reforma Tributária IBS CBS site:jota.info OR site:tributariosnosbastidores.com.br OR site:planalto.gov.br"`
3. Executa complementar: `"IBS CBS split payment 2026"`
4. Recebe 8 resultados de 4 fontes diferentes ✅
5. Classifica: 2 alta, 4 média, 2 baixa
6. Ordena e formata

**Output (exemplo):**

```markdown
## Monitor Legislativo — Resultados
Categoria consultada: reforma-tributaria
Data da consulta: 15/06/2026
Total de itens encontrados: 8
Fontes cobertas: 4 fontes diferentes

---

### 1. Comitê Gestor do IBS publica resolução sobre split payment para varejo
Relevância: 🔴 Alta
Pilar: Pilar 1 — Reforma Tributária
Público: PJ
Fonte: JOTA — https://www.jota.info/tributos-e-empresas/...
Data: 12/06/2026

Resumo:
O Comitê Gestor do IBS publicou resolução definindo os critérios técnicos
para implementação do split payment no setor varejista a partir de
01/07/2026. As operações via cartão de crédito e débito serão as
primeiras afetadas. Empresas com faturamento acima de R$ 500 mil
deverão adaptar seus sistemas de caixa. A medida afeta principalmente
Lucro Real e Lucro Presumido — empresas do Simples Nacional têm
cronograma separado ainda não definido.

---
[demais itens...]

---
## Itens de Alta Relevância (resumo executivo)
- Comitê Gestor publica resolução split payment varejo · Pilar 1 · JOTA · 12/06/2026
- Receita Federal esclarece aproveitamento crédito CBS para prestadores · Pilar 1 · Receita Federal · 10/06/2026

## Sugestão de Pauta
1. Split payment no varejo: o que muda em julho — Pilar 1, carrossel 6 slides
2. Crédito CBS para prestadores de serviço: como funciona na prática — Pilar 1, carrossel 8 slides
```

---

### Exemplo 2 — Busca múltiplas categorias

**Input do CEO Master:**
```
Monitor, buscar: simples-nacional,obrigacoes-acessorias
```

**Execução:**
1. Executa busca `simples-nacional` → 6 resultados
2. Executa busca `obrigacoes-acessorias` → 7 resultados
3. Remove duplicatas → 11 resultados únicos
4. Classifica e entrega com seção de Alta Relevância consolidada

---

### Exemplo 3 — Busca semanal completa

**Input do CEO Master:**
```
Monitor, buscar: all (semanal)
```

**Execução:**
- Executa todas as 7 categorias
- Consolida resultados únicos
- Entrega relatório completo ordenado por relevância
- Seção de Sugestão de Pauta com top 5 temas para a semana

---

## Integração com CEO Conteúdo (Story 2.2)

O CEO Conteúdo consome o output deste monitor da seguinte forma:

1. CEO Master executa o monitor e recebe a lista estruturada
2. CEO Master seleciona 1 item de "Alta Relevância" para o próximo post
3. CEO Conteúdo recebe: tema do item + resumo do monitor + base de conhecimento relevante (`knowledge/legislacao/[arquivo].md`)
4. CEO Conteúdo gera copy na voz de Maria Clara usando `skills/dominio-contabil.md`

**Formato de handoff CEO Master → CEO Conteúdo:**

```
[TEMA PARA POST]
Pilar: [N] — [Nome]
Formato: [conforme skills/calendario-editorial.md]
Base de conhecimento: [arquivo em knowledge/legislacao/]
Resumo do monitor: [resumo do item — max 150 palavras]
Tom: Maria Clara (ver skills/dominio-contabil.md)
```

---

## Integração com Story 1.3 (Pauta Semanal)

Story 1.3 usa este monitor como uma das entradas para gerar a pauta de 7 temas. O monitor entrega os itens de alta relevância; a Story 1.3 os combina com o calendário editorial (`skills/calendario-editorial.md`) para montar a semana.

Formato esperado pela Story 1.3:

```json
{
  "monitor_results": [
    {
      "titulo": "...",
      "resumo": "...",
      "fonte_url": "...",
      "fonte_nome": "...",
      "pilar": "Pilar 1",
      "relevancia": "alta",
      "data": "DD/MM/AAAA",
      "publico": "PJ"
    }
  ]
}
```
