using CSM_Gestion.Backend.DTOs.Request;
using FluentValidation;

namespace CSM_Gestion.Backend.Validators
{
    public class ConyugeRequestValidation : AbstractValidator<ConyugeRequest>
    {
        public ConyugeRequestValidation()
        {
            RuleFor(x => x.Nombre)
                .NotEmpty().WithMessage("El nombre del cónyuge es obligatorio.");

            RuleFor(x => x.ApellidoPaterno)
                .NotEmpty().WithMessage("El apellido paterno del cónyuge es obligatorio.");

            RuleFor(x => x.ApellidoMaterno)
                .NotEmpty().WithMessage("El apellido materno del cónyuge es obligatorio.");

            RuleFor(x => x.Dni)
                .NotEmpty().WithMessage("Debe ingresar el DNI del cónyuge.")
                .Length(8).WithMessage("El DNI debe tener 8 dígitos.")
                .Matches(@"^\d+$").WithMessage("El DNI solo debe contener números.");

            RuleFor(x => x.FechaNacimiento)
                .LessThan(DateOnly.FromDateTime(DateTime.Now))
                .WithMessage("La fecha de nacimiento del cónyuge no puede ser futura.");

            RuleFor(x => x.GradoEstudios)
                .NotEmpty().WithMessage("Debe ingresar el grado de estudios del cónyuge.");
        }
    }
}
