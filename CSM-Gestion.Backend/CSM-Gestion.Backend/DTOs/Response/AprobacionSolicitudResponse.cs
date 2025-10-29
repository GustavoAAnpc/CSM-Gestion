namespace CSM_Gestion.Backend.DTOs.Response
{
    public sealed record AprobacionSolicitudResponse
    (
        Guid Id,
        string Estado,
        DateTime FechaAprobacion
        );
}
