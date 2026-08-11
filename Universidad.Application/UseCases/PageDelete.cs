namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Domain.Interfaces;

public class PageDelete(IPageRepository repository, IUserRepository userRepository) : IPageDelete
{
    private readonly IPageRepository _repository = repository;
    private readonly IUserRepository _userRepository = userRepository;

    public async Task ExecuteAsync(int id, int actingUserId)
    {
        var page = await _repository.GetByIdAsync(id);
        if (page == null) throw new InvalidOperationException("Página no encontrada");

        var actingUser = await _userRepository.GetByIdAsync(actingUserId);
        if (actingUser == null || !actingUser.CanEditGroup(page.GroupId))
            throw new UnauthorizedAccessException("No tenés permiso para eliminar páginas de ese grupo");

        await _repository.DeleteAsync(page);
    }
}
