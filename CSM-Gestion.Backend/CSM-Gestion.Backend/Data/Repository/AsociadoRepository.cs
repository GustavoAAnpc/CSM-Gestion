using CSM_Gestion.Backend.Data.Interface;
using CSM_Gestion.Backend.Models;

namespace CSM_Gestion.Backend.Data.Repository
{
    public class AsociadoRepository : IAsociadoRepository
    {
        private readonly IRepository<Asociado> _repository;
        public AsociadoRepository(IRepository<Asociado> repository)
        {
            _repository = repository;
        }
        public async Task AddAsync(Asociado asociado)
        {
            await _repository.AddAsync(asociado);
        }
        public async Task<Asociado?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _repository.GetByIdAsync(id, cancellationToken);
        }
    }
}
