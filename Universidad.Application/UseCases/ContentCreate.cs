namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Entities;
using Universidad.Domain.Enums;
using Universidad.Domain.Interfaces;

public class ContentCreate(IContentRepository repository) : IContentCreate
{
    private readonly IContentRepository _repository = repository;

    public async Task<ContentDto> ExecuteAsync(CreateContentDto dto)
    {
        var content = new Content
        {
            Title = dto.Title,
            Body = dto.Body,
            ImageUrl = dto.ImageUrl,
            CreationDate = DateTime.UtcNow,
            UserId = dto.UserId,
            GroupId = dto.GroupId,
            Type = dto.Type ?? ContentType.Default
        };

        var created = await _repository.CreateAsync(content);

        return new ContentDto(
            Id: created.Id,
            Title: created.Title,
            Body: created.Body,
            ImageUrl: created.ImageUrl,
            CreationDate: created.CreationDate,
            UserId: created.UserId,
            UserName: $"{created.User.Name} {created.User.LastName}",
            GroupId: created.GroupId,
            GroupName: created.Group.Name,
            Type: created.Type
        );
    }
}
