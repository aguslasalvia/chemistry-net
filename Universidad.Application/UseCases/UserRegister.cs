using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Entities;
using Universidad.Domain.Interfaces;

namespace Universidad.Application.UseCases;

public class UserRegister : IUserRegister
{
    private readonly IUserRepository _userRepository;

    public UserRegister(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDto> ExecuteAsync(UserRegisterDto registerDto)
    {
        // Hash the password before sending it to the repository
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

        var user = new User
        {
            Name = registerDto.Name,
            LastName = registerDto.LastName,
            Email = registerDto.Email,
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