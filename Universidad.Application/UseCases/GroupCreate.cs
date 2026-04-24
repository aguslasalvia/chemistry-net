using Universidad.Application.Interfaces;
using Universidad.Domain.Entities;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

namespace Universidad.Application.UseCases;

public class GroupCreate(IGroupRepository repository) : IGroupCreate
{
    private readonly IGroupRepository _repository = repository;

    public async Task<GroupDto> ExecuteAsync(GroupCreateDto dto)
    {
        var group = new Group
        {
            Name = dto.Name,
            Description = dto.Description
        };

        var createdGroup = await _repository.CreateAsync(group);

        return new GroupDto(
            Id: createdGroup.Id,
            Name: createdGroup.Name,
            Description: createdGroup.Description
        );
    }
}