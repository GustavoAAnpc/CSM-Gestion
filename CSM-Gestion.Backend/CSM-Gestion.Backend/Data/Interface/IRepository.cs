namespace CSM_Gestion.Backend.Data.Interface
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(Guid id,CancellationToken cancellationToken);
        Task AddAsync(T entity);   
    }
}
