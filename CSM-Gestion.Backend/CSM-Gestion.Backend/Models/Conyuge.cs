using CSM_Gestion.Backend.Utils;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSM_Gestion.Backend.Models
{
    [Table("conyuge")]
    public class Conyuge
    {
        [Key]
        [Column("id_conyuge")]
        public Guid ConyugeId { get; set; }

        [Required]
        [ForeignKey(nameof(Asociado))]
        [Column("id_asociado")]
        public Guid AsociadoId { get; set; }

        public Asociado Asociado { get; set; }

        [MaxLength(50)]
        [Column("nombre")]
        public string? Nombre { get; set; }

        [MaxLength(50)]
        [Column("apellido_paterno")]
        public string? ApellidoPaterno { get; set; }

        [MaxLength(50)]
        [Column("apellido_materno")]
        public string? ApellidoMaterno { get; set; }

        [MaxLength(8)]
        [Column("dni")]
        public string? Dni { get; set; }

        [Column("fecha_nacimiento", TypeName = "date")]
        public DateOnly? FechaNacimiento { get; set; }

        [MaxLength(50)]
        [Column("grado_estudios")]
        public string? Estudios { get; set; }
        private Conyuge() { }
        public static Result<Conyuge> Create(string? nombre, string? apellidoPaterno, string? apellidoMaterno, string? dni, DateOnly? fechaNacimiento, string? estudios)
        {
            var conyuge = new Conyuge
            {
                ConyugeId = Guid.NewGuid(),
                Nombre = nombre,
                ApellidoPaterno = apellidoPaterno,
                ApellidoMaterno = apellidoMaterno,
                Dni = dni,
                FechaNacimiento = fechaNacimiento,
                Estudios = estudios
            };
            return Result<Conyuge>.Success(conyuge);
        }
    }
}
