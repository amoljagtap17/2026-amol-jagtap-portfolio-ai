---
name: Portfolio project setup
description: Core project context — tech stack decisions, key constraints, and Claude Code AI setup
type: project
---

React 19 + TypeScript 6 + Vite 8 personal portfolio app. All npm packages installed. Tests/E2E to be added later.

**Why:** Senior React Developer building a personal portfolio with AI-assisted development via Claude Code. Goal is rapid, advanced React app development.

**Key constraints:**

- graphql-request is the **primary** HTTP client — axios is secondary REST fallback only
- Custom Emotion-styled components wrap MUI — no raw MUI in pages or features
- All forms: react-hook-form + Zod + zodResolver + reusable field components from src/components/forms/
- Zustand for UI state; TanStack Query for server state — never mix
- Design: cream bg `#FAFAF7`, gold accent `#FFD700`, clean sans-serif, illustrated characters

**Architecture:** Vertical feature slices at `src/features/<name>/{components,hooks,services,types.ts,index.ts}`

**Claude Code setup (in .claude/):**

- `settings.json`: PostToolUse hook auto-runs `prettier:write` after every file write
- `commands/`: `/new-component`, `/new-page`, `/new-feature`, `/new-form`
- `agents/`: `ui-component-agent`, `feature-agent`, `graphql-service-agent`
- `memory/`: this folder — project memory for AI context

**How to apply:** CLAUDE.md is the authoritative reference. Always follow vertical slice architecture and the data/state split when building features.

**PRD:** To be created separately as `docs/PRD.md` (follow-up task).
