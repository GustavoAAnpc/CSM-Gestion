namespace CSM_Gestion.Backend.DTOs.Response
{
    public sealed record TokenResponse
    (
        string token,
        DateTime emitido,
        DateTime expira,
        string usuario
        );
}
