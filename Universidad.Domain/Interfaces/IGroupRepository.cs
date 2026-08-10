namespace Universidad.Domain.Interfaces;

using Universidad.Domain.Entities;
using Universidad.Domain.enums;

public interface IGroupRepository
{
    Task<IEnumerable<Group>> GetAllAsync();
    Task<Group?> GetByIdAsync(int id);
    Task<Group> CreateAsync(Group group);
    Task UpdateAsync(Group group);
    Task DeleteAsync(Group group);
    Task AddUserAsync(int groupId, int userId, Rol role);
    Task RemoveUserAsync(int groupId, int userId);
    Task UpdateUserRoleAsync(int groupId, int userId, Rol role);
}

