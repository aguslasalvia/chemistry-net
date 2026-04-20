using Universidad.Domain.Entities;

namespace Universidad.Domain.Interfaces;

public interface IUserRepository
{
    Task<User?> LoginAsync(string email, string passwordHashed);

    Task<User> RegisterAsync(User user);
}
