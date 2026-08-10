namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class GroupUpdateUserRole(IGroupRepository repository) : IGroupUpdateUserRole
{
    private readonly IGroupRepository _repository = repository;

    public async Task ExecuteAsync(int groupId, int userId, GroupUpdateUserRoleDto dto)
    {
        await _repository.UpdateUserRoleAsync(groupId, userId, dto.Role);
    }
}
