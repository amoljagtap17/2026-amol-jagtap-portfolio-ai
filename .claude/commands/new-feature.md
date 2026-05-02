# /new-feature

Scaffold a complete vertical feature slice in `src/features/`.

## Usage

```
/new-feature <featureName> [--form] [--graphql]
```

Example: `/new-feature portfolio --graphql`
Example: `/new-feature contact --form --graphql`

## Directory structure to create

```
src/features/<featureName>/
  components/
    <FeatureName>.tsx       # Top-level orchestrator component
  hooks/
    use<FeatureName>.ts     # Business logic hook (if needed)
  services/
    <featureName>Service.ts # graphql-request + TanStack Query (if --graphql)
  store.ts                  # Zustand slice (ONLY if UI state is needed)
  types.ts                  # Zod schemas first, z.infer<> types second
  index.ts                  # Public barrel — export only the top-level component
```

## Minimal types.ts template

```ts
import { z } from "zod";

export const featureNameSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export type FeatureNameItem = z.infer<typeof featureNameSchema>;
```

## Minimal index.ts

```ts
export { FeatureName } from "./components/FeatureName";
```

## Rules

- `index.ts` exports ONLY the top-level feature component. All other internals are private.
- `types.ts` defines Zod schemas first; TypeScript types are always derived via `z.infer<>`.
- No raw MUI in feature components — always import from `@/components/ui/`.
- All styles via `@emotion/styled`. Import from a sibling `FeatureName.styles.ts` if many styles.
- If `--graphql`: scaffold `services/<featureName>Service.ts` using graphql-request + TanStack Query.
- If `--form`: scaffold a form component using react-hook-form + Zod resolver.
- Wrap the top-level component with `<ErrorBoundary>` from `react-error-boundary`.
- Run `npm run lint` and fix all errors before responding.

## State decision tree

| What is it?                | Use               |
| -------------------------- | ----------------- |
| Data from an API           | TanStack Query    |
| Modal open / UI toggle     | Zustand `uiStore` |
| Form values                | React Hook Form   |
| Hover, focus, local toggle | `useState`        |

## After scaffolding

- Confirm `index.ts` only exposes the public API.
- Run `npm run lint` — zero errors required.
- Tell the user which files were created and what to fill in (GraphQL query, form fields, etc.).
