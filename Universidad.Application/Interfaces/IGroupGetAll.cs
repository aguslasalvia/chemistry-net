namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IGroupGetAll
{
    Task<IEnumerable<GroupDto>> ExecuteAsync();
}
