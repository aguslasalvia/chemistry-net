namespace Universidad.Domain.Interfaces;

using Universidad.Domain.Entities;

public interface IGroupRepository
{
    Task<IEnumerable<Group>> GetAllAsync();
    Task<Group> GetByIdAsync(int id);
    Task<Group> CreateAsync(Group group);
    Task UpdateAsync(Group group);
    Task DeleteAsync(Group group);
}

