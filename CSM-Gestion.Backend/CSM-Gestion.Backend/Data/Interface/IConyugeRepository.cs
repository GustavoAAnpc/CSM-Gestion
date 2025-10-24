namespace CSM_Gestion.Backend.Data.Interface
{
    public interface IConyugeRepository
    {
        Task<bool> DniExiste(string dni);
    }
}
