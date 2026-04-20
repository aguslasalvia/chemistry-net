namespace Universidad.Infrastructure.Repositories;

using Universidad.Domain.Interfaces;
// using Universidad.Application.Dto;
using Universidad.Infrastructure.Persistence;
using Universidad.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class UserRepository(AppDbContext context) : IUserRepository
{
    private readonly AppDbContext _ctx = context;


    public async Task<User?> LoginAsync(string email, string passwordHashed)
    {
        return await _ctx.Users.FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == passwordHashed);
    }


    public async Task<User> RegisterAsync(User user)
    {
        _ctx.Users.Add(user);
        await _ctx.SaveChangesAsync();
        return user;
    }
}
