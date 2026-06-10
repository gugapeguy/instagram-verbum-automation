# Epic 03 — Design Premium Consistente
**Status:** Ready for story creation
**Prioridade:** P1 — Após E1/E2 operacionais
**PRD:** [docs/prd/verbum-instagram-prd-v2.md](../../../prd/verbum-instagram-prd-v2.md)
**Criado por:** Morgan (PM)
**Data:** 2026-06-09
**Dependência:** Epic 02 (Pipeline de Conteúdo) concluído

---

## Objetivo do Épico

Criar um sistema de geração de criativos visuais de qualidade premium para o @verbumcontabilidade — com templates HTML/CSS parametrizáveis, CEO Criativo documentado e operacional, export para PNG via Playwright e validação automática de brand guide. Resultado: Design A pronto em < 2 minutos, sem Canva, sem intervenção manual de Gustavo.

**Por que é P1:** E1 e E2 entregam o conteúdo. E3 entrega o visual. Sem E3, o pacote de aprovação tem Design B (prompt) mas não tem Design A real. O produto só está completo quando os três estão operacionais.

---

## Contexto do Sistema Existente

- **Templates HTML:** `templates/carrossel-01-apresentacao.html` e `templates/post-01-carrossel.html` existem — ponto de partida, não substituto
- **Brand guide:** `branding/brand-guide.md` — paleta, tipografia, logo, margem de segurança
- **Logos:** `branding/logos/` — variantes clara e escura disponíveis
- **Maria Clara:** avatar definido visualmente no brand guide (30-35 anos, blazer navy, expressão confiante)
- **Pacote de aprovação:** `docs/ceo-master-flow.md` — Design A já tem placeholder estrutural; este épico é quem o preenche de verdade
- **Abordagem:** HTML/CSS via Claude — Canva MCP foi descartado (Regra 10 do CLAUDE.md)

---

## Paleta e Tipografia (referência rápida)

| Token | Valor | Uso |
|-------|-------|-----|
| Navy escuro | `#081530` | Fundo principal profundo |
| Navy principal | `#0D1B3E` | Fundo padrão dos slides |
| Navy médio | `#132860` | Variação de fundo |
| Gold principal | `#C9A84C` | Títulos, destaque, linhas |
| Gold claro | `#E8C97A` | Hover, detalhes secundários |
| Creme | `#F2EDE3` | Fundo de variação clara |
| Branco | `#FFFFFF` | Corpo do texto |

**Tipografia Instagram:**
- Títulos: Cormorant Garamond 700 (serif, elegante, autoridade)
- Corpo: Outfit 300/400 (sans-serif, legível, moderno)

**Margem de segurança:** 80–100px em todos os lados (seguro para Instagram crop)

---

## Stories Propostas

### Story 3.1 — Templates HTML/CSS Base Parametrizáveis
**Executor:** @dev
**Quality Gate:** @architect
**Dependência:** —
**Descrição:** Criar/refatorar os templates HTML/CSS para todos os formatos de post do @verbumcontabilidade. Cada template deve ser parametrizável (aceita variáveis de título, corpo, cor de destaque) e seguir rigorosamente o brand guide. Os templates existentes (`carrossel-01-apresentacao.html`, `post-01-carrossel.html`) são ponto de partida — refatorar se necessário.

**ACs principais:**
- `templates/carrossel-educativo.html` — carrossel 5–8 slides com slots de conteúdo
- `templates/post-alerta.html` — post de urgência/data fiscal (1 slide impactante)
- `templates/post-frase.html` — post de autoridade/citação
- `templates/stories-cta.html` — 1080x1920px, CTA centralizado
- `templates/reels-cover.html` — capa de reel com placeholder de Maria Clara
- Todos os templates: 1080x1080px padrão (exceto stories/reels), Navy #0D1B3E como fundo padrão
- Logo Verbum presente em todos os slides — posição definida por contexto
- Google Fonts carregadas: Cormorant Garamond 700 + Outfit 300/400
- Variáveis documentadas por template: `{{titulo}}`, `{{corpo}}`, `{{destaque}}`, `{{cta}}`
- Margem de segurança de 80–100px respeitada em todos os templates

---

### Story 3.2 — CEO Criativo — Fluxo de Geração de Design A e B
**Executor:** @dev
**Quality Gate:** @architect
**Dependência:** Story 3.1 (templates base)
**Descrição:** Documentar e implementar o fluxo completo do CEO Criativo. Ele recebe o brief do CEO Master (copy + pilar + formato) e entrega simultaneamente: Design A (HTML parametrizado com conteúdo real) e Design B (prompt Canva completo como fallback). Inclui placeholder estrutural para o avatar de Maria Clara.

**ACs principais:**
- Skill `skills/ceo-criativo.md` criada documentando o fluxo de geração
- CEO Criativo recebe: `[perfil] · [tipo] · [tema] + copy do CEO Conteúdo`
- Design A: seleciona o template correto da Story 3.1 + preenche com o copy recebido → entrega HTML renderizável
- Design B: gera prompt Canva completo (dimensões, paleta, tipografia, slide-a-slide) — sempre diferente de Design A (variação de layout ou cor de destaque)
- Maria Clara: placeholder `<!-- MARIA_CLARA_PLACEHOLDER -->` no slide principal quando o formato exige presença da avatar
- Output ao CEO Master: Design A (path do HTML) + Design B (prompt completo) + thumbnail descritivo de cada um

---

### Story 3.3 — Export para PNG via Playwright
**Executor:** @dev
**Quality Gate:** @architect
**Dependência:** Story 3.1 (templates base)
**Descrição:** Criar script Node.js que renderiza os slides HTML em PNG usando Playwright. Necessário para o CEO Operações enviar os slides como imagem à Meta Graph API. Deve funcionar para carrossel (múltiplos slides → múltiplos PNGs) e feed estático (1 slide → 1 PNG).

**ACs principais:**
- `api/export-html-to-png.js` criado e funcional
- Aceita path do HTML + número de slides → exporta PNGs numerados em `criatives/rendered/`
- Dimensões: 1080x1080px para carrossel/feed, 1080x1920px para stories/reels
- Playwright configurado para carregar Google Fonts antes do screenshot
- PNGs com qualidade suficiente para Instagram (≥ 1MB por slide)
- Log: `✅ Export concluído: [N] slides → criatives/rendered/[tema]/`

---

### Story 3.4 — Checklist de Brand Guide Automático
**Executor:** @dev
**Quality Gate:** @architect
**Dependência:** Story 3.1 (templates base)
**Descrição:** Função de validação que o CEO Criativo executa antes de entregar o Design A. Verifica se o HTML gerado respeita os critérios invioláveis do brand guide: paleta correta, logo presente, tipografia certa, margem de segurança respeitada.

**ACs principais:**
- `skills/brand-guide-checker.md` criada documentando os critérios de validação
- Verificações obrigatórias: `#0D1B3E` ou `#081530` como cor de fundo, `#C9A84C` ou `#E8C97A` presente, Cormorant Garamond e Outfit referenciadas no CSS, logo presente com classe CSS identificável
- Status de saída: `✅ APROVADO — brand guide conforme` ou `⚠️ REVISAR — [motivo]`
- Design A só avança para o pacote de aprovação com status `✅ APROVADO`
- Tempo de execução do checker: < 5 segundos

---

## Critérios de Aceite do Épico

- [ ] 5 templates HTML/CSS criados (carrossel, alerta, frase, stories, reels cover)
- [ ] CEO Criativo entrega Design A (HTML) + Design B (prompt) em toda execução
- [ ] Export para PNG funcional via Playwright para carrossel e feed estático
- [ ] Checklist de brand guide valida 100% dos criativos antes da entrega
- [ ] Tempo de geração Design A: < 2 minutos
- [ ] 0 posts com violação de brand guide após checklist

---

## Riscos e Mitigação

| Risco | Mitigação |
|---|---|
| Google Fonts não carrega antes do screenshot | Playwright aguardar `networkidle` antes do screenshot |
| Templates ficam rígidos (difícil parametrizar textos longos) | Overflow handling e font-size responsivo nos templates |
| Maria Clara avatar não disponível (HeyGen pendente) | Placeholder estrutural com caixa reservada — `<!-- MARIA_CLARA_PLACEHOLDER -->` |
| Checklist falso-positivo bloqueia entregas válidas | Checker usa regex flexível; status `⚠️ REVISAR` (não BLOCK) para concerns não-críticos |

---

## Handoff para @sm

**Tecnologia:** HTML/CSS, Node.js, Playwright, Google Fonts
**Templates existentes:** `templates/carrossel-01-apresentacao.html`, `templates/post-01-carrossel.html` — ponto de partida para Story 3.1
**Padrões obrigatórios:** `branding/brand-guide.md` é a referência inviolável de paleta, tipografia e margem
**Sequência das stories:** 3.1 é pré-condição para 3.2, 3.3 e 3.4. As três últimas podem correr em paralelo após 3.1 Done.

"River, as stories deste épico têm uma dependência clara: Story 3.1 (templates base) deve estar Done antes de qualquer outra. Após 3.1 Done, as stories 3.2, 3.3 e 3.4 podem ser implementadas em paralelo — são independentes entre si. O executor padrão é @dev para todas. Referências principais: `branding/brand-guide.md` (inviolável), `templates/carrossel-01-apresentacao.html` (ponto de partida). Use o PRD em `docs/prd/verbum-instagram-prd-v2.md` Épico 3 como referência de requisitos."
