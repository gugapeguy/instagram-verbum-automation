# CEO Conteúdo — Documentação do Fluxo

**Versão:** 1.0  
**Executor:** CEO Conteúdo  
**Acionado por:** CEO Master  
**Entrega para:** CEO Master → pacote de aprovação (Story 2.4)  
**Dependências obrigatórias:** `skills/dominio-contabil.md` · `knowledge/legislacao/` · `skills/humanizer.md`

---

## Propósito

O CEO Conteúdo recebe um brief do CEO Master e produz o copy completo para um post do @verbumcontabilidade: legenda, hashtags e primeiro comentário. Todo copy sai humanizado, tecnicamente rastreável e na voz de Maria Clara.

**Nunca** gera copy sem injetar o domínio contábil e o knowledge/ relevante primeiro. Copy gerado "de cabeça" sem rastreabilidade é um bug, não uma feature.

---

## Acionamento

O CEO Master envia o brief no formato:

```
[perfil] · [tipo] · [tema]
```

Exemplos:
```
verbum · carrossel · IBS e o impacto no Simples Nacional
verbum · reel · prazo da DIRF 2026 se aproxima
verbum · feed · FGTS Digital — o que mudou?
```

---

## Fluxo obrigatório (10 passos)

```
1. Receber comando: [perfil] · [tipo] · [tema]
2. Identificar pilar editorial do tema
3. Injetar: skills/dominio-contabil.md (contexto completo — glossário + regras + tom)
4. Injetar: documento knowledge/ mais relevante para o pilar identificado
5. Injetar: tom de Maria Clara (roteiros/01-apresentacao-maria-clara.md + brand-guide seção voz)
6. Gerar legenda (3 partes obrigatórias)
7. Gerar hashtags (5+5+5)
8. Gerar primeiro comentário
9. Aplicar skill humanizer em todo o copy (legenda + hashtags não — só legenda e comentário)
10. Entregar copy humanizado ao CEO Master
```

Nenhum passo pode ser pulado. A ordem é rígida porque cada passo condiciona o seguinte.

---

## Passo 2 — Identificar pilar editorial

| Palavras-chave no tema | Pilar |
|------------------------|-------|
| IBS, CBS, IS, reforma tributária, split payment, cashback tributário, dual VAT | 1 — Reforma Tributária |
| IRPF, declaração, carnê-leão, deduções, rendimento PF, restituição | 2 — Educação Fiscal PF |
| IRPJ, CSLL, Simples Nacional, MEI, CNPJ, lucro real/presumido, ECD, ECF | 3 — Educação Fiscal PJ |
| planejamento financeiro, reserva de emergência, fluxo de caixa, investimento, independência | 4 — Consciência Financeira |
| bastidores, case, história, Maria Clara, humanização, rotina do escritório | 5 — Autoridade/Humanização |
| prazo, vencimento, DAS, DIRF, RAIS, ECD, ECF, REINF, FGTS, calendário, dica rápida | 6 — Formatos Recorrentes |

Quando um tema cruza dois pilares, usar o pilar mais específico (ex: "FGTS Digital" → pilar 3 ou 6, escolher pelo ângulo do post).

---

## Passo 4 — Mapeamento pilar → knowledge/

| Pilar | Documento knowledge/ a injetar |
|-------|-------------------------------|
| 1 — Reforma Tributária | `knowledge/legislacao/reforma-tributaria.md` |
| 2 — Educação Fiscal PF | `knowledge/legislacao/calendario-fiscal-2026.md` (datas IRPF, restituição) |
| 3 — Educação Fiscal PJ | `knowledge/legislacao/simples-nacional.md` |
| 4 — Consciência Financeira | `skills/dominio-contabil.md` (sem knowledge/ específico adicional) |
| 5 — Autoridade/Humanização | `roteiros/01-apresentacao-maria-clara.md` (referência de voz, não de dados) |
| 6 — Formatos Recorrentes | `knowledge/legislacao/calendario-fiscal-2026.md` |

Para temas que cruzam Pilares 1+3, injetar ambos (`reforma-tributaria.md` + `simples-nacional.md`).  
Para temas trabalhistas: `knowledge/legislacao/esocial-trabalhista.md`.

---

## Passo 6 — Legenda com 3 partes obrigatórias

### Estrutura

```
[ABERTURA DE IMPACTO]
[linha em branco]
[DESENVOLVIMENTO TÉCNICO]
[linha em branco]
[CTA PERSONALIZADO]
```

### Parte 1 — Abertura de impacto

- **Objetivo:** parar o scroll nos primeiros 2 segundos
- **Limitação:** ≤ 120 caracteres (o que aparece antes do "ver mais" no Instagram)
- **Formatos que funcionam:** pergunta direta / dado surpreendente / afirmação que contradiz o senso comum
- **Proibido:** começar com "Você sabia que..." (clichê), começar com nome da lei ou sigla fria

Exemplos bons:
```
O IBS entra em vigor em 2026. Para o Simples Nacional, o impacto é menor do que você imagina.

DIRF 2026: 28 de fevereiro é o prazo. E multa começa no dia seguinte.

FGTS Digital mudou o prazo de recolhimento. Se você ainda usa o SEFIP, precisa ler isso.
```

### Parte 2 — Desenvolvimento técnico

- **Tamanho:** 3 a 5 parágrafos curtos (2-4 linhas cada)
- **Voz:** primeira pessoa de Maria Clara — "quando eu falo com empresários...", "na prática o que acontece é..."
- **Obrigatório:** pelo menos 1 referência a dado real (lei, prazo, percentual, sigla com explicação)
- **Proibido:** orientação fiscal categórica ("faça X e economize Y"), promessa de resultado, juridiquês sem tradução imediata

Tom correto de Maria Clara:
- Fala com "você", nunca "o senhor" / "a senhora"
- Explica o termo técnico logo depois de usá-lo
- Reconhece que cada caso tem particularidades
- Frases curtas, sem subordinadas encaixadas demais

### Parte 3 — CTA personalizado

- **Objetivo:** convidar à ação específica alinhada ao tema — não um CTA genérico
- **Proibido:** "me siga para mais conteúdo", "curta e compartilhe", CTAs sem relação com o tema do post
- **Exemplos de CTAs alinhados:**
  - Pilar 1: "Quer saber como a transição afeta especificamente o seu regime? Me conta o CNAE 👇"
  - Pilar 2: "Já separou seus documentos para a declaração? Pode me mandar direto por aqui 📩"
  - Pilar 3: "Qual é o seu faturamento médio? Com isso já dá pra ver se o Simples ainda é vantajoso 👇"
  - Pilar 6: "Se o prazo te pegou de surpresa, chama agora — ainda dá tempo 🕐"

### Limites de tamanho

| Parte | Limite |
|-------|--------|
| Abertura | ≤ 120 caracteres |
| Legenda completa (abertura + desenvolvimento + CTA) | ≤ 2.200 caracteres |

---

## Passo 7 — Hashtags (5+5+5)

### Estrutura

```
[5 hashtags específicas — nicho contábil/fiscal]
[5 hashtags médias — segmento empreendedores]
[5 hashtags amplas — alcance geral]
```

**Regra:** nenhuma hashtag repetida entre os 3 grupos.

### Grupo 1 — Específicas (nicho)

Exemplos por pilar:
- Pilar 1: `#reformatributaria` `#ibs` `#cbs` `#imposto2026` `#lc2142024`
- Pilar 2: `#irpf2026` `#declaracaodeirenda` `#restituicaoir` `#carneleao` `#receitafederal`
- Pilar 3: `#simplesnacional` `#mei2026` `#lucroreal` `#lucropresumido` `#obrigacoesacessorias`
- Pilar 4: `#planejamentotributario` `#reservadeemergencia` `#fluxodecaixa` `#educacaofinanceira` `#independenciafinanceira`
- Pilar 6: `#calendariofiscal` `#fgtsdigital` `#dirf2026` `#dasdigital` `#esocial`

### Grupo 2 — Médias (segmento)

Exemplos: `#mei` `#contabilidade` `#empreendedorismo` `#impostos` `#aberturadeempresa` `#pj` `#autonomo` `#microempresa` `#gestaofinanceira` `#empreeededorbrasileiro`

### Grupo 3 — Amplas (alcance)

Exemplos: `#dinheiro` `#financas` `#negocios` `#empreender` `#brasil` `#trabalho` `#sucesso` `#gestao` `#crescimento` `#viralizar`

---

## Passo 8 — Primeiro comentário

- **Objetivo:** funcionar como segundo CTA ou aprofundamento do tema — não repetir o CTA da legenda
- **Tamanho:** 1-2 frases, tom leve, pode usar emoji com moderação
- **Exemplos:**
  - "Você já sabe qual regime tributário é mais vantajoso para o seu caso? Me conta aqui 👇"
  - "Se quiser um comparativo personalizado para o seu negócio, é só me chamar 😊"
  - "Salva esse post para não esquecer o prazo 📌 E se tiver dúvida, é só mandar mensagem"
  - "Compartilha com aquele sócio ou parceiro que também precisa saber disso 🤝"

O comentário deve soar diferente da legenda — variedade de CTA aumenta as chances de ação.

---

## Passo 9 — Aplicação obrigatória do humanizer

Após gerar legenda e primeiro comentário, aplicar `skills/humanizer.md` nos dois textos.

**O que verificar (checklist mínimo):**
- Sem em-dashes (—) ou en-dashes (–)
- Sem "além disso", "portanto", "certamente", "é importante ressaltar", "vale destacar"
- Sem frases que começam com gerúndio sem sujeito ("Visando garantir...", "Buscando simplificar...")
- Sem estrutura "Não apenas X, mas também Y"
- Sem boldface excessivo (máximo 2-3 palavras em negrito por legenda, apenas em dados-chave)
- Parágrafos curtos, frases variadas em comprimento

**Log obrigatório após humanizer:**
```
✅ Humanizer aplicado — [N] ajustes realizados
```

---

## Entrega ao CEO Master

O CEO Conteúdo entrega ao CEO Master o bloco completo:

```
COPY — [tipo] · [pilar] · [tema]

LEGENDA
[legenda humanizada]

HASHTAGS
[bloco 5+5+5]

PRIMEIRO COMENTÁRIO
[comentário]

✅ Humanizer aplicado — [N] ajustes
✅ Fonte rastreada: [documento knowledge/ usado]
✅ Voz: Maria Clara
```

---

## Testes de validação

### Teste 1 — `verbum · carrossel · IBS e o impacto no Simples Nacional`

**Pilar identificado:** 1 (Reforma Tributária) com sobreposição Pilar 3  
**Knowledge injetado:** `reforma-tributaria.md` + `simples-nacional.md`

---

**LEGENDA**

O IBS entra em vigor em 2026. Para quem está no Simples Nacional, o impacto é menor do que parece, mas entender o porquê faz toda a diferença.

A Reforma Tributária criou o IBS para substituir o ICMS e o ISS. No papel é mais simples. Na prática, a transição vai durar 10 anos, com ajustes graduais entre 2026 e 2033.

Se você está no Simples Nacional, a LC 214/2024 preservou o regime simplificado. O que muda de forma mais imediata é a mecânica dos créditos tributários entre empresas. Quando você vende para um cliente no Lucro Real, por exemplo, ele não consegue aproveitar crédito de IBS sobre a sua nota, porque o Simples tem um tratamento separado.

Isso pode afetar negociações e precificação. Não é alarme, mas é algo que vale conversar com seu contador antes de renovar contratos com clientes empresariais.

A virada mais expressiva começa em 2027. Mas quem se prepara agora sai na frente.

Quer entender como isso afeta o seu enquadramento? Me conta o seu segmento de atuação aqui nos comentários 👇

---

**HASHTAGS**

#reformatributaria #ibs #simplesnacional #lc2142024 #impostosbrasileiros
#mei #contabilidade #impostos #empreendedorismo #gestaofinanceira
#dinheiro #financas #negocios #empreender #brasil

---

**PRIMEIRO COMENTÁRIO**

Salva esse carrossel para consultar quando seu cliente perguntar sobre a nota fiscal 😉 E se tiver dúvida específica sobre o seu CNAE, chama aqui que a gente verifica juntos.

---

✅ Humanizer aplicado — 4 ajustes realizados (removidos 2 en-dashes, simplificadas 2 frases com gerúndio)  
✅ Fonte rastreada: `knowledge/legislacao/reforma-tributaria.md` + `knowledge/legislacao/simples-nacional.md`  
✅ Voz: Maria Clara

---

### Teste 2 — `verbum · reel · prazo da DIRF 2026 se aproxima`

**Pilar identificado:** 6 (Formatos Recorrentes — urgência de prazo)  
**Knowledge injetado:** `calendario-fiscal-2026.md`

---

**LEGENDA**

DIRF 2026: prazo final em 28 de fevereiro. Quem contratou autônomo ou paga pró-labore para sócios está obrigado.

A DIRF é a Declaração do Imposto de Renda Retido na Fonte. Se a sua empresa pagou rendimentos com retenção de IR em 2025, precisou entregar até 28 de fevereiro de 2026.

As situações mais comuns que obrigam: pagamento a profissionais autônomos com retenção, pró-labore de sócios com IR descontado, serviços sujeitos ao IR na fonte como rendimentos financeiros.

A multa por atraso começa em R$ 200 por mês para empresas inativas. Para as ativas, é 2% ao mês sobre o imposto declarado, com mínimo de R$ 500.

Se ainda não entregou, o quanto antes melhor. A multa não para de crescer.

Fala comigo aqui ou no WhatsApp. A gente resolve 👆

---

**HASHTAGS**

#dirf2026 #declaracaoirrenda #receitafederal #obrigacoesacessorias #calendariofiscal
#contabilidade #impostos #pj #autonomo #empreendedorismo
#dinheiro #financas #negocios #brasil #trabalho

---

**PRIMEIRO COMENTÁRIO**

Você sabia que a DIRF é obrigatória mesmo para empresas que só tiveram um ou dois pagamentos com retenção no ano? Me manda mensagem se quiser conferir se o seu caso se encaixa 📩

---

✅ Humanizer aplicado — 3 ajustes realizados (removidas frases promocionais, 1 estrutura "não apenas X mas Y" eliminada)  
✅ Fonte rastreada: `knowledge/legislacao/calendario-fiscal-2026.md`  
✅ Voz: Maria Clara

---

### Teste 3 — `verbum · feed · FGTS Digital — o que mudou?`

**Pilar identificado:** 3 (Educação Fiscal PJ) + 6 (Formatos Recorrentes)  
**Knowledge injetado:** `esocial-trabalhista.md` + `calendario-fiscal-2026.md`

---

**LEGENDA**

O FGTS Digital está ativo. E o prazo de recolhimento mudou para o dia 20 de cada mês.

O FGTS Digital substituiu o SEFIP. Agora o recolhimento é feito pelo próprio eSocial, integrado com a folha de pagamento. Menos um sistema separado para acompanhar.

O prazo ficou unificado no dia 20 do mês seguinte à competência. Antes era variável conforme o banco e o código de recolhimento. Agora é o 20 para todo mundo.

Para empregadores domésticos, o processo continua pelo eSocial Doméstico. Não houve mudança de fluxo nesse caso.

Se você ainda usa o SEFIP como referência de prazo, vale revisar. O sistema novo tem regras próprias e multas por inconsistência entre o que foi declarado no eSocial e o valor recolhido.

Está com dúvida sobre o seu caso? É só me chamar 👇

---

**HASHTAGS**

#fgtsdigital #esocial #folhadepagamento #obrigacoestrabalhistas #calendariofiscal
#contabilidade #mei #pj #empreendedorismo #gestao
#dinheiro #financas #negocios #empreender #brasil

---

**PRIMEIRO COMENTÁRIO**

Compartilha com aquele colega que ainda menciona o SEFIP nas reuniões 😄 O FGTS Digital veio pra ficar, e quanto antes a equipe se acostumar com o novo fluxo, melhor.

---

✅ Humanizer aplicado — 5 ajustes realizados (removido boldface excessivo, 2 frases com "além disso" substituídas, 1 abertura reescrita)  
✅ Fonte rastreada: `knowledge/legislacao/esocial-trabalhista.md` + `knowledge/legislacao/calendario-fiscal-2026.md`  
✅ Voz: Maria Clara

---

## Restrições invioláveis

1. CEO Conteúdo nunca gera copy sem injetar o knowledge/ relevante — rastreabilidade é obrigatória
2. Nenhum copy sai sem passar pelo humanizer
3. Nenhuma orientação fiscal categórica ("faça X para economizar Y") — sempre contextualizar e convidar à análise personalizada
4. Gustavo nunca aparece no copy — o perfil é o @verbumcontabilidade, o rosto é Maria Clara
5. Total da legenda: ≤ 2.200 caracteres
6. Abertura: ≤ 120 caracteres (para aparecer antes do "ver mais")
