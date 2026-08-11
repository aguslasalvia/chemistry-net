namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IPageCreate
{
    Task<PageDto> ExecuteAsync(PageCreateDto dto, int actingUserId);
}
