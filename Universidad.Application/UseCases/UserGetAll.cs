using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

namespace Universidad.Application.UseCases;


public class UserGetAll(IUserRepository repository) : IUserGetAll
{
    private readonly IUserRepository _repository = repository;

    public async Task<IEnumerable<UserDto>> ExecuteAsync()
    {
        var users = await _repository.GetAllAsync();
        return users.Select(u => new UserDto(
            u.Id,
            u.Name,
            u.LastName,
            u.Email,
            u.Groups.Select(g => new GroupDto(
                Id: g.Group.Id,
                Name: g.Group.Name,
                Description: g.Group.Description
            )).ToList()
        ));
    }
}
