# AgroMetha — site vitrine

Site one-page scrollytelling pour la centrale de méthanisation AgroMetha SARL (250 kW, Péni, près de Bobo-Dioulasso, Burkina Faso).

Direction artistique : **mode clair dominant** — fonds blanc cassé / vert très pâle, vert profond et noir en accents (titres, contours, graphismes), halos lumineux sur les éléments d'énergie.

## Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- Framer Motion · GSAP + ScrollTrigger · Lenis · lucide-react

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Éditer le contenu (sans toucher aux animations)

Tout le copy et les chiffres sont dans **`content/site.ts`**.

- `confirmed: false` affiche le badge `[À CONFIRMER]`
- Liste des assets à remplacer : `site.placeholders`

Remplacements visuels :

| Fichier | Usage |
|---|---|
| `public/placeholders/logo.svg` | Logo (le header utilise aussi `components/chrome/Logo.tsx`) |
| Section Projet | Photo de la centrale (composant `Placeholder`) |
| `content/site.ts` → `project.partners` | Noms / logos partenaires |
| `content/site.ts` → `impact.stats` | Chiffres définitifs |
| `content/site.ts` → `contact.details` | E-mail, téléphone |

## Structure

```
app/                  layout, page, API contact
content/site.ts       textes & chiffres
components/sections/  une section de scroll = un fichier
components/scenes/    illustrations SVG
components/motion/    RevealText, compteurs, StickyStage, effets typo du hero
components/chrome/    nav, curseur, barre de progression
```

## Direction artistique

Les couleurs sont définies **deux fois, en miroir** — garder les deux en phase :

- `tailwind.config.ts` → tokens utilitaires (`bg-canvas`, `text-ink`, `text-volt-deep`…)
- `app/globals.css` → variables CSS `:root` (utilisées par les scènes SVG et les effets typo)

| Rôle | Token | Hex |
|---|---|---|
| Fond principal | `canvas` | `#F7F8F4` |
| Fond alterné | `canvas-alt` / `canvas-veil` | `#EEF2EA` / `#E4EDE2` |
| Encre / titres | `ink` / `ink-soft` / `ink-mute` | `#0A0F0C` / `#37443C` / `#6E7D73` |
| Vert profond | `forest` | `#14372A` |
| Vert signature | `agro` | `#4A7C4E` |
| Énergie (électricité) | `volt` / `volt-deep` | `#12BE85` / `#0A8C61` |
| Matière (biogaz, déchets) | `amber` / `amber-deep` | `#D89A3F` / `#9E6519` |
| Traits | `line` / `line-strong` | `#D7E0D4` / `#B4C4B2` |

Typo display : **Archivo variable**, axe `wdth` piloté par `--display-wdth` (78) dans `.text-display`.

## Animation — un seul système

Les sections narratives utilisent **`usePinnedScene` + `ScrollPanel`** et rien d'autre :

```tsx
const ref = usePinnedScene<HTMLElement>({
  length: 200,                       // durée du pin, en % de viewport
  reducedState: () => { /* état final immédiat */ },
  build: (tl) => { tl.to(…, 0.4) },  // 0.4 == 40 % du scroll dans la section
});
return <section ref={ref}><ScrollPanel>…</ScrollPanel></section>;
```

Règles à respecter :

- **La timeline dure exactement 1.** Un tween-repère la verrouille ; une position
  dans `build` est donc littéralement une fraction du scroll de la section.
  Aucun tween ne doit se terminer après `1` (`durée + stagger × (n-1)`) — un
  `console.warn` en dev le signale.
- **Le contenu doit tenir dans un viewport.** `ScrollPanel` fait `h-svh` :
  budgets calés pour tenir à partir de ~700 px de hauteur utile. Les scènes SVG
  sont bridées en `max-h-[Nsvh]`.
- **Les décors** (lignes, halos) passent par la prop `backdrop` de `ScrollPanel`,
  pas sur la `<section>` : une fois pinnée, la section est aussi haute que la
  distance de pin et un fond posé dessus serait étiré sur plusieurs écrans.
- **`prefers-reduced-motion`** : plus de pin, `ScrollPanel` reprend une hauteur
  naturelle, `reducedState()` pose l'état final, les boucles CSS sont coupées.

## Performance du scroll — pièges à ne pas réintroduire

| À éviter | Pourquoi |
|---|---|
| `mix-blend-mode` sur un overlay `fixed` plein écran | force la recomposition de toute la page à chaque frame |
| `backdrop-filter` en nombre | une passe de flou par élément ; `.glass` s'en passe, `.glass-blur` est réservé aux cas posés sur un halo |
| `setState` dans un handler `scroll` ou un `onUpdate` ScrollTrigger | re-render React à chaque frame — écrire dans le DOM via rAF ou laisser GSAP le faire |
| animer un élément `blur-2xl`/`blur-3xl` | re-rasterisation d'un gros calque flouté par frame |
| boucles CSS infinies sans garde | `OrganicLines` / `OrganicParticles` se mettent en pause hors viewport via IntersectionObserver |

## Photo du site (section 09)

Déposer le fichier dans `public/`, puis renseigner `projectPhoto` dans
`content/site.ts`. Tant qu'il vaut `null`, la section affiche le cadre
placeholder. Le rendu passe par `next/image` (lazy-loading, AVIF/WebP) avec le
traitement colorimétrique du site.

## Déploiement Vercel

1. Pousser le repo sur GitHub
2. [vercel.com/new](https://vercel.com/new) → importer le projet
3. Framework : Next.js (détecté) · Build : `next build`
4. Déployer

Le formulaire `POST /api/contact` valide et logge le message. Brancher un mailer / CRM dans `app/api/contact/route.ts` avant la mise en production.

## Accessibilité

`prefers-reduced-motion` : pas de pin, pas de Lenis, scènes en état final, compteurs à la valeur cible.
# agrometha
