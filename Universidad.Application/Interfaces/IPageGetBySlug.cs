namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IPageGetBySlug
{
    Task<PageDto> ExecuteAsync(string slug);
}
