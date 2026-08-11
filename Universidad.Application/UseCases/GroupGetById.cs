namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class GroupGetById(IGroupRepository repository) : IGroupGetById
{
    private readonly IGroupRepository _repository = repository;

    public async Task<GroupDto> ExecuteAsync(int id)
    {
        var group = await _repository.GetByIdAsync(id);
        if (group == null) throw new InvalidOperationException("Grupo no encontrado");

        return new GroupDto(
            Id: group.Id,
            Name: group.Name,
            Description: group.Description,
            Users: (group.Users ?? []).Select(ug => new GroupUserDto(
                Id: ug.User.Id,
                Name: $"{ug.User.Name} {ug.User.LastName}",
                Email: ug.User.Email
            )).ToList()
        );
    }
}
