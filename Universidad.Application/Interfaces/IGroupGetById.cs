namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IGroupGetById
{
    Task<GroupDto> ExecuteAsync(int id);
}
