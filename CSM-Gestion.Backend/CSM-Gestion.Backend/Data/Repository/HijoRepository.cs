using CSM_Gestion.Backend.Data.Interface;
using Microsoft.EntityFrameworkCore;

namespace CSM_Gestion.Backend.Data.Repository
{
    public class HijoRepository : IHijoRepository
    {
        private readonly AppDbContext _context;

        public HijoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> DniExiste(string dni) => await _context.Hijos.AnyAsync(h => h.Dni == dni);
    }
}
