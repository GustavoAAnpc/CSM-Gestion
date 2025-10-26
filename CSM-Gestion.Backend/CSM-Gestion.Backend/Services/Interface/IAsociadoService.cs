using CSM_Gestion.Backend.DTOs.Request;
using CSM_Gestion.Backend.DTOs.Response;
using CSM_Gestion.Backend.Utils;

namespace CSM_Gestion.Backend.Service.Interface
{
    public interface IAsociadoService
    {
        Task<Result<Guid>> RegistrarFormulario(AsociadoRequest request);
        Task<Result<DatosAsociadoResponse>> MostrarDatosAsociado(BuscarAsociadoRequest request);
        Task<Result<List<InputAsociadoResponse>>> BuscarAsociadosPorNombre(string nombre);
        Task<Result<PaginacionResponse<DatosFormularioAsociadoResponse>>> ListaAsociadosPorEstado(string estado, int numeroPagina, int tamanioPagina);
    }
}
