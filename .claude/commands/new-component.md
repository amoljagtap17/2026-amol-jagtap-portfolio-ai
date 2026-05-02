# /new-component

Scaffold a new shared UI component in `src/components/ui/`.

## Usage

```
/new-component <ComponentName>
```

Example: `/new-component AppButton`

## What to create

1. `src/components/ui/<ComponentName>/<ComponentName>.tsx` — component implementation
2. `src/components/ui/<ComponentName>/<ComponentName>.types.ts` — props interface
3. `src/components/ui/<ComponentName>/index.ts` — barrel export
4. Update `src/components/ui/index.ts` to re-export the new component (create the barrel if it doesn't exist)

## Rules

- NEVER import from `@mui/material` directly in the component file — always wrap the MUI primitive.
- ALL styles via `@emotion/styled`. No `sx` prop. No inline style objects.
- Props interface extends the appropriate HTML element interface (e.g. `ButtonHTMLAttributes<HTMLButtonElement>`).
- Named export only — no default export from the component file.
- Use design tokens from `src/lib/theme.ts`. Fallback to raw values only if token doesn't exist yet.

## File templates

**ComponentName.types.ts**

```ts
import { ButtonHTMLAttributes } from "react";

export interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
}
```

**ComponentName.tsx**

```tsx
import styled from "@emotion/styled";
import { AppButtonProps } from "./AppButton.types";

const StyledButton = styled.button<{ variant: AppButtonProps["variant"] }>`
  /* use theme tokens for colors, spacing, border-radius */
`;

export function AppButton({
  variant = "primary",
  loading,
  children,
  ...props
}: AppButtonProps) {
  return (
    <StyledButton
      variant={variant}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "…" : children}
    </StyledButton>
  );
}
```

**index.ts**

```ts
export { AppButton } from "./AppButton";
export type { AppButtonProps } from "./AppButton.types";
```

## After scaffolding

- Run `npm run lint` and fix any errors before reporting done.
- Ask the user if they want a usage example or Storybook story.
