namespace Universidad.Application.Interfaces;

public interface IPageDelete
{
    Task ExecuteAsync(int id, int actingUserId);
}
