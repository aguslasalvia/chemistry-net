using Universidad.Domain.Interfaces;

namespace Universidad.Infrastructure.Repositories;

public class GroupRepository : IGroupRepository
{
    public Task<Group?> GetGroupByIdAsync(int id)
    {
        // Implement logic to retrieve group by ID
        throw new NotImplementedException();
    }

    public Task AddGroupAsync(Group group)
    {
        // Implement logic to add a new group
        throw new NotImplementedException();
    }

    public Task UpdateGroupAsync(Group group)
    {
        // Implement logic to update an existing group
        throw new NotImplementedException();
    }

    public Task DeleteGroupAsync(Group group)
    {
        // Implement logic to delete a group
        throw new NotImplementedException();
    }
}