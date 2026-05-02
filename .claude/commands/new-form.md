# /new-form

Scaffold a React Hook Form + Zod form component inside the current feature.

## Usage

```
/new-form <FormName> <field1,field2,...> [mutationName]
```

Example: `/new-form ContactForm name,email,message submitContact`

## What to create

1. Zod schema + inferred type (in feature `types.ts` or inline)
2. Form component using `useForm` with `zodResolver`
3. Reusable field components from `src/components/forms/`
4. Submit handler that calls a TanStack Query `useMutation`
5. Error and loading state on the submit button

## Available field components (`src/components/forms/`)

| Component          | Use for                      |
| ------------------ | ---------------------------- |
| `AppTextField`     | text, email, password inputs |
| `AppTextareaField` | multiline text               |
| `AppSelectField`   | dropdown / select            |
| `AppCheckboxField` | boolean checkbox             |

Each accepts `name`, `control`, `label` and forwards errors automatically.

## Form component template

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppButton } from "@/components/ui/AppButton";
import { AppTextField } from "@/components/forms/AppTextField";
import { formNameSchema, type FormNameValues } from "../types";
import { useFormNameMutation } from "../services/formNameService";

export function FormName() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormNameValues>({
    resolver: zodResolver(formNameSchema),
    defaultValues: { fieldOne: "", fieldTwo: "" },
  });

  const mutation = useFormNameMutation();

  return (
    <form onSubmit={handleSubmit(data => mutation.mutate(data))} noValidate>
      <AppTextField name="fieldOne" control={control} label="Field One" />
      <AppTextField name="fieldTwo" control={control} label="Field Two" />
      {mutation.error && <p role="alert">{String(mutation.error)}</p>}
      {mutation.isSuccess && <p>Submitted successfully!</p>}
      <AppButton type="submit" loading={isSubmitting || mutation.isPending}>
        Submit
      </AppButton>
    </form>
  );
}
```

## Rules

- Always `noValidate` on the `<form>` element — Zod handles all validation.
- Use `control` + Controller-based field components. Never use `register`.
- Field `name` prop must match the Zod schema key exactly.
- Display both `mutation.error` (failure) and `mutation.isSuccess` (success) to the user.
- Use `AppButton` with `loading` prop during submit — disable while `isPending`.

## After scaffolding

- Run `npm run lint` — zero errors required.
- Remind the user to fill in the Zod schema fields and mutation function.
