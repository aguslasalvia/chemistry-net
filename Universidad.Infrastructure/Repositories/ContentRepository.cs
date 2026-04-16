namespace Universidad.Infrastructure.Repositories;

using Universidad.Domain.Interfaces;

public class ContentRepository : IContentRepository
{
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