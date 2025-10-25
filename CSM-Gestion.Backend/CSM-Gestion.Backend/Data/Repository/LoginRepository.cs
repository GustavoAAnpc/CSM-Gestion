using CSM_Gestion.Backend.Data.Interface;
using CSM_Gestion.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace CSM_Gestion.Backend.Data.Repository
{
    public class LoginRepository : ILoginRepository
    {
        private readonly AppDbContext _context;

        public LoginRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Administrador?> GetAdministradorByCredentials(string usuario, string password)
        {
            return await _context.Administrador.FirstOrDefaultAsync(a => a.Usuario == usuario && a.Password == password);
        }
    }
}
