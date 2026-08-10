namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Domain.Interfaces;

public class UserDelete(IUserRepository repository) : IUserDelete
{
    private readonly IUserRepository _repository = repository;

    public async Task ExecuteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }
}
