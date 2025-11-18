namespace CSM_Gestion.Backend.DTOs.Request
{
    public sealed record HijoRequest
    (
        string? Nombre,
        string? Dni,
        string? Genero,
        DateOnly FechaNacimiento,
        string? GradoEstudios
        );
}
