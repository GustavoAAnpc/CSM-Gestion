namespace CSM_Gestion.Backend.DTOs.Request
{
    public sealed record FormularioAsociadoRequest(
        string Nombre,
        string ApelldioPaterno,
        string ApellidoMaterno,
        DateOnly FechaNacimiento,
        string Genero,
        string Dni,
        string Departamento,
        string provincia,
        string Distrito,
        string Direccion,
        string BaseZonal,
        string NumeroCelular,
        string CorreoActual,
        string Ocupacion,
        string Nacionalidad,
        string EstadoCivil,
        string GradoInstruccion,
        string NumeroLibretaMilitar,
        string NumeroRuc,
        string FotoAsociado,
        string FotoVoucher,
        string FotoFirma
        );
}
