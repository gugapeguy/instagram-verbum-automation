# Epic 02 — Pipeline de Conteúdo 5x/Semana
**Status:** Ready for story creation
**Prioridade:** P0 — Depende de E1 operacional
**PRD:** [docs/prd/verbum-instagram-prd-v2.md](../../../prd/verbum-instagram-prd-v2.md)
**Criado por:** Morgan (PM)
**Data:** 2026-06-09
**Dependência:** Epic 01 (Motor de Inteligência Legislativa) concluído

---

## Objetivo do Épico

Operacionalizar o fluxo de geração de conteúdo para o @verbumcontabilidade com frequência de 5 posts/semana, usando inteligência legislativa do Épico 1, com voz autêntica de Maria Clara, passando pelo humanizer, e entregando o pacote de aprovação formatado em < 5 minutos após o comando de Gustavo.

---

## Contexto do Sistema Existente

- **Organizacional:** CLAUDE.md define a hierarquia CEO Master → CEO Conteúdo → CEO Criativo
- **Brand guide:** `branding/brand-guide.md` — tom, pilares, restrições, Maria Clara
- **Humanizer:** `skills/humanizer.md` — obrigatório para todo copy
- **Roteiro existente:** `roteiros/01-apresentacao-maria-clara.md` — referência de voz de Maria Clara
- **Template existente:** `templates/post-01-apresentacao-marca.md` — referência de formato
- **Dependência:** `knowledge/legislacao/` (Épico 1, Story 1.1) + monitor (Story 1.2)

---

## Voz de Maria Clara (Referência Obrigatória)

O copy deve soar como Maria Clara fala no roteiro de apresentação:
- Direta, acolhedora, sem juridiquês
- Usa "você" — fala com o empreendedor como igual
- Nunca promete resultados específicos ou dá orientação categórica
- Sempre convida à análise personalizada: "cada situação tem particularidades"
- Didática: explica o complexo de forma simples
- Nunca fria, nunca burocrática

---

## Stories Propostas

### Story 2.1 — Skill de Domínio Contábil
**Executor:** @dev
**Quality Gate:** @architect
**Descrição:** Criar skill `skills/dominio-contabil.md` com contexto especializado para injeção no CEO Conteúdo: glossário fiscal essencial, regras de comunicação contábil, restrições legais de conteúdo, formatos de post por pilar.

**ACs principais:**
- Arquivo `skills/dominio-contabil.md` criado e documentado
- Glossário com 30+ termos fiscais/contábeis com explicação para leigo
- Regras de comunicação: o que pode e não pode dizer (brand guide Seção 8)
- Formatos recomendados por pilar editorial (carrossel, feed, stories)
- Exemplos de tom: versão "burocrática" vs versão "Maria Clara"

---

### Story 2.2 — CEO Conteúdo Atualizado com Domínio Legislativo
**Executor:** @dev
**Quality Gate:** @architect
**Descrição:** Atualizar o CLAUDE.md e o fluxo do CEO Conteúdo para consumir: (a) contexto de domínio contábil da Story 2.1, (b) atualizações legislativas do Épico 1, (c) pilar editorial e formato do comando de entrada. Entrega: copy completo + hashtags + primeiro comentário sugerido.

**ACs principais:**
- CEO Conteúdo recebe o tema via comando `[perfil] · [tipo] · [tema]`
- CEO Conteúdo consulta `knowledge/legislacao/` e skill de domínio antes de gerar
- Copy gerado na voz de Maria Clara (primeira pessoa, didático)
- Legenda completa: abertura de impacto + desenvolvimento + CTA
- Bloco de hashtags: 5 específicas + 5 médias + 5 amplas
- Primeiro comentário sugerido (para engajamento)
- Todo copy passa obrigatoriamente pelo skill humanizer

---

### Story 2.3 — Calendário Editorial e Agenda Fiscal Automatizada
**Executor:** @dev
**Quality Gate:** @architect
**Descrição:** Criar sistema de calendário editorial que (a) planeja a semana com base nos 6 pilares editoriais em rotação, (b) insere automaticamente alertas de datas fiscais obrigatórias, (c) sugere o próximo tema a postar com base no que já foi publicado.

**ACs principais:**
- Arquivo `knowledge/calendario-fiscal-2026.md` com todas as datas obrigatórias do ano
- Sistema de rotação de pilares: garante diversidade sem repetição excessiva
- Alerta automático: datas fiscais com prazo < 7 dias entram automaticamente na pauta
- Sugestão de próximo tema considera: pilares em atraso, datas próximas, novidades legislativas
- Output: lista ordenada de próximos 5 posts com pilar, formato e justificativa

---

### Story 2.4 — Pacote de Aprovação (Formato Canônico)
**Executor:** @dev
**Quality Gate:** @architect
**Descrição:** Implementar o pacote de aprovação no formato exato definido no CLAUDE.md — garantindo que CEO Master sempre entregue o mesmo layout estruturado a Gustavo, com copy, hashtags, Design A (HTML), Design B (prompt Canva) e instruções de aprovação.

**ACs principais:**
- Formato exato conforme CLAUDE.md e spec `2026-06-08-reestruturacao-organizacional-design.md`
- Seção COPY com legenda completa humanizada
- Seção HASHTAGS com bloco formatado
- Seção DESIGN A: referência ao HTML gerado pelo CEO Criativo
- Seção DESIGN B: prompt completo para Canva manual
- Instrução de aprovação: `aprovado · [horário] · [A ou B]`
- Tempo total do comando ao pacote: < 5 minutos

---

## Critérios de Aceite do Épico

- [ ] Comando `verbum · carrossel · [tema]` gera pacote completo em < 5 min
- [ ] Copy rastreável a fonte legislativa real (E1)
- [ ] Voz de Maria Clara consistente em todos os posts
- [ ] Humanizer aplicado em 100% dos copies
- [ ] Calendário sugere rotação correta pelos 6 pilares
- [ ] Datas fiscais com prazo < 7 dias aparecem automaticamente na pauta
- [ ] Pacote de aprovação segue formato canônico sem desvios

---

## Riscos e Mitigação

| Risco | Mitigação |
|---|---|
| Copy soa genérico/robótico | Skill de domínio + humanizer obrigatório |
| Conteúdo tributário impreciso | Rastreabilidade obrigatória a fonte real do E1 |
| Épico 1 incompleto | Dependency gate: Story 2.2 só inicia após E1-Story 1.2 Done |
| Pilar 5 (autoridade) difícil sem Gustavo visível | Maria Clara assume humanização — roteiros de bastidores são dela |

---

## Handoff para @sm

**Tecnologia:** Node.js, Markdown, skills AIOX, humanizer
**Padrões existentes:** `skills/humanizer.md`, `branding/brand-guide.md`, `roteiros/01-apresentacao-maria-clara.md`
**Dependência hard:** Épico 1, Story 1.2 concluída antes de Story 2.2
**Sequência das stories:** 2.1 pode iniciar imediatamente. 2.2 depende de 2.1 + E1-1.2. 2.3 pode ser paralela a 2.2. 2.4 depende de 2.2 e 2.3.

"River, as stories deste épico têm dependências parciais: 2.1 e 2.3 podem iniciar em paralelo. 2.2 depende de 2.1 e do Épico 1. 2.4 depende de 2.2 e 2.3. O executor padrão é @dev para todas. Use o PRD em `docs/prd/verbum-instagram-prd-v2.md` Épico 2 como referência de requisitos. A voz de Maria Clara em `roteiros/01-apresentacao-maria-clara.md` é a referência de tom para todo copy gerado."
