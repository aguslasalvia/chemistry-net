namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IContentGetAll
{
    Task<IEnumerable<ContentDto>> ExecuteAsync(int? currentUserId);
}
