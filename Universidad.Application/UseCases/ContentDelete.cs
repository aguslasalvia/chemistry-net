namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Domain.Interfaces;

public class ContentDelete(IContentRepository repository) : IContentDelete
{
    private readonly IContentRepository _repository = repository;

    public async Task ExecuteAsync(int id)
    {
        var content = await _repository.GetByIdAsync(id);
        if (content == null) throw new InvalidOperationException("Contenido no encontrado");

        await _repository.DeleteAsync(content);
    }
}
