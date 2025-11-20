using CSM_Gestion.Backend.Data.Interface;
using CSM_Gestion.Backend.Enums;
using CSM_Gestion.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace CSM_Gestion.Backend.Data.Repository
{
    public class AsociadoRepository : IAsociadoRepository, IRepository<Asociado>
    {
        private readonly IRepository<Asociado> _repository;
        private readonly AppDbContext _context;
        public AsociadoRepository(IRepository<Asociado> repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }
        public async Task AddAsync(Asociado asociado) => await _repository.AddAsync(asociado);

        public async Task<bool> CambiarEstadoSolicitudAsync(Guid asociadoId, string estado)
        {
            var asociado = await _repository.GetByIdAsync(asociadoId);
            if (asociado == null)
            {
                return false;
            }
            var estadoNormalizado = estado.Trim().ToLower();
            if (estadoNormalizado == Estado.Aprobado.ToString().ToLower())
            {
                asociado.Estado = Estado.Aprobado.ToString();
            }
            else if (estadoNormalizado == Estado.Rechazado.ToString().ToLower())
            {
                asociado.Estado = Estado.Rechazado.ToString();
            }
            else
            {
                return false; 
            }
            return true;
        }

        public async Task<bool> DniExisteAsync(string dni) => await _context.Asociados.AnyAsync(a => a.Dni == dni);

        public async Task<bool> EmailExisteAsync(string email) => await _context.Asociados.AnyAsync(a => a.CorreoActual == email);

        public async Task<IEnumerable<Asociado?>> GetAllByEstado(string estado)//TODO: este metodo es para buscar a todos los asociados por estado
        {
            return await _context.Asociados
                .Where(a => a.Estado == estado)
                .Include(a => a.Conyuge)
                .Include(a => a.Hijos)
                .ToListAsync();
        }

        public async Task<IEnumerable<Asociado?>> GetAsociadoByInput(string nombre)
        {
            if (string.IsNullOrWhiteSpace(nombre))
                return Enumerable.Empty<Asociado>();

            nombre = nombre.Trim().ToLower();

            return await _context.Asociados
                .Where(a => a.Nombre.ToLower().Contains(nombre) && a.Estado == "Aprobado")
                .ToListAsync();

        }

        public Task<Asociado?> GetAsociadoIncludsByIdAsync(Guid id)
        {
            return _context.Asociados
                .Include(a => a.Conyuge)
                .Include(a => a.Hijos)
                .FirstOrDefaultAsync(a => a.AsociadoId == id);
        }

        public async Task<Asociado?> GetByIdAsync(Guid id)
        {
            return await _repository.GetByIdAsync(id);
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
