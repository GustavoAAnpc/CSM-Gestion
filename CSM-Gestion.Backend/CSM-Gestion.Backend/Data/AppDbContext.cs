using Microsoft.EntityFrameworkCore;

namespace CSM_Gestion.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

    }
}
