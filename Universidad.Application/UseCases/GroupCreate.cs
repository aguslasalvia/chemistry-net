using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

namespace Universidad.Application.UseCases;

public class GroupCreate : IGroupCreate
{
    private readonly IGroupRepository _groupRepository;

    public GroupCreate(IGroupRepository groupRepository)
    {
        _groupRepository = groupRepository;
    }

    public async Task<GroupDto> ExecuteAsync(GroupCreateDto createDto)
    {
        var group = new Group
        {
            Name = createDto.Name,
            Description = createDto.Description
        };

        var createdGroup = await _groupRepository.CreateAsync(group);

        return new GroupDto(
            Id: createdGroup.Id,
            Name: createdGroup.Name,
            Description: createdGroup.Description
        );
    }
}