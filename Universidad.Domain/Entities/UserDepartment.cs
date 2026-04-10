namespace Universidad.Domain.Entities;

using Universidad.Domain.enums;

public class UserDepartment
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int DepartmentId { get; set; }
    public Department Department { get; set; }

    public Rol DepartmentRol { get; set; }
}