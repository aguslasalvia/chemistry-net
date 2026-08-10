namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IGroupUpdateUserRole
{
    Task ExecuteAsync(int groupId, int userId, GroupUpdateUserRoleDto dto);
}
