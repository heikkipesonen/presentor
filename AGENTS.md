# Agent Instructions

## Git & Commits

- Use conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`
- Create a commit after each completed feature
- Never push unless explicitly told to
- Keep commits atomic — one feature or fix per commit

## Testing

- Every feature must have tests before it is considered complete
- Run tests before committing to ensure nothing is broken
- Test files live in `__tests__` folders co-located with source: `src/__tests__/parser.test.ts`, etc.

## Code Quality Checks (before committing)

- Verify the feature has tests
- Check for dead code — remove unused imports, functions, variables
- Run `npx tsc --noEmit` to ensure no type errors

## Code Style

- Prefer `const` over `let` — only use `let` when mutation is truly necessary
- Never rename existing variables — use consistent naming throughout
- Prefer `const` declarations and functional patterns over mutation

## Error Handling

- Log errors to console (`console.error`) — no user-facing error UI for now

## Dependencies

- No external npm dependencies — vanilla TypeScript only

## CSS

- Use CSS variables for colors, fonts, spacing
- Keep theming in mind — all visual values should be overridable via CSS variables

## Workflow

1. Implement the feature
2. Write tests for it
3. Remove any dead code
4. Update PLAN.md if the feature changes scope or adds new items
5. Type-check with `npx tsc --noEmit`
6. Run tests
7. Commit with conventional commit message
8. Wait for push command
