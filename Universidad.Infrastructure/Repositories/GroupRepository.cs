using Universidad.Domain.Interfaces;
using Universidad.Domain.Entities;
using Universidad.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Universidad.Infrastructure.Repositories;

public class GroupRepository(AppDbContext context) : IGroupRepository
{
    private readonly AppDbContext _ctx = context;

    public async Task<Group> CreateAsync(Group group)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(Group group)
    {
        var groupToDelete = await _ctx.Groups.FindAsync(group.Id);
        if (groupToDelete == null) return;

        _ctx.Groups.Remove(groupToDelete);
        await _ctx.SaveChangesAsync();
    }

    public async Task<IEnumerable<Group>> GetAllAsync()
    {
        return await _ctx.Groups.ToListAsync();
    }

    public async Task<Group> GetByIdAsync(int id)
    {
        return await _ctx.Groups.FindAsync(id);
    }

    public async Task UpdateAsync(Group group)
    {
        var groupToUpdate = await _ctx.Groups.FindAsync(group.Id);
        if (groupToUpdate == null) return;

        groupToUpdate.Name = group.Name;
        groupToUpdate.Description = group.Description;

        await _ctx.SaveChangesAsync();
    }
}