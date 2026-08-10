namespace Universidad.Application.Dto;

using Universidad.Domain.enums;

public record GroupUserDto(int Id, string Name, string Email);

public record GroupDto(int Id, string Name, string Description, List<GroupUserDto>? Users = null);

public record GroupCreateDto(string Name, string Description);

public record GroupUpdateDto(string Name, string Description);

public record GroupAddUserDto(int UserId, Rol Role);

public record GroupUpdateUserRoleDto(Rol Role);
