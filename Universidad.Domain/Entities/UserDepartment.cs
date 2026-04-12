namespace Universidad.Domain.Entities;

using Universidad.Domain.enums;

public class UserDepartment
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int DepartmentId { get; set; }
    public Department Department { get; set; }

    public Rol DepartmentRol { get; set; }

    public UserDepartment(int userId, int departmentId, Rol departmentRol)
    {
        UserId = userId;
        DepartmentId = departmentId;
        DepartmentRol = departmentRol;
    }

    public UserDepartment() { }
}