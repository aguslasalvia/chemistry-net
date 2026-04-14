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

        var user = await _userRepository.LoginAsync(loginDto.Email, loginDto.Password);
        if (user == null)
        {
            throw new InvalidOperationException("Invalid email or password");
        }

        return new UserDto
        {
            Id = user.Id,
            UserName = user.Name,
            Email = user.Email
        };
    }
}