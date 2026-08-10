namespace Universidad.Infrastructure.Repositories;

using Universidad.Domain.Interfaces;
using Universidad.Infrastructure.Persistence;
using Universidad.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class ContentRepository(AppDbContext context) : IContentRepository
{
    private readonly AppDbContext _ctx = context;

    public async Task<IEnumerable<Content>> GetAllAsync()
    {
        return await _ctx.Contents
            .Include(c => c.Group)
            .Include(c => c.User)
            .OrderByDescending(c => c.CreationDate)
            .ToListAsync();
    }

    public async Task<Content?> GetByIdAsync(int id)
    {
        return await _ctx.Contents.FindAsync(id);
    }

    public async Task<Content> CreateAsync(Content content)
    {
        _ctx.Contents.Add(content);
        await _ctx.SaveChangesAsync();

        return await _ctx.Contents
            .Include(c => c.Group)
            .Include(c => c.User)
            .FirstAsync(c => c.Id == content.Id);
    }

    public async Task UpdateAsync(Content content)
    {
        var contentToUpdate = await _ctx.Contents.FindAsync(content.Id);
        if (contentToUpdate == null) return;

        contentToUpdate.Title = content.Title;
        contentToUpdate.Body = content.Body;
        contentToUpdate.ImageUrl = content.ImageUrl;
        contentToUpdate.Type = content.Type;

        await _ctx.SaveChangesAsync();
    }

    public async Task DeleteAsync(Content content)
    {
        var contentToDelete = await _ctx.Contents.FindAsync(content.Id);
        if (contentToDelete == null) return;

        _ctx.Contents.Remove(contentToDelete);
        await _ctx.SaveChangesAsync();
    }
}
