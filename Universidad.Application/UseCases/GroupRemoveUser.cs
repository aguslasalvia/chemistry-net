namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Domain.Interfaces;

public class GroupRemoveUser(IGroupRepository repository) : IGroupRemoveUser
{
    private readonly IGroupRepository _repository = repository;

    public async Task ExecuteAsync(int groupId, int userId)
    {
        await _repository.RemoveUserAsync(groupId, userId);
    }
}
