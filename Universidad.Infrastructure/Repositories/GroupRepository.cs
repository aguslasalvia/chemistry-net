using Universidad.Domain.Interfaces;
using Universidad.Domain.Entities;
using Universidad.Domain.enums;
using Universidad.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Universidad.Infrastructure.Repositories;

public class GroupRepository(AppDbContext context) : IGroupRepository
{
    private readonly AppDbContext _ctx = context;

    public async Task<Group> CreateAsync(Group group)
    {
        _ctx.Groups.Add(group);
        await _ctx.SaveChangesAsync();
        return group;
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
        return await _ctx.Groups
            .Include(g => g.Users)
                .ThenInclude(ug => ug.User)
            .ToListAsync();
    }

    public async Task<Group?> GetByIdAsync(int id)
    {
        return await _ctx.Groups
            .Include(g => g.Users)
                .ThenInclude(ug => ug.User)
            .FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task UpdateAsync(Group group)
    {
        var groupToUpdate = await _ctx.Groups.FindAsync(group.Id);
        if (groupToUpdate == null) return;

        groupToUpdate.Name = group.Name;
        groupToUpdate.Description = group.Description;

        await _ctx.SaveChangesAsync();
    }

    public async Task AddUserAsync(int groupId, int userId, Rol role)
    {
        var existing = await _ctx.UserGroups.FindAsync(userId, groupId);
        if (existing != null) return;

        _ctx.UserGroups.Add(new UserGroup
        {
            UserId = userId,
            GroupId = groupId,
            GroupRol = role
        });
        await _ctx.SaveChangesAsync();
    }

    public async Task RemoveUserAsync(int groupId, int userId)
    {
        var userGroup = await _ctx.UserGroups.FindAsync(userId, groupId);
        if (userGroup == null) return;

        _ctx.UserGroups.Remove(userGroup);
        await _ctx.SaveChangesAsync();
    }

    public async Task UpdateUserRoleAsync(int groupId, int userId, Rol role)
    {
        var userGroup = await _ctx.UserGroups.FindAsync(userId, groupId);
        if (userGroup == null) return;

        userGroup.GroupRol = role;
        await _ctx.SaveChangesAsync();
    }
}
