# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Mock/educational CMS for the UDELAR Chemistry Faculty homepage. **Not a production system** — it's a learning exercise for combining ASP.NET Core (Clean Architecture) with a React SPA. Written for a junior audience: keep changes consistent with the existing (deliberately simple) patterns rather than introducing new abstractions, libraries, or "more correct" architectures.

## Commands

### Backend (.NET 8, run from repo root)
```bash
dotnet restore
dotnet build
dotnet run --project Universidad.Web        # Development: http://localhost:5050
```
No test project exists in the solution yet.

### Frontend (`Universidad.Web/ClientApp`)
```bash
npm install       # or: bun install (csproj publish target uses bun — see below)
npm run dev        # Vite dev server; proxies /api -> http://localhost:5050
npm run build       # tsc -b && vite build, outputs to ../wwwroot
npm run lint
```
Run backend (`:5050`) and frontend dev server together during development — the Vite proxy in `vite.config.ts` forwards `/api` calls to the ASP.NET server.

### Production build
`Universidad.Web.csproj` runs `bun run build` inside `ClientApp` automatically as a pre-`Publish` MSBuild target, emitting into `Universidad.Web/wwwroot`, which `Program.cs` serves via `UseStaticFiles()` + `MapFallbackToFile("index.html")`.

## Architecture

Four-project Clean Architecture solution (`Universidad.sln`), dependency direction flows one way:

```
Universidad.Domain          entities, enums, repository interfaces (no dependencies)
        ^
Universidad.Application      DTOs, use-case interfaces, use-case implementations (depends on Domain)
        ^
Universidad.Infrastructure   EF Core DbContext + repository implementations (implements Domain interfaces)
        ^
Universidad.Web              Controllers, DI wiring (Program.cs), React SPA in ClientApp/
```

- **Domain**: `Entities/` (User, Group, UserGroup, Content), `Enums/` (Rol, ContentType), `Interfaces/` (I*Repository — the contracts Infrastructure implements).
- **Application**: one interface + one class per use case, e.g. `Interfaces/IUserLogin.cs` + `UseCases/UserLogin.cs`. DTOs live in `Dto/`. A controller action always goes through a use case, never touches a repository directly.
- **Infrastructure**: `Persistence/DbContext.cs` (`AppDbContext`, entity relationships configured in `OnModelCreating`) and `Repositories/` (EF-backed implementations of the Domain repository interfaces).
- **Web**: thin controllers under `Controllers/` that inject use-case interfaces and translate results to `IActionResult`. `Program.cs` wires every repository and use case by hand with `builder.Services.AddScoped(typeof(IX), typeof(X))` — when adding a new use case, follow this same manual registration pattern (no assembly scanning is used).

### Adding a new use case (the established pattern)
1. Interface in `Universidad.Application/Interfaces/`.
2. Implementation in `Universidad.Application/UseCases/`, constructor-injecting the relevant `I*Repository` from Domain.
3. DTOs (records) in `Universidad.Application/Dto/` for input/output shape.
4. Register both repository and use case in `Program.cs` (`AddScoped`).
5. Call it from a controller action in `Universidad.Web/Controllers/`, wrapping in try/catch and mapping exceptions to `BadRequest`/`Unauthorized` as the existing controllers do.

### Database
SQLite, file `university.db` at the Web project root (gitignored). No EF migrations are used — schema is created via `db.Database.EnsureCreated()` at startup in `Program.cs`. If you change an entity shape, delete `university.db` locally to pick up the new schema (there's no migration path).

### Auth
Cookie-based auth is configured in `Program.cs` (`AddAuthentication` + `AddCookie`, 8h sliding expiration) but no controller currently applies `[Authorize]` — all endpoints are open. Password hashing uses `BCrypt.Net`.

### Frontend structure (`ClientApp/src`)
- `pages/Panel/*` — the admin panel (Dashboard, Users, Groups, Content, Login, Profile), routed inside `layouts/PanelLayout.tsx`.
- `pages/Home` — public site, inside `layouts/MainLayout.tsx`.
- `components/ui/*` — one folder per component, each with its own `.tsx` + `.css` (no CSS modules/styled-components — plain scoped-by-convention CSS files, follow this for new components).
- `services/*` — `fetch`-based API clients (see `user.service.ts`); only the Users flow is currently wired to the backend.
- Path aliases (`@components`, `@services`, `@hooks`, `@utils`, `@types`, `@pages`) are defined in `tsconfig.app.json` — use them instead of relative `../../..` imports.

## Design System

The frontend's visual language is **Swiss Modernism 2.0 + Minimalism** (primary) with
**Trust & Authority** and **Accessible & Ethical** as secondary influences — chosen from the
`ui-ux-pro-max` skill's own product-type catalog (`data/products.csv`, row 185:
"Research Lab / University Department"), not improvised per-component. Do not introduce a
different visual paradigm (glassmorphism, claymorphism, brutalism, etc.) without updating this
section first — past sessions drifted between styles component-by-component and it read as
inconsistent/generic.

| Aspect | Rule |
|---|---|
| Grid | 12 columns, `gap: 1rem`, 8px base spacing unit — keep spacing values multiples of 8 |
| Color | Black/white/`#F5F5F5` base with **one** vibrant accent: the real FQ orange `#FF3B01` (from prueba.fq.edu.uy). No decorative multi-color palette |
| Decoration | Minimal. No gradients, no glassmorphism, no soft "clay" double-shadows. Border radius small or none (0–4px) |
| Shadow | One subtle, professional shadow: `0 4px 6px rgba(0,0,0,0.1)` — not a hard offset (brutalist), not soft/doubled (claymorphism) |
| Typography | Inter (or equivalent grotesque) for body/UI. A serif is reserved for headings only (`--fq-font-display`) — the product-row's own nuance for academic/research sites |
| Hexagon motif | The benzene-ring hexagon badge is a brand signature (from the real chemistry subject matter, not the skill) — flat fill, no shadow/gradient, consistent with "minimal decoration" |
| Accessibility | 7:1 text contrast (WCAG AAA, per Accessible & Ethical), 16px+ base font, 3–4px focus rings, 44×44px touch targets, `prefers-reduced-motion` respected |
| Motion | Minimal — only what conveys state feedback, no bounce/spring easing |

Tokens live in `Universidad.Web/ClientApp/src/index.css` (`--fq-*` custom properties).

### Current implementation state (important — avoid "fixing" what's intentionally scaffolded vs. what's actually broken)
- `ContentController`/`ContentRepository` and most of `GroupController`/`GroupRepository` are stubs (`NotImplementedException` or `Task.FromResult<IActionResult>(null)`), per the TODOs in `BACKEND.md`.
- Only the Users panel page calls real endpoints (`create`, `list`); edit/delete/password-change in `Users.tsx` are local-state-only simulations with no backing endpoint yet.
- `BACKEND.md` and `Universidad.Web/ClientApp/FRONTEND.md` track the two outstanding TODO lists — check them for what's intentionally left unfinished before assuming something is a bug.
