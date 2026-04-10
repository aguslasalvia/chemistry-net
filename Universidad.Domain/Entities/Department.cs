// Universidad.Domain/Entities/Area.cs

using Universidad.Domain.Entities;

public class Department
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<UserDepartment> Users { get; set; }
    public ICollection<Content> Content { get; set; }
}