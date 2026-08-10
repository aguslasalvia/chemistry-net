using Universidad.Domain.Entities;

namespace Universidad.Domain.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);

    Task<User?> GetByIdAsync(int id);

    Task<User> RegisterAsync(User user);

    Task<IEnumerable<User>> GetAllAsync();

    Task UpdateAsync(User user);

    Task UpdatePasswordAsync(int id, string passwordHash);

    Task DeleteAsync(int id);
}
