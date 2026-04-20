// Universidad.Domain/Entities/Area.cs
namespace Universidad.Domain.Entities;

public class Group
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<UserGroup>? Users { get; set; }
    public ICollection<Content>? Content { get; set; }


    public Group(string name, string description, ICollection<UserGroup> users, ICollection<Content> content)
    {
        Name = name;
        Description = description;
        Users = users ?? []; // initialize to empty list if null
        Content = content ?? []; // initialize to empty list if null
    }

    public Group() { }
}