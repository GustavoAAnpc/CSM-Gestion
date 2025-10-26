using CSM_Gestion.Backend.Data.Interface;

namespace CSM_Gestion.Backend.Data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        public IAsociadoRepository AsociadoRepository { get; }
        public IConyugeRepository ConyugeRepository { get; }
        public IHijoRepository HijoRepository { get; }
        public IAdministradorRepository AdministradorRepository { get; }
        public UnitOfWork(
            AppDbContext context,
            IAsociadoRepository asociadoRepository,
            IConyugeRepository conyugeRepository,
            IHijoRepository hijoRepository,
            IAdministradorRepository administradorRepository)
        {
            _context = context;
            AsociadoRepository = asociadoRepository;
            ConyugeRepository = conyugeRepository;
            HijoRepository = hijoRepository;
            AdministradorRepository = administradorRepository;  
        }


        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
