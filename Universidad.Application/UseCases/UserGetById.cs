namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class UserGetById(IUserRepository repository) : IUserGetById
{
    private readonly IUserRepository _repository = repository;

    public async Task<UserDto> ExecuteAsync(int id)
    {
        var user = await _repository.GetByIdAsync(id);
        if (user == null) throw new InvalidOperationException("User not found");

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
