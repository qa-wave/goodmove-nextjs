# GoodMove Platform — kontext pro Claude Code

> Pražské studio fyzioterapie. Award-level platforma na Next.js + headless WordPress + Vercel.
> Projekt nahradí současný web (goodmove.cz), Reenio (rezervace) a Herohero (online videa) jednou platformou pro klienty, terapeuty a admin.

---

## Pracovní styl

Postupuj přímo k řešení. Když potřebuješ tool, analýzu nebo výpočet, udělej to rovnou. Neptej se na povolení, pokud to není kriticky nutné pro bezpečnost. Píšeš kód, který má vyhrávat ceny — ne tutorial. Češtinu používej v copy a komentářích k businessu, angličtinu v kódu (názvy proměnných, log messages, technical docs).

---

## Stav projektu (květen 2026)

**Schváleno:** Full verze, ~2,28 M Kč rozpočet, 20 týdnů, 7 fází. Cíl: Awwwards SOTD/SOTM Q3-Q4 2026, FWA, CSS Design Awards, Czech Grand Design 2027.

**Hotová dokumentace** (v paměti konverzace, ne v repu — viz sekce „Co uložit do `docs/`"):
- BA: 24 user stories s Gherkin AC (8 klient, 5 terapeut, 11 admin)
- PM: 20týdenní plán, 10 sprintů, 7 milestones, 20 rizik, 20 launch kritérií
- Brand v2: koncept „Linie", paleta Paper & Iron, fonts (Söhne / Source Serif / Geist / Berkeley Mono)
- UX v2: 5 flows (deník, cockpit, týdenník, Rut chatbot, Týdenní stopa)
- UI v2: design system + 3 signature patterns
- Copywriter: hero, 6 issues, Rut dialog (20 replik), email/SMS šablony, LLM system prompt
- Architektura: Next.js 15 + headless WP + Vercel + 12 architektonických rozhodnutí
- Backend: `goodmove-core` v2 plugin spec (12 tabulek, AES-256-GCM, JWT rotation, OpenAPI)
- Security: DPIA + STRIDE threat model + IR plán + go/no-go checklist

**Aktuální stav repa:** Next.js 14 SSR scaffold s hardcoded marketingovým obsahem, Tailwind, Framer Motion, Radix UI. Připraveno k upgradu na Next.js 15 a kompletní reimplementaci podle v2 designu.

---

## Klíčové rozhodnutí

### Brand a design
- **Koncept:** „Linie — Deník — Editorial". Linka jako vizuální metafora (anatomie, typografie, motion).
- **Primární claim:** „Dobrý tah." (ostatní 2 slogany retired)
- **Paleta Paper & Iron:**
  - `--bone #F4EFE6` (base warm paper)
  - `--paper #FAF7F1` (card surface)
  - `--ink #181613` (text)
  - `--clay #C85A3A` (accent — burnt terracotta, 1×/screen)
  - `--moss #2F3A2B` (CTA pozadí)
  - dark: `--ink-base #1A1815`, `--bone-soft #EDE4D4`, `--clay-warm #E07A5F`
- **Typografie:**
  - Display: **Reckless Neue** (fallback: Fraunces OFL)
  - Sans: **GT America** (fallback: Geist OFL)
  - Body serif: **Source Serif 4** (open-source)
  - Mono: **Berkeley Mono** (fallback: JetBrains Mono NL)
- **Tone of voice:** tykání. Krátké věty (max 6 slov v headline). Pauza = tečka. Sloveso v infinitivu nebo rozkazu. Žádný marketing jazyk. Žádné výkřičníky. Hlas: zkušený terapeut, který se dívá do očí.
- **Zakázaná slova:** holistický, synergie, revoluční, aktivovat fascie, blokády, 24/7, špičkový, exkluzivní.
- **Terminologie (uzamčená):** rezervace · lekce · terapeut · obor (ne „termín", „sezení", „specialista").

### 3 signature UI patterns (GoodMove vizitka)
1. **Týdenní stopa** — horizontální týdenní rezervační scroller, vertikální linka s dash-patternem podle vytíženosti, long-press 600 ms commit s radial progress + haptic, View Transitions API.
2. **Deník** — inline editovatelný odstavec místo formuláře (`„Dnes cítím bolest [vlevo v kříži] s intenzitou [5/10]"`). TipTap editor, autosave 2 s debounce. Vertikální timeline dashboard místo KPI karet.
3. **Telegrafní mřížka** — admin LLM ranní úvodník (Vercel Cron 6:00, AI SDK přes Gateway, Claude Sonnet 4, zero retention). Editorial sazba s římskou numerací sekcí.

### 6 služeb („Six Issues") s vlastním tahem
| N° | Služba | Tah (SVG path) |
|----|--------|----------------|
| 01 | Fyzioterapie | Rovná linka s ohybem (páteř) |
| 02 | DNS | Spirála z centra (diaphragma) |
| 03 | Fyziofitness | Ostrá lomená linka (kettlebell swing) |
| 04 | Dětská | Zaoblená osmička (hrubá motorika) |
| 05 | Sportovní | Dynamická křivka s akcelerací (sprint) |
| 06 | Poradna | Kruh, který se neuzavírá (dialog) |

URL slugs: `/sluzby/fyzioterapie/`, `/sluzby/dns/`, `/sluzby/fyziofitness/`, `/sluzby/detska/`, `/sluzby/sportovni/`, `/sluzby/poradna/`. `%` v `FYZIO%MOVE` přežívá **jen v print/Instagram brandingu**, ne v navigaci, URL ani metadatech.

### Dark mode strategie
| Screen | Default |
|--------|---------|
| Marketing homepage | Light |
| Klient deník + rezervace | Light (toggle v ⌘K) |
| Terapeut cockpit | **Dark** |
| Admin velitelství | **Dark** |
| Hero sekce | **Dark** (přechod na light při scrollu) |

Dark **není invert** — teplejší tóny, accent shifts k warmer, noise texture 6 %, fotky `filter: brightness(0.92) contrast(1.04)`.

---

## Tech stack

### Frontend (Vercel)
- **Next.js 15** App Router (Turborepo monorepo plánovaný)
- **Motion One** — page transitions, View Transitions API (NE Framer Motion — bundle size)
- **GSAP Business** — scroll-driven (horizontal scroll 6 services), licence ~$199/rok
- **Rive** — intro „tah" animace (NE Lottie — 10× menší runtime)
- **TipTap v2** — Deník editor (ProseMirror)
- **Radix UI** primitives + custom styling (NE shadcn/ui defaults)
- **Tailwind v4** s custom preset z design tokens

### Backend (Kinsta Frankfurt)
- **WordPress 6.7 + Bedrock** (Composer-managed, git-tracked)
- **PHP 8.3**, **MariaDB 11**, Object Cache Pro (Redis)
- Custom plugin **`goodmove-core` v2** — JWT auth, AES-256-GCM šifrování, REST `/wp-json/goodmove/v1/*`, OpenAPI 3.1 spec, audit log, RLS pro terapeuty
- **LatePoint Pro** (rezervace), **WooCommerce + Subscriptions** (platby), **FluentCRM** (email)

### Infra
- **Vercel** Pro: Fluid Compute (Node 24 LTS), AI Gateway, Blob (private), Queues, BotID, Rolling Releases
- **Neon Postgres** (pgvector pro semantic search v deníku)
- **Upstash Redis** (sessions, locks, rate limit)
- **Bunny Stream** (videa — nahrazuje Herohero)
- **Postmark** (email), **Twilio** (SMS), **Fakturoid** (účetnictví)
- **GoPay** (CZ karty primární) + **Stripe** (Apple/Google Pay) + **Comgate** (fallback)
- **Sentry** (errors, session replay), **Axiom** (log drain), **Better Stack** (uptime)

### Klíčová architektonická rozhodnutí
1. REST + `openapi-typescript` SDK (NE GraphQL)
2. Vlastní auth (NE NextAuth) — OTP, TOTP, rotating refresh tokens s family detection
3. Motion One všude (NE Framer Motion)
4. TipTap (NE custom contenteditable)
5. Server-side encryption (NE E2E) — LLM + terapeut potřebují přístup
6. Kinsta hosting (NE SpinupWP) — managed object cache + EU residency
7. Custom SVG sparklines (NE Recharts — 60 řádků vs. 45 KB)
8. Bedrock (NE vanilla WP) — reprodukovatelný CI/CD
9. Row-level security ve WP, ne v Next.js — single source of truth pro autorizaci
10. ISR + PPR pro marketing, streaming RSC pro dashboard
11. Service Worker pro offline deník (`@serwist/next`)
12. AES-256-GCM via libsodium, klíče v Vercel encrypted env, kvartální rotace

---

## Performance budget

- **LCP** < 1,2 s
- **INP** < 100 ms
- **CLS** < 0,05
- First load JS < **180 KB** gzipped
- Lighthouse Perf ≥ 95 (marketing), ≥ 90 (portály)
- A11y ≥ 95 všechny stránky
- axe-core: 0 critical, 0 serious

---

## Bezpečnost a GDPR

- **Anamnéza, SOAP, deník, body pain map, zprávy = GDPR Article 9** (zvláštní kategorie zdravotních dat)
- **AES-256-GCM** at-rest pro Article 9 data, klíč versioning, kvartální rotace
- **TLS 1.3** in-transit
- **2FA TOTP** povinné pro terapeut + admin role
- **JWT** access 15 min + refresh 30 d s rotation a family detection (reuse → revoke family)
- **Rate limiting** Upstash (auth 10/min/IP, booking 5/min/user, diary 30/min/user)
- **BotID** na booking + signup
- **Audit log** append-only, retention 24 měsíců, log drain do Axiom
- **DPO** externí (~20k Kč/měs), DPIA roční review
- **DPA + SCC** se všemi 16 zpracovateli
- **Retention zdravotních dat** 10 let po poslední lekci (zákon 372/2011 Sb.)

---

## Testing standards

- **PHPUnit 11** + WP test suite, **PHPStan level 8**, WPCS, infection MSI ≥ 80 % na crypto/auth
- **Vitest** + **Playwright** pro Next.js (Chromium + WebKit)
- **axe-core** a11y audit v CI
- **Lighthouse CI** s budget gate
- **Storybook** + **Chromatic** visual regression na PR
- Definition of Done per deliverable: AC splněna, code review (2 reviewers), unit+integration ≥ 80 %, e2e green, a11y pass, Lighthouse pass, OWASP ASVS L2 pass, dokumentace, PM + stakeholder sign-off

---

## Composer / npm pravidla

- **Pinned verze** v `composer.json` a `package.json` (ne `^`)
- Dependabot weekly + Snyk CI scan
- SBOM generation v CI
- Žádné secrets v repo: `.env` přes Bedrock dotenv, `git-secrets` + `gitleaks` v pre-commit
- Žádné `--no-verify` při commit/push (hooks musí pass)

---

## Open questions (blokují start, do T0+5 dní)

### Legal/GDPR
1. Article 17 erasure vs. 10letá retence (zákon 372/2011) — potřeba stanovisko právníka
2. Klasifikace GoodMove jako poskytovatel zdravotních služeb dle 372/2011
3. DPO interní vs. externí (doporučení: externí Aricoma/dot.Blue ~20k Kč/měs)

### Provozní
4. Reenio výpovědní lhůta (90 dní?) — pokud ano, **MUSÍ padnout do T1**
5. Reenio export přístup (API/SQL/CSV)
6. Herohero bulk export povolen?
7. GoPay smlouva (KYC 4-6 týdnů — start do T1)
8. Font licence Reckless Neue + GT America web s neomezenou doménou

### Technicko-produktové
9. Šifrovací klíč: dotenv v1, KMS ve v2?
10. 2FA enforcement: povinné Day 1, nebo opt-in první kvartál?
11. AI Gateway pro klinická data: výstupy klientovi přístupné, nebo jen interní?
12. Stack na klíče (Vault vs. AWS KMS vs. Vercel encrypted env)

---

## Co uložit do `docs/` (až bude potřeba)

Klíčové výstupy z týmu jsou aktuálně jen v paměti konverzace. Pokud chce uživatel jejich trvalé uložení v repu, vytvoř:

```
docs/
├── strategy/
│   ├── ba-user-stories.md          # 24 stories s Gherkin AC
│   ├── pm-sprint-plan.md           # 20týdenní plán
│   └── product-roadmap.md          # MVP/V2/V3 features
├── design/
│   ├── brand-guide-v2.md           # Linie + Paper & Iron
│   ├── ux-flows.md                 # 5 flows + signature patterns
│   ├── ui-design-system.md         # tokens + komponenty
│   └── copy-package.md             # všechny texty
├── architecture/
│   ├── system-architecture.md      # Next.js + WP + Vercel
│   ├── data-model.md               # 12 tabulek
│   ├── goodmove-core-spec.md       # WP plugin spec
│   └── adr/                        # ADRs (12 architektonických rozhodnutí)
└── security/
    ├── dpia.md                     # GDPR DPIA
    ├── threat-model.md             # STRIDE
    └── incident-response.md        # IR runbook
```

---

## Struktura kódu (cílová)

```
goodmove/
├── apps/
│   ├── web/                        # Next.js 15 frontend
│   │   ├── app/
│   │   │   ├── (marketing)/        # ISR + PPR
│   │   │   ├── (klient)/portal/    # client portal
│   │   │   ├── (terapeut)/cockpit/ # therapist panel
│   │   │   ├── (admin)/velitelstvi/ # admin
│   │   │   └── api/                # route handlers
│   │   └── lib/
│   │       ├── wp/                 # typed REST SDK (openapi-typescript)
│   │       ├── auth/               # JWT, session, 2FA
│   │       ├── crypto/             # AES-256-GCM
│   │       └── ai/                 # AI SDK v6 přes Gateway
│   └── wp-plugin/                  # goodmove-core (deploy přes GitHub Actions → Kinsta SSH)
├── packages/
│   ├── ui/                         # shared komponenty + tokens
│   ├── wp-sdk/                     # generated z OpenAPI
│   └── eslint-config/
└── docs/                           # viz výše
```

Zatím repo má jen `apps/web` flat (`src/`). Migrace na Turborepo je plánovaná v Sprint 0.

---

## Build / test / dev příkazy

```bash
# Dev
npm run dev                # next dev (port 3000)

# Quality
npm run lint               # eslint
npm run type-check         # tsc --noEmit

# Build
npm run build              # next build
npm start                  # next start

# Vercel
vercel                     # deploy preview
vercel --prod              # deploy production
vercel env pull            # sync env vars
```

Po Sprint 0 přibude:
```bash
pnpm test                  # vitest
pnpm test:e2e              # playwright
pnpm storybook             # storybook
composer test              # phpunit (wp-plugin)
```

---

## Vercel-specific

- **Fluid Compute** default (NE Edge Functions — kompatibilita)
- **AI SDK v6** přes Vercel AI Gateway, model stringy `"anthropic/claude-sonnet-4"` (NE provider packages)
- **Vercel Blob** pro encrypted PDF faktury, anamnéza exports
- **Vercel Queues** pro background joby (email, SMS, Fakturoid sync, key rotation)
- **Rolling Releases** pro admin features (5% → 25% → 100%)
- **vercel.ts** preferováno před `vercel.json`
- **Node.js 24 LTS** (NE 18 deprecated)

---

## Persony

- **Hana** (45, bolesti zad, poprvé online rezervace, iPhone Safari) — primary klient
- **Jakub** (35, terapeut, 2 ordinace, Android Chrome + iPad)
- **Kristýna** (40, manager + recepce, MacBook Chrome)
- **Oldřich Chramosta** — zakladatel, brand voice, autorita v DNS metodice

---

## Reference benchmarky (award-level laťka)

- **Linear.app** — command palette, density, focus rings
- **Anthropic.com / Claude.ai** — warm neutrals, serif display, klid
- **Stripe.com** — enterprise precision, dashboard
- **Rauno Freiberg / Vercel** — motion mikrodetaily, physicality
- **Family / Arc Browser** — hravost
- **Fantastic Man / Apollo / Kinfolk** — editoriální sazba
- **Readwise Reader** — typografie jako čtenářský zážitek
- **Parsley Health / Maven Clinic** — premium wellness UI

---

## Co NEDĚLAT

- Nepřejmenovat **GOODMOVE**
- Nepřidávat čtvrtý slogan — zůstává jen „Dobrý tah."
- Neimplementovat dark mode invertem — má vlastní atmosféru
- Nepoužívat Framer Motion (Motion One je 1/10 bundle)
- Nepoužívat shadcn/ui defaults — Radix primitives ano, defaults ne
- Nepoužívat Inter, Manrope, Playfair, Merriweather, Instrument Serif (overused)
- Nepoužívat Recharts pro sparklines — vlastní SVG (60 řádků)
- Neukládat Article 9 data nešifrovaná
- Neposílat PII do AI Gateway promptů (pre-redact povinné)
- Neimplementovat E2E šifrování deníku — server-side stačí (LLM + terapeut potřebují přístup)
- Nepřeskakovat git hooks (`--no-verify`)
- Necommitnout `.env`, klíče, secrets
