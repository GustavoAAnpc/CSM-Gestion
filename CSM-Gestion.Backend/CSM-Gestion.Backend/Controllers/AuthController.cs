using CSM_Gestion.Backend.DTOs.Request;
using CSM_Gestion.Backend.Services.Interface;
using CSM_Gestion.Backend.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CSM_Gestion.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public AuthController(ILoginService loginService)
        {
            _loginService = loginService;
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
        {
            var result = await _loginService.Login(request);
            if (!result.IsSuccess)
            {
                var response = ApiResponse<object>.Fail(result.ErrorMessage);
                return Unauthorized(response);
            }
            var successResponse = ApiResponse<object>.Success(result.Value, "Login exitoso");
            return Ok(successResponse);
        }
    }
}
