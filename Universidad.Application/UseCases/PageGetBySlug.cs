namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class PageGetBySlug(IPageRepository repository) : IPageGetBySlug
{
    private readonly IPageRepository _repository = repository;

    public async Task<PageDto> ExecuteAsync(string slug)
    {
        var page = await _repository.GetBySlugAsync(slug);
        if (page == null) throw new InvalidOperationException("Página no encontrada");

        return new PageDto(
            Id: page.Id,
            Title: page.Title,
            Slug: page.Slug,
            Body: page.Body,
            ImageUrl: page.ImageUrl,
            CreationDate: page.CreationDate,
            UpdatedDate: page.UpdatedDate,
            UserId: page.UserId,
            UserName: $"{page.User.Name} {page.User.LastName}",
            GroupId: page.GroupId,
            GroupName: page.Group.Name
        );
    }
}
