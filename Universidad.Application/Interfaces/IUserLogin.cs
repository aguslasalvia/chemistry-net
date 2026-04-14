namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IUserLogin
{
    Task<UserDto> ExecuteAsync(LoginDto loginDto);
}