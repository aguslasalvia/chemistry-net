using Universidad.Application.Dto;

namespace Universidad.Application.Interfaces;

public interface IGroupCreate
{
    Task<GroupDto> ExecuteAsync(GroupCreateDto createDto);
}