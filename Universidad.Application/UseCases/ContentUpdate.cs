namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class ContentUpdate(IContentRepository repository, IUserRepository userRepository) : IContentUpdate
{
    private readonly IContentRepository _repository = repository;
    private readonly IUserRepository _userRepository = userRepository;

    public async Task ExecuteAsync(int id, ContentUpdateDto dto, int actingUserId)
    {
        var content = await _repository.GetByIdAsync(id);
        if (content == null) throw new InvalidOperationException("Contenido no encontrado");

        var actingUser = await _userRepository.GetByIdAsync(actingUserId);
        if (actingUser == null || !actingUser.CanEditGroup(content.GroupId))
            throw new UnauthorizedAccessException("No tenés permiso para editar contenido de ese grupo");

        content.Title = dto.Title;
        content.Body = dto.Body;
        content.ImageUrl = dto.ImageUrl;
        content.Subtitle = dto.Subtitle;
        content.Type = dto.Type;

        await _repository.UpdateAsync(content);
    }
}
