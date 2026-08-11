namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Entities;
using Universidad.Domain.Enums;
using Universidad.Domain.Interfaces;

public class ContentCreate(IContentRepository repository, IUserRepository userRepository, IGroupRepository groupRepository) : IContentCreate
{
    private readonly IContentRepository _repository = repository;
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IGroupRepository _groupRepository = groupRepository;

    public async Task<ContentDto> ExecuteAsync(CreateContentDto dto, int actingUserId)
    {
        var actingUser = await _userRepository.GetByIdAsync(actingUserId);
        if (actingUser == null || !actingUser.CanEditGroup(dto.GroupId))
            throw new UnauthorizedAccessException("No tenés permiso para publicar contenido en ese grupo");

        if (await _groupRepository.GetByIdAsync(dto.GroupId) == null)
            throw new InvalidOperationException("El grupo seleccionado no existe");

        var content = new Content
        {
            Title = dto.Title,
            Body = dto.Body,
            ImageUrl = dto.ImageUrl,
            Subtitle = dto.Subtitle,
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
            Subtitle: created.Subtitle,
            CreationDate: created.CreationDate,
            UserId: created.UserId,
            UserName: $"{created.User.Name} {created.User.LastName}",
            GroupId: created.GroupId,
            GroupName: created.Group.Name,
            Type: created.Type
        );
    }
}
