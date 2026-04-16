namespace Universidad.Domain.Interfaces;

using Universidad.Domain.Entities;

public interface IUserRepository
{
    Task<User?> LoginAsync(string email, string passwordHashed);

    Task<User> RegisterAsync(User user);
}
