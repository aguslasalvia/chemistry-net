namespace Universidad.Domain.Interfaces;

public interface IGroupRepository
{
    Task<Group> GetGroupByIdAsync(int id);
    Task AddGroupAsync(Group group);
    Task UpdateGroupAsync(Group group);
    Task DeleteGroupAsync(Group group);
}

