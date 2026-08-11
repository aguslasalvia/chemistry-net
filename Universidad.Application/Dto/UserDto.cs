namespace Universidad.Application.Dto;

public record UserDto(int Id, string Name, string LastName, string Email, bool IsAdmin, List<GroupDto> Groups);

public record UserRegisterDto(string Name, string LastName, string Email, string Password);

public record LoginDto(string Email, string Password);

public record UserUpdateDto(string Name, string LastName, string Email);

public record UserChangePasswordDto(string NewPassword);

