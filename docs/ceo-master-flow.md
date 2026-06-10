# CEO Master — Fluxo de Orquestração

**Versão:** 1.0  
**Agente:** CEO Master  
**Acionado por:** Gustavo  
**Orquestra:** CEO Conteúdo · CEO Criativo · CEO Operações  
**Formato canônico:** definido no `CLAUDE.md` da raiz do projeto (seção "Pacote de Aprovação")

---

## Princípio fundamental

O CEO Master tem uma única responsabilidade perante Gustavo: entregar o pacote de aprovação completo no formato canônico. Gustavo responde uma vez. A organização executa.

**Gustavo nunca recebe problema — só resultado.**

---

## Acionamento

Gustavo envia o brief no formato:

```
[perfil] · [tipo] · [tema]
```

Exemplos:
```
verbum · carrossel · IBS e o impacto no Simples Nacional
verbum · reel · prazo da DIRF 2026 se aproxima
verbum · feed · FGTS Digital — o que mudou?
```

Ao receber o comando, o CEO Master inicia o fluxo completo sem fazer perguntas.

---

## Fluxo de orquestração (5 passos)

```
1. Receber comando: [perfil] · [tipo] · [tema]
2. Chamar CEO Conteúdo → aguardar: copy humanizado + hashtags 5+5+5 + primeiro comentário
3. Chamar CEO Criativo → aguardar: Design A (HTML/CSS) + Design B (prompt Canva manual)
4. Montar pacote no formato canônico (seção abaixo)
5. Entregar pacote ao Gustavo — aguardar aprovação
```

Os passos 2 e 3 são independentes e podem correr em paralelo quando o contexto permitir.

---

## Formato canônico (reproduzir EXATAMENTE)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTREGA — @verbumcontabilidade
[tipo] · [pilar] · [data sugerida]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COPY
[legenda completa]

HASHTAGS
[bloco de hashtags]

DESIGN A — HTML/CSS
[thumbnail descritivo] · [arquivo: criatives/[nome].html]
Status: ✅ pronto / ⚠️ revisar

DESIGN B — Prompt para Canva manual
[prompt completo]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Para aprovar: aprovado · [horário] · [A ou B]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Nota sobre o label Design A:** O CLAUDE.md original usa "DESIGN A — Canva MCP", mas a Regra 10 do CLAUDE.md da raiz determina que o CEO Criativo usa HTML/CSS via Claude como ferramenta principal. O label correto é "DESIGN A — HTML/CSS".

**Qualquer desvio do formato é um bug, não uma variação.**

---

## Regras de preenchimento por seção

### Cabeçalho

| Campo | Como preencher |
|-------|---------------|
| `[tipo]` | carrossel / reel / feed / stories |
| `[pilar]` | nome do pilar editorial (ex: Reforma Tributária) |
| `[data sugerida]` | data de publicação recomendada pelo calendário editorial, formato DD/MM |

### COPY

- Legenda completa pós-humanizer: abertura + desenvolvimento + CTA
- Pronta para copiar e colar — sem marcações técnicas, sem labels de seção
- Inclui emojis naturais ao tom de Maria Clara (sem exagero)
- Total ≤ 2.200 caracteres

### HASHTAGS

- 15 hashtags em bloco contínuo (5 específicas + 5 médias + 5 amplas)
- Sem numeração, sem separadores entre grupos — bloco único para facilitar o copy-paste

### DESIGN A — HTML/CSS

- **Thumbnail descritivo:** descreve visualmente o slide principal (ex: "Slide 1: fundo navy #0D1B3E, título 'O que é o IBS?' em gold Cormorant Garamond, logo Verbum inferior direito")
- **Arquivo:** path relativo para o HTML gerado pelo CEO Criativo em `criatives/`
- **Status:** `✅ pronto` se o HTML foi gerado sem erros · `⚠️ revisar` se há ponto de atenção

### DESIGN B — Prompt para Canva manual

Prompt completo e autocontido. Quem usar este prompt no Canva não precisa de informação adicional. Inclui obrigatoriamente:

```
Dimensões: 1080x1080px (feed/carrossel) ou 1080x1920px (stories/reel)
Total de slides: [N]

Paleta:
- Navy escuro: #081530
- Navy principal: #0D1B3E
- Gold: #C9A84C
- Branco: #FFFFFF
- Creme: #F2EDE3

Tipografia:
- Títulos: Cormorant Garamond 700
- Corpo: Outfit 300/400

Slide 1 — Capa:
  Fundo: Navy #0D1B3E
  Título: "[texto]" — Cormorant Garamond 700, Gold #C9A84C, centralizado, 48-56px
  Subtítulo (opcional): "[texto]" — Outfit 300, branco, 20px
  Logo Verbum: [posição — contexto define]

[Slide 2, 3... por slide]

Último slide — CTA:
  Fundo: Navy ou Gold dependendo do impacto desejado
  Texto: "[CTA do post]"
  @verbumcontabilidade — Outfit 400, branco
  Logo Verbum: [posição]
```

---

## Gate de aprovação — CEO Operações

### Resposta válida de Gustavo

```
aprovado · [horário] · [A ou B]
```

Exemplos válidos:
```
aprovado · 09:00 · A
aprovado · 18h30 · B
aprovado · amanhã 8h · A
```

### Resposta inválida (CEO Operações solicita confirmação)

| Exemplo inválido | Motivo |
|-----------------|--------|
| `aprovado` | Faltam horário e escolha de design |
| `ok` | Não segue o formato canônico |
| `pode publicar` | Faltam horário e escolha de design |
| `aprovado · A` | Falta horário de publicação |
| `aprovado · 09:00` | Falta escolha do design (A ou B) |

**Ao receber resposta inválida, o CEO Master responde:**
```
Para confirmar a publicação, preciso de:
aprovado · [horário] · [A ou B]

Exemplo: aprovado · 09:00 · A
```

**CEO Operações NUNCA executa a publicação sem aprovação válida.** Este é um gate inviolável.

### Após aprovação válida

1. CEO Master registra a aprovação no log
2. CEO Master passa para CEO Operações:
   - Copy da legenda (aprovada)
   - Hashtags
   - Design escolhido (A ou B)
   - Horário de publicação
   - Primeiro comentário
3. CEO Operações exporta e publica via Meta Graph API
4. CEO Operações registra publicação como `publicado` no log

---

## Log de publicações — `logs/publicacoes.json`

### Schema por entrada

```json
{
  "data_comando": "ISO 8601 — quando Gustavo enviou o brief",
  "tema": "tema exato do brief",
  "pilar": "número do pilar (1-6)",
  "formato": "carrossel | reel | feed | stories",
  "status": "aguardando_aprovacao | aprovado | publicado | erro",
  "aprovado_em": "ISO 8601 ou null",
  "design_escolhido": "A | B | null",
  "publicado_em": "ISO 8601 ou null",
  "horario_agendado": "HH:MM ou descrição como 'amanhã 8h' ou null"
}
```

### Atualização do log

| Evento | Status no log |
|--------|--------------|
| CEO Master entrega pacote | `aguardando_aprovacao` |
| Gustavo responde com aprovação válida | `aprovado` |
| CEO Operações publica com sucesso | `publicado` |
| Erro na publicação | `erro` |

O log é append-only — nunca editar entradas existentes, sempre adicionar nova entrada.

---

## Exemplos de pacote canônico

### Exemplo 1 — `verbum · carrossel · IBS e o impacto no Simples Nacional`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTREGA — @verbumcontabilidade
carrossel · Reforma Tributária · 10/06
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COPY
O IBS entra em vigor em 2026. Para quem está no Simples Nacional, o impacto é menor do que parece, mas entender o porquê faz toda a diferença.

A Reforma Tributária criou o IBS para substituir o ICMS e o ISS. No papel é mais simples. Na prática, a transição vai durar 10 anos, com ajustes graduais entre 2026 e 2033.

Se você está no Simples Nacional, a LC 214/2024 preservou o regime simplificado. O que muda de forma mais imediata é a mecânica dos créditos tributários entre empresas. Quando você vende para um cliente no Lucro Real, por exemplo, ele não consegue aproveitar crédito de IBS sobre a sua nota, porque o Simples tem um tratamento separado.

Isso pode afetar negociações e precificação. Não é alarme, mas é algo que vale conversar com seu contador antes de renovar contratos com clientes empresariais.

A virada mais expressiva começa em 2027. Mas quem se prepara agora sai na frente.

Quer entender como isso afeta o seu enquadramento? Me conta o seu segmento de atuação aqui nos comentários 👇

HASHTAGS
#reformatributaria #ibs #simplesnacional #lc2142024 #impostosbrasileiros #mei #contabilidade #impostos #empreendedorismo #gestaofinanceira #dinheiro #financas #negocios #empreender #brasil

DESIGN A — HTML/CSS
Slide 1: fundo navy #0D1B3E, título "O IBS e o Simples Nacional" em gold Cormorant Garamond 700, subtítulo "O que muda para você" em Outfit branco, logo Verbum · criatives/ibs-simples-nacional.html
Status: ✅ pronto

DESIGN B — Prompt para Canva manual
Dimensões: 1080x1080px | Total: 6 slides

Paleta: Navy #0D1B3E (fundo), Gold #C9A84C (títulos/destaque), Branco #FFFFFF (corpo)
Tipografia: Cormorant Garamond 700 para títulos, Outfit 300 para corpo

Slide 1 — Capa:
  Fundo: Navy #0D1B3E
  Título: "O IBS e o Simples Nacional" — Cormorant Garamond 700, Gold #C9A84C, centralizado, 52px
  Subtítulo: "O que muda para você em 2026" — Outfit 300, branco, 20px
  Logo Verbum: canto inferior direito, variante clara

Slide 2 — O que é o IBS:
  Fundo: Navy #0D1B3E
  Título em gold: "O que é o IBS?"
  Corpo em branco Outfit 300: "O Imposto sobre Bens e Serviços substitui o ICMS e o ISS a partir de 2026. A ideia é simplificar — um imposto no lugar de dois."

Slide 3 — E o Simples Nacional?:
  Fundo: Navy #0D1B3E
  Título em gold: "E o Simples Nacional?"
  Corpo: "O regime simplificado foi preservado pela LC 214/2024. A transição tem ritmo diferente para quem está no Simples."

Slide 4 — O que muda na prática:
  Fundo: Navy #0D1B3E
  Título em gold: "O que muda na prática"
  Corpo: "Clientes no Lucro Real não aproveitam crédito de IBS sobre suas notas. Isso pode impactar precificação e negociações."

Slide 5 — Quando começa:
  Fundo: Navy #0D1B3E com linha gold no topo
  Título em gold: "Quando começa de verdade?"
  Corpo: "A virada principal é em 2027. Mas o momento de se preparar é agora."

Slide 6 — CTA:
  Fundo: Gold #C9A84C
  Texto em navy: "Me conta o seu segmento nos comentários"
  Subtexto em navy: "@verbumcontabilidade"
  Logo Verbum: canto inferior direito, variante escura

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Para aprovar: aprovado · [horário] · [A ou B]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Exemplo 2 — `verbum · reel · prazo da DIRF 2026 se aproxima`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTREGA — @verbumcontabilidade
reel · Formatos Recorrentes · 11/06
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COPY
DIRF 2026: prazo final em 28 de fevereiro. Quem contratou autônomo ou paga pró-labore para sócios está obrigado.

A DIRF é a Declaração do Imposto de Renda Retido na Fonte. Se a sua empresa pagou rendimentos com retenção de IR em 2025, precisou entregar até 28/02/2026.

As situações mais comuns que obrigam: pagamento a profissionais autônomos com retenção, pró-labore de sócios com IR descontado, serviços sujeitos ao IR na fonte como rendimentos financeiros.

A multa por atraso começa em R$ 200 por mês para empresas inativas. Para as ativas, é 2% ao mês sobre o imposto declarado, com mínimo de R$ 500.

Se ainda não entregou, o quanto antes melhor. A multa não para de crescer.

Fala comigo aqui ou no WhatsApp. A gente resolve 👆

HASHTAGS
#dirf2026 #declaracaoirrenda #receitafederal #obrigacoesacessorias #calendariofiscal #contabilidade #impostos #pj #autonomo #empreendedorismo #dinheiro #financas #negocios #brasil #trabalho

DESIGN A — HTML/CSS
Slide único (reel): fundo navy, título "DIRF 2026" em gold grande, prazo "28/02" em destaque, ícone de calendário · criatives/dirf-2026-prazo.html
Status: ✅ pronto

DESIGN B — Prompt para Canva manual
Dimensões: 1080x1920px (formato reel/stories vertical)

Paleta: Navy #0D1B3E (fundo), Gold #C9A84C (destaque), Branco #FFFFFF (texto)
Tipografia: Cormorant Garamond 700 para título, Outfit 400 para corpo

Frame único (reel estático / thumbnail):
  Fundo: Navy #0D1B3E
  Título grande centralizado: "DIRF 2026" — Cormorant Garamond 700, Gold #C9A84C, 80px
  Subtítulo: "Prazo: 28 de fevereiro" — Outfit 400, branco, 28px
  Linha decorativa gold horizontal separando título e corpo
  Texto corpo: "Quem contratou autônomo ou tem pró-labore de sócios está obrigado." — Outfit 300, branco, 18px, largura máxima 80% do frame
  Rodapé: "Entenda mais no post completo 👆" — Outfit 400, branco, 16px
  Logo Verbum: canto inferior direito, variante clara
  Elemento visual opcional: ícone de calendário ou relógio em gold no canto superior esquerdo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Para aprovar: aprovado · [horário] · [A ou B]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Checklist de conformidade (uso interno do CEO Master)

Antes de entregar o pacote ao Gustavo, verificar:

- [ ] Separadores `━━━` presentes no topo, antes do rodapé e no rodapé
- [ ] Cabeçalho: ENTREGA — @verbumcontabilidade com tipo · pilar · data
- [ ] Seção COPY: legenda sem labels internos (sem "[ABERTURA]", "[CTA]")
- [ ] Seção HASHTAGS: 15 hashtags em bloco único sem separadores de grupo
- [ ] Seção DESIGN A: thumbnail descritivo + path do arquivo + status ✅/⚠️
- [ ] Seção DESIGN B: prompt completo slide por slide, dimensões informadas
- [ ] Instrução de aprovação: exatamente `Para aprovar: aprovado · [horário] · [A ou B]`
- [ ] Log atualizado com status `aguardando_aprovacao`
