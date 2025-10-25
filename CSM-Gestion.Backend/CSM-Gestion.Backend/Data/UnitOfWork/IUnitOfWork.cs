using CSM_Gestion.Backend.Data.Interface;

namespace CSM_Gestion.Backend.Data.UnitOfWork
{
    public interface IUnitOfWork
    {
        IAsociadoRepository AsociadoRepository { get; }
        IConyugeRepository ConyugeRepository { get; }
        IHijoRepository HijoRepository { get; }
        ILoginRepository LoginRepository { get; }
        Task<int> SaveChangesAsync();
    }
}
