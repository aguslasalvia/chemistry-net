using Universidad.Domain.enums;

namespace Universidad.Domain.Entities;

public class UserGroup
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int GroupId { get; set; }
    public Group Group { get; set; }

    public Rol GroupRol { get; set; }

    public UserGroup(int userId, int groupId, Rol groupRol)
    {
        UserId = userId;
        GroupId = groupId;
        GroupRol = groupRol;
    }

    public UserGroup() { }
}