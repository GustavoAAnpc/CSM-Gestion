using CSM_Gestion.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace CSM_Gestion.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Asociado> Asociados { get; set; }
        public DbSet<Conyuge> Conyuges { get; set; }
        public DbSet<Hijo> Hijos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Asociado>()
                .HasOne(a => a.Conyuge)
                .WithOne(c => c.Asociado)
                .HasForeignKey<Conyuge>(c => c.AsociadoId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Asociado>()
                .HasMany(a => a.Hijos)
                .WithOne(h => h.Asociado)
                .HasForeignKey(h => h.AsociadoId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
