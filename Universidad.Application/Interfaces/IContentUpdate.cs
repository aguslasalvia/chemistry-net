namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IContentUpdate
{
    Task ExecuteAsync(int id, ContentUpdateDto dto);
}
