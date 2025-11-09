import React, { useState } from 'react';
import asociadoService from '../services/formulario.service';
import '../pages/css/FormularioPage.css';

const FormularioAsociado = () => {
  const initialFormData = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    genero: '',
    dni: '',
    departamento: '',
    provincia: '',
    distrito: '',
    direccion: '',
    baseZonal: '',
    numeroCelular: '',
    correoActual: '',
    ocupacion: '',
    nacionalidad: '',
    estadoCivil: '',
    gradoInstruccion: '',
    numeroLibretaMilitar: '',
    numeroRuc: '',
    fotoAsociado: null,
    fotoVoucher: null,
    fotoFirma: null,
    conyuge: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      dni: '',
      fechaNacimiento: '',
      gradoEstudios: ''
    },
    hijos: []
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mostrarConyuge, setMostrarConyuge] = useState(false);
  const [mostrarHijos, setMostrarHijos] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('conyuge.')) {
      const conyugeField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        conyuge: {
          ...prev.conyuge,
          [conyugeField]: value
        }
      }));
    } else if (name.startsWith('hijo.')) {
      const [_, index, field] = name.split('.');
      handleHijoChange(parseInt(index), field, value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleHijoChange = (index, field, value) => {
    setFormData(prev => {
      const nuevosHijos = [...prev.hijos];
      nuevosHijos[index] = {
        ...nuevosHijos[index],
        [field]: value
      };
      return {
        ...prev,
        hijos: nuevosHijos
      };
    });
  };

  const agregarHijo = () => {
    setFormData(prev => ({
      ...prev,
      hijos: [
        ...prev.hijos,
        {
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          dni: '',
          fechaNacimiento: ''
        }
      ]
    }));
  };

  const eliminarHijo = (index) => {
    setFormData(prev => ({
      ...prev,
      hijos: prev.hijos.filter((_, i) => i !== index)
    }));
  };

  const limpiarFormulario = () => {
    setFormData(initialFormData);
    setMostrarConyuge(false);
    setMostrarHijos(false);
    
    // Limpiar inputs de archivo
    const fileInputs = ['fotoAsociado', 'fotoVoucher', 'fotoFirma'];
    fileInputs.forEach(id => {
      const element = document.getElementById(id);
      if (element) element.value = '';
    });
  };

  const prepararArchivosBase64 = async () => {
    const archivos = {};
    const archivosParaConvertir = [
      { campo: 'fotoAsociado', nombre: 'fotoAsociado' },
      { campo: 'fotoVoucher', nombre: 'fotoVoucher' },
      { campo: 'fotoFirma', nombre: 'fotoFirma' }
    ];

    for (const archivo of archivosParaConvertir) {
      if (formData[archivo.campo]) {
        archivos[archivo.nombre] = await asociadoService.fileToBase64(formData[archivo.campo]);
      }
    }

    return archivos;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  if (!validarFormulario()) {
    setLoading(false);
    return;
  }

  try {
    console.log('Preparando datos para enviar...');
    
    // PREPARAR DATOS EXACTAMENTE COMO ESPERA EL BACKEND
    const datosEnvio = {
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      fechaNacimiento: formData.fechaNacimiento,
      genero: formData.genero,
      dni: formData.dni,
      departamento: formData.departamento,
      provincia: formData.provincia,
      distrito: formData.distrito,
      direccion: formData.direccion,
      baseZonal: formData.baseZonal,
      numeroCelular: formData.numeroCelular,
      correoActual: formData.correoActual,
      ocupacion: formData.ocupacion,
      nacionalidad: formData.nacionalidad,
      estadoCivil: formData.estadoCivil,
      gradoInstruccion: formData.gradoInstruccion,
      numeroLibretaMilitar: formData.numeroLibretaMilitar || '',
      numeroRuc: formData.numeroRuc || '',
      // Para archivos, enviar como base64 O como string según lo que espere el backend
      fotoAsociado: formData.fotoAsociado ? await asociadoService.fileToBase64(formData.fotoAsociado) : '',
      fotoVoucher: formData.fotoVoucher ? await asociadoService.fileToBase64(formData.fotoVoucher) : '',
      fotoFirma: formData.fotoFirma ? await asociadoService.fileToBase64(formData.fotoFirma) : '',
      // Cónyuge - enviar solo si se completó
      conyuge: mostrarConyuge && formData.conyuge.nombre ? formData.conyuge : null,
      // Hijos - enviar array vacío si no hay
      hijos: mostrarHijos ? formData.hijos : []
    };

    // Limpiar campos que podrían ser null/undefined
    Object.keys(datosEnvio).forEach(key => {
      if (datosEnvio[key] === null || datosEnvio[key] === undefined) {
        datosEnvio[key] = '';
      }
    });

    console.log('Datos finales a enviar:', {
      ...datosEnvio,
      fotoAsociado: datosEnvio.fotoAsociado ? '[BASE64_IMAGE]' : '',
      fotoVoucher: datosEnvio.fotoVoucher ? '[BASE64_IMAGE]' : '',
      fotoFirma: datosEnvio.fotoFirma ? '[BASE64_IMAGE]' : ''
    });

    const resultado = await asociadoService.registrarAsociado(datosEnvio);
    
    setMessage({
      type: 'success',
      text: `Asociado registrado correctamente. ID: ${resultado.value}`
    });

    limpiarFormulario();

  } catch (error) {
    console.error('Error en handleSubmit:', error);
    
    let errorMessage = 'Error al registrar el asociado';
    
    if (error.message.includes('validación') || error.message.includes('validation')) {
      errorMessage = error.message;
    } else if (error.message.includes('400')) {
      errorMessage = 'Datos inválidos enviados al servidor. Verifique que todos los campos estén correctos.';
    } else {
      errorMessage = error.message || 'Error desconocido';
    }

    setMessage({
      type: 'error',
      text: errorMessage
    });
  } finally {
    setLoading(false);
  }
};

  const renderFieldset = (title, fields) => (
    <fieldset>
      <legend>{title}</legend>
      <div className="form-row">
        {fields.map((field, index) => (
          <div key={field.name} className="form-group">
            <label>{field.label}:</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
              >
                <option value="">Seleccionar</option>
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
                maxLength={field.maxLength}
                accept={field.accept}
                placeholder={field.placeholder}
              />
            )}
            {field.small && <small>{field.small}</small>}
          </div>
        ))}
      </div>
    </fieldset>
  );

  const camposInformacionPersonal = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'apellidoPaterno', label: 'Apellido Paterno', type: 'text', required: true },
    { name: 'apellidoMaterno', label: 'Apellido Materno', type: 'text', required: true },
    { name: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date', required: true },
    { 
      name: 'genero', 
      label: 'Género', 
      type: 'select', 
      required: true,
      options: [
        { value: 'Masculino', label: 'Masculino' },
        { value: 'Femenino', label: 'Femenino' }
      ]
    },
    { name: 'dni', label: 'DNI', type: 'text', required: true, maxLength: '8' }
  ];

  const camposUbicacion = [
    { name: 'departamento', label: 'Departamento', type: 'text', required: true },
    { name: 'provincia', label: 'Provincia', type: 'text', required: true },
    { name: 'distrito', label: 'Distrito', type: 'text', required: true },
    { name: 'direccion', label: 'Dirección', type: 'text', required: true, fullWidth: true },
    { name: 'baseZonal', label: 'Base Zonal', type: 'text', required: true }
  ];

  const camposContacto = [
    { name: 'numeroCelular', label: 'Número Celular', type: 'tel', required: true },
    { name: 'correoActual', label: 'Correo Electrónico', type: 'email', required: true }
  ];

  const camposInformacionAdicional = [
    { name: 'ocupacion', label: 'Ocupación', type: 'text', required: true },
    { name: 'nacionalidad', label: 'Nacionalidad', type: 'text', required: true },
    { 
      name: 'estadoCivil', 
      label: 'Estado Civil', 
      type: 'select', 
      required: true,
      options: [
        { value: 'Soltero', label: 'Soltero' },
        { value: 'Casado', label: 'Casado' },
        { value: 'Divorciado', label: 'Divorciado' },
        { value: 'Viudo', label: 'Viudo' }
      ]
    },
    { 
      name: 'gradoInstruccion', 
      label: 'Grado de Instrucción', 
      type: 'select', 
      required: true,
      options: [
        { value: 'Primaria', label: 'Primaria' },
        { value: 'Secundaria', label: 'Secundaria' },
        { value: 'Técnico', label: 'Técnico' },
        { value: 'Universitario', label: 'Universitario' },
        { value: 'Maestría', label: 'Maestría' },
        { value: 'Doctorado', label: 'Doctorado' }
      ]
    },
    { name: 'numeroRuc', label: 'Número RUC (opcional)', type: 'text', required: false },
    { name: 'numeroLibretaMilitar', label: 'Libreta Militar (opcional)', type: 'text', required: false }
  ];

  const camposArchivos = [
    { 
      name: 'fotoAsociado', 
      label: 'Foto del Asociado', 
      type: 'file', 
      required: true, 
      accept: 'image/*',
      small: 'Formatos aceptados: JPG, PNG, JPEG' 
    },
    { 
      name: 'fotoVoucher', 
      label: 'Voucher de Pago', 
      type: 'file', 
      required: true, 
      accept: 'image/*',
      small: 'Formatos aceptados: JPG, PNG, JPEG' 
    },
    { 
      name: 'fotoFirma', 
      label: 'Firma del Asociado', 
      type: 'file', 
      required: true, 
      accept: 'image/*',
      small: 'Formatos aceptados: JPG, PNG, JPEG' 
    }
  ];

  return (
    <div className="formulario-container">
      <h2>Registro de Asociado</h2>
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="asociado-form">
        {/* Información Personal */}
        {renderFieldset('Información Personal', camposInformacionPersonal)}

        {/* Ubicación */}
        {renderFieldset('Ubicación', camposUbicacion)}

        {/* Contacto */}
        {renderFieldset('Contacto', camposContacto)}

        {/* Información Adicional */}
        {renderFieldset('Información Adicional', camposInformacionAdicional)}

        {/* Archivos */}
        <fieldset>
          <legend>Documentos Adjuntos</legend>
          <div className="form-row">
            {camposArchivos.map(field => (
              <div key={field.name} className="form-group file-input">
                <label>{field.label}:</label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  onChange={handleFileChange}
                  accept={field.accept}
                  required={field.required}
                />
                {field.small && <small>{field.small}</small>}
              </div>
            ))}
          </div>
        </fieldset>

        {/* Cónyuge */}
        <button 
          type="button" 
          onClick={() => setMostrarConyuge(!mostrarConyuge)} 
          className="toggle-btn"
        >
          {mostrarConyuge ? "Quitar Cónyuge" : "Agregar Cónyuge"}
        </button>

        {mostrarConyuge && (
          <fieldset>
            <legend>Información del Cónyuge</legend>
            <div className="form-row">
              <input type="text" name="conyuge.nombre" placeholder="Nombre" value={formData.conyuge.nombre} onChange={handleInputChange} />
              <input type="text" name="conyuge.apellidoPaterno" placeholder="Apellido Paterno" value={formData.conyuge.apellidoPaterno} onChange={handleInputChange} />
              <input type="text" name="conyuge.apellidoMaterno" placeholder="Apellido Materno" value={formData.conyuge.apellidoMaterno} onChange={handleInputChange} />
              <input type="text" name="conyuge.dni" placeholder="DNI" maxLength="8" value={formData.conyuge.dni} onChange={handleInputChange} />
              <input type="date" name="conyuge.fechaNacimiento" value={formData.conyuge.fechaNacimiento} onChange={handleInputChange} />
              <input type="text" name="conyuge.gradoEstudios" placeholder="Grado de Estudios" value={formData.conyuge.gradoEstudios} onChange={handleInputChange} />
            </div>
          </fieldset>
        )}

        {/* Hijos */}
        <button 
          type="button" 
          onClick={() => setMostrarHijos(!mostrarHijos)} 
          className="toggle-btn"
        >
          {mostrarHijos ? "Ocultar Hijos" : "Agregar Hijos"}
        </button>

        {mostrarHijos && (
          <fieldset>
            <legend>Hijos</legend>
            
            {formData.hijos.map((hijo, index) => (
              <div key={index} className="hijo-block">
                <h4>Hijo #{index + 1}</h4>
                <div className="form-row">
                  <input 
                    type="text" 
                    name={`hijo.${index}.nombre`}
                    placeholder="Nombre" 
                    value={hijo.nombre} 
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input 
                    type="text" 
                    name={`hijo.${index}.apellidoPaterno`}
                    placeholder="Apellido Paterno" 
                    value={hijo.apellidoPaterno} 
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input 
                    type="text" 
                    name={`hijo.${index}.apellidoMaterno`}
                    placeholder="Apellido Materno" 
                    value={hijo.apellidoMaterno} 
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input 
                    type="text" 
                    name={`hijo.${index}.dni`}
                    placeholder="DNI" 
                    maxLength="8" 
                    value={hijo.dni} 
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input 
                    type="date" 
                    name={`hijo.${index}.fechaNacimiento`}
                    value={hijo.fechaNacimiento} 
                    onChange={(e) => handleInputChange(e)}
                  />
                  <button 
                    type="button" 
                    onClick={() => eliminarHijo(index)} 
                    className="remove-btn"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <button type="button" onClick={agregarHijo} className="add-btn">
              + Agregar Hijo
            </button>
          </fieldset>
        )}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Registrando...' : 'Registrar Asociado'}
        </button>
      </form>
    </div>
  );
};

export default FormularioAsociado;