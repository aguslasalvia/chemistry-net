namespace Universidad.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public ICollection<UserGroup> Groups { get; set; }

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