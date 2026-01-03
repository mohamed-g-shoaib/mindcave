# Project Rules

- Always memorize the content of `/docs/agent.md`, it is the agent's role and guidelines.

- Use **/docs** as the canonical source of truth.

- Project is Type safe, therefore disallow any, permit unknown only when needed, then refine.

- Project is built with Shadcn/ui on top of Base UI → `/docs/base-ui-llms.txt` and `/docs/shadcn-ui-llms.txt` so do not create custom components instead use the provided txt files to fetch the desired component url and generate components based on the guidelines.

- Project uses pnpm as the package manager.

- No inline CSS allowed, prioritize tokenization over inline CSS.

- Prefer files under 150–200 lines, split by logical responsibility.

- Always use skeleton/loading states.

- Always show success/failure feedback using a Toast or Sonner.

- Read package.json for dependencies and devDependencies to understand the project structure.

- Always tell your honest unbiased opinion when asked.
