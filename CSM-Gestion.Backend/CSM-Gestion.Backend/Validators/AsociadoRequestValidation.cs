using FluentValidation;
using CSM_Gestion.Backend.DTOs.Request;

namespace CSM_Gestion.Backend.Validators
{
    public class FormularioAsociadoRequestValidator : AbstractValidator<AsociadoRequest>
    {
        public FormularioAsociadoRequestValidator()
        {
            RuleFor(x => x.Nombre)
    .NotEmpty().WithMessage("El nombre es obligatorio.")
    .MaximumLength(100).WithMessage("El nombre no puede superar los 100 caracteres.");

            RuleFor(x => x.ApellidoPaterno)
                .NotEmpty().WithMessage("El apellido paterno es obligatorio.");

            RuleFor(x => x.ApellidoMaterno)
                .NotEmpty().WithMessage("El apellido materno es obligatorio.");

            RuleFor(x => x.FechaNacimiento)
                .NotEmpty().WithMessage("Debe ingresar la fecha de nacimiento.")
                .LessThan(DateOnly.FromDateTime(DateTime.Now))
                .WithMessage("La fecha de nacimiento no puede ser futura.");

            RuleFor(x => x.Genero)
                .NotEmpty().WithMessage("Debe seleccionar un género.");

            RuleFor(x => x.Dni)
                .NotEmpty().WithMessage("Debe ingresar el DNI.")
                .Length(8).WithMessage("El DNI debe tener 8 dígitos.")
                .Matches(@"^\d+$").WithMessage("El DNI solo debe contener números.");

            RuleFor(x => x.Departamento)
                .NotEmpty().WithMessage("El departamento es obligatorio.");

            RuleFor(x => x.provincia)
                .NotEmpty().WithMessage("La provincia es obligatoria.");

            RuleFor(x => x.Distrito)
                .NotEmpty().WithMessage("El distrito es obligatorio.");

            RuleFor(x => x.Direccion)
                .NotEmpty().WithMessage("La dirección es obligatoria.");

            RuleFor(x => x.BaseZonal)
                .NotEmpty().WithMessage("Debe seleccionar una base zonal.");

            RuleFor(x => x.NumeroCelular)
                .NotEmpty().WithMessage("Debe ingresar un número de celular.")
                .Matches(@"^\d{9}$").WithMessage("El número de celular debe tener 9 dígitos.");

            RuleFor(x => x.CorreoActual)
                .NotEmpty().WithMessage("Debe ingresar un correo electrónico.")
                .EmailAddress().WithMessage("El formato del correo no es válido.");

            RuleFor(x => x.Ocupacion)
                .NotEmpty().WithMessage("Debe ingresar una ocupación.");

            RuleFor(x => x.Nacionalidad)
                .NotEmpty().WithMessage("Debe ingresar la nacionalidad.");

            RuleFor(x => x.EstadoCivil)
                .NotEmpty().WithMessage("Debe seleccionar el estado civil.");

            RuleFor(x => x.GradoInstruccion)
                .NotEmpty().WithMessage("Debe seleccionar el grado de instrucción.");

            RuleFor(x => x.NumeroLibretaMilitar)
                .MaximumLength(15).WithMessage("El número de libreta militar no debe superar los 15 caracteres.");

            RuleFor(x => x.NumeroRuc)
                .Matches(@"^\d{11}$").When(x => !string.IsNullOrWhiteSpace(x.NumeroRuc))
                .WithMessage("El RUC debe tener 11 dígitos.");

            RuleFor(x => x.FotoAsociado)
                .NotEmpty().WithMessage("Debe adjuntar la foto del asociado.");

            RuleFor(x => x.FotoVoucher)
                .NotEmpty().WithMessage("Debe adjuntar la foto del voucher.");

            RuleFor(x => x.FotoFirma)
                .NotEmpty().WithMessage("Debe adjuntar la foto de la firma.");


            RuleFor(x => x.Conyuge)
                .SetValidator(new ConyugeRequestValidation()!)
                .When(x => x.Conyuge is not null);

            RuleForEach(x => x.Hijos)
                .SetValidator(new HijoRequestValidation())
                .When(x => x.Hijos is not null);

        }
    }
}
