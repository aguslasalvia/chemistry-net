namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class GroupGetAll(IGroupRepository repository) : IGroupGetAll
{
    private readonly IGroupRepository _repository = repository;

    public async Task<IEnumerable<GroupDto>> ExecuteAsync()
    {
        var groups = await _repository.GetAllAsync();
        return groups.Select(g => new GroupDto(
            Id: g.Id,
            Name: g.Name,
            Description: g.Description,
            Users: (g.Users ?? []).Select(ug => new GroupUserDto(
                Id: ug.User.Id,
                Name: $"{ug.User.Name} {ug.User.LastName}",
                Email: ug.User.Email
            )).ToList()
        ));
    }
}
