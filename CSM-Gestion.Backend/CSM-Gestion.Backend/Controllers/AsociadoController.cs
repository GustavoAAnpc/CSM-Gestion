using CSM_Gestion.Backend.DTOs.Request;
using CSM_Gestion.Backend.Service.Interface;
using CSM_Gestion.Backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CSM_Gestion.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsociadoController : ControllerBase
    {
        private readonly IAsociadoService _asociadoService;
        public AsociadoController(IAsociadoService asociadoService)
        {
            _asociadoService = asociadoService;
        }
        [HttpPost]
        public async Task<IActionResult> EnviarFormulario([FromBody] AsociadoRequest request, CancellationToken cancellationToken)
        {
            var result = await _asociadoService.RegistrarFormulario(request);

            if (!result.IsSuccess)
            {
                var response = ApiResponse<object>.Fail(result.ErrorMessage);
                return BadRequest(response);
            }

            var successResponse = ApiResponse<object>.Success(result.Value, "Asociado registrado correctamente");
            return Ok(successResponse);
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> BuscarAsociadoPorNombreApellidos([FromBody]BuscarAsociadoRequest request)
        {
            var result = await _asociadoService.MostrarDatosAsociado(request);

            if (!result.IsSuccess)
            {
                var response = ApiResponse<object>.Fail(result.ErrorMessage);
                return BadRequest(response);
            }
            var successResponse = ApiResponse<object>.Success(result.Value, "Datos del asociado obtenidos correctamente");
            return Ok(successResponse);
        }
        [Authorize]
        [HttpGet("buscarPorNombre")]
        public async Task<IActionResult> BusquedaFlexibleAsociados([FromBody] InputNombreAsociadoRequest request)
        {
            var result = await _asociadoService.BuscarAsociadosPorNombre(request.Nombre);
            if (!result.IsSuccess)
            {
                var response = ApiResponse<object>.Fail(result.ErrorMessage);
                return BadRequest(response);
            }
            var successResponse = ApiResponse<object>.Success(result.Value, "Asociados encontrados correctamente");
            return Ok(successResponse);
        }
        [Authorize]
        [HttpGet("estado/{estado}")]
        public async Task<IActionResult> Listar(
            string estado,
            [FromQuery] int pagina = 1,
            [FromQuery] int tamanio = 10)
        {
            var result = await _asociadoService.ListaAsociadosPorEstado(estado, pagina, tamanio);

            if (!result.IsSuccess)
            {
                return NotFound(ApiResponse<object>.Fail(result.ErrorMessage));
            }
            return Ok(ApiResponse<object>.Success(result.Value, "Asociados obtenidos correctamente"));
        }
        [Authorize]
        [HttpPatch("aprobar/{id}")]
        public async Task<IActionResult> ActualizarEstadoAsociado(Guid id)
        {
            var result = await _asociadoService.AprobarSolicitudAsociado(id);
            if (!result.IsSuccess)
            {
                var response = ApiResponse<object>.Fail(result.ErrorMessage);
                return BadRequest(response);
            }
            var successResponse = ApiResponse<object>.Success(result.Value, "Solicitud Aprobada");
            return Ok(successResponse);

        }
    }
}
