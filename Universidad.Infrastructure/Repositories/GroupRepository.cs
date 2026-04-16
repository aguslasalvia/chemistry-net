using Universidad.Domain.Interfaces;
using Universidad.Infrastructure.Persistence;

namespace Universidad.Infrastructure.Repositories;

public class GroupRepository : IGroupRepository
{
    private readonly AppDbContext _context;


    public Task<Group?> GetGroupByIdAsync(int id)
    {
        // Implement logic to retrieve group by ID
        throw new NotImplementedException();
    }

    public async Task<Group> CreateAsync(Group group)
    {
        _context.Groups.Add(group);
        await _context.SaveChangesAsync();
        return group;
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