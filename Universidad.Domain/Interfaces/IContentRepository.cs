namespace Universidad.Domain.Interfaces;

using Universidad.Domain.Entities;

public interface IContentRepository
{
    Task<IEnumerable<Content>> GetAllAsync();
    Task<Content?> GetByIdAsync(int id);
    Task<Content> CreateAsync(Content content);
    Task UpdateAsync(Content content);
    Task DeleteAsync(Content content);
}