namespace Universidad.Infrastructure.Repositories;

using Universidad.Domain.Interfaces;
using Universidad.Infrastructure.Persistence;
using Universidad.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class PageRepository(AppDbContext context) : IPageRepository
{
    private readonly AppDbContext _ctx = context;

    public async Task<IEnumerable<Page>> GetAllAsync()
    {
        return await _ctx.Pages
            .Include(p => p.User)
            .Include(p => p.Group)
            .OrderByDescending(p => p.UpdatedDate)
            .ToListAsync();
    }

    public async Task<Page?> GetByIdAsync(int id)
    {
        return await _ctx.Pages.FindAsync(id);
    }

    public async Task<Page?> GetBySlugAsync(string slug)
    {
        return await _ctx.Pages
            .Include(p => p.User)
            .Include(p => p.Group)
            .FirstOrDefaultAsync(p => p.Slug == slug);
    }

    public async Task<Page> CreateAsync(Page page)
    {
        _ctx.Pages.Add(page);
        await _ctx.SaveChangesAsync();

        return await _ctx.Pages
            .Include(p => p.User)
            .Include(p => p.Group)
            .FirstAsync(p => p.Id == page.Id);
    }

    public async Task UpdateAsync(Page page)
    {
        var pageToUpdate = await _ctx.Pages.FindAsync(page.Id);
        if (pageToUpdate == null) return;

        pageToUpdate.Title = page.Title;
        pageToUpdate.Slug = page.Slug;
        pageToUpdate.Body = page.Body;
        pageToUpdate.ImageUrl = page.ImageUrl;
        pageToUpdate.UpdatedDate = DateTime.UtcNow;

        await _ctx.SaveChangesAsync();
    }

    public async Task DeleteAsync(Page page)
    {
        var pageToDelete = await _ctx.Pages.FindAsync(page.Id);
        if (pageToDelete == null) return;

        _ctx.Pages.Remove(pageToDelete);
        await _ctx.SaveChangesAsync();
    }
}
