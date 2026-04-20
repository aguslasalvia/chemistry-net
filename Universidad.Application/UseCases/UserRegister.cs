using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Entities;
using Universidad.Domain.Interfaces;

namespace Universidad.Application.UseCases;

public class UserRegister(IUserRepository repository) : IUserRegister
{
    private readonly IUserRepository _userRepository = repository;

    public async Task<UserDto> ExecuteAsync(UserRegisterDto dto)
    {
        // Hash the password before sending it to the repository
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User
        {
            Name = dto.Name,
            LastName = dto.LastName,
            Email = dto.Email,
            PasswordHash = hashedPassword
        };

        var createdUser = await _userRepository.RegisterAsync(user);

        return new UserDto(
            Id: createdUser.Id,
            Name: createdUser.Name,
            LastName: createdUser.LastName,
            Email: createdUser.Email,
            Groups: []
        );
    }
}