namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class PageUpdate(IPageRepository repository, IUserRepository userRepository) : IPageUpdate
{
    private readonly IPageRepository _repository = repository;
    private readonly IUserRepository _userRepository = userRepository;

    public async Task ExecuteAsync(int id, PageUpdateDto dto, int actingUserId)
    {
        var page = await _repository.GetByIdAsync(id);
        if (page == null) throw new InvalidOperationException("Página no encontrada");

        var actingUser = await _userRepository.GetByIdAsync(actingUserId);
        if (actingUser == null || !actingUser.CanEditGroup(page.GroupId))
            throw new UnauthorizedAccessException("No tenés permiso para editar páginas de ese grupo");

        var existing = await _repository.GetBySlugAsync(dto.Slug);
        if (existing != null && existing.Id != id) throw new InvalidOperationException("Ya existe una página con esa URL");

        page.Title = dto.Title;
        page.Slug = dto.Slug;
        page.Body = dto.Body;
        page.ImageUrl = dto.ImageUrl;

        await _repository.UpdateAsync(page);
    }
}
