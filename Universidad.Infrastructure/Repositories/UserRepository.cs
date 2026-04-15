namespace Universidad.Infrastructure.Repositories;

using Universidad.Domain.Interfaces;
// using Universidad.Application.Dto;
using Universidad.Infrastructure.Persistence;
using Universidad.Domain.Entities;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        this._context = context;
    }

    Task<User> IUserRepository.LoginAsync(string email, string password)
    {
        throw new NotImplementedException();
    }
}
