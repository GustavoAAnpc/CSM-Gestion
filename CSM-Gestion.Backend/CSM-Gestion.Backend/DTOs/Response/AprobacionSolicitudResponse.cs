namespace CSM_Gestion.Backend.DTOs.Response
{
    public sealed record SolicitudResponse
    (
        Guid Id,
        string Estado,
        DateTime FechaRespuesta
        );
}
