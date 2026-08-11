namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Entities;
using Universidad.Domain.Interfaces;

public class PageCreate(IPageRepository repository, IUserRepository userRepository) : IPageCreate
{
    private readonly IPageRepository _repository = repository;
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<PageDto> ExecuteAsync(PageCreateDto dto, int actingUserId)
    {
        var actingUser = await _userRepository.GetByIdAsync(actingUserId);
        if (actingUser == null || !actingUser.CanEditGroup(dto.GroupId))
            throw new UnauthorizedAccessException("No tenés permiso para crear páginas en ese grupo");

        var existing = await _repository.GetBySlugAsync(dto.Slug);
        if (existing != null) throw new InvalidOperationException("Ya existe una página con esa URL");

        var now = DateTime.UtcNow;
        var page = new Page
        {
            Title = dto.Title,
            Slug = dto.Slug,
            Body = dto.Body,
            ImageUrl = dto.ImageUrl,
            CreationDate = now,
            UpdatedDate = now,
            UserId = dto.UserId,
            GroupId = dto.GroupId,
        };

        var created = await _repository.CreateAsync(page);

        return new PageDto(
            Id: created.Id,
            Title: created.Title,
            Slug: created.Slug,
            Body: created.Body,
            ImageUrl: created.ImageUrl,
            CreationDate: created.CreationDate,
            UpdatedDate: created.UpdatedDate,
            UserId: created.UserId,
            UserName: $"{created.User.Name} {created.User.LastName}",
            GroupId: created.GroupId,
            GroupName: created.Group.Name
        );
    }
}
