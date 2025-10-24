namespace CSM_Gestion.Backend.Models
{
    public class Asociado
    {
        public Guid AsociadoId { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public DateOnly FechaNacimiento { get; set; }
        public string Genero { get; set; }
        public string Dni { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Direccion { get; set; }
        public string BaseZonal { get; set; }
        public string NumeroCelular { get; set; }
        public string CorreoActual { get; set; }
        public string Ocupacion { get; set; }
        public string Nacionalidad { get; set; }
        public string EstadoCivil { get; set; }
        public string GradoInstruccion { get; set; }
        public string NumeroLibretaMilitar { get; set; }
        public string NumeroRuc { get; set; }
        public string FotoAsociado { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string FotoVoucher { get; set; }
        public string FotoFirma { get; set; }
        public string Estado { get; set; }
        public DateTime FechaAprobacion { get; set; }
    }
}
