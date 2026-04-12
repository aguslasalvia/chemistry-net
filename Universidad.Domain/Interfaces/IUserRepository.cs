namespace Universidad.Domain.Interfaces;

using Universidad.Domain.Entities;

public interface IUserRepository
{
    // Task<UserDTO?> LoginAsync(string email, string password);
    Task<User?> GetUserByMailAsync(string email);
    Task AddUserAsync(User user);
    Task UpdateUserAsync(User user);
    Task DeleteUserAsync(User user);

}