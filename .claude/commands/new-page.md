# /new-page

Scaffold a new route page and its corresponding feature slice.

## Usage

```
/new-page <PageName> <route-path>
```

Example: `/new-page About /about`

## What to create

1. `src/pages/<PageName>Page.tsx` — thin route shell
2. `src/features/<pageName>/` — feature slice (follow `/new-feature` pattern)
3. Add lazy route entry to `src/router/routes.tsx` (create if it doesn't exist)

## Page shell template

```tsx
import { ErrorBoundary } from "react-error-boundary";
import { PageNameFeature } from "@/features/pageName";

export default function PageNamePage() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <PageNameFeature />
    </ErrorBoundary>
  );
}
```

## Router entry (React Router 7, lazy)

```tsx
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

const PageNamePage = lazy(() => import("@/pages/PageNamePage"));

export const router = createBrowserRouter([
  {
    path: "/route-path",
    element: (
      <Suspense fallback={null}>
        <PageNamePage />
      </Suspense>
    ),
  },
]);
```

## Rules

- Pages are thin shells — NO business logic, NO data fetching, NO styled components.
- All content lives in the corresponding feature under `src/features/`.
- Every page must be wrapped with `<ErrorBoundary>`.
- Use React Router 7 `lazy()` import for code splitting on every page.
- Route path must be added to `src/router/routes.tsx`.

## Landing page sections (home feature)

The home page composes these section components from `src/features/home/components/`:
`HeroSection`, `MarqueeSection`, `ServicesSection`, `AboutSection`,
`PortfolioSection`, `ExperienceSection`, `TestimonialsSection`,
`ArticlesSection`, `NewsletterSection`.

## After scaffolding

- Run `npm run lint` and fix all errors.
- Confirm the route appears in `src/router/routes.tsx`.
