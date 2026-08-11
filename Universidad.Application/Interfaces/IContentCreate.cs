namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IContentCreate
{
    Task<ContentDto> ExecuteAsync(CreateContentDto dto, int actingUserId);
}
