namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class GroupAddUser(IGroupRepository repository) : IGroupAddUser
{
    private readonly IGroupRepository _repository = repository;

    public async Task ExecuteAsync(int groupId, GroupAddUserDto dto)
    {
        await _repository.AddUserAsync(groupId, dto.UserId, dto.Role);
    }
}
