namespace Universidad.Infrastructure.Repositories;

using Universidad.Domain.Interfaces;
using Universidad.Infrastructure.Persistence;

public class ContentRepository(AppDbContext context) : IContentRepository
{
    private readonly AppDbContext _ctx = context;

    public Task<string> GetContentAsync(int contentId)
    {
        // Implement logic to retrieve content based on contentId
        throw new NotImplementedException();
    }

    public Task SaveContentAsync(int contentId, string content)
    {
        // Implement logic to save content with the given contentId
        throw new NotImplementedException();
    }
}