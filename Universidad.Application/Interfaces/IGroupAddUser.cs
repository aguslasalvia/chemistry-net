namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IGroupAddUser
{
    Task ExecuteAsync(int groupId, GroupAddUserDto dto);
}
