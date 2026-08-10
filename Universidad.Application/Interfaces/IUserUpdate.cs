namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IUserUpdate
{
    Task<UserDto> ExecuteAsync(int id, UserUpdateDto dto);
}
