using CSM_Gestion.Backend.DTOs.Request;

namespace CSM_Gestion.Backend.DTOs.Response
{
    public sealed record DatosFormularioAsociadoResponse
    (
        Guid AsociadoId,
        string Nombre,
        string ApellidoPaterno,
        string ApellidoMaterno,
        string Genero,//TODO: depende a esto en el frontend va tener como un icono
        string Dni,
        DateTime FechaRegistro,
        string Estado
        );
}
