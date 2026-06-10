# Skill: Agenda Semanal

**Versão:** 1.0  
**Dependências:** `skills/monitor-legislativo.md` · `knowledge/legislacao/calendario-fiscal-2026.md`  
**Consome:** pool de temas da sessão (injeções manuais + monitor EXA)  
**Entrega para:** CEO Master → CEO Conteúdo (Story 2.2)

---

## Propósito

Esta skill gerencia dois comportamentos distintos:

1. **Injeção manual** — Gustavo injeta uma novidade legislativa via comando e recebe confirmação imediata
2. **Geração de pauta** — produz 7 temas ranqueados para a semana, combinando urgência fiscal, injeções manuais e atualizações do monitor

O pool de temas é temporário por sessão. Não há persistência em arquivo — o monitor é acionado toda vez que a pauta for gerada, e as injeções manuais ficam no contexto até serem consumidas.

---

## Parte 1 — Injeção Manual

### Formato de comando

```
[atualização] · [texto ou link]
```

**Exemplos:**
```
[atualização] · Receita Federal publica nova IN sobre prazo de entrega da ECF 2026

[atualização] · https://www.jota.info/artigos/reforma-tributaria-iss-2026

[atualização] · CARF decide que empréstimo entre empresas do mesmo grupo não incide IOF quando há evidência de habitualidade — impacto direto em holdings familiares
```

### Como processar

**Passo 1 — Extrair título**
- Se for texto: usar as primeiras 10-12 palavras como título, removendo artigos desnecessários
- Se for link: buscar o título da página ou, se não disponível, usar o domínio + palavras-chave da URL

**Passo 2 — Classificar pilar**
Usar a mesma lógica do classificador de `skills/monitor-legislativo.md`:

| Palavras-chave no texto | Pilar atribuído |
|------------------------|-----------------|
| IBS, CBS, IS, reforma tributária, split payment, cashback tributário | Pilar 1 |
| IRPF, declaração, carnê-leão, deduções, rendimento PF | Pilar 2 |
| IRPJ, CSLL, Simples Nacional, MEI, CNPJ, lucro real/presumido | Pilar 3 |
| planejamento financeiro, reserva, fluxo de caixa, investimento | Pilar 4 |
| bastidores, case, depoimento, Maria Clara, história | Pilar 5 |
| prazo, vencimento, DAS, DIRF, RAIS, ECD, ECF, calendário | Pilar 6 |
| sem encaixe claro | Pilar 6 (padrão) |

**Passo 3 — Confirmar ao Gustavo**

```
✅ Atualização registrada: [título extraído] — pilar [N]
```

Exemplos de confirmação:
```
✅ Atualização registrada: Receita Federal publica nova IN sobre prazo da ECF 2026 — pilar 6

✅ Atualização registrada: CARF define IOF em empréstimos entre empresas do mesmo grupo — pilar 3
```

**Passo 4 — Adicionar ao pool da sessão** com os metadados:
```
titulo: [título extraído]
fonte: manual (Gustavo)
pilar: [N]
relevancia: alta (injeção manual sempre é alta)
data: [data da injeção]
tag: injeção-manual
```

---

## Parte 2 — Geração de Pauta Semanal

### Acionamento

O CEO Master pode solicitar a pauta semanal a qualquer momento. Não há um comando específico obrigatório — qualquer pedido de "pauta da semana", "sugestão de temas" ou "o que postar essa semana" aciona este fluxo.

### Fontes de entrada (em ordem de prioridade)

1. **Urgência fiscal** — vencimentos em `knowledge/legislacao/calendario-fiscal-2026.md` com prazo ≤ 7 dias a partir da data atual
2. **Injeções manuais do Gustavo** — pool acumulado na sessão com tag `injeção-manual`
3. **Monitor legislativo** — resultados de `skills/monitor-legislativo.md` com relevância `alta`
4. **Pilares em atraso** — pilares que não apareceram nos últimos 2 posts da sessão
5. **Monitor legislativo relevância média** — preenche vagas restantes

### Algoritmo passo a passo

**Passo 1 — Coletar candidatos urgentes**
- Ler `knowledge/legislacao/calendario-fiscal-2026.md`
- Calcular: `dias_restantes = data_vencimento - data_atual`
- Para cada vencimento com `dias_restantes ≤ 7`: criar candidato com tag `⚡ URGENTE`
- Urgentes entram nas posições 1 e 2 (máximo 2 urgentes por semana)

**Passo 2 — Adicionar injeções manuais**
- Todos os itens do pool com tag `injeção-manual` entram como candidatos
- Prioridade: logo após urgentes, antes de qualquer item do monitor

**Passo 3 — Completar com monitor**
- Chamar `skills/monitor-legislativo.md` para buscar atualizações recentes
- Adicionar itens de relevância `alta` ao pool de candidatos
- Se ainda faltar vagas: adicionar itens de relevância `média`

**Passo 4 — Aplicar rotação de pilares**
- Contar quantas vezes cada pilar aparece nos candidatos selecionados até agora
- **Regra:** nenhum pilar pode aparecer mais de 2x nos 7 temas finais
- **Regra:** pelo menos 4 pilares distintos devem estar presentes nos 7 temas
- Se um pilar estourar o limite de 2x: substituir pelo próximo candidato de pilar diferente
- Se o pool não tiver pilares suficientes para garantir 4 distintos: incluir temas de pilares ausentes usando o conhecimento base em `knowledge/legislacao/`

**Passo 5 — Atribuir formato recomendado**
Por pilar editorial:

| Pilar | Formato recomendado | Justificativa |
|-------|---------------------|---------------|
| 1 — Reforma Tributária | carrossel 6-10 slides | Complexidade exige sequência |
| 2 — Educação Fiscal PF | carrossel 4-6 slides ou reel | Informação relevante para pessoa física |
| 3 — Educação Fiscal PJ | carrossel 6-8 slides | Empresário precisa de detalhe |
| 4 — Consciência Financeira | reel curto 15-30s ou feed | Impacto imediato, mensagem simples |
| 5 — Autoridade/Humanização | reel de Maria Clara | Presença e conexão humana |
| 6 — Formatos Recorrentes | feed ou stories | Leve, rápido, recorrente |

**Urgentes:** sempre carrossel ou feed simples (facilidade de consumo quando há urgência de prazo)

**Passo 6 — Gerar justificativa**
Cada tema precisa de uma justificativa objetiva: por que esse tema, por que essa semana?

Modelos de justificativa:
- Urgência: `"vencimento em [N] dias — público MEI/PJ precisa agir agora"`
- Injeção manual: `"novidade legislativa injetada por Gustavo — alta relevância editorial"`
- Monitor: `"aprovado/publicado em [data] — impacto direto no público @verbumcontabilidade"`
- Rotação: `"pilar [N] ausente nos últimos posts — equilíbrio editorial"`

### Formato de saída

```
📅 PAUTA DA SEMANA — [data início] a [data fim]

1. ⚡ URGENTE — [Título do tema]
   Pilar: [N] · [nome do pilar] | Formato: [carrossel/reel/feed/stories]
   Por que agora: [justificativa]

2. [Título do tema]
   Pilar: [N] · [nome do pilar] | Formato: [carrossel/reel/feed/stories]
   Por que agora: [justificativa]

3. [Título do tema]
   Pilar: [N] · [nome do pilar] | Formato: [carrossel/reel/feed/stories]
   Por que agora: [justificativa]

4. [Título do tema]
   Pilar: [N] · [nome do pilar] | Formato: [carrossel/reel/feed/stories]
   Por que agora: [justificativa]

5. [Título do tema]
   Pilar: [N] · [nome do pilar] | Formato: [carrossel/reel/feed/stories]
   Por que agora: [justificativa]

6. [Título do tema]
   Pilar: [N] · [nome do pilar] | Formato: [carrossel/reel/feed/stories]
   Por que agora: [justificativa]

7. [Título do tema]
   Pilar: [N] · [nome do pilar] | Formato: [carrossel/reel/feed/stories]
   Por que agora: [justificativa]

---
Para usar um tema: [perfil] · [formato] · [título do tema]
Exemplo: verbum · carrossel · [Título do tema 1]
```

---

## Exemplos

### Exemplo A — Semana com urgência (data simulada: 09/06/2026)

Contexto: DAS-MEI vence em 20/06 (11 dias), FGTS Digital vence em 20/06 (11 dias, fora da janela de urgência), 1 injeção manual de Gustavo (Pilar 1), monitor retornou 3 itens de relevância alta.

```
📅 PAUTA DA SEMANA — 09/06/2026 a 15/06/2026

1. IBS e a pequena empresa: o que muda antes de 2027 [injeção manual]
   Pilar: 1 · Reforma Tributária | Formato: carrossel
   Por que agora: novidade legislativa injetada por Gustavo — alta relevância editorial

2. Simples Nacional 2026: os limites de faturamento que você precisa saber
   Pilar: 3 · Educação Fiscal PJ | Formato: carrossel
   Por que agora: tema recorrente de alto interesse para MEI e ME

3. Você sabe o que é Fator R e quando ele te favorece?
   Pilar: 3 · Educação Fiscal PJ | Formato: reel
   Por que agora: dúvida frequente, pilar 3 com espaço para segunda aparição

4. Reserva de emergência para autônomo — quanto guardar?
   Pilar: 4 · Consciência Financeira | Formato: reel
   Por que agora: equilíbrio editorial — pilar 4 ausente na semana anterior

5. REINF na prática: quem é obrigado e o que declarar
   Pilar: 6 · Formatos Recorrentes | Formato: feed
   Por que agora: obrigação acessória de alto impacto, relevância alta no monitor

6. Por dentro do escritório da Verbum
   Pilar: 5 · Autoridade/Humanização | Formato: reel
   Por que agora: pilar 5 ausente na semana — humanização e conexão

7. Declaração do IRPF: o que mudou para quem tem renda no exterior
   Pilar: 2 · Educação Fiscal PF | Formato: carrossel
   Por que agora: relevância alta no monitor — IN recente da Receita Federal

---
Para usar um tema: verbum · [formato] · [título do tema]
Exemplo: verbum · carrossel · IBS e a pequena empresa: o que muda antes de 2027
```

Distribuição de pilares: 1×, 2×, 3×, 3×, 4×, 5×, 6× (pilares 3 e 6 aparecem 2x cada — dentro do limite)

### Exemplo B — Semana sem urgência, sem injeções manuais

Contexto: sem vencimentos próximos, sem injeções manuais, monitor retornou 5 itens de relevância mista.

```
📅 PAUTA DA SEMANA — 16/06/2026 a 22/06/2026

1. Exclusão do Simples Nacional: as 3 situações mais comuns
   Pilar: 3 · Educação Fiscal PJ | Formato: carrossel
   Por que agora: relevância alta no monitor — alerta publicado pela Receita Federal

2. O que é cashback tributário e quem vai receber?
   Pilar: 1 · Reforma Tributária | Formato: reel
   Por que agora: tema novo na LC 214/2024, público PF quer entender

3. Planejamento tributário não é sonegação — e esse é o ponto
   Pilar: 4 · Consciência Financeira | Formato: feed
   Por que agora: confusão frequente, alto potencial de engajamento

4. Pró-labore: quanto pagar para não pagar mais imposto do que precisa
   Pilar: 3 · Educação Fiscal PJ | Formato: carrossel
   Por que agora: segunda aparição do pilar 3 — tema estratégico para sócios

5. A verdade sobre o eSocial doméstico em 2026
   Pilar: 6 · Formatos Recorrentes | Formato: feed
   Por que agora: relevância média no monitor — dúvida recorrente

6. Como a Maria Clara explica o Lucro Presumido em 60 segundos
   Pilar: 5 · Autoridade/Humanização | Formato: reel
   Por que agora: pilar 5 é âncora de humanização — prioridade a cada ciclo

7. IRPF 2026: o que os dependentes têm a ver com a sua restituição
   Pilar: 2 · Educação Fiscal PF | Formato: carrossel
   Por que agora: pilar 2 ausente na semana — equilíbrio editorial

---
Para usar um tema: verbum · [formato] · [título do tema]
```

---

## Regras invioláveis

1. Nenhum pilar repete mais de 2x nos 7 temas finais
2. Pelo menos 4 pilares distintos devem estar presentes
3. Urgência fiscal (≤ 7 dias) sempre ocupa posição 1 ou 2 — nunca abaixo da 3ª posição
4. Injeção manual do Gustavo é sempre prioridade sobre itens do monitor
5. Pool de temas é temporário — não inventar temas sem fonte (monitor ou injeção manual)
6. Formato de saída é fixo — não alterar estrutura para o CEO Master interpretar corretamente
