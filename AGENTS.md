# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 16** frontend-only marketing site (no backend, database, or external services). All content is static TypeScript data in `src/data/`.

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000, uses `--webpack` flag) |
| Lint | `npm run lint` |
| Build | `npm run build` |

### Notes

- The dev script uses `next dev --webpack` (not Turbopack). The build uses Turbopack by default.
- There are no automated tests configured in this project (no test script in `package.json`).
- No `.env` files or environment variables are needed.
- Pages: `/`, `/games`, `/about`, `/contact`. All statically rendered.
- Animations use GSAP + ScrollTrigger for scroll-driven motion scenes (`src/components/motion/scenes/`).

### Skills

- `.cursor/skills/frontend-design.md` — Create distinctive, production-grade frontend interfaces with high design quality. Use when building or modifying web components, pages, or UI.
