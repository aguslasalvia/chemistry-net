# BACKEND TODO LIST

## Done
- [x] Login now verifies with BCrypt.Verify instead of re-hashing (was always failing before)
- [x] Content CRUD implemented end-to-end (repository, use cases, controller)
- [x] Group CRUD + user membership (add/remove/update role) implemented end-to-end
- [x] User update/delete/change-password implemented end-to-end
- [x] `[Authorize]` on UserController/GroupController/ContentController — `[AllowAnonymous]`
      only on `POST /api/user/login` and `GET /api/content` (the public landing reads
      content without a session). Cookie auth now returns bare 401/403 instead of the
      default redirect-to-login-page behavior (see `Program.cs`'s `OnRedirectToLogin`/
      `OnRedirectToAccessDenied` — needed since this is an API for a SPA, not a
      server-rendered app).
- [x] `GET /api/user/me` — resolves the logged-in user from the auth cookie's claims.
      Used by the frontend's panel route guard and by Profile (no more scanning
      `GetAll` for a client-tracked id).
- [x] `Content.Subtitle` (nullable) — freeform label shown on the public site: duration
      for Academic content, location for Events, category tag for News.
- [x] Seed data (`SeedData.cs`, runs once on an empty `Users` table): 2 users
      (`admin@fq.edu.uy` / `admin123`, `agustin@fq.edu.uy` / `agustin`), 4 groups
      (Administrador/Noticias/Eventos/Académico), and the real News/Events/Academic
      content that used to be hardcoded in the frontend, plus 3 standalone pages.
- [x] `Page` entity — standalone routable static document (Institución, Bedelía, ...),
      separate from `Content` (feed items). Full CRUD stack mirroring Content's, public
      `GET /api/page/by-slug/{slug}` for the `/:slug` frontend route.
- [x] Group-scoped visibility and editing for `Content` and `Page`: `GetAll` on both
      is filtered to the caller's groups unless they're an admin (public/anonymous
      calls stay unfiltered). Create/Update/Delete also reject with 403 when the
      caller isn't a member of the target group. "Admin" isn't a stored flag — it's
      membership in the group literally named `"Administrador"` (see `User.IsAdmin`
      in `Universidad.Domain/Entities/User.cs`), so granting/revoking admin access is
      just adding/removing someone from that group via the existing Groups panel.

## Pending
- [ ] Change Departments for Group in each layer