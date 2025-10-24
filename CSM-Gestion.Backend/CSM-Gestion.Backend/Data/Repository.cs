namespace CSM_Gestion.Backend.Data
{
    public abstract class Repository<T> where T : class
    {
        public readonly AppDbContext _context;
        protected Repository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
        }
        public async Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Set<T>().FindAsync(id);
        }
    }
}
