# Fontend TODO lists

## Done
- [x] Login page wired to the backend (was only console.logging before)
- [x] Users page (edit/delete/change password) wired to the backend, no longer local-only
- [x] Groups page wired to the backend, including add/remove member and role
- [x] Content page fetches real content instead of mock data
- [x] Panel Sidebar (collapsible, real NavLink active state)
- [x] Dashboard / Main Panel page, with real recent-activity feed
- [x] Content creation/edit form (ContentController's Create/Update/Delete are now used)
- [x] Full rebuild of the frontend on Tailwind CSS against a mockup for the public
      landing (see `## Design System` in the repo's `CLAUDE.md`) — every page/component
      listed above was rewritten from scratch, not just restyled

## Pending
- [ ] Profile page reads the logged-in user from `localStorage` (`utils/session.ts`)
      because there's no "current user" backend endpoint — if one gets added
      (e.g. `GET /api/user/me`), Profile/Content-authorship should switch to it
      instead of trusting client-side storage
- [ ] `[Authorize]` on admin endpoints (needs a seed admin user + frontend route guard
      first, or the panel becomes unusable with no way to log in) — unchanged from
      before, still not done
- [ ] Real photos for the landing (hero, institución, 6 carreras, 4 noticias, mapa) —
      currently `ImageSlot` placeholders 