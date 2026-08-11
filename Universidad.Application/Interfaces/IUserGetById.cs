namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IUserGetById
{
    Task<UserDto> ExecuteAsync(int id);
}
