# Brand Guide — Verbum Contabilidade
**Versão:** 1.0  
**Atualizado em:** 2026-06-08  
**Uso:** Referência obrigatória para todo conteúdo produzido pela organização

---

## 1. Identidade

| Campo | Valor |
|---|---|
| **Nome** | Verbum Contabilidade |
| **Handle Instagram** | @verbumcontabilidade |
| **Porta-voz** | Maria Clara (persona IA) |
| **Posicionamento** | Contabilidade com confiança, clareza e ética |
| **Público** | Empreendedores brasileiros insatisfeitos com seu contador |
| **Tom** | Didático, acolhedor, direto — nunca frio ou burocrático |
| **Assinatura verbal** | "Imposto complicado? A gente simplifica." |

---

## 2. Paleta de Cores (CANÔNICA)

> ⚠️ **ATENÇÃO — INCONSISTÊNCIA IDENTIFICADA**  
> Foram encontradas três variações de paleta em uso nos arquivos do projeto.  
> A paleta abaixo é a versão canônica consolidada. Todos os novos arquivos devem usar esta.

### Cores primárias

| Nome | Hex | Uso |
|---|---|---|
| **Navy Deep** | `#081530` | Fundo de body e footer (web) |
| **Navy** | `#0D1B3E` | Fundo principal Instagram, slides escuros |
| **Navy Card** | `#132860` | Cards, elementos internos |
| **Gold** | `#C9A84C` | Acento principal, bordas, CTAs, ícones |
| **Gold Light** | `#E8C97A` | Hover, destaques secundários |
| **Cream** | `#F2EDE3` | Texto principal sobre fundo escuro |
| **Cream 70** | `rgba(242,237,227,.70)` | Texto secundário |

### Regra absoluta
Nenhum fundo branco nos slides do Instagram. Sempre em tons de azul-marinho.

### Cores de alerta — NÃO USAR
| Arquivo | Conflito |
|---|---|
| `verbum-solucoes.html` | Gold `#C49A2C` (mais escuro — deprecar) |
| `verbum-site/index.html` | Navy `#0B1F4A` (aceito apenas para web) |

---

## 3. Tipografia (CANÔNICA)

> ⚠️ **ATENÇÃO — INCONSISTÊNCIA IDENTIFICADA**  
> O site usa Playfair Display + Lato. Os templates Instagram usam Cormorant Garamond + Outfit.  
> **Decisão pendente** — ver Seção 7.

### Para Instagram (carrosséis, stories, reels cover)

| Papel | Fonte | Peso | Uso |
|---|---|---|---|
| **Título** | Cormorant Garamond | 600–700 | Manchetes, palavra de destaque |
| **Subtítulo** | Cormorant Garamond Italic | 400 | Complemento do título |
| **Corpo** | Outfit | 300–400 | Texto corrido, listas |
| **CTA / Label** | Outfit | 500–600 | Botões, chamadas de ação |

### Para Web (site institucional)

| Papel | Fonte | Peso |
|---|---|---|
| **Título** | Playfair Display | 700 |
| **Corpo** | Lato | 300–400 |

---

## 4. Logo

### Variantes disponíveis (usar sempre a variante certa — nunca adaptar com gambiarras)

| Arquivo | Fundo próprio | Usar quando |
|---|---|---|
| `verbum-logo-fundo-escuro.png` | Charcoal escuro com círculos decorativos | Slides dark (navy) — usar diretamente, sem container branco |
| `verbum-logo-navy-chip.png` | Navy com card branco interno | Chip compacto sobre fundo navy — uso como elemento inline ou pequeno |
| `verbum-logo-transparente.png` | Transparente (fundo branco aparente) | Fundos muito claros ou brancos |
| `verbum-logo-fundo-branco.png` | Branco puro | Fundos cream, areia ou qualquer fundo claro |
| `logo-definitiva.png` | Branco puro | Reservado para web e documentos impressos |

### Regra de uso nos slides Instagram

| Contexto | Arquivo | Tratamento CSS |
|---|---|---|
| Slide dark — logo grande (Slide 1) | `verbum-logo-fundo-escuro.png` | `border-radius: 12px; overflow: hidden` — sem container adicional |
| Slide dark — logo média (Slide 3) | `verbum-logo-fundo-escuro.png` | `border-radius: 10px; overflow: hidden` — sem container adicional |
| Slide claro — logo discreta (rodapé) | `verbum-logo-fundo-branco.png` | Direto, opacity 0.50, canto inferior direito |
| Slide claro — logo média | `verbum-logo-transparente.png` | Direto, sem container |

**Tamanho mínimo:** 120px de largura em qualquer uso.

**Logomarcas descartadas — nunca usar:**
- `verbum-logo.png` (raiz do usuário) — versão flat dourada, não é a logo oficial
- `logo-sem-fundo.png` — versão desatualizada

---

## 5. Maria Clara — Diretrizes Visuais

| Campo | Definição |
|---|---|
| **Perfil** | Mulher, 30–35 anos, brasileira, contadora |
| **Visual** | Cabelo escuro liso/ondulado, expressão confiante, blazer azul-marinho |
| **Fundo** | Clean com identidade Verbum (navy + dourado) |
| **Tom de voz** | Didática, acolhedora, direta |
| **Nunca** | Fria, burocrática, distante |
| **Voz (áudio)** | Malu — ElevenLabs |
| **Vídeo** | HeyGen Talking Photo |

---

## 6. Formatos Instagram

| Formato | Dimensão | Uso |
|---|---|---|
| **Carrossel** | 1080×1920px (9:16) ou 1080×1080px (1:1) | Posts educativos, listas |
| **Feed estático** | 1080×1080px | Datas, alertas, frases |
| **Stories** | 1080×1920px (9:16) | Agenda fiscal, CTAs |
| **Reels cover** | 1080×1920px (9:16) | Capa dos vídeos da Maria Clara |

**Margem de segurança:** 80px em todos os lados (área segura para exibição no app)

---

## 7. Tipografia — Decisão do CEO Master (08/06/2026)

**Cormorant Garamond + Outfit para Instagram.** Funciona melhor em telas móveis, tem caráter editorial e premium compatível com a marca. Playfair Display + Lato permanece exclusivo do site institucional.

Todos os templates de Instagram devem usar apenas Cormorant Garamond + Outfit. Não misturar.

---

## 8. Regras Editoriais (Instagram)

- NUNCA prometer resultados específicos ou dar orientação tributária categórica
- Sempre convidar à análise personalizada: *"cada situação tem particularidades"*
- Porta-voz exclusiva: Maria Clara
- Gustavo nunca aparece publicamente vinculado ao @verbumcontabilidade
- Todo conteúdo passa pelo humanizer antes de publicar

---

## 9. Pilares Editoriais

| Pilar | Tema |
|---|---|
| 1 | Reforma Tributária (pilar central 2026–2033) |
| 2 | Educação Fiscal Pessoa Física |
| 3 | Educação Fiscal Pessoa Jurídica |
| 4 | Consciência Financeira |
| 5 | Autoridade, Bastidores e Humanização |
| 6 | Formatos Recorrentes (alertas, agenda, Q&A) |
