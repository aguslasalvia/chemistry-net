namespace Universidad.Domain.Interfaces;

public interface IGroupRepository
{
    Task<Group> GetGroupByIdAsync(int id);
    Task<Group> CreateAsync(Group group);
    Task UpdateGroupAsync(Group group);
    Task DeleteGroupAsync(Group group);
}

