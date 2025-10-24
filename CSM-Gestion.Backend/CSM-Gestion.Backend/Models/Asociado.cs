using CSM_Gestion.Backend.Utils;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSM_Gestion.Backend.Models
{
    [Table("asociado")]
    public class Asociado
    {
        [Key]
        [Column("id_asociado")]
        public Guid AsociadoId { get; set; }

        [Required, MaxLength(100)]
        [Column("nombre")]
        public string Nombre { get; set; }

        [Required, MaxLength(50)]
        [Column("apellido_paterno")]
        public string ApellidoPaterno { get; set; }

        [Required, MaxLength(50)]
        [Column("apellido_materno")]
        public string ApellidoMaterno { get; set; }

        [Required]
        [Column("fecha_nacimiento", TypeName = "date")]
        public DateOnly FechaNacimiento { get; set; }

        [Required, MaxLength(20)]
        [Column("genero")]
        public string Genero { get; set; }

        [Required, MaxLength(8)]
        [Column("dni")]
        public string Dni { get; set; }

        [Required, MaxLength(100)]
        [Column("departamento")]
        public string Departamento { get; set; }

        [Required, MaxLength(100)]
        [Column("provincia")]
        public string Provincia { get; set; }

        [Required, MaxLength(100)]
        [Column("distrito")]
        public string Distrito { get; set; }

        [Required, MaxLength(200)]
        [Column("direccion")]
        public string Direccion { get; set; }

        [Required, MaxLength(100)]
        [Column("base_zonal")]
        public string BaseZonal { get; set; }

        [Required, MaxLength(15)]
        [Column("numero_celular")]
        public string NumeroCelular { get; set; }

        [Required, MaxLength(100)]
        [Column("correo_actual")]
        public string CorreoActual { get; set; }

        [Required, MaxLength(200)]
        [Column("ocupacion")]
        public string Ocupacion { get; set; }

        [Required, MaxLength(50)]
        [Column("nacionalidad")]
        public string Nacionalidad { get; set; }

        [Required, MaxLength(50)]
        [Column("estado_civil")]
        public string EstadoCivil { get; set; }

        [Required, MaxLength(100)]
        [Column("grado_instruccion")]
        public string GradoInstruccion { get; set; }

        [MaxLength(50)]
        [Column("libreta_militar")]
        public string? LibretaMilitar { get; set; }

        [MaxLength(50)]
        [Column("numero_ruc")]
        public string? NumeroRuc { get; set; }

        [Column("foto_asociado")]
        public string? FotoAsociado { get; set; }

        [Column("foto_voucher")]
        public string? FotoVoucher { get; set; }

        [Column("foto_firma")]
        public string? FotoFirma { get; set; }

        [Column("fecha_registro")]
        public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;

        [MaxLength(50)]
        [Column("estado")]
        public string Estado { get; set; } = "Pendiente";

        [Column("fecha_aprobado", TypeName = "date")]
        public DateTime? FechaRevision { get; set; }

        // Relaciones
        public Conyuge? Conyuge { get; set; }

        public ICollection<Hijo> Hijos { get; set; } = new List<Hijo>();

        private Asociado() { }
        public static Result<Asociado> Create(
            Guid asociadoId,
            string nombre,
            string apellidoPaterno,
            string apellidoMaterno,
            DateOnly fechaNacimiento,
            string genero,
            string dni,
            string departamento,
            string provincia,
            string distrito,
            string direccion,
            string baseZonal,
            string numeroCelular,
            string correoActual,
            string ocupacion,
            string nacionalidad,
            string estadoCivil,
            string gradoInstruccion,
            string? numeroLibretaMilitar,
            string? numeroRuc,
            string fotoAsociado,
            DateTime fechaRegistro,
            string fotoVoucher,
            string fotoFirma,
            string estado,
            DateTime? fechaRevision,
            Conyuge? conyuge,
            List<Hijo>? hijos
        )
        {
            if (string.IsNullOrWhiteSpace(dni) || dni.Length != 8)
                return Result<Asociado>.Failure("El DNI debe tener exactamente 8 dígitos.");

            if (!correoActual.Contains("@"))
                return Result<Asociado>.Failure("El correo electrónico no es válido.");

            if (!string.Equals(nacionalidad, "Peruana", StringComparison.OrdinalIgnoreCase))//TODO: aqui podria usar un enum
                return Result<Asociado>.Failure("Solo se permiten asociados de nacionalidad peruana.");

            var edad = DateTime.Now.Year - fechaNacimiento.Year;
            if (fechaNacimiento > DateOnly.FromDateTime(DateTime.Now.AddYears(-edad))) edad--;
            if (edad < 18)
                return Result<Asociado>.Failure("El asociado debe ser mayor de edad.");

            if (numeroCelular.Length < 9)
                return Result<Asociado>.Failure("El número de celular debe tener al menos 9 dígitos.");

            if (fechaRegistro > DateTime.UtcNow)
                return Result<Asociado>.Failure("La fecha de registro no puede ser una fecha futura.");
            var asociado = new Asociado
            {
                AsociadoId = asociadoId,
                Nombre = nombre,
                ApellidoPaterno = apellidoPaterno,
                ApellidoMaterno = apellidoMaterno,
                FechaNacimiento = fechaNacimiento,
                Genero = genero,
                Dni = dni,
                Departamento = departamento,
                Provincia = provincia,
                Distrito = distrito,
                Direccion = direccion,
                BaseZonal = baseZonal,
                NumeroCelular = numeroCelular,
                CorreoActual = correoActual,
                Ocupacion = ocupacion,
                Nacionalidad = nacionalidad,
                EstadoCivil = estadoCivil,
                GradoInstruccion = gradoInstruccion,
                LibretaMilitar = numeroLibretaMilitar,
                NumeroRuc = numeroRuc,
                FotoAsociado = fotoAsociado,
                FechaRegistro = fechaRegistro,
                FotoVoucher = fotoVoucher,
                FotoFirma = fotoFirma,
                Estado = estado,
                FechaRevision = fechaRevision,
                Conyuge = conyuge,
                Hijos = hijos ?? new List<Hijo>()
            };

            return Result<Asociado>.Success(asociado);
        }

    }
}
