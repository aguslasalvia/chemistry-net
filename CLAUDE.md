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
- **File/folder naming: kebab-case, always** — `site-header.tsx`, not `SiteHeader.tsx`; `not-found/not-found.tsx`, not `NotFound/NotFound.tsx`. Component/type names inside the file stay PascalCase as normal TS/React identifiers (`const SiteHeader = () => ...`); only the filesystem path is kebab-case. This applies to every file under `src/` — pages, layouts, hooks, sections, `ui/*`.
- `pages/panel/*` — the admin panel (dashboard, users, groups, content, login, profile), routed inside `layouts/panel-layout.tsx`.
- `pages/home` — public site, inside `layouts/main-layout.tsx`.
- `components/ui/*` — one folder per component, each with its own `.tsx` (no `.css` file — styling is Tailwind utility classes directly in JSX; no CSS modules/styled-components either — `map/map.css` is the sole exception, since Leaflet injects its own DOM that can't be reached with Tailwind classes). `components/sections/*` holds the public-landing sections (hero, stats, institucion, carreras, novedades, contacto).
- `services/*` — `fetch`-based API clients (`user.service.ts`, `group.service.ts`, `content.service.ts`); Login, Users, Groups and Content (read) are wired to the backend.
- `data/home.ts` — static content for the landing (stats, carreras, noticias) transcribed from the mockup; not fetched from the backend.
- Path aliases (`@components`, `@services`, `@hooks`, `@utils`, `@models`, `@pages`, `@data`) are defined in `tsconfig.app.json` — use them instead of relative `../../..` imports. Note: the alias is `@models` (not `@types`) — TypeScript's compiler special-cases any path alias literally named `@types/*`, so it was renamed to avoid `TS6137` build errors.

#### Adding a new page or component (the established pattern)
1. Create `src/pages/<section>/<name>/<name>.tsx` (or `src/components/ui/<name>/<name>.tsx` for a reusable piece) — kebab-case folder and file, `export default` a PascalCase component of the same name.
2. Reuse existing primitives before writing new ones — `Modal`, `ImageSlot`, form-field patterns in `user-form.tsx`/`group-form.tsx`, the `useInView` scroll-reveal hook — check `components/ui/*` and `hooks/*` first.
3. Fetch data via a `services/*.service.ts` function (add one, matching the existing fetch-based style, if the backend endpoint doesn't have a client yet) — don't call `fetch` directly from a page component.
4. Register the route in `app.tsx` under the right layout (`MainLayout` for public pages, `PanelLayout` for admin pages).
5. Style with Tailwind utility classes only, using the `--color-fq-*`/`--radius-fq*`/`--shadow-fq*` tokens from `index.css` — no new `.css` file, no hardcoded hex colors.

## Design System

**v2 (current).** The frontend was rebuilt against a concrete HTML mockup for the public
landing (`Landing Facultad de Quimica`, provided directly by the project owner), which now
overrides several rules from the original `ui-ux-pro-max`-derived system below. Do not drift
back to the v1 rules (serif headings, 0–4px radius, no gradients/glassmorphism, hexagon motif)
without the owner explicitly asking for it — that reversion has happened by accident before.

| Aspect | Rule |
|---|---|
| Grid | 12 columns, 8px base spacing unit; sections use fluid `clamp()` padding (`clamp(56px,8vw,88px)` vertical) rather than fixed breakpoints |
| Color — brand | **Locked, never changes**: `#FF3B01` (primary) / `#E03400` (hover) / `#C22D00` (active) / `#FFE4D9` (tint) / `#9C2400` (AAA text-on-tint) / `#FF9166` (orange text on dark surfaces) |
| Color — neutrals | Warm palette (replaces the old black/white/`#F5F5F5`): `#1E1712` ink, `#4A3B30` body text, `#665648` muted (corrected from the mockup's `#6B5A4C`/`#7A6A5C` — those measure 6.58:1/5.19:1, below the AAA bar below), `#EDE6DF` border, `#FBF6F1` surface, `#241A14` dark surfaces (stats bar, login panel), `#FFFFFF` bg |
| Decoration | Gradients and `backdrop-filter: blur()` are **allowed**, but only where the mockup specifies them (hero photo scrim, floating header) — not a general license, don't add them elsewhere on a whim |
| Border radius | 8px controls (buttons/inputs/logo mark) · 16px surfaces (cards/modals) · 20px large media (the Institución photo) · `rounded-full` for pills (header, badges, CTA buttons) |
| Shadow | Two: `0 8px 24px rgba(36,26,20,0.08)` (floating header) and `0 12px 28px rgba(36,26,20,0.10)` (card hover lift) |
| Typography | **Lexend** (500/600/700/800) for headings, buttons, and large numbers; **Source Sans 3** (400–700) for body text. Replaces the old EB Garamond + Inter pairing |
| Hexagon motif | **Removed.** The mockup's logo (rounded-square "Fq" mark) replaced it as the sole brand mark — do not reintroduce the benzene-ring clip-path |
| Accessibility | 7:1 text contrast (WCAG AAA) on body copy, 16px+ base font, 3px focus rings, 44×44px touch targets, `prefers-reduced-motion` respected. Known exception: white text on `#FF3B01` is 3.57:1 (fails AA) — small CTAs use dark ink (`#1E1712`, 8.6:1) on orange instead of white |
| Motion | Minimal — hover lifts, fades, state feedback only, no bounce/spring easing |

Photos: the mockup calls for ~12 real photos (hero, institución, 6 carreras, 4 noticias, mapa).
`public/hero.webp` and `public/university.webp` exist and are wired in (Hero, Institución); the
rest don't exist yet. Until a real asset is provided, `components/ui/image-slot/image-slot.tsx`
renders a dashed-border placeholder using the image's alt text — swap in a real `src` later
without touching layout. Contacto's map isn't a placeholder — it's a real Leaflet map
(`components/ui/map/map.tsx`).

Tokens live in `Universidad.Web/ClientApp/src/index.css` as a Tailwind v4 `@theme` block
(`--color-fq-*`, `--font-*`, `--radius-fq*`, `--shadow-fq*`). Styling is Tailwind utility
classes in JSX — the project no longer uses one `.css` file per component (see Frontend
structure below).

<details>
<summary>v1 (superseded) — Swiss Modernism 2.0 + Minimalism, for historical context</summary>

The original system (chosen from the `ui-ux-pro-max` skill's product-type catalog,
`data/products.csv` row 185: "Research Lab / University Department") was black/white/`#F5F5F5`
with the FQ orange as the only accent, 0–4px radius, no gradients/glassmorphism, EB Garamond
headings, and the hexagon (benzene ring) as a recurring brand badge. It's fully replaced by v2
above — kept here only so past commit messages/history make sense.

</details>

### Current implementation state (important — avoid "fixing" what's intentionally scaffolded vs. what's actually broken)
- `ContentController`/`ContentRepository` and most of `GroupController`/`GroupRepository` are stubs (`NotImplementedException` or `Task.FromResult<IActionResult>(null)`), per the TODOs in `BACKEND.md`.
- Only the Users panel page calls real endpoints (`create`, `list`); edit/delete/password-change in `Users.tsx` are local-state-only simulations with no backing endpoint yet.
- `BACKEND.md` and `Universidad.Web/ClientApp/FRONTEND.md` track the two outstanding TODO lists — check them for what's intentionally left unfinished before assuming something is a bug.
