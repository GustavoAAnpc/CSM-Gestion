namespace CSM_Gestion.Backend.Data.Interface
{
    public interface IUnitOfWork
    {
        IAsociadoRepository AsociadoRepository { get; }
        Task<int> SaveChangesAsync();
    }
}
