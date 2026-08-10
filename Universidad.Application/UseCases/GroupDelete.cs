namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Domain.Interfaces;

public class GroupDelete(IGroupRepository repository) : IGroupDelete
{
    private readonly IGroupRepository _repository = repository;

    public async Task ExecuteAsync(int id)
    {
        var group = await _repository.GetByIdAsync(id);
        if (group == null) throw new InvalidOperationException("Group not found");

        await _repository.DeleteAsync(group);
    }
}
