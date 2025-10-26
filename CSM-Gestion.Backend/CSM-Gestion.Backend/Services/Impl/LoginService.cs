using CSM_Gestion.Backend.Data.UnitOfWork;
using CSM_Gestion.Backend.DTOs.Request;
using CSM_Gestion.Backend.DTOs.Response;
using CSM_Gestion.Backend.Services.Interface;
using CSM_Gestion.Backend.Utils;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CSM_Gestion.Backend.Services.Impl
{
    public class LoginService : ILoginService
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _UoW;

        public LoginService(IUnitOfWork uoW, IConfiguration config)
        {
            _UoW = uoW;
            _config = config;
        }

        public Result<string> GenerarTokenJwt(string usuario)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, usuario),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(6),
                signingCredentials: creds
            );

            return Result<string>.Success(new JwtSecurityTokenHandler().WriteToken(token));
        }

        public async Task<Result<TokenResponse>> Login(LoginRequest request)
        {
            var admin = await _UoW.AdministradorRepository.GetAdministradorByCredentials(request.usuario, request.password);
            if(admin is null)
            {
                return Result<TokenResponse>.Failure("Credenciales inválidas.");
            }
            var tokenResult = GenerarTokenJwt(admin.Usuario);

            if (!tokenResult.IsSuccess)
            {
                return Result<TokenResponse>.Failure("Error al generar el token.");
            }
            string token = tokenResult.Value;

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwt = tokenHandler.ReadJwtToken(token);

            var tokenResponse = new TokenResponse(
                token,
                DateTime.UtcNow,
                jwt.ValidTo,   
                request.usuario
            );
            return Result<TokenResponse>.Success(tokenResponse);
        }
    }
}
