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
        public async Task<IActionResult> CrearAsociado([FromBody] AsociadoRequest request, CancellationToken cancellationToken)
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
        public async Task<IActionResult> ObtenerAsociado([FromBody]BuscarAsociadoRequest request)
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
    }
}
