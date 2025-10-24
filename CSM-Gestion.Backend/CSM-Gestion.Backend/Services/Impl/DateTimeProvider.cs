using CSM_Gestion.Backend.Services.Interface;

namespace CSM_Gestion.Backend.Services.Impl
{
    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTime FechaHoraActual() => DateTime.UtcNow;
    }
}
