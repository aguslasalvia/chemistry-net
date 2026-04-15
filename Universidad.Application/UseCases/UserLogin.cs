namespace Universidad.Application.UseCases;

using Universidad.Domain.Interfaces;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;


public class UserLogin : IUserLogin
{

    private readonly IUserRepository _userRepository;

    public UserLogin(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDto> ExecuteAsync(LoginDto loginDto)
    {
        // Hash the password before sending it to the repository
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(loginDto.Password);

        var user = await _userRepository.LoginAsync(loginDto.Email, hashedPassword)
            ?? throw new InvalidOperationException("Invalid email or password");

        return new UserDto(
            Id: user.Id,
            Name: user.Name,
            LastName: user.LastName,
            Email: user.Email,
            Groups: user.Groups.Select(g => new GroupDto(
                Id: g.Group.Id,
                Name: g.Group.Name
            )).ToList()
        );
    }
}