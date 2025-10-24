using CSM_Gestion.Backend.Models;

namespace CSM_Gestion.Backend.Data.Interface
{
    public interface IAsociadoRepository
    {
        Task<Asociado?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task AddAsync(Asociado asociado);
        Task<bool> DniExisteAsync(string dni);
        Task<bool> NumeroCelularExisteAsync(string numeroCelular);
        Task<bool> EmailExisteAsync(string email);
        Task<bool> NumeroRucExisteAsync(string numeroRuc);
    }
}
