namespace Universidad.Application.UseCases;

using Universidad.Domain.Interfaces;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;


public class UserLogin(IUserRepository repository) : IUserLogin
{
    private readonly IUserRepository _repository = repository;


    public async Task<UserDto> ExecuteAsync(LoginDto dto)
    {
        // Hash the password before sending it to the repository
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = await _repository.LoginAsync(dto.Email, hashedPassword)
            ?? throw new InvalidOperationException("Invalid email or password");

        return new UserDto(
            Id: user.Id,
            Name: user.Name,
            LastName: user.LastName,
            Email: user.Email,
            Groups: user.Groups.Select(g => new GroupDto(
                Id: g.Group.Id,
                Name: g.Group.Name,
                Description: g.Group.Description
            )).ToList()
        );
    }
}
