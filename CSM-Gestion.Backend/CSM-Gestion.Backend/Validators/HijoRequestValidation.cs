using CSM_Gestion.Backend.DTOs.Request;
using FluentValidation;

namespace CSM_Gestion.Backend.Validators
{
    public class HijoRequestValidation : AbstractValidator<HijoRequest>
    {
        public HijoRequestValidation()
        {
            RuleFor(x => x.Nombre)
                .NotEmpty().WithMessage("El nombre del hijo es obligatorio.");

            RuleFor(x => x.Dni)
                .NotEmpty().WithMessage("Debe ingresar el DNI del hijo.")
                .Length(8).WithMessage("El DNI debe tener 8 dígitos.")
                .Matches(@"^\d+$").WithMessage("El DNI solo debe contener números.");

            RuleFor(x => x.Genero)
                .NotEmpty().WithMessage("Debe seleccionar el género del hijo.");

            RuleFor(x => x.FechaNacimiento)
                .LessThan(DateOnly.FromDateTime(DateTime.Now))
                .WithMessage("La fecha de nacimiento del hijo no puede ser futura.");

            RuleFor(x => x.GradoEstudios)
                .NotEmpty().WithMessage("Debe ingresar el grado de estudios del hijo.");
        }
    }
}
