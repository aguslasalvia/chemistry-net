namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class ContentGetAll(IContentRepository repository) : IContentGetAll
{
    private readonly IContentRepository _repository = repository;

    public async Task<IEnumerable<ContentDto>> ExecuteAsync()
    {
        var contents = await _repository.GetAllAsync();
        return contents.Select(c => new ContentDto(
            Id: c.Id,
            Title: c.Title,
            Body: c.Body,
            ImageUrl: c.ImageUrl,
            CreationDate: c.CreationDate,
            UserId: c.UserId,
            UserName: $"{c.User.Name} {c.User.LastName}",
            GroupId: c.GroupId,
            GroupName: c.Group.Name,
            Type: c.Type
        ));
    }
}
