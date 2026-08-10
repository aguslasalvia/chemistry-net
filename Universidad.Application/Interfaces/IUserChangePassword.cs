namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IUserChangePassword
{
    Task ExecuteAsync(int id, UserChangePasswordDto dto);
}
