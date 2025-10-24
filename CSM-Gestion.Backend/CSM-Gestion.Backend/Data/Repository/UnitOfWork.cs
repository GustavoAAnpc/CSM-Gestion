using CSM_Gestion.Backend.Data.Interface;

namespace CSM_Gestion.Backend.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        public IAsociadoRepository AsociadoRepository { get; }
        public UnitOfWork(AppDbContext context,IAsociadoRepository asociadoRepository)
        {
            _context = context;
            AsociadoRepository = asociadoRepository;
        }


        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
