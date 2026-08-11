namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IPageGetAll
{
    Task<IEnumerable<PageDto>> ExecuteAsync(int? currentUserId);
}
