using CSM_Gestion.Backend.DTOs.Request;

namespace CSM_Gestion.Backend.DTOs.Response
{
    public sealed record DatosFormularioAsociadoResponse
    (
        Guid AsociadoId,
        string Nombre,
        string ApellidoPaterno,
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
        string FotoFirma,
        DateTime FechaRegistro,
        string Estado,
        ConyugeRequest? Conyuge,
        List<HijoRequest>? Hijos
        );
}
