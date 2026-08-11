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
- [x] Seed data (`SeedData.cs`, runs once on an empty `Users` table): 1 admin user
      (`admin@fq.edu.uy` / `admin123`), 3 groups (Noticias/Eventos/Académico), and the
      real News/Events/Academic content that used to be hardcoded in the frontend.

## Pending
- [ ] Change Departments for Group in each layer
- [ ] No role/permission distinction yet — `[Authorize]` only checks "is logged in",
      any authenticated user can manage the whole panel. Fine for this mock's scope,
      but worth flagging if real multi-role access control is ever needed.