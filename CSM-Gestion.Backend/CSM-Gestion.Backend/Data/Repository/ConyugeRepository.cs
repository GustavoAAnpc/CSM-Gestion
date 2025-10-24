using CSM_Gestion.Backend.Data.Interface;
using Microsoft.EntityFrameworkCore;

namespace CSM_Gestion.Backend.Data.Repository
{
    public class ConyugeRepository : IConyugeRepository
    {
        private readonly AppDbContext _context;

        public ConyugeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> DniExiste(string dni) => await _context.Conyuges.AnyAsync(c => c.Dni == dni);   
    }
}
