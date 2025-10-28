namespace CSM_Gestion.Backend.DTOs.Request
{
    public sealed record BuscarAsociadoRequest(
        string Nombre,
        string ApellidoPaterno,
        string ApellidoMaterno);
}
