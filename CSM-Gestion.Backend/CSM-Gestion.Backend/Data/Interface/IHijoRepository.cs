namespace CSM_Gestion.Backend.Data.Interface
{
    public interface IHijoRepository
    {
        Task<bool> DniExiste(string dni);   
    }
}
