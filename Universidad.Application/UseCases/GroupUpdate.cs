namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;
public class GroupUpdate(IGroupRepository repository) : IGroupUpdate
{
    private readonly IGroupRepository _groupRepository = repository;

    public async Task ExecuteAsync(int id, GroupUpdateDto dto)
    {
        var group = await _groupRepository.GetByIdAsync(id);
        if (group == null) throw new InvalidOperationException("Group not found");

        group.Name = dto.Name;
        group.Description = dto.Description;

        await _groupRepository.UpdateAsync(group);
    }
}