using CSM_Gestion.Backend.Utils;

namespace CSM_Gestion.Backend.Helpers
{
    public static class PaginacionHelper
    {
        public static PaginacionResponse<T> Paginar<T>(
            IEnumerable<T> fuente, int numeroPagina, int tamanioPagina)
        {
            var totalItems = fuente.Count();
            var totalPaginas = (int)Math.Ceiling(totalItems / (double)tamanioPagina);

            var items = fuente
                .Skip((numeroPagina - 1) * tamanioPagina)
                .Take(tamanioPagina)
                .ToList();

            return new PaginacionResponse<T>(items, numeroPagina, tamanioPagina, totalItems, totalPaginas);
        }
    }


}
