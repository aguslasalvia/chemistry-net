using Universidad.Domain.Interfaces;
using Universidad.Domain.Entities;
using Universidad.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Universidad.Infrastructure.Repositories;

public class GroupRepository(AppDbContext context) : IGroupRepository
{
    private readonly AppDbContext _context = context;

    public async Task<Group> CreateAsync(Group group)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(Group group)
    {
        var groupToDelete = await _context.Groups.FindAsync(group.Id);
        if (groupToDelete == null) return;

        _context.Groups.Remove(groupToDelete);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Group>> GetAllAsync()
    {
        return await _context.Groups.ToListAsync();
    }

    public async Task<Group> GetByIdAsync(int id)
    {
        return await _context.Groups.FindAsync(id);
    }

    public async Task UpdateAsync(Group group)
    {
        var groupToUpdate = await _context.Groups.FindAsync(group.Id);
        if (groupToUpdate == null) return;

        groupToUpdate.Name = group.Name;
        groupToUpdate.Description = group.Description;

        await _context.SaveChangesAsync();
    }
}