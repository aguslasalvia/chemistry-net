namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IGroupUpdate
{
    Task ExecuteAsync(int id, GroupUpdateDto dto);
}