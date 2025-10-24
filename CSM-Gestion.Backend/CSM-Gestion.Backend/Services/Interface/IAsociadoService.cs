using CSM_Gestion.Backend.DTOs.Request;
using CSM_Gestion.Backend.Utils;

namespace CSM_Gestion.Backend.Service.Interface
{
    public interface IAsociadoService
    {
        Task<Result<Guid>> RegistrarFormulario(FormularioAsociadoRequest request);
    }
}
