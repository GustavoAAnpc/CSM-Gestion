using CSM_Gestion.Backend.Models;

namespace CSM_Gestion.Backend.Data.Interface
{
    public interface IAdministradorRepository
    {
        Task<Administrador?> GetAdministradorByCredentials(string usuario, string password);
    }
}
