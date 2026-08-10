namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class UserChangePassword(IUserRepository repository) : IUserChangePassword
{
    private readonly IUserRepository _repository = repository;

    public async Task ExecuteAsync(int id, UserChangePasswordDto dto)
    {
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        await _repository.UpdatePasswordAsync(id, hashedPassword);
    }
}
