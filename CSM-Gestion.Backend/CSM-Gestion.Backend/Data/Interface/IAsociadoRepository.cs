using CSM_Gestion.Backend.Models;

namespace CSM_Gestion.Backend.Data.Interface
{
    public interface IAsociadoRepository
    {
        Task<Asociado?> GetByIdAsync(Guid id);
        Task AddAsync(Asociado asociado);
        Task<bool> DniExisteAsync(string dni);
        Task<bool> NumeroCelularExisteAsync(string numeroCelular);
        Task<bool> EmailExisteAsync(string email);
        Task<bool> NumeroRucExisteAsync(string numeroRuc);
        Task<Asociado?> GetByNombreApellidos(string nombre, string apellidoPaterno, string apellidoMaterno);
        Task<IEnumerable<Asociado?>> GetAsociadoByInput(string input);
        Task<IEnumerable<Asociado?>> GetAllByEstado(string estado);
        Task<bool> CambiarEstadoSolicitudAsync(Guid asociadoId,string estado);
        Task<Asociado?> GetAsociadoIncludsByIdAsync(Guid id);
    }
}
