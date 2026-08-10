namespace Universidad.Application.UseCases;

using Universidad.Domain.Interfaces;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;


public class UserLogin(IUserRepository repository) : IUserLogin
{
    private readonly IUserRepository _repository = repository;


    public async Task<UserDto> ExecuteAsync(LoginDto dto)
    {
        var user = await _repository.GetByEmailAsync(dto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password");

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
