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
- [x] Home now loads Carreras/Agenda/Novedades from the real backend (`GET /api/content`,
      one request, filtered client-side by `type`) instead of the hardcoded arrays that
      used to live in `data/home.ts` and `Agenda.tsx`. Stats stays static — it's not
      modeled as Content.
- [x] `utils/session.ts` (the `localStorage`-based "current user id" workaround) is gone
      — replaced by `GET /api/user/me`. `PanelLayout` calls it once, gates every panel
      route on the result (redirects to `/panel/login` if there's no session), and passes
      the resolved user down via `<Outlet context={user} />`; Content and Profile read it
      with `useOutletContext` instead of re-fetching or trusting client-side storage.
- [x] Users page: group assignment (add/remove a group, with role) directly from the
      Editar Usuario modal, mirroring Groups' member-list UI.
- [x] Pages panel (list/create/edit/delete) + public `/:slug` route + navbar links
      rewired from dead placeholder paths to real slugs.
- [x] Content and Pages panels are scoped to the logged-in user's groups: the Grupo
      selector in both forms only offers groups the user belongs to (or all of them if
      they're an admin — membership in the "Administrador" group), and the lists only
      show items from those groups, matching what the backend now enforces.

## Pending
- [ ] Real photos for the landing (hero, institución, 6 carreras, 4 noticias, mapa) —
      `hero.webp`/`university.webp` are wired in, the rest are still `ImageSlot`
      placeholders 