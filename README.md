# Chemistry Faculty CMS (mock project)

A **mock/educational project**: a CMS for the UDELAR (Universidad de la República) Facultad de
Química homepage, built with ASP.NET Core (Clean Architecture) on the backend and a React SPA
on the frontend.

> **This is not a production system.** It's a learning exercise for combining ASP.NET Core with
> React — it has not been security-audited, load-tested, or built with real deployment in mind.
> Patterns are kept deliberately simple (manual DI registration, no CQRS/MediatR, no test
> project) for a junior audience; that's intentional, not an oversight.

## What it does

A working admin panel lets authenticated users manage:

- **Content** — news, events, and academic announcements shown on the public homepage feed.
- **Pages** — standalone static documents (Institución, Bedelía, etc.), each routable at a
  public `/:slug` URL, separate from the Content feed.
- **Users** — create/edit/delete, change password, assign to groups.
- **Groups** — create/edit/delete, manage membership and per-member role.

Visibility is group-scoped: a non-admin user only sees and edits Content/Pages belonging to
groups they're a member of. "Admin" isn't a stored flag — it's membership in the group literally
named `Administrador`.

The public site (landing, news feed, static pages, a Leaflet map on the contact section) reads
this data anonymously; only the admin panel requires a session.

## Tech stack

| Layer | Tech |
|---|---|
| Backend | ASP.NET Core 8.0, C# |
| ORM / DB | Entity Framework Core + SQLite (`university.db`, gitignored, schema via `EnsureCreated()` — no migrations) |
| Auth | Cookie-based (`AddAuthentication` + `AddCookie`, 8h sliding expiration), `[Authorize]` on all controllers except public reads |
| Password hashing | BCrypt.Net |
| Frontend | React 19 + TypeScript, Vite, React Router 7 |
| Styling | Tailwind CSS v4 (utility classes only, design tokens in `index.css`) |
| Frontend extras | Leaflet (contact map), react-hot-toast, lucide-react icons |

## Architecture

Four-project Clean Architecture solution (`Universidad.sln`), dependencies flow one way:

```
Universidad.Domain          entities, enums, repository interfaces (no dependencies)
        ^
Universidad.Application     DTOs, use-case interfaces, use-case implementations (depends on Domain)
        ^
Universidad.Infrastructure  EF Core DbContext + repository implementations (implements Domain interfaces)
        ^
Universidad.Web             Controllers, DI wiring (Program.cs), React SPA in ClientApp/
```

- **Domain** (`Universidad.Domain`) — `Entities/` (`User`, `Group`, `UserGroup`, `Content`,
  `Page`), `Enums/` (`Rol`, `ContentType`), `Interfaces/` (the `I*Repository` contracts
  Infrastructure implements).
- **Application** (`Universidad.Application`) — one interface + one class per use case
  (`Interfaces/IUserLogin.cs` + `UseCases/UserLogin.cs`, etc.). DTOs live in `Dto/`. Controllers
  always go through a use case, never touch a repository directly.
- **Infrastructure** (`Universidad.Infrastructure`) — `Persistence/DbContext.cs` (`AppDbContext`,
  relationships configured in `OnModelCreating`) and `Repositories/` (EF-backed implementations).
- **Web** (`Universidad.Web`) — thin controllers under `Controllers/`
  (`UserController`, `GroupController`, `ContentController`, `PageController`) that inject
  use-case interfaces and translate results to `IActionResult`. `Program.cs` wires every
  repository and use case by hand with `builder.Services.AddScoped(typeof(IX), typeof(X))` — no
  assembly scanning. The React SPA lives in `Universidad.Web/ClientApp`.

### Frontend structure (`Universidad.Web/ClientApp/src`)

```
pages/
  home/           public landing (hero, institución, carreras, novedades, contacto)
  public-page/    public /:slug route for standalone Pages
  panel/          admin panel: dashboard, users, groups, content, pages, login, profile
  not-found/
layouts/
  main-layout.tsx    wraps public pages
  panel-layout.tsx   wraps admin panel, gates routes on GET /api/user/me
components/
  ui/*            one component per folder, Tailwind classes, no CSS modules
  sections/*      public-landing sections (hero, stats, institucion, carreras, novedades, contacto)
services/*        fetch-based API clients (user/group/content/page.service.ts)
data/home.ts      static landing content not backed by the API (e.g. Stats)
```

File/folder naming is kebab-case throughout (`site-header.tsx`, `not-found/not-found.tsx`);
component identifiers inside a file stay PascalCase. Path aliases (`@components`, `@services`,
`@hooks`, `@utils`, `@models`, `@pages`, `@data`) are defined in `tsconfig.app.json`.

## Getting started

### Prerequisites

- .NET 8 SDK
- Node.js (or Bun — the production build uses `bun run build`)

### Run in development

Run the backend and the frontend dev server side by side; Vite proxies `/api` to ASP.NET.

```bash
# Backend — from the repo root
dotnet restore
dotnet run --project Universidad.Web
# -> http://localhost:5050

# Frontend — from Universidad.Web/ClientApp, in a second terminal
npm install     # or: bun install
npm run dev
# -> Vite dev server, proxies /api to http://localhost:5050
```

Other frontend scripts: `npm run build` (`tsc -b && vite build`, outputs to `../wwwroot`),
`npm run lint`.

### Production build

`Universidad.Web.csproj` runs `bun run build` inside `ClientApp` automatically as a
pre-`Publish` MSBuild target, emitting into `Universidad.Web/wwwroot`, which `Program.cs` serves
via `UseStaticFiles()` + `MapFallbackToFile("index.html")` — a single ASP.NET process serves
both the API and the built SPA.

### Database

SQLite, file `university.db` at the `Universidad.Web` project root (gitignored). There is no EF
migration path — the schema is created via `db.Database.EnsureCreated()` at startup. **If you
change an entity shape, delete `university.db` locally** to pick up the new schema; it will be
recreated (and reseeded) on next run.

Seed data (`SeedData.cs`, runs once against an empty `Users` table) creates two users
(`admin@fq.edu.uy` / `admin123`, `agustin@fq.edu.uy` / `agustin`), four groups
(Administrador/Noticias/Eventos/Académico), sample News/Events/Academic content, and a few
standalone Pages.

## Adding a new backend use case

1. Interface in `Universidad.Application/Interfaces/`.
2. Implementation in `Universidad.Application/UseCases/`, constructor-injecting the relevant
   `I*Repository` from Domain.
3. DTOs (records) in `Universidad.Application/Dto/`.
4. Register both repository and use case in `Program.cs` (`AddScoped`).
5. Call it from a controller action in `Universidad.Web/Controllers/`, wrapping in try/catch and
   mapping exceptions to `BadRequest`/`Unauthorized` as existing controllers do.

## Adding a new frontend page or component

1. Create `src/pages/<section>/<name>/<name>.tsx` (or `src/components/ui/<name>/<name>.tsx` for
   a reusable piece) — kebab-case folder/file, `export default` a PascalCase component.
2. Reuse existing primitives first — `Modal`, `ImageSlot`, the form-field patterns in
   `user-form.tsx`/`group-form.tsx`, the `useInView` hook.
3. Fetch data via a `services/*.service.ts` function, not `fetch` called directly from a page.
4. Register the route in `app.tsx` under the right layout (`MainLayout` public, `PanelLayout`
   admin).
5. Style with Tailwind utility classes and the `--color-fq-*` / `--radius-fq*` / `--shadow-fq*`
   tokens in `index.css` — no new `.css` file, no hardcoded hex colors.

## Design system

The public landing follows a v2 design system built against a concrete HTML mockup: warm
neutrals (`#FBF6F1` surface / `#1E1712` ink) with a locked brand orange (`#FF3B01`), Lexend for
headings and Source Sans 3 for body text, 8px/16px/20px radius scale, WCAG AAA text contrast.
Full token values and rationale live in `CLAUDE.md`.

## Current status

Login, Users, Groups, Content, and Pages are all wired end-to-end (backend use case → controller
→ frontend service → UI) — see `BACKEND.md` and `Universidad.Web/ClientApp/FRONTEND.md` for the
detailed, up-to-date TODO lists. Known gaps as of this writing:

- **No Department entity yet** — Groups don't yet model departments (`BACKEND.md`'s one open item).
- **Placeholder photos** — most landing images (6 carreras, 4 noticias, mapa) are still
  dashed-border `ImageSlot` placeholders; only the hero and institución photos are real.
- **No automated tests** — no test project exists in the solution.

## License

MIT
