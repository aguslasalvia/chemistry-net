namespace Universidad.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public IEnumerable<UserGroup> Groups { get; set; }

    /// <summary>Membership in the "Administrador" group grants global access — no separate admin flag/table.</summary>
    public bool IsAdmin => Groups != null && Groups.Any(g => g.Group != null && g.Group.Name == "Administrador");

    public bool CanEditGroup(int groupId) => IsAdmin || (Groups != null && Groups.Any(g => g.GroupId == groupId));

    public User(string name, string lastName, string email, string passwordHash, ICollection<UserGroup> groups)
    {
        Name = name;
        LastName = lastName;
        Email = email;
        PasswordHash = passwordHash;
        Groups = groups ?? []; // initialize to empty list if null
    }

    public User() { }

}