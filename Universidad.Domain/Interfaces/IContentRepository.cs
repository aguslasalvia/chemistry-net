namespace Universidad.Domain.Interfaces;

public interface IContentRepository
{
    public Task<string> GetContentAsync(int contentId);
    public Task SaveContentAsync(int contentId, string content);

}