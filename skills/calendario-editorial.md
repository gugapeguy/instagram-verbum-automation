# Skill de Calendário Editorial — CEO Master / CEO Conteúdo

**Versão:** 1.0
**Criado em:** 2026-06-09
**Atualizado em:** 2026-06-09
**Uso:** Planejar a semana editorial com rotação de pilares e alertas de datas fiscais

---

## Propósito

Esta skill gera sugestões dos próximos 5 posts para o @verbumcontabilidade combinando dois critérios:

1. **Rotação de pilares** — nenhum pilar se repete demais, garantindo diversidade editorial
2. **Urgência fiscal** — datas com prazo ≤ 7 dias entram automaticamente no topo da sugestão

O output desta skill é o input do CEO Conteúdo para gerar copy.

---

## Os 6 Pilares Editoriais

| Pilar | Tema | Frequência semanal sugerida |
|---|---|---|
| **1** | Reforma Tributária | 1x |
| **2** | Educação Fiscal Pessoa Física | 1x |
| **3** | Educação Fiscal Pessoa Jurídica | 1x |
| **4** | Consciência Financeira | 1x |
| **5** | Autoridade, Bastidores e Humanização | 1x (Maria Clara) |
| **6** | Formatos Recorrentes (alertas, agenda, Q&A, data fiscal) | 0–2x (conforme urgências) |

**Nota:** Com 5 posts/semana e 6 pilares, o Pilar 6 aparece quando há urgência fiscal. Nas semanas sem urgência, substitui o pilar com menor histórico recente.

---

## Sequência Base Semanal (padrão sem urgências)

```
Segunda:   Pilar 3 — Educação Fiscal PJ (início de semana = dia de trabalho)
Terça:     Pilar 1 — Reforma Tributária (alto impacto, engaja profissionais)
Quarta:    Pilar 4 — Consciência Financeira (break no meio da semana)
Quinta:    Pilar 2 — Educação Fiscal PF
Sexta:     Pilar 5 — Autoridade/Humanização (Maria Clara, mais leve)
```

Esta sequência é o **ponto de partida**. Urgências e histórico de sessão podem ajustar a ordem.

---

## Regra de Rotação

**Regra absoluta:** Em qualquer janela de 7 posts consecutivos, nenhum pilar pode aparecer mais de **2 vezes**.

### Como aplicar a regra

1. Liste os últimos 6 posts publicados (histórico de sessão ou contexto disponível)
2. Some quantas vezes cada pilar apareceu nos últimos 6 posts
3. Se um pilar já apareceu 2 vezes nos últimos 6 posts, ele NÃO pode aparecer nos próximos 1 post
4. Se um pilar não apareceu nos últimos 6 posts, ele tem PRIORIDADE na próxima sugestão

### Exemplo de rotação válida (14 posts, 2 semanas)

```
Semana 1: [3, 1, 4, 2, 5]
Semana 2: [3, 1, 4, 6, 5]  ← Pilar 2 substituído por Pilar 6 (urgência ou equilíbrio)
```

Qualquer janela de 7 posts nessa sequência: nenhum pilar aparece mais de 2x. ✅

### Exemplo de rotação INVÁLIDA

```
[3, 1, 3, 4, 3, 2, 5]  ← Pilar 3 aparece 3x em 7 posts. ❌
```

---

## Mecanismo de Alerta por Urgência

### Critério de urgência

Um vencimento fiscal é **URGENTE** quando faltam ≤ 7 dias corridos para o prazo.

### Fonte de datas

Consultar `knowledge/calendario-fiscal-2026.md` para todos os vencimentos do ano.

### Como aplicar o alerta

1. Calcule os dias restantes até cada vencimento a partir da **data atual**
2. Se algum vencimento estiver a ≤ 7 dias: crie um item de urgência para o post
3. O item urgente ocupa a **posição 1** (ou posição 2 se houver dois urgentes)
4. O pilar do item urgente é sempre **Pilar 6 — Formatos Recorrentes**, salvo se o tema pertença claramente a outro pilar

### Pilar por tipo de urgência

| Tipo de vencimento | Pilar sugerido |
|---|---|
| DAS-MEI, DAS Simples | Pilar 3 ou Pilar 6 |
| IRPF, DIRF | Pilar 2 ou Pilar 6 |
| FGTS Digital | Pilar 3 ou Pilar 6 |
| Obrigações anuais (ECD, ECF, RAIS) | Pilar 3 ou Pilar 6 |
| DASN-SIMEI | Pilar 3 ou Pilar 6 |
| Prazo de opção (Simples, MEI) | Pilar 3 |

### Regra de não-repetição com urgência

Se a urgência forçar um pilar que já apareceu 2x nos últimos 6 posts, usar **Pilar 6** independente do tema — o alerta é mais importante que a pureza de pilares.

---

## Como Gerar a Sugestão de Próximos 5 Posts

### Entradas necessárias

- **Data atual** (para cálculo de urgências)
- **Histórico de sessão** (pilares dos últimos posts publicados — se disponível)
- Conteúdo de `knowledge/calendario-fiscal-2026.md` (para urgências)

### Passo a passo

**Passo 1 — Verificar urgências**
- Calcule dias restantes para todos os vencimentos do mês atual e do mês seguinte
- Filtre os que estiverem a ≤ 7 dias
- Anote: obrigação, prazo, público (MEI / PJ / PF), pilar

**Passo 2 — Montar sequência de pilares**
- Comece com a sequência base semanal
- Insira urgências nas posições 1 (e 2, se houver duas urgências)
- Deslocar os pilares restantes respeitando a regra de não-repetição (max 2x em 7)
- Se o histórico de sessão mostrar pilar recente, evitar repeti-lo imediatamente

**Passo 3 — Definir temas específicos**
Para cada posição da sugestão, definir um tema **específico** (não genérico):

- ✅ "Como o split payment vai afetar o fluxo de caixa da sua empresa em 2026"
- ✅ "DASN-SIMEI vence em 2 dias: veja como declarar em 5 minutos"
- ❌ "Reforma Tributária" (muito genérico)
- ❌ "Obrigações do MEI" (muito genérico)

**Passo 4 — Justificar cada sugestão**
Cada item da sugestão precisa de uma justificativa de 1 linha explicando por que este post, agora.

---

## Formato de Output (compatível com CEO Conteúdo e Story 1.3)

```
**Sugestão de Próximos 5 Posts — @verbumcontabilidade**
Data de referência: [DD/MM/AAAA]
Histórico de sessão considerado: [pilares recentes, se informados]

---

**Post 1** [⚡ URGENTE — se aplicável]
Pilar: [número e nome]
Formato: [carrossel X slides / reel Xs / feed estático]
Tema: [título específico do post]
Público: [MEI / PJ / PF / todos]
Justificativa: [1 linha explicando a prioridade]

**Post 2**
Pilar: [número e nome]
Formato: [formato recomendado]
Tema: [título específico]
Público: [público principal]
Justificativa: [1 linha]

**Post 3**
[...]

**Post 4**
[...]

**Post 5**
[...]

---
Próximo check de urgências: [data + 1 dia]
```

---

## Exemplos de Sugestão Completa

### Exemplo A — Semana com urgência (data: 13/02/2026)

Vencimento DIRF: 27/02/2026 → faltam 14 dias (não urgente ainda)
Vencimento DAS Jan: 20/02/2026 → faltam 7 dias ← URGENTE

```
**Sugestão de Próximos 5 Posts — @verbumcontabilidade**
Data de referência: 13/02/2026

Post 1 ⚡ URGENTE
Pilar: 3 — Educação Fiscal PJ
Formato: feed estático 1080×1080
Tema: DAS de janeiro vence dia 20 — faltam 7 dias para empresas do Simples
Público: ME, EPP, MEI
Justificativa: Vencimento iminente — audiência precisa do alerta agora

Post 2
Pilar: 1 — Reforma Tributária
Formato: carrossel 6 slides 9:16
Tema: Split payment: o que muda no seu fluxo de caixa a partir de 2026
Público: PJ (todos os regimes)
Justificativa: Rotação — Pilar 1 não apareceu nos últimos 5 posts

Post 3
Pilar: 2 — Educação Fiscal PF
Formato: carrossel 4 slides 9:16
Tema: Declaração do IRPF 2026: o que você precisa separar agora (prazo em abril)
Público: PF
Justificativa: DIRF vence em 27/02 — antecipa a conversa sobre IR pessoa física

Post 4
Pilar: 4 — Consciência Financeira
Formato: reel 30s
Tema: Reserva de emergência para MEI: quanto guardar e onde
Público: MEI
Justificativa: Rotação de pilar + tema de alta relevância para o público

Post 5
Pilar: 5 — Autoridade/Humanização
Formato: reel Maria Clara 45s
Tema: "Por que a maioria das pequenas empresas paga mais imposto do que deveria" — Maria Clara explica
Público: todos
Justificativa: Encerramento de semana com autoridade e humanização da marca
```

---

### Exemplo B — Semana sem urgências (data: 15/07/2026)

```
**Sugestão de Próximos 5 Posts — @verbumcontabilidade**
Data de referência: 15/07/2026
(ECF prazo 31/07 — faltam 16 dias, não urgente ainda)

Post 1
Pilar: 3 — Educação Fiscal PJ
Formato: carrossel 8 slides 9:16
Tema: O que é a ECF e quem precisa entregar até 31 de julho
Público: Lucro Real, Lucro Presumido
Justificativa: ECF vence em 16 dias — antecipa o alerta antes de virar urgência

Post 2
Pilar: 1 — Reforma Tributária
Formato: carrossel 6 slides 9:16
Tema: CBS vai substituir PIS e COFINS — o que muda para prestadores de serviço
Público: PJ
Justificativa: Rotação de pilar de alto impacto

Post 3
Pilar: 4 — Consciência Financeira
Formato: reel 30s
Tema: Fluxo de caixa no segundo semestre: 3 ajustes para fechar o ano no azul
Público: PJ e PF empreendedoras
Justificativa: Meio do ano — momento natural para revisão financeira

Post 4
Pilar: 6 — Formatos Recorrentes
Formato: feed estático 1080×1080
Tema: Agenda fiscal de agosto — vencimentos que você não pode perder
Público: todos
Justificativa: Antecipar o calendário do mês seguinte com 2 semanas de antecedência

Post 5
Pilar: 5 — Autoridade/Humanização
Formato: reel Maria Clara 45s
Tema: Case: como uma ME reduziu a carga tributária ao entender o Fator R
Público: prestadores de serviço no Simples
Justificativa: Encerramento de semana com humanização e prova social
```

---

## Regras de Qualidade das Sugestões

1. **Tema específico sempre** — nada genérico. O CEO Conteúdo não deve precisar perguntar "sobre o quê exatamente?"
2. **Público explícito** — cada post define se é para MEI, PJ, PF ou todos
3. **Formato coerente com o pilar** — consultar tabela de formatos em `skills/dominio-contabil.md`
4. **Justificativa de 1 linha** — por que este post, agora
5. **Urgências na frente** — qualquer vencimento a ≤ 7 dias é Post 1 ou Post 2, sem exceção
6. **Equilíbrio de público** — ao longo de 5 posts, cobrir pelo menos dois perfis diferentes (MEI, PJ, PF)
