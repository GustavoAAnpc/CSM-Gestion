using CSM_Gestion.Backend.Models;

namespace CSM_Gestion.Backend.Data.Interface
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(Guid id);
        Task AddAsync(T entity);
    }
}
