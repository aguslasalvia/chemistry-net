using Universidad.Application.Dto;

namespace Universidad.Application.Interfaces
{
    public interface IUserGetAll
    {
        Task<IEnumerable<UserDto>> ExecuteAsync();
    }
}