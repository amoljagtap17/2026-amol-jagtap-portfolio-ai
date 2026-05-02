# CLAUDE.md — Amol Jagtap Portfolio AI

Personal portfolio site built by a Senior React Developer, AI-assisted via Claude Code.
Design goal: cream/off-white background (`#FAFAF7`), gold accent (`#FFD700`), clean sans-serif,
illustrated characters, section-by-section landing page (Nav → Hero → Services → About →
Portfolio → Experience Timeline → Testimonials → Articles → Newsletter → Footer).

PRD: `docs/PRD.md` (created separately — defines all sections, content, and design specs).

---

## Dev Commands

| Command                  | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| `npm run dev`            | Dev server at http://localhost:3000      |
| `npm run build`          | TypeScript check + Vite production build |
| `npm run lint`           | ESLint across all TS/TSX files           |
| `npm run preview`        | Preview production build locally         |
| `npm run prettier:write` | Format all files in-place                |
| `npm run prettier:check` | CI-safe format check (no writes)         |

Pre-commit: Husky runs `lint-staged` → Prettier formats staged files automatically.
Path alias: `@/*` maps to `./src/*` (e.g. `import { Button } from "@/components/ui/Button"`).

---

## Tech Stack

| Package                      | Role                                                      |
| ---------------------------- | --------------------------------------------------------- |
| React 19 + TypeScript 6      | UI layer; strict mode always on                           |
| Vite 8                       | Build tool; dev server on :3000; `@/*` path alias         |
| React Router 7               | Client-side routing; lazy imports for code splitting      |
| MUI 9 + Emotion styled/react | Component primitives + CSS-in-JS engine                   |
| Zustand 5 + Immer            | Global UI state (theme preference, modal open, nav state) |
| TanStack Query v5            | Server/async state; all API data fetched through here     |
| React Hook Form 7 + Zod 4    | Form state + runtime schema validation                    |
| @hookform/resolvers          | Bridges Zod schemas into react-hook-form                  |
| graphql-request 7            | **Primary** HTTP client — use for all API calls           |
| axios 1.x                    | Secondary — REST-only fallback when no GraphQL equivalent |
| better-auth                  | Authentication (sessions, tokens)                         |
| ag-grid-enterprise           | Heavy data table needs only                               |
| Tiptap 3                     | Rich text / blog editor                                   |
| react-error-boundary         | Wrap all async boundaries; every route gets one           |

---

## src/ Architecture

```
src/
  assets/             # Static images, SVGs
  components/
    ui/               # Shared UI primitives (Button, Card, Badge, Input…)
    layout/           # AppShell, Navbar, Footer, Section wrappers
    forms/            # Reusable RHF field components
  features/           # Vertical feature slices (home, portfolio, experience…)
  hooks/              # Shared custom hooks
  lib/                # Third-party config: queryClient, graphqlClient, theme
  pages/              # Route-level shells (thin — compose features)
  router/             # Route definitions
  store/              # Zustand stores
  types/              # Shared TypeScript interfaces and Zod schemas
  utils/              # Pure helper functions
  main.tsx
  App.tsx
```

### Feature Slice Shape

```
src/features/<featureName>/
  components/         # Private feature components
  hooks/              # Feature-local custom hooks
  services/           # GraphQL documents + TanStack Query hooks
  store.ts            # Zustand slice (only when UI state is needed)
  types.ts            # Zod schemas first, z.infer<> types second
  index.ts            # Public barrel — export only the top-level component
```

---

## Styling Rules

- **Design tokens** in `src/lib/theme.ts` — MUI `createTheme` extended with custom palette,
  typography, and spacing. Always import tokens from here.
- **Accent**: `#FFD700` | **Background**: `#FAFAF7` | **Text**: `#1A1A1A`
- ALL component styles via `@emotion/styled`. No `sx` prop in pages or features. No inline styles.
- Wrap every MUI primitive into a named component in `src/components/ui/` before use elsewhere.
  - Correct: `import { AppButton } from "@/components/ui/AppButton"`
  - Wrong: `import Button from "@mui/material/Button"` inside a page or feature
- Responsive breakpoints follow MUI defaults (xs / sm / md / lg / xl).
- Global CSS overrides go in `src/lib/theme.ts` under the `components` key.

---

## Forms Pattern

All forms use React Hook Form + Zod. Never use uncontrolled `<input>` elements directly.

```ts
// 1. Define schema in types.ts
const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});
type ContactFormValues = z.infer<typeof contactSchema>;

// 2. Use reusable field components from src/components/forms/
// AppTextField, AppSelectField, AppCheckboxField, AppTextareaField
// Each accepts: name, control, label (forwards to MUI inside Emotion wrapper)

// 3. Wire up in the feature component
const { control, handleSubmit } = useForm<ContactFormValues>({
  resolver: zodResolver(contactSchema),
});
```

- Always use `noValidate` on the `<form>` element.
- Use `control` + Controller-based field components — never `register`.
- Submit via TanStack Query `useMutation`; display `mutation.error` and `mutation.isSuccess`.

---

## Data Fetching Pattern

**Primary: graphql-request + TanStack Query**

```ts
// src/lib/graphqlClient.ts
import { GraphQLClient } from "graphql-request";
export const gqlClient = new GraphQLClient(import.meta.env.VITE_API_URL);
```

```ts
// src/features/portfolio/services/portfolioService.ts
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { gqlClient } from "@/lib/graphqlClient";

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      slug
    }
  }
`;

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => gqlClient.request<{ projects: Project[] }>(GET_PROJECTS),
    select: data => data.projects,
  });
}
```

**Secondary: axios** — only for REST endpoints with no GraphQL equivalent.
Import from `src/lib/axiosClient.ts`.
TanStack Query config in `src/lib/queryClient.ts` — staleTime 5 min, retry 2.

---

## State Management Split

| Concern                      | Tool            |
| ---------------------------- | --------------- |
| API / server data            | TanStack Query  |
| Theme preference, modal open | Zustand store   |
| Nav open, sidebar state      | Zustand store   |
| Form state                   | React Hook Form |
| Ephemeral UI (hover, focus)  | local useState  |

Zustand stores live in `src/store/` and use Immer middleware. One store per domain
(`uiStore.ts`, `authStore.ts`). Never store server data in Zustand.

---

## Claude Code AI Setup

Project `.claude/` folder (committed to git):

- `settings.json` — PostToolUse hooks (auto-Prettier after every file write), safe permissions
- `commands/` — Custom slash commands: `/new-component`, `/new-page`, `/new-feature`, `/new-form`
- `agents/` — Sub-agent definitions: `ui-component-agent`, `feature-agent`, `graphql-service-agent`

User-level memory: `C:\Users\Amol\.claude\projects\c--2026-portfolio-projects-2026-amol-jagtap-portfolio-ai\`
MCP: Google Drive available (needs auth via `mcp__claude_ai_Google_Drive__authenticate`).
