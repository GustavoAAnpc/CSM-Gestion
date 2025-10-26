using CSM_Gestion.Backend.Data.Interface;
using CSM_Gestion.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace CSM_Gestion.Backend.Data.Repository
{
    public class AsociadoRepository : IAsociadoRepository
    {
        private readonly IRepository<Asociado> _repository;
        private readonly AppDbContext _context;
        public AsociadoRepository(IRepository<Asociado> repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }
        public async Task AddAsync(Asociado asociado) => await _repository.AddAsync(asociado);
        public async Task<bool> DniExisteAsync(string dni) => await _context.Asociados.AnyAsync(a => a.Dni == dni);

        public async Task<bool> EmailExisteAsync(string email) => await _context.Asociados.AnyAsync(a => a.CorreoActual == email);

        public async Task<IEnumerable<Asociado?>> GetAsociadoByInput(string nombre)
        {
            if (string.IsNullOrWhiteSpace(nombre))
                return Enumerable.Empty<Asociado>();

            nombre = nombre.Trim().ToLower();

            return await _context.Asociados
                .Where(a => a.Nombre.ToLower().Contains(nombre))
                .ToListAsync();
        }

        public async Task<Asociado?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _repository.GetByIdAsync(id, cancellationToken);
        }

        public async Task<Asociado?> GetByNombreApellidos(string nombre, string apellidoPaterno, string apellidoMaterno)
        {
            nombre = nombre.Trim().ToLower();
            apellidoPaterno = apellidoPaterno.Trim().ToLower();
            apellidoMaterno = apellidoMaterno.Trim().ToLower();

            return await _context.Asociados
                .Include(a => a.Conyuge)  
                .Include(a => a.Hijos)    
                .FirstOrDefaultAsync(a =>
                    a.Nombre.ToLower() == nombre &&
                    a.ApellidoPaterno.ToLower() == apellidoPaterno &&
                    a.ApellidoMaterno.ToLower() == apellidoMaterno);
        }


        public async Task<bool> NumeroCelularExisteAsync(string numeroCelular) => await _context.Asociados.AnyAsync(a => a.NumeroCelular == numeroCelular);
        public async Task<bool> NumeroRucExisteAsync(string numeroRuc) => await _context.Asociados.AnyAsync(a => a.NumeroRuc == numeroRuc);
    }
}
