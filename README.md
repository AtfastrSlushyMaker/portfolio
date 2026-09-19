# Malek Bsaissa | Portfolio

Personal portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

[Published website](https://malekbsaissa.vercel.app/) (local changes are not automatically published).

## Design and interaction

A black-and-white typographic hero with electric-blue accents introduces a fifth-year engineering student seeking an end-of-study internship. Neutral dark and light modes, interaction transitions, and project-specific architecture diagrams replace decorative 3D artwork. The project highlight moves between selections; details settle into place; the mobile menu expands and collapses; supported browsers animate experience disclosures; theme changes use a circular reveal originating at the theme toggle. Animation runs by default and automatically respects the system reduced-motion preference, without a separate motion button. Text remains visible without animation. A pointer-following mask reveals electric blue within the name and contact heading, while their base text always remains visible. It runs only in response to pointer movement and is disabled on touch and reduced-motion devices. No 3D renderer or looping decorative animation is included.

Eight projects share one filterable browser: AtlasMesh, Elif, hybrid cloud infrastructure, The 12th Player, MEMO, WamiaGo, MySkills, and Elif AI Agent. Each has a role, description, technologies, and real source links. The page also includes native experience disclosures, a GitHub activity calendar with an unavailable-state fallback, email copying, and a résumé viewer with a download link.

Project data lives in `src/lib/projects.ts`; architecture summaries are in `src/components/project-architecture.tsx`. OpenStack service descriptions distinguish infrastructure capabilities from the final application storage configuration.

## Content provenance

The September 2026 refresh uses the existing Obsidian second brain's Projects and Portfolio, Elif deployment and knowledge-base notes, AtlasMesh notes, and MEMO internship notes. Project details were cross-checked with the corresponding local repository READMEs. Team and solo contributions are distinguished. Infrastructure demos are not described as always-on public services. Private reports, operational endpoints, and credentials are excluded. The existing CV PDF has not been regenerated.

## Typography

Basteleur Moonlight by Keussel / Velvetyne is self-hosted under the SIL Open Font License 1.1. [Official typeface page](https://velvetyne.fr/fonts/basteleur/). The license is included at `public/fonts/Basteleur-LICENSE.txt`. Body text uses the platform's Arial/Helvetica sans-serif stack.

## Development

```sh
npm install
npm run dev
npm run lint
npm run build
```

Open http://localhost:3000. Production Clarity analytics run only in production; Vercel analytics and speed insights retain their existing integration.

## Useful next additions

- Actual product screenshots and short case studies, beginning with AtlasMesh, Elif, and The 12th Player.
- A refreshed résumé PDF that matches the verified portfolio content.
- Short engineering notes about specific decisions, such as satellite rendering, hybrid-cloud scheduling, or football model evaluation.

## Logo attribution

OpenStack project mascots are official OpenStack assets, used unmodified under CC BY-ND. Source: https://www.openstack.org/project-mascots/. Technology marks use Simple Icons. Logos identify technologies used and do not imply endorsement.
