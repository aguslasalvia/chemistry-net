# BACKEND TODO LIST

## Done
- [x] Login now verifies with BCrypt.Verify instead of re-hashing (was always failing before)
- [x] Content CRUD implemented end-to-end (repository, use cases, controller)
- [x] Group CRUD + user membership (add/remove/update role) implemented end-to-end
- [x] User update/delete/change-password implemented end-to-end

## Pending
- [ ] Change Departments for Group in each layer
- [ ] Add [Authorize] to admin endpoints (needs a seed admin user + frontend session/route guard first, or the panel becomes unusable with no way to log in)