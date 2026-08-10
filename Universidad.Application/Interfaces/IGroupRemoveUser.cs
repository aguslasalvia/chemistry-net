namespace Universidad.Application.Interfaces;

public interface IGroupRemoveUser
{
    Task ExecuteAsync(int groupId, int userId);
}
