# Relatório de Funcionalidades — Flux Payments Landing Page

> Documento de referência completo para replicar landing pages similares.
> Gerado em: Abril de 2026

---

## Sumário

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Arquitetura de Componentes](#2-arquitetura-de-componentes)
3. [Design System](#3-design-system)
4. [Componentes Detalhados](#4-componentes-detalhados)
5. [Funcionalidades Especiais](#5-funcionalidades-especiais)
6. [Responsividade](#6-responsividade)
7. [Integrações](#7-integrações)
8. [SEO e Meta Tags](#8-seo-e-meta-tags)
9. [Como Replicar](#9-como-replicar)

---

## 1. Visão Geral do Projeto

### Stack Tecnológico

| Tecnologia | Versão | Papel |
|---|---|---|
| React | ^19.2.4 | Framework de UI |
| Vite | ^8.0.4 | Bundler e servidor de desenvolvimento |
| framer-motion | ^12.38.0 | Animações declarativas |
| cobe | ^2.0.1 | Renderização do globo 3D em WebGL |
| lucide-react | ^1.7.0 | Biblioteca de ícones SVG |
| @react-three/fiber | ^9.5.0 | Instalado (não utilizado diretamente) |
| @react-three/drei | ^10.7.7 | Instalado (não utilizado diretamente) |
| three / three-globe | ^0.183.2 / ^2.45.2 | Instalados (não utilizados diretamente) |

> Nota: as libs `three`, `three-globe`, `@react-three/fiber` e `@react-three/drei` estão no `package.json` mas o globo 3D real é implementado com `cobe`, que usa WebGL diretamente via `<canvas>`.

### Estrutura de Pastas

```
landing-page-fluxpayments-v1/
├── index.html                    # Entrada HTML, SEO, fontes
├── package.json
├── vite.config.js
├── public/
│   └── favicon.png
└── src/
    ├── main.jsx                  # Ponto de entrada React
    ├── App.jsx                   # Orquestrador de componentes
    ├── App.css                   # Vazio (reservado)
    ├── index.css                 # Design system global
    └── components/
        ├── Loading.jsx           # Tela de carregamento inicial
        ├── Navbar.jsx            # Barra de navegação fixa
        ├── Hero.jsx              # Seção principal (acima da dobra)
        ├── Stats.jsx             # Contadores animados de métricas
        ├── Features.jsx          # Grid de funcionalidades do produto
        ├── Solutions.jsx         # Cards de soluções de pagamento
        ├── Globe.jsx             # Globo 3D interativo (cobe)
        ├── Testimonials.jsx      # Depoimentos de clientes
        ├── FAQ.jsx               # Perguntas frequentes (acordeão)
        ├── CTA.jsx               # Call-to-action final
        ├── Footer.jsx            # Rodapé com links e info
        └── FloatButton.jsx       # Botão flutuante WhatsApp + scroll-to-top
```

### Fluxo de Renderização

```
App.jsx
  └── Loading (progress ring)
        └── [onFinish callback] --> renderiza o restante
              ├── Navbar
              ├── Hero
              ├── Stats
              ├── Features
              ├── Solutions
              ├── Globe
              ├── Testimonials
              ├── FAQ
              ├── CTA
              ├── Footer
              └── FloatButton
```

O `App.jsx` mantém um estado `loaded` (boolean). Enquanto `false`, apenas o `<Loading>` é exibido. Quando o loading termina, ele chama `onFinish`, que seta `loaded = true` e renderiza toda a página.

---

## 2. Arquitetura de Componentes

### Tabela de Componentes

| Componente | Arquivo | Seção / ID | Propósito Principal |
|---|---|---|---|
| `Loading` | Loading.jsx | — | Tela de splash com anel de progresso SVG |
| `Navbar` | Navbar.jsx | `#hero` (âncora logo) | Navegação fixa com scroll-aware e menu mobile |
| `Hero` | Hero.jsx | `#hero` | Seção hero com typewriter effect |
| `Stats` | Stats.jsx | — | Métricas com contadores animados |
| `Features` | Features.jsx | `#features` | Grid 3x2 de funcionalidades |
| `Solutions` | Solutions.jsx | `#solutions` | Grid 3x2 de soluções de pagamento |
| `Globe` | Globe.jsx | `#globe` | Globo 3D interativo com arcos e marcadores |
| `Testimonials` | Testimonials.jsx | `#testimonials` | Cards de depoimentos com estrelas |
| `FAQ` | FAQ.jsx | `#faq` | Acordeão de perguntas e respostas |
| `CTA` | CTA.jsx | `#cta` | Bloco de chamada para ação final |
| `Footer` | Footer.jsx | — | Rodapé completo com links e CNPJ |
| `FloatButton` | FloatButton.jsx | — | Chat WhatsApp + botão scroll-to-top fixo |

### Padrão de Estilos

Todos os componentes utilizam **CSS-in-JS via template literals** (`<style>{` ... `}</style>`) dentro do próprio JSX. Não há arquivos CSS separados por componente. Os estilos globais e o design system ficam em `src/index.css`.

---

## 3. Design System

### Variáveis CSS (`:root` em `index.css`)

#### Paleta de Azuis

```css
--blue-50:  #eff6ff
--blue-100: #dbeafe
--blue-200: #bfdbfe
--blue-300: #93c5fd
--blue-400: #60a5fa   /* cor principal de ícones e destaques */
--blue-500: #3b82f6   /* cor primária de ação */
--blue-600: #2563eb   /* botões primários */
--blue-700: #1d4ed8   /* gradientes */
--blue-800: #1e40af   /* scrollbar thumb */
--blue-900: #1e3a8a
```

#### Backgrounds

```css
--bg-primary:    #030712          /* fundo principal (quase preto) */
--bg-secondary:  #0a0f1e          /* fundo secundário azul escuro */
--bg-card:       rgba(15,23,42,0.6)   /* cards com transparência */
--bg-card-hover: rgba(30,41,59,0.6)   /* cards no hover */
```

#### Tipografia e Texto

```css
--text-primary:   #f8fafc   /* branco quase puro */
--text-secondary: #94a3b8   /* cinza azulado médio */
--text-muted:     #64748b   /* cinza azulado escuro */
--font-family:    'Inter', system-ui, -apple-system, sans-serif
```

#### Bordas

```css
--border-color: rgba(59, 130, 246, 0.2)   /* borda padrão dos cards */
--border-hover: rgba(59, 130, 246, 0.45)  /* borda no hover */
```

#### Gradientes

```css
--gradient-blue: linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 70%, #60a5fa 100%)
/* Usado em botões primários, ícones de soluções, avatares */

--gradient-hero: radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.25) 0%, transparent 60%)
/* Brilho sutil no topo da hero section */

--gradient-glow: radial-gradient(circle at 50% 50%, rgba(37,99,235,0.3) 0%, transparent 50%)
```

#### Sombras

```css
--shadow-blue: 0 0 80px rgba(37, 99, 235, 0.25)   /* hover de cards */
--shadow-card: 0 4px 30px rgba(0, 0, 0, 0.3)
```

#### Layout

```css
--max-width:  1200px   /* largura máxima do container */
--nav-height: 72px     /* altura da navbar para padding-top do Hero */
```

### Classes Globais Reutilizáveis

#### `.container`
- `max-width: 1200px`, `margin: 0 auto`, `padding: 0 24px`
- Em mobile (`<480px`): `padding: 0 16px`

#### `.section-badge`
- Pílula com borda azul translúcida, texto uppercase, `letter-spacing: 0.5px`
- Tem um pseudo-elemento `::before` com um ponto de 6x6px que pulsa (`animation: pulse-dot 2s infinite`)

#### `.section-title`
- `font-size: clamp(28px, 4vw, 42px)`, `font-weight: 800`, `letter-spacing: -1px`
- Suporta a classe `.gradient-text` (texto com gradiente azul via `-webkit-background-clip: text`)

#### `.section-subtitle`
- `font-size: 17px`, `color: var(--text-secondary)`, `line-height: 1.7`

#### `.btn-primary`
- Fundo gradiente azul, `padding: 14px 32px`, `border-radius: 12px`
- Hover: `translateY(-2px)` e sombra azul mais intensa

#### `.btn-secondary`
- Fundo transparente com borda, hover com fundo azul sutil

### Fonte

Carregada via Google Fonts no `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Scrollbar Customizada

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: var(--blue-800); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--blue-600); }
```

### Selection

```css
::selection { background: rgba(59, 130, 246, 0.3); color: white; }
```

---

## 4. Componentes Detalhados

### 4.1 Loading

**Propósito:** Tela de splash inicial que cobre 100% da viewport enquanto a página "carrega" (simulado). Após ~2,2 segundos, faz fade-out e chama `onFinish()`.

**Props:**
- `onFinish`: função callback chamada quando o loading termina

**Elementos visuais:**
- Background escuro (`#030712`) com três **orbs** desfocadas (blur: 80px) em tons de azul, animadas com float suave
- **Grid de pontos** azuis (40x40px) com máscara radial (visível apenas no centro)
- **Anel de progresso SVG** (180x180px) com dois círculos: fundo estático e arco dinâmico com `strokeDasharray` que cresce de 0 a `progress * 5.28` (circunferência total: 528px)
- Gradiente do arco: linear de `#60a5fa` a `#1d4ed8`
- **Logo** centralizada dentro do anel, com animação `loading-pulse` (opacity + brightness)
- **Barra de progresso** (200px x 3px) com gradiente `#1d4ed8 → #3b82f6 → #60a5fa` e um ponto de brilho (`box-shadow: 0 0 12px`) que segue a ponta da barra
- **Texto** "Carregando..." que muda para "Pronto!" quando `progress === 100`

**Animações:**
- `framer-motion`: logo entra com `scale: 0.5 → 1` e `opacity: 0 → 1` (0.6s)
- Barra expande de `width: 0 → 200` com delay de 0.3s
- Texto sobe com `y: 10 → 0` com delay de 0.5s
- Exit: `opacity: 0` em 0.5s usando `AnimatePresence`
- CSS: `loading-float` (orbs), `loading-pulse` (logo), `blink` (anel)

**Lógica do progresso:**
```js
const duration = 2200  // ms total
const interval = 20    // tick a cada 20ms
const step = 100 / (duration / interval)  // ~0.909 por tick
// Adiciona variação aleatória: current += step + Math.random() * step * 0.5
// Quando current >= 100: aguarda 400ms → fade-out → aguarda 600ms → onFinish()
```

---

### 4.2 Navbar

**Propósito:** Barra de navegação fixa no topo com efeito de glassmorphism ativado por scroll.

**Estado interno:**
- `scrolled` (boolean): `true` quando `window.scrollY > 20`
- `mobileOpen` (boolean): controla o menu mobile fullscreen

**Links de navegação:**
```js
[
  { label: 'Início',    href: '#hero' },
  { label: 'Benefícios', href: '#features' },
  { label: 'Soluções', href: '#solutions' },
  { label: 'Global',   href: '#globe' },
  { label: 'FAQ',      href: '#faq' },
]
```

**Comportamento de scroll:**
- Estado padrão: sem background, sem borda
- Com `navbar--scrolled`: `background: rgba(3,7,18,0.85)` + `backdrop-filter: blur(20px)` + borda inferior azul translúcida + `padding: 10px 0` (reduzido)
- Transição: `all 0.3s ease`

**Menu mobile (`<= 768px`):**
- Botão hamburger (ícone `Menu`) e fechar (ícone `X`) da lucide-react
- Ao abrir: `document.body.style.overflow = 'hidden'` (trava scroll)
- Menu fullscreen com `position: fixed`, `opacity: 0 → 1` via CSS, `backdrop-filter: blur(20px)`
- Links com `font-size: 22px` centralizados, padding aumentado
- Botão CTA "Entrar em Contato" extra no final do menu mobile
- Ícone de fechar (X) no canto superior direito

**CTA desktop:** Botão "Entrar em Contato" → `https://wa.me/16475755252` (abre em nova aba)

---

### 4.3 Hero

**Propósito:** Seção principal acima da dobra com título animado, typewriter effect e badges de confiança.

**Elementos visuais:**
- Background com 3 gradientes radiais animados (azul desfocado) + grid azul translúcido com máscara radial
- **Section badge:** "Sua plataforma de pagamentos"
- **Título principal:** "RECEBA GLOBAL," (linha fixa) + componente `<Typewriter />` (linha animada)
- **Subtítulo:** descrição da plataforma
- **Dois botões:**
  - Primário: "Entrar em Contato" → `https://wa.me/16475755252` com ícone `ArrowRight`
  - Secundário: "Começar Agora" → `#features` com ícone `Play`
- **Três badges de confiança** (pílulas): "100% Seguro" (Shield), "Saque Rápido" (Zap), "+180 Países" (Globe)

**Typewriter Effect (componente interno `Typewriter`):**

Palavras rotacionadas:
```js
['CRESÇA SEM LIMITES', 'VENDA PARA O MUNDO', 'ESCALE SEU NEGÓCIO', 'RECEBA DE QUALQUER LUGAR']
```

Lógica:
- Digitando: adiciona 1 caractere a cada **80ms**
- Pausa ao completar: **2000ms**
- Apagando: remove 1 caractere a cada **40ms**
- Troca para próxima palavra imediatamente após apagar tudo
- Cursor "`|`" pisca via CSS (`animation: blink 0.8s step-end infinite`)
- Texto tem gradiente azul via `-webkit-background-clip: text`

**Animações framer-motion (entrada):**

Todos usam `initial: { opacity: 0, y: 20/30 }` → `animate: { opacity: 1, y: 0 }` com delays escalonados:
- Badge: delay 0 (0.6s duration)
- Título: delay 0.1 (0.7s)
- Subtítulo: delay 0.2 (0.6s)
- Botões: delay 0.3 (0.6s)
- Badges de confiança: delay 0.4 (0.6s)

**Mobile (`<= 768px`):**
- Botões empilhados verticalmente, `width: 100%`, `max-width: 320px`
- Em `<= 480px`: badges de confiança também empilhadas verticalmente

---

### 4.4 Stats

**Propósito:** Exibir 4 métricas de credibilidade com contadores animados que disparam ao entrar na viewport.

**Dados:**
```js
[
  { icon: Users,       value: 50000, suffix: '+',   label: 'Clientes Ativos' },
  { icon: TrendingUp,  value: 10,    suffix: 'M+',  label: 'Transações Mensais' },
  { icon: ShoppingCart,value: 180,   suffix: '+',   label: 'Países Atendidos' },
  { icon: Percent,     value: 99.9,  suffix: '%',   label: 'Uptime Garantido' },
]
```

**Grid:** 4 colunas no desktop, 2 no tablet, 1 no mobile (`<= 400px`)

**Card:** background `var(--bg-card)`, border azul, `backdrop-filter: blur(10px)`. Hover: `translateY(-4px)` + `box-shadow: var(--shadow-blue)`

**Ícone:** container 48x48px com fundo gradiente azul sutil e `border-radius: 12px`

**Separadores:** pseudo-elementos `::before` e `::after` com linhas `linear-gradient(90deg, transparent, border-color, transparent)` no topo e base da section

**Componente `AnimatedNumber`:**
- Usa `useInView` (framer-motion) com `{ once: true }` para disparar apenas quando visível
- Animação de 2000ms com easing cúbico: `1 - Math.pow(1 - progress, 3)`
- Para valores inteiros: `Math.floor()`, para decimais (99.9): `toFixed(1)`
- Formatação: `toLocaleString('pt-BR')` (ex: 50.000)

---

### 4.5 Features

**Propósito:** Apresentar as 6 funcionalidades principais em grid 3x2.

**Cards:**
```js
[
  { icon: CreditCard,  title: 'Checkout Otimizado',       color: '#3b82f6' },
  { icon: ShieldCheck, title: 'Pagamentos Seguros',        color: '#60a5fa' },
  { icon: Globe,       title: 'Vendas Globais',            color: '#2563eb' },
  { icon: BarChart3,   title: 'Analytics Completo',        color: '#1d4ed8' },
  { icon: FileCheck,   title: 'Conformidade Regulatória',  color: '#1e40af' },
  { icon: Code2,       title: 'API Escalável',             color: '#3b82f6' },
]
```

**Detalhe visual:** Cada card tem um pseudo-elemento `::before` que exibe uma linha de 2px no topo com a cor do ícone (`var(--icon-color)`) usando gradiente `transparent → cor → transparent`. A linha é invisível por padrão (`opacity: 0`) e aparece no hover (`opacity: 1`).

**Grid responsivo:**
- Desktop (>1024px): 3 colunas
- Tablet (769–1024px): 2 colunas
- Mobile (<=768px): 1 coluna

**Animações:** `whileInView` com delay escalonado `i * 0.1`s (máximo ~0.5s para o último card)

---

### 4.6 Solutions

**Propósito:** Apresentar 6 métodos de pagamento aceitos.

**Cards:**
```js
[
  { icon: CreditCard, title: 'Cartão de Crédito Internacional' },
  { icon: QrCode,     title: 'Pix & QR Code' },
  { icon: Receipt,    title: 'Boleto Bancário' },
  { icon: Repeat,     title: 'Pagamentos Recorrentes' },
  { icon: Smartphone, title: 'Link de Pagamento' },
  { icon: Building2,  title: 'Split de Pagamento' },
]
```

**Diferença visual em relação ao Features:** O ícone do Solutions usa `var(--gradient-blue)` como fundo (azul sólido com gradiente), enquanto Features usa fundo translúcido. O layout do card é horizontal: ícone + título na mesma linha (`solutions__card-top`).

**Glow de fundo:** `div.solutions__glow` com gradiente radial centrado muito sutil (`rgba(59,130,246,0.06)`)

**Grid responsivo:** Idêntico ao Features (3 → 2 → 1 coluna)

---

### 4.7 Globe (Seção Global)

**Propósito:** Demonstrar presença global com um globo 3D interativo renderizado via WebGL.

**Layout:** Duas colunas — texto à esquerda (42% da largura), canvas à direita (flex: 1)

**Texto esquerdo:**
- Badge "Cobertura Global"
- Título + subtítulo
- 4 highlights com **pontinhos pulsantes** (`.globe-section__highlight-dot`)

**Highlights:**
- "Américas, Europa e Ásia"
- "+35 moedas suportadas"
- "Conversão automática"
- "Liquidação em até 24h"

**Pontinhos pulsantes (`pulse-glow`):**
```css
@keyframes pulse-glow {
  0%, 100% { opacity: 1; box-shadow: 0 0 12px rgba(59,130,246,0.6); transform: scale(1); }
  50%       { opacity: 0.4; box-shadow: 0 0 20px rgba(59,130,246,0.9); transform: scale(1.3); }
}
```
Cada ponto tem `animation-delay` diferente (0, 0.5s, 1s, 1.5s) para efeito cascata.

**Configuração do globo (cobe):**
```js
createGlobe(canvas, {
  devicePixelRatio: Math.min(window.devicePixelRatio, 2),
  width:  isMobile ? 500 : 900,   // canvas intrinsic size
  height: isMobile ? 500 : 900,
  phi: 0, theta: 0.2,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 12000,
  mapBrightness: 6,
  mapBaseBrightness: 0.05,
  baseColor: [0.02, 0.05, 0.2],      // azul escuro quase preto
  markerColor: [0.3, 0.55, 1.0],     // azul claro
  glowColor: [0.04, 0.1, 0.3],       // brilho externo azul
  arcColor: [0.2, 0.5, 1.0],         // arcos azuis
})
```

**Marcadores (10 cidades):**
- São Paulo (-23.5505, -46.6333) — size 0.05
- São Francisco (37.7749, -122.4194), Nova York (40.7128, -74.006) — size 0.04
- Londres (51.5074, -0.1278), Paris (48.8566, 2.3522) — size 0.03
- Tóquio (35.6762, 139.6503) — size 0.03
- Mumbai (28.6139, 77.209), Rio de Janeiro (-22.9068, -43.1729) — size 0.04
- Berlim (52.52, 13.405) — size 0.03
- Los Angeles (34.0522, -118.2437) — size 0.03

**Arcos (8 rotas):**
São Paulo ↔ Nova York, Brasília ↔ Paris, Londres ↔ Tóquio, São Francisco ↔ Hong Kong, Nova York ↔ Londres, Berlim ↔ Rio de Janeiro, São Paulo ↔ Mumbai, Los Angeles ↔ Paris

**Rotação automática:**
- `phi += 0.003` por frame (`requestAnimationFrame`)
- Pausada quando o usuário está arrastando

**Interação (drag para girar):**
- `onPointerDown`: inicia interação, salva posição X inicial, cursor → `grabbing`
- `onPointerMove`: calcula delta e atualiza `pointerInteractionMovement = delta / 200`
- `onPointerUp / onPointerOut`: finaliza interação, cursor → `grab`

**CSS do canvas:**
- Desktop: `width: 720px; height: 720px; margin-right: -40px` (invade o container levemente)
- Mobile: `width: min(380px, 92vw); height: min(380px, 92vw); margin-right: 0`

**Mobile:** Layout muda para `flex-direction: column`, texto centralizado, canvas abaixo

---

### 4.8 Testimonials

**Propósito:** Exibir 3 depoimentos de clientes fictícios.

**Dados:**
```js
[
  { name: 'Maria Silva', role: 'CEO, Digital Commerce',   rating: 5 },
  { name: 'João Santos', role: 'CTO, TechPay Solutions',  rating: 5 },
  { name: 'Ana Costa',   role: 'Fundadora, ShopGlobal',   rating: 5 },
]
```

**Card:** 3 colunas no desktop, 1 coluna no mobile
- Stars: `Array.from({ length: rating }).map()` com `<Star fill="#3b82f6" />`
- Texto com aspas tipográficas (`&ldquo;` / `&rdquo;`)
- Avatar: círculo com `var(--gradient-blue)` e inicial do nome

---

### 4.9 FAQ

**Propósito:** Acordeão com 7 perguntas frequentes.

**Perguntas:**
1. O que é a Flux Payments e para quem ela serve?
2. Quais formas de pagamento são aceitas?
3. Preciso ter um CNPJ?
4. Qual o prazo de liquidação dos valores?
5. A Flux Payments é segura?
6. Como funciona a integração via API?
7. Quanto tempo demora para minha conta ser verificada?

**Layout desktop:** Grid 2 colunas — cabeçalho/texto à esquerda (`1fr`), lista de FAQs à direita (`1.3fr`), com `gap: 60px`

**Lógica do acordeão:**
- Estado `openIndex` (número): índice do item aberto, `-1` = todos fechados
- Clique no mesmo item: `setOpenIndex(-1)` (fecha)
- Clique em item diferente: `setOpenIndex(i)` (abre, fecha o anterior automaticamente)
- Começa com `openIndex = 0` (primeiro item aberto por padrão)

**Animação de abertura (framer-motion + AnimatePresence):**
```js
initial: { height: 0, opacity: 0 }
animate: { height: 'auto', opacity: 1 }
exit:    { height: 0, opacity: 0 }
transition: { duration: 0.3 }
```

**Chevron:** Rotaciona 180° quando aberto (`transform: rotate(180deg)`)

**Item aberto:** borda muda de `var(--border-color)` para `var(--border-hover)`

**Mobile:** Layout muda para 1 coluna, cabeçalho centralizado

---

### 4.10 CTA (Call-to-Action)

**Propósito:** Seção final que convida o usuário a entrar em contato.

**Elementos:**
- Dois glows radiais de fundo (topo e base da section)
- Card centralizado (`padding: 80px 40px`, `border-radius: 24px`) com fundo semi-transparente
- Linha azul no topo do card (`::before` com `var(--gradient-blue)`, height: 2px)
- Badge "Comece Hoje Mesmo"
- Título + subtítulo com `<strong>50.000 empresas</strong>` em azul
- Botão CTA: "Falar com Especialista" → `https://wa.me/16475755252`
- 3 features inline: "Sem taxas de setup" (CheckCircle2), "Comece quando quiser" (Clock), "Suporte 24/7" (Headphones)

**Animações:** Cada elemento do card tem `whileInView` com delays escalonados (0.15 a 0.55s), criando efeito cascata de revelação.

---

### 4.11 Footer

**Propósito:** Rodapé completo com logo, descrição, redes sociais e links organizados em categorias.

**Estrutura do top:** Grid 2 colunas — brand à esquerda (`1.2fr`), links à direita (`2fr`)

**Categorias de links:**
```js
{
  Produto:  ['Checkout', 'Pagamentos', 'Recorrência', 'Split', 'Link de Pagamento'],
  Empresa:  ['Sobre nós', 'Carreiras', 'Blog', 'Contato'],
  Suporte:  ['Central de Ajuda', 'Documentação', 'Status da API', 'Comunidade'],
  Legal:    ['Termos de Uso', 'Privacidade', 'Compliance', 'PCI-DSS'],
}
```

**Links dos 4 colunas:** renderizados com `Object.entries(footerLinks).map()`

**Redes sociais:** 4 botões quadrados (38x38px) com borda azul, ícones: `Globe`, `Link2`, `Send`, `MessageSquare`

**Footer bottom:** Copyright dinâmico (`new Date().getFullYear()`), CNPJ `64.776.265/0001-69`, e links Termos / Privacidade / Cookies

**Mobile:**
- Grid muda para 1 coluna
- Brand centralizada
- Links em 2 colunas (e 1 coluna em `<= 400px`)
- Bottom em `flex-direction: column`

---

### 4.12 FloatButton

**Propósito:** Botão flutuante no canto inferior direito que abre chat para WhatsApp + botão de scroll-to-top.

**Estado interno:**
- `showChat` (boolean): controla visibilidade do chat
- `showScrollTop` (boolean): `true` quando `window.scrollY > 600`
- `message` (string): texto digitado pelo usuário

**Estrutura visual:**
```
[float-stack]
  ├── [float-scroll-top] (visível apenas quando scrollY > 600)
  └── [float-btn] (sempre visível)

[float-chat] (visível quando showChat = true)
  ├── header (avatar F + "Flux Payments" + "Online agora")
  ├── body (mensagem de boas-vindas)
  └── footer (input + botão Enviar)
```

**Layout do `float-stack`:**
- Chat fechado: `flex-direction: column` (scroll-top acima do chat-btn)
- Chat aberto: `flex-direction: row` (scroll-top ao lado do chat-btn)

**Botão principal (`float-btn`):**
- 56px × 56px, circular, `var(--gradient-blue)`, sombra azul
- Ícone alterna entre `MessageCircle` (fechado) e `X` (aberto)
- `whileHover: { scale: 1.1 }`, `whileTap: { scale: 0.9 }`

**Botão scroll-to-top:**
- 44px × 44px, circular, fundo escuro semi-transparente, ícone `ArrowUp`
- Aparece/desaparece com `AnimatePresence` + scale animation
- Clique: `window.scrollTo({ top: 0, behavior: 'smooth' })`

**Chat popup (`float-chat`):**
- 360px largura, `max-width: calc(100vw - 48px)`
- Glassmorphism: `backdrop-filter: blur(20px)`, fundo `rgba(10,15,30,0.98)`
- Aparece com `AnimatePresence`: `opacity: 0, y: 20, scale: 0.95` → `opacity: 1, y: 0, scale: 1`
- Status "Online agora" em verde (`#22c55e`)

**Envio de mensagem:**
- Ao clicar "Enviar" ou pressionar Enter: `encodeURIComponent(message || 'Olá, quero saber mais...')`
- Abre `https://wa.me/16475755252?text=<mensagem>` em nova aba
- Limpa o campo `message`

---

## 5. Funcionalidades Especiais

### 5.1 Loading Screen com Anel de Progresso

O loading usa SVG nativo com `strokeDasharray` para criar o anel de progresso:

```jsx
// Circunferência: 2π × r = 2π × 84 ≈ 528px
strokeDasharray={`${progress * 5.28} 528`}
// progress * 5.28 = porção preenchida
// 528 - (progress * 5.28) = porção vazia (implícita)
```

O SVG está rotacionado -90° para que o progresso comece no topo.

**Duração total:** ~2,2s (com variação aleatória de até 50% por tick)
**Transição de saída:** fade de 0.5s, depois 0.6s antes de `onFinish()`

---

### 5.2 Typewriter Effect no Hero

Implementado sem dependências externas. A lógica usa `useEffect` que reage a mudanças em `[text, isDeleting, wordIndex]`:

- Fase de digitação: `setTimeout` de 80ms, concatena um caractere
- Pausa no final: `setTimeout` de 2000ms, ativa `isDeleting`
- Fase de apagamento: `setTimeout` de 40ms, remove um caractere
- Transição: sem delay, avança para o próximo índice ciclicamente

---

### 5.3 Globo 3D com Cobe

**Biblioteca:** `cobe` (WebGL, não Three.js)

**Ciclo de animação:**
```js
const animate = () => {
  animationId = requestAnimationFrame(animate)
  if (!pointerInteracting.current) {
    phiRef.current += 0.003  // ~0.17°/frame a 60fps
  }
  globeInstance.update({ phi: phiRef.current + pointerInteractionMovement.current })
}
```

A rotação é armazenada em `useRef` (não em `useState`) para evitar re-renders e manter a animação fluida.

**Interação de drag:** O delta do mouse é dividido por 200 para transformar pixels em radianos suavemente.

**Cleanup:** `cancelAnimationFrame(animationId)` + `globeInstance.destroy()` no retorno do `useEffect` para evitar memory leaks.

---

### 5.4 Contadores Animados (AnimatedNumber)

```js
// Easing cubic ease-out
const eased = 1 - Math.pow(1 - progress, 3)
// progress: 0 → 1 em 2000ms
// eased: começa rápido, desacelera no final
```

Usa `requestAnimationFrame` internamente (não `setInterval`) para sincronizar com o refresh rate da tela.

---

### 5.5 FAQ Acordeão

O truque para animar `height: auto` com framer-motion:
```jsx
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: 'auto', opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.3 }}
>
```

Framer-motion detecta `height: 'auto'` e mede o elemento antes de animar, permitindo transição suave sem JavaScript manual.

---

### 5.6 WhatsApp Integration

**Número:** `+1 647 575 5252` (formato internacional)
**URL base:** `https://wa.me/16475755252`
**Com texto pré-preenchido:** `https://wa.me/16475755252?text=<texto_codificado>`

**Pontos de integração:**
1. Navbar (desktop e mobile): "Entrar em Contato"
2. Hero: botão primário "Entrar em Contato"
3. CTA: botão "Falar com Especialista"
4. FloatButton: chat popup com input personalizado

---

### 5.7 Scroll-to-Top

- Aparece quando `window.scrollY > 600px`
- Usa `AnimatePresence` para animar entrada/saída
- `window.scrollTo({ top: 0, behavior: 'smooth' })` → respeita a propriedade `scroll-behavior: smooth` do CSS

---

### 5.8 Scroll Reveal Animations

Padrão usado em todos os componentes:
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}           // não repete ao sair e voltar
  transition={{ duration: 0.5, delay: i * 0.1 }}
>
```

O `once: true` garante que a animação acontece apenas uma vez (na primeira vez que o elemento entra na viewport), não repetindo ao rolar de volta.

**Variações usadas:**
- `y: 20/30` (padrão vertical)
- `x: -30 / -40` (entrada lateral — FAQ header, Globe text)
- `scale: 0.9 → 1` (Globe canvas)
- `scale: 0.95 → 1` (CTA button)

---

### 5.9 Pulsing Dots Animation

Usados em dois contextos:

**1. Section Badge (global):**
```css
.section-badge::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--blue-400);
  animation: pulse-dot 2s infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

**2. Globe Highlights:**
```css
@keyframes pulse-glow {
  0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 12px rgba(59,130,246,0.6); }
  50% { opacity: 0.4; transform: scale(1.3); box-shadow: 0 0 20px rgba(59,130,246,0.9); }
}
```
Com delays escalonados: 0s, 0.5s, 1s, 1.5s.

---

## 6. Responsividade

### Breakpoints Utilizados

| Breakpoint | Tipo | Contexto Principal |
|---|---|---|
| `<= 400px` | Mobile pequeno | Stats (1 col), Footer links (1 col) |
| `<= 480px` | Mobile | Container padding, buttons, hero badges verticais |
| `<= 768px` | Mobile/Tablet | Navbar mobile, maioria dos grids para 1 col |
| `769–1024px` | Tablet | Features e Solutions em 2 colunas |
| `> 1024px` | Desktop | Layouts completos em 3+ colunas |

### Mudanças por Seção no Mobile (`<= 768px`)

| Seção | Desktop | Mobile |
|---|---|---|
| Navbar | Links horizontais + CTA button | Menu fullscreen overlay, hamburger icon |
| Hero | Botões lado a lado | Botões empilhados, `max-width: 320px` |
| Stats | Grid 4 colunas | Grid 2 colunas (1 col em 400px) |
| Features | Grid 3 colunas | Grid 1 coluna |
| Solutions | Grid 3 colunas | Grid 1 coluna |
| Globe | 2 colunas (texto + canvas) | 1 coluna (texto acima, canvas abaixo) |
| Globe canvas | 720×720px | `min(380px, 92vw)` × idem |
| Testimonials | Grid 3 colunas | Grid 1 coluna |
| FAQ | 2 colunas (header + lista) | 1 coluna, header centralizado |
| CTA | Card `padding: 80px 40px` | Card `padding: 48px 20px` |
| Footer top | 2 colunas | 1 coluna, brand centralizada |
| Footer links | 4 colunas | 2 colunas (1 col em 400px) |
| FloatButton | `bottom: 24px, right: 24px`, btn 56px | `bottom: 16px, right: 16px`, btn 50px |

---

## 7. Integrações

### WhatsApp (wa.me)

**Número configurado:** `16475755252` (código país +1, sem símbolos)

**Para alterar o número:** substituir todas as ocorrências de `16475755252` nos arquivos:
- `/src/components/Navbar.jsx` (2 ocorrências — desktop e mobile CTA)
- `/src/components/Hero.jsx` (1 ocorrência)
- `/src/components/CTA.jsx` (1 ocorrência)
- `/src/components/FloatButton.jsx` (1 ocorrência — na função `sendToWhatsApp`)

**Formato do link:**
```
https://wa.me/<numero>
https://wa.me/<numero>?text=<mensagem_encoded>
```

### Google Fonts

Carregado diretamente no `index.html` via `<link>` do Google Fonts CDN. Pesos: 300, 400, 500, 600, 700, 800, 900.

### Favicon

```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

Arquivo localizado em `/public/favicon.png`.

---

## 8. SEO e Meta Tags

```html
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flux Payments - Sua plataforma de pagamentos!</title>
  <meta name="description" content="Flux Payments - Sua plataforma de pagamentos! Aceite pagamentos globais com segurança e simplicidade." />
</head>
```

**Pontos de melhoria (não implementados):**
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Twitter Card meta tags
- Structured data (JSON-LD)
- Canonical URL
- Sitemap

---

## 9. Como Replicar

### Passo 1: Criar o projeto

```bash
npm create vite@latest meu-projeto -- --template react
cd meu-projeto
npm install framer-motion cobe lucide-react
```

### Passo 2: Configurar o `index.html`

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minha Empresa - Sua plataforma</title>
    <meta name="description" content="Descrição da empresa para SEO." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### Passo 3: Configurar o Design System (`src/index.css`)

Copiar o arquivo completo de `src/index.css` deste projeto. Ajustar as variáveis CSS conforme a identidade visual desejada:

- `--blue-*`: substituir por sua paleta de cores principal
- `--bg-primary` / `--bg-secondary`: seu tema de background
- `--font-family`: sua fonte preferida
- `--max-width`: largura do container (padrão 1200px)

### Passo 4: Criar o App.jsx com loading gate

```jsx
import { useState } from 'react'
import Loading from './components/Loading'
// import demais componentes...

function App() {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      <Loading onFinish={() => setLoaded(true)} />
      {loaded && (
        <>
          {/* seus componentes aqui */}
        </>
      )}
    </>
  )
}
```

### Passo 5: Padrão de componente com CSS inline

Cada componente segue este padrão:

```jsx
import { motion } from 'framer-motion'

export default function MinhaSecao() {
  return (
    <section id="minha-secao" className="minha-secao">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge">Categoria</div>
          <h2 className="section-title">
            Título da seção
            <br />
            <span className="gradient-text">com gradiente</span>
          </h2>
          <p className="section-subtitle">Subtítulo explicativo.</p>
        </motion.div>
      </div>

      <style>{`
        .minha-secao {
          padding: 100px 0;
        }
        /* estilos adicionais */
        @media (max-width: 768px) {
          .minha-secao { padding: 60px 0; }
        }
      `}</style>
    </section>
  )
}
```

### Passo 6: Implementar o Typewriter Effect

```jsx
const words = ['PALAVRA 1', 'PALAVRA 2', 'PALAVRA 3']

function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 40)
      } else {
        setIsDeleting(false)
        setWordIndex(prev => (prev + 1) % words.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex])

  return <span>{text}<span style={{ animation: 'blink 0.8s step-end infinite' }}>|</span></span>
}
```

### Passo 7: Implementar o Globo 3D

```bash
npm install cobe
```

```jsx
import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export default function GlobeSection() {
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const isMobile = window.innerWidth <= 768
    const size = isMobile ? 500 : 900

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: size, height: size,
      phi: 0, theta: 0.2,
      dark: 1, diffuse: 1.2,
      mapSamples: 12000, mapBrightness: 6,
      baseColor: [0.02, 0.05, 0.2],
      markerColor: [0.3, 0.55, 1.0],
      glowColor: [0.04, 0.1, 0.3],
      markers: [
        // { location: [lat, lng], size: 0.04 }
      ],
      arcs: [
        // { from: [lat, lng], to: [lat, lng] }
      ],
      arcColor: [0.2, 0.5, 1.0],
    })

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!pointerInteracting.current) phiRef.current += 0.003
      globe.update({ phi: phiRef.current + pointerInteractionMovement.current })
    }
    animate()

    return () => { cancelAnimationFrame(animId); globe.destroy() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={e => {
        pointerInteracting.current = e.clientX - pointerInteractionMovement.current
        canvasRef.current.style.cursor = 'grabbing'
      }}
      onPointerUp={() => { pointerInteracting.current = null; canvasRef.current.style.cursor = 'grab' }}
      onPointerOut={() => { pointerInteracting.current = null; canvasRef.current.style.cursor = 'grab' }}
      onPointerMove={e => {
        if (pointerInteracting.current !== null) {
          pointerInteractionMovement.current = (e.clientX - pointerInteracting.current) / 200
        }
      }}
      style={{ cursor: 'grab', width: '720px', height: '720px' }}
    />
  )
}
```

### Passo 8: Configurar o WhatsApp

Substituir em todos os componentes que usam contato:

```jsx
// Constante recomendada (definir uma vez e importar)
const WHATSAPP_NUMBER = '5511999999999'  // código do país + número sem símbolos
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

// Com mensagem pré-preenchida:
const sendMessage = (text) => {
  const encoded = encodeURIComponent(text || 'Olá, quero saber mais!')
  window.open(`${WHATSAPP_URL}?text=${encoded}`, '_blank')
}
```

### Passo 9: Adicionar Contadores Animados

```jsx
import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'

function AnimatedNumber({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const startTime = Date.now()
    const animate = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = value * eased
      setDisplay(Number.isInteger(value) ? Math.floor(current) : parseFloat(current.toFixed(1)))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  return <span ref={ref}>{prefix}{display.toLocaleString('pt-BR')}{suffix}</span>
}
```

### Passo 10: Build e Deploy

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview local do build
npm run preview
```

O `dist/` gerado pode ser hospedado em qualquer CDN estático (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

---

### Checklist de Personalização

Ao usar este projeto como base, altere:

- [ ] Logo: `/src/assets/logos/logo-principal.png`
- [ ] Favicon: `/public/favicon.png`
- [ ] Número WhatsApp: todas as ocorrências de `16475755252`
- [ ] Título e descrição: `index.html`
- [ ] Paleta de cores: variáveis `--blue-*` em `index.css`
- [ ] Typewriter words: array `typewriterWords` em `Hero.jsx`
- [ ] Textos do Hero: badge, título, subtítulo, badges de confiança
- [ ] Métricas do Stats: array `stats` em `Stats.jsx`
- [ ] Features: array `features` em `Features.jsx`
- [ ] Soluções: array `solutions` em `Solutions.jsx`
- [ ] Marcadores e arcos do globo: arrays `markers` e `arcs` em `Globe.jsx`
- [ ] Depoimentos: array `testimonials` em `Testimonials.jsx`
- [ ] Perguntas FAQ: array `faqs` em `FAQ.jsx`
- [ ] CNPJ no rodapé: `Footer.jsx`
- [ ] Links do rodapé: objeto `footerLinks` em `Footer.jsx`
- [ ] Mensagem padrão do chat: `FloatButton.jsx`

---

*Documento gerado a partir da análise completa do código-fonte do projeto Flux Payments Landing Page v1.*
