namespace Universidad.Infrastructure.Repositories;

using Universidad.Domain.Interfaces;
// using Universidad.Application.Dto;
using Universidad.Infrastructure.Persistence;
using Universidad.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class UserRepository(AppDbContext context) : IUserRepository
{
    private readonly AppDbContext _ctx = context;


    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _ctx.Users
            .Include(u => u.Groups)
                .ThenInclude(ug => ug.Group)
            .FirstOrDefaultAsync(u => u.Email == email);
    }


    public async Task<User> RegisterAsync(User user)
    {
        _ctx.Users.Add(user);
        await _ctx.SaveChangesAsync();
        return user;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _ctx.Users
            .Include(u => u.Groups)
                .ThenInclude(ug => ug.Group)
            .ToListAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _ctx.Users
            .Include(u => u.Groups)
                .ThenInclude(ug => ug.Group)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task UpdateAsync(User user)
    {
        var userToUpdate = await _ctx.Users.FindAsync(user.Id);
        if (userToUpdate == null) return;

        userToUpdate.Name = user.Name;
        userToUpdate.LastName = user.LastName;
        userToUpdate.Email = user.Email;

        await _ctx.SaveChangesAsync();
    }

    public async Task UpdatePasswordAsync(int id, string passwordHash)
    {
        var userToUpdate = await _ctx.Users.FindAsync(id);
        if (userToUpdate == null) return;

        userToUpdate.PasswordHash = passwordHash;

        await _ctx.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var userToDelete = await _ctx.Users.FindAsync(id);
        if (userToDelete == null) return;

        _ctx.Users.Remove(userToDelete);
        await _ctx.SaveChangesAsync();
    }
}
