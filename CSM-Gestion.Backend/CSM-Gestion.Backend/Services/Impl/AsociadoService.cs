using CSM_Gestion.Backend.Data.UnitOfWork;
using CSM_Gestion.Backend.DTOs.Request;
using CSM_Gestion.Backend.DTOs.Response;
using CSM_Gestion.Backend.Enums;
using CSM_Gestion.Backend.Helpers;
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

        public async Task<Result<AprobacionSolicitudResponse>> AprobarSolicitudAsociado(Guid asociadoId)
        {
            var solicitud = await _UoW.AsociadoRepository.GetByIdAsync(asociadoId);
            if (solicitud is null)
            {
                return Result<AprobacionSolicitudResponse>.Failure("La solicitud no existe.");
            }
            if(solicitud.Estado != Estado.Pendiente.ToString())
            {
                return Result<AprobacionSolicitudResponse>.Failure("La solicitud no está en estado pendiente.");
            }

            var aprobado = await _UoW.AsociadoRepository.AprobarSolicitud(asociadoId);
            if (!aprobado)
            {
                return Result<AprobacionSolicitudResponse>.Failure("No se pudo aprobar la solicitud.");
            }
            await _UoW.SaveChangesAsync();
            var asociadoIdResponse = new AprobacionSolicitudResponse(
                solicitud.AsociadoId,
                solicitud.Estado,
                _DateTimeProvider.FechaHoraActual()
                );
            return Result<AprobacionSolicitudResponse>.Success(asociadoIdResponse);
        }

        public async Task<Result<List<InputAsociadoResponse>>> BuscarAsociadosPorNombre(string nombre) 
        { 
            if (string.IsNullOrEmpty(nombre)) 
            { 
                return Result<List<InputAsociadoResponse>>.Failure("El nombre no puede estar vacío.");
            } 
            var asociados = await _UoW.AsociadoRepository.GetAsociadoByInput(nombre); 
            if (asociados is null || !asociados.Any()) 
            {
                return Result<List<InputAsociadoResponse>>.Failure("No se encontraron asociados."); 
            } 
            var response = asociados.Select(a => new InputAsociadoResponse(a.Nombre, a.ApellidoPaterno, a.ApellidoMaterno));
            return Result<List<InputAsociadoResponse>>.Success(response.ToList()); 
        }
        public async Task<Result<PaginacionResponse<DatosFormularioAsociadoResponse>>> ListaAsociadosPorEstado(
            string estado, int numeroPagina, int tamanioPagina)
        {
            var asociados = await _UoW.AsociadoRepository.GetAllByEstado(estado);

            if (asociados == null)
            {
                return Result<PaginacionResponse<DatosFormularioAsociadoResponse>>.Failure("No se encontraron asociados con ese estado.");
            }
            if (!asociados.Any())
            {
                return Result<PaginacionResponse<DatosFormularioAsociadoResponse>>.Failure("No hay asociados con ese estado.");
            }
            var response = asociados.Select(a => new DatosFormularioAsociadoResponse(
                a.AsociadoId,
                a.Nombre,
                a.ApellidoPaterno,
                a.ApellidoMaterno,
                a.Genero,
                a.Dni,
                a.FechaRegistro,
                a.Estado
            )).ToList();

            var pagina = PaginacionHelper.Paginar(response, numeroPagina, tamanioPagina);
            return Result<PaginacionResponse<DatosFormularioAsociadoResponse>>.Success(pagina);
        }

        public async Task<Result<DatosAsociadoResponse>> MostrarDatosAsociado(BuscarAsociadoRequest request)
        {
            if(string.IsNullOrEmpty(request.Nombre) 
                || string.IsNullOrEmpty(request.ApellidoPaterno) 
                || string.IsNullOrEmpty(request.ApellidoMaterno))
            {
                return Result<DatosAsociadoResponse>.Failure("Todos los campos son obligatorios.");
            }
            var asociado = await _UoW.AsociadoRepository.GetByNombreApellidos(
                request.Nombre,
                request.ApellidoPaterno,
                request.ApellidoMaterno);

            if(asociado is null)
            {
                return Result<DatosAsociadoResponse>.Failure("Asociado no encontrado.");
            }
            var conyuge = new ConyugeRequest(
                asociado.Conyuge.Nombre,
                asociado.Conyuge.ApellidoPaterno,
                asociado.Conyuge.ApellidoMaterno,
                asociado.Conyuge.Dni,
                asociado.Conyuge.FechaNacimiento,
                asociado.Conyuge.Estudios
                );
            var hijos = asociado.Hijos?.Select(hijo => new HijoRequest(
                hijo.Nombre,
                hijo.Dni,
                hijo.Genero,
                hijo.FechaNacimiento,
                hijo.Estudios
                )).ToList();

            var response = new DatosAsociadoResponse(
                asociado.AsociadoId,
                asociado.Nombre,
                asociado.ApellidoPaterno,
                asociado.ApellidoMaterno,
                asociado.FechaNacimiento,
                asociado.Genero,
                asociado.Dni,
                asociado.Departamento,
                asociado.Provincia,
                asociado.Distrito,
                asociado.Direccion,
                asociado.BaseZonal,
                asociado.NumeroCelular,
                asociado.CorreoActual,
                asociado.Ocupacion,
                asociado.Nacionalidad,
                asociado.EstadoCivil,
                asociado.GradoInstruccion,
                asociado.LibretaMilitar,
                asociado.NumeroRuc,
                asociado.FotoAsociado,
                asociado.FotoVoucher,
                asociado.FotoFirma,
                conyuge,
                hijos
                );
            return Result<DatosAsociadoResponse>.Success(response);
        }

        public async Task<Result<DatosAsociadoResponse>> MostrarSolicitud(Guid asociadoId)
        {
            if(asociadoId == Guid.Empty)
            {
                return Result<DatosAsociadoResponse>.Failure("El ID del asociado no puede estar vacío.");
            }
            var asociado =  await _UoW.AsociadoRepository.GetAsociadoIncludsByIdAsync(asociadoId);
            if(asociado is null)
            {
                return Result<DatosAsociadoResponse>.Failure("Asociado no encontrado.");
            }
            if(asociado.FotoAsociado is null)
            {
                return Result<DatosAsociadoResponse>.Failure("El asociado no tiene una solicitud registrada.");
            }
            if(asociado.FotoFirma is null)
            {
                return Result<DatosAsociadoResponse>.Failure("El asociado no tiene una solicitud registrada.");
            }
            if(asociado.FotoVoucher is null)
            {
                return Result<DatosAsociadoResponse>.Failure("El asociado no tiene una solicitud registrada.");
            }
            //TODO: che aqui puedo que hago que si es diferente a null  haga la instnacia al obj conyuge o hijop
            var datos = new DatosAsociadoResponse(
                asociado.AsociadoId,
                asociado.Nombre,
                asociado.ApellidoPaterno,
                asociado.ApellidoMaterno,
                asociado.FechaNacimiento,
                asociado.Genero,
                asociado.Dni,
                asociado.Departamento,
                asociado.Provincia,
                asociado.Distrito,
                asociado.Direccion,
                asociado.BaseZonal,
                asociado.NumeroCelular,
                asociado.CorreoActual,
                asociado.Ocupacion,
                asociado.Nacionalidad,
                asociado.EstadoCivil,
                asociado.GradoInstruccion,
                asociado.LibretaMilitar,
                asociado.NumeroRuc,
                asociado.FotoAsociado,
                asociado.FotoVoucher,
                asociado.FotoFirma,
                null,
                null
                );
            if(asociado.Conyuge != null)
            {
                datos = datos with
                {
                    Conyuge = new ConyugeRequest(
                        asociado.Conyuge.Nombre,
                        asociado.Conyuge.ApellidoPaterno,
                        asociado.Conyuge.ApellidoMaterno,
                        asociado.Conyuge.Dni,
                        asociado.Conyuge.FechaNacimiento,
                        asociado.Conyuge.Estudios
                        )
                };
            }
            if(asociado.Hijos.Count > 0)
            {
                datos = datos with
                {  
                    Hijos = asociado.Hijos.Select(hijo => new HijoRequest(
                        hijo.Nombre,
                        hijo.Dni,
                        hijo.Genero,
                        hijo.FechaNacimiento,
                        hijo.Estudios
                        )).ToList()
                };
            }
            return Result<DatosAsociadoResponse>.Success(datos);
        }

        public async Task<Result<Guid>> RegistrarFormulario(AsociadoRequest request)
        {
            if(request is null)
            {
                return Result<Guid>.Failure("El formulario no puede ser nulo.");
            }
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
            //TODO: aqui che el conyuge puede ser nulll pq es opcional
            if (request.Conyuge != null)
            {
                var dniConyugeExists = await _UoW.AsociadoRepository.DniExisteAsync(request.Conyuge.Dni);
                if (dniConyugeExists)
                {
                    return Result<Guid>.Failure("El DNI del cónyuge ya está registrado.");
                }
            }
            if (request.Hijos != null && request.Hijos.Any())
            {
                foreach (var hijo in request.Hijos)
                {
                    var dniHijoExiste = await _UoW.HijoRepository.DniExiste(hijo.Dni);
                    if (dniHijoExiste)
                    {
                        return Result<Guid>.Failure($"El DNI del hijo '{hijo.Nombre}' ya está registrado.");
                    }
                }
            }

            if (request.FechaNacimiento > DateOnly.FromDateTime(_DateTimeProvider.FechaHoraActual().Date))
            {
                return Result<Guid>.Failure("La fecha de nacimiento no puede ser una fecha futura.");
            }

            if (request.Conyuge != null && request.Conyuge.FechaNacimiento > DateOnly.FromDateTime(_DateTimeProvider.FechaHoraActual().Date))
            {
                return Result<Guid>.Failure("La fecha de nacimiento del cónyuge no puede ser una fecha futura.");
            }

            if (request.Hijos != null)
            {
                foreach (var hijo in request.Hijos)
                {
                    if (hijo.FechaNacimiento > DateOnly.FromDateTime(_DateTimeProvider.FechaHoraActual().Date))
                    {
                        return Result<Guid>.Failure($"La fecha de nacimiento del hijo '{hijo.Nombre}' no puede ser futura.");
                    }
                }
            }

            Conyuge? conyuge = null;

            if (request.Conyuge is not null)
            {
                conyuge = Conyuge.Create(
                    request.Conyuge.Nombre,
                    request.Conyuge.ApellidoPaterno,
                    request.Conyuge.ApellidoMaterno,
                    request.Conyuge.Dni,
                    request.Conyuge.FechaNacimiento,
                    request.Conyuge.GradoEstudios
                ).Value;
            }


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
                conyuge,
                hijos?.Select(h => h.Value).ToList()
                );
            await _UoW.AsociadoRepository.AddAsync(asociado.Value);
            await _UoW.SaveChangesAsync();
            return Result<Guid>.Success(asociado.Value.AsociadoId);
        }
    }
}
