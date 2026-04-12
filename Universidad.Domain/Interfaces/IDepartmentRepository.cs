namespace Universidad.Domain.Interfaces;

using Universidad.Domain.Entities;
using Universidad.Domain.Interfaces;

public interface IDepartmentRepository
{
    Task<Department?> GetDepartmentByIdAsync(int id);
    Task AddDepartmentAsync(Department department);
    Task UpdateDepartmentAsync(Department department);
    Task DeleteDepartmentAsync(Department department);
}