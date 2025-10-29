namespace CSM_Gestion.Backend.Utils
{
    public sealed record PaginacionResponse<T>(
    IEnumerable<T> Items,
    int NumeroPagina,
    int TamanioPagina,
    int TotalItems,
    int TotalPaginas
);

}
