namespace Universidad.Domain.Interfaces;

public interface IContentRepository
{
    public Task<string> GetContentAsync(string contentId);
    public Task SaveContentAsync(string contentId, string content);



}