namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class UserUpdate(IUserRepository repository) : IUserUpdate
{
    private readonly IUserRepository _repository = repository;

    public async Task<UserDto> ExecuteAsync(int id, UserUpdateDto dto)
    {
        var user = await _repository.GetByIdAsync(id);
        if (user == null) throw new InvalidOperationException("Usuario no encontrado");

        user.Name = dto.Name;
        user.LastName = dto.LastName;
        user.Email = dto.Email;

        await _repository.UpdateAsync(user);

        return new UserDto(
            Id: user.Id,
            Name: user.Name,
            LastName: user.LastName,
            Email: user.Email,
            IsAdmin: user.IsAdmin,
            Groups: user.Groups.Select(g => new GroupDto(
                Id: g.Group.Id,
                Name: g.Group.Name,
                Description: g.Group.Description
            )).ToList()
        );
    }
}
