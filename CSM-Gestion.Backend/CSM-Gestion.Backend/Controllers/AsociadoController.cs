using CSM_Gestion.Backend.DTOs.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CSM_Gestion.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsociadoController : ControllerBase
    {
        [HttpPost]
        private IActionResult CrearAsociado([FromBody]FormularioAsociadoRequest request, CancellationToken cancellationToken)
        {
            return Ok();
        }
    }
}
