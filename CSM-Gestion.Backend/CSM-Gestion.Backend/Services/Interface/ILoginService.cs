using CSM_Gestion.Backend.DTOs.Request;
using CSM_Gestion.Backend.DTOs.Response;
using CSM_Gestion.Backend.Utils;

namespace CSM_Gestion.Backend.Services.Interface
{
    public interface ILoginService
    {
        Task<Result<TokenResponse>> Login(LoginRequest request);
        Result<string> GenerarTokenJwt(string usuario);
    }
}
