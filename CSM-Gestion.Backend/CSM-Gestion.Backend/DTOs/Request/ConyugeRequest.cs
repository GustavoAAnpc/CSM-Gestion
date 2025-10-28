namespace CSM_Gestion.Backend.DTOs.Request
{
    public sealed record ConyugeRequest
    (
        string Nombre,
        string ApellidoPaterno,
        string ApellidoMaterno,
        string Dni,
        DateOnly? FechaNacimiento,
        string GradoEstudios
        );
}
