namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class ContentUpdate(IContentRepository repository) : IContentUpdate
{
    private readonly IContentRepository _repository = repository;

    public async Task ExecuteAsync(int id, ContentUpdateDto dto)
    {
        var content = await _repository.GetByIdAsync(id);
        if (content == null) throw new InvalidOperationException("Contenido no encontrado");

        content.Title = dto.Title;
        content.Body = dto.Body;
        content.ImageUrl = dto.ImageUrl;
        content.Subtitle = dto.Subtitle;
        content.Type = dto.Type;

        await _repository.UpdateAsync(content);
    }
}
