using CSM_Gestion.Backend.Data.Interface;
using CSM_Gestion.Backend.DTOs.Request;
using CSM_Gestion.Backend.Enums;
using CSM_Gestion.Backend.Models;
using CSM_Gestion.Backend.Service.Interface;
using CSM_Gestion.Backend.Services.Interface;
using CSM_Gestion.Backend.Utils;
using System.Threading.Tasks;

namespace CSM_Gestion.Backend.Services.Impl
{
    public class AsociadoService : IAsociadoService
    {
        private readonly IUnitOfWork _UoW;
        private readonly IDateTimeProvider _DateTimeProvider;
        public AsociadoService(IUnitOfWork uoW, IDateTimeProvider dateTimProvider)
        {
            _UoW = uoW;
            _DateTimeProvider = dateTimProvider;
        }
        public async Task<Result<Guid>> RegistrarFormulario(FormularioAsociadoRequest request)
        {
            //pondremos validaciones con Validator mas adelante
            var asociado = new Asociado()
            {
                AsociadoId = Guid.NewGuid(),
                Nombre = request.Nombre,
                ApellidoPaterno = request.ApelldioPaterno,
                ApellidoMaterno = request.ApellidoMaterno,
                FechaNacimiento = request.FechaNacimiento,
                Genero = request.Genero,
                Dni = request.Dni,
                Departamento = request.Departamento,
                Provincia = request.provincia,
                Distrito = request.Distrito,
                Direccion = request.Direccion,
                BaseZonal = request.BaseZonal,
                NumeroCelular = request.NumeroCelular,
                CorreoActual = request.CorreoActual,
                Ocupacion = request.Ocupacion,
                Nacionalidad = request.Nacionalidad,
                EstadoCivil = request.EstadoCivil,
                GradoInstruccion = request.GradoInstruccion,
                NumeroLibretaMilitar = request.NumeroLibretaMilitar,
                NumeroRuc = request.NumeroRuc,
                FotoAsociado = request.FotoAsociado,
                FechaRegistro = _DateTimeProvider.FechaHoraActual(),
                FotoVoucher = request.FotoVoucher,
                FotoFirma = request.FotoFirma,
                Estado = Estado.Pendiente.ToString(),
                FechaAprobacion = null
            };
            await _UoW.AsociadoRepository.AddAsync(asociado);
            await _UoW.SaveChangesAsync();
            return Result<Guid>.Success(asociado.AsociadoId);
        }
    }
}
