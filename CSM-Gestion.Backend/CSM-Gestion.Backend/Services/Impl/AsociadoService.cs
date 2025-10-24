using CSM_Gestion.Backend.Data.Interface;
using CSM_Gestion.Backend.DTOs.Request;
using CSM_Gestion.Backend.Enums;
using CSM_Gestion.Backend.Models;
using CSM_Gestion.Backend.Service.Interface;
using CSM_Gestion.Backend.Services.Interface;
using CSM_Gestion.Backend.Utils;

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
        public async Task<Result<Guid>> RegistrarFormulario(AsociadoRequest request)
        {
            var dniExists = await _UoW.AsociadoRepository.DniExisteAsync(request.Dni);
            if (dniExists)
            {
                return Result<Guid>.Failure("El DNI ya está registrado.");
            }
            var celularExists = await _UoW.AsociadoRepository.NumeroCelularExisteAsync(request.NumeroCelular);
            if (celularExists)
            {
                return Result<Guid>.Failure("El número de celular ya está registrado.");
            }
            var emailExists = await _UoW.AsociadoRepository.EmailExisteAsync(request.CorreoActual);
            if (emailExists)
            {
                return Result<Guid>.Failure("El correo electrónico ya está registrado.");
            }
            var rucExiste = await _UoW.AsociadoRepository.NumeroRucExisteAsync(request.NumeroRuc);
            if (!string.IsNullOrWhiteSpace(request.NumeroRuc) && rucExiste)
            {
                return Result<Guid>.Failure("El número de RUC ya está registrado.");
            }

            var conyuge = Conyuge.Create(
                request.Conyuge.Nombre,
                request.Conyuge.ApellidoPaterno,
                request.Conyuge.ApellidoMaterno,
                request.Conyuge.Dni,
                request.Conyuge.FechaNacimiento,
                request.Conyuge.GradoEstudios);

            var hijos = request.Hijos?.Select(hijoRequest => Hijo.Create(
                hijoRequest.Nombre,
                hijoRequest.Dni,
                hijoRequest.Genero,
                hijoRequest.FechaNacimiento,
                hijoRequest.GradoEstudios
            )).ToList();

            var asociado = Asociado.Create(
                Guid.NewGuid(),
                request.Nombre,
                request.ApellidoPaterno,
                request.ApellidoMaterno,
                request.FechaNacimiento,
                request.Genero,
                request.Dni,
                request.Departamento,
                request.provincia,
                request.Distrito,
                request.Direccion,
                request.BaseZonal,
                request.NumeroCelular,
                request.CorreoActual,
                request.Ocupacion,
                request.Nacionalidad,
                request.EstadoCivil,
                request.GradoInstruccion,
                string.IsNullOrWhiteSpace(request.NumeroLibretaMilitar) ? null : request.NumeroLibretaMilitar,
                string.IsNullOrWhiteSpace(request.NumeroRuc) ? null : request.NumeroRuc,
                request.FotoAsociado,
                _DateTimeProvider.FechaHoraActual(),
                request.FotoVoucher,
                request.FotoFirma,
                Estado.Pendiente.ToString(),
                null,
                conyuge.Value,
                hijos?.Select(h => h.Value).ToList()
                );
            await _UoW.AsociadoRepository.AddAsync(asociado.Value);
            await _UoW.SaveChangesAsync();
            return Result<Guid>.Success(asociado.Value.AsociadoId);
        }
    }
}
