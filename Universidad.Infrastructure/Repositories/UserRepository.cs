namespace Universidad.Infrastructure.Repositories;

using Universidad.Domain.Interfaces;
// using Universidad.Application.Dto;
using Universidad.Infrastructure.Persistence;
using Universidad.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<User?> LoginAsync(string email, string passwordHashed)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == passwordHashed);
    }
}
