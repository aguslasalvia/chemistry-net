namespace Universidad.Domain.Interfaces;

using Universidad.Domain.Entities;

public interface IPageRepository
{
    Task<IEnumerable<Page>> GetAllAsync();
    Task<Page?> GetByIdAsync(int id);
    Task<Page?> GetBySlugAsync(string slug);
    Task<Page> CreateAsync(Page page);
    Task UpdateAsync(Page page);
    Task DeleteAsync(Page page);
}
