namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IUserRegister
{
    Task<UserDto> ExecuteAsync(UserRegisterDto dto);
}