namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Domain.Interfaces;

public class ContentDelete(IContentRepository repository, IUserRepository userRepository) : IContentDelete
{
    private readonly IContentRepository _repository = repository;
    private readonly IUserRepository _userRepository = userRepository;

    public async Task ExecuteAsync(int id, int actingUserId)
    {
        var content = await _repository.GetByIdAsync(id);
        if (content == null) throw new InvalidOperationException("Contenido no encontrado");

        var actingUser = await _userRepository.GetByIdAsync(actingUserId);
        if (actingUser == null || !actingUser.CanEditGroup(content.GroupId))
            throw new UnauthorizedAccessException("No tenés permiso para eliminar contenido de ese grupo");

        await _repository.DeleteAsync(content);
    }
}
