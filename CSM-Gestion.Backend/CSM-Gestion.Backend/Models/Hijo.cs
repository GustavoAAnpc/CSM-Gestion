using CSM_Gestion.Backend.Utils;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSM_Gestion.Backend.Models
{
    [Table("hijo")]
    public class Hijo
    {
        [Key]
        [Column("id_hijo")]
        public Guid HijoId { get; set; }

        [Required]
        [ForeignKey(nameof(Asociado))]
        [Column("id_asociado")]
        public Guid AsociadoId { get; set; }
        public Asociado Asociado { get; set; }

        [Required, MaxLength(100)]
        [Column("nombre")]
        public string Nombre { get; set; }

        [MaxLength(8)]
        [Column("dni")]
        public string? Dni { get; set; }

        [MaxLength(20)]
        [Column("genero")]
        public string? Genero { get; set; }

        [Column("fecha_nacimiento", TypeName = "date")]
        public DateOnly FechaNacimiento { get; set; }

        [MaxLength(50)]
        [Column("grado_estudios")]
        public string? Estudios { get; set; }

        private Hijo(){}
        public static Result<Hijo> Create(string nombre, string? dni, string? genero, DateOnly fechaNacimiento, string? estudios)
        {
            if (string.IsNullOrWhiteSpace(nombre))
            {
                return Result<Hijo>.Failure("El nombre es obligatorio.");
            }
            if (string.IsNullOrWhiteSpace(dni))
            {
                return Result<Hijo>.Failure("El DNI es obligatorio.");
            }
            if (string.IsNullOrWhiteSpace(genero))
            {
                return Result<Hijo>.Failure("El Genero es obligatorio.");
            }
            var hijo = new Hijo
            {
                HijoId = Guid.NewGuid(),
                Nombre = nombre,
                Dni = dni,
                Genero = genero,
                FechaNacimiento = fechaNacimiento,
                Estudios = estudios
            };

            return Result<Hijo>.Success(hijo);
        }
    }
}
