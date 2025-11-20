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
    conyuge: null, // Cambiado a null en lugar de objeto vacío
    hijos: []
  };

  const initialConyugeData = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
    fechaNacimiento: '',
    gradoEstudios: ''
  };

  const initialHijoData = {
    nombre: '',
    dni: '',
    genero: '',
    fechaNacimiento: '',
    gradoEstudios: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [conyugeData, setConyugeData] = useState(initialConyugeData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mostrarConyuge, setMostrarConyuge] = useState(false);
  const [mostrarHijos, setMostrarHijos] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConyugeChange = (e) => {
    const { name, value } = e.target;
    setConyugeData(prev => ({
      ...prev,
      [name]: value
    }));
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
        { ...initialHijoData }
      ]
    }));
  };

  const eliminarHijo = (index) => {
    setFormData(prev => ({
      ...prev,
      hijos: prev.hijos.filter((_, i) => i !== index)
    }));
  };

  const validarFormulario = () => {
    // Validaciones básicas
    if (!formData.nombre || !formData.apellidoPaterno || !formData.dni) {
      setMessage({
        type: 'error',
        text: 'Por favor complete los campos obligatorios'
      });
      return false;
    }

    if (formData.dni.length !== 8) {
      setMessage({
        type: 'error',
        text: 'El DNI debe tener 8 dígitos'
      });
      return false;
    }

    return true;
  };

  const limpiarFormulario = () => {
    setFormData(initialFormData);
    setConyugeData(initialConyugeData);
    setMostrarConyuge(false);
    setMostrarHijos(false);
    
    // Limpiar inputs de archivo
    const fileInputs = ['fotoAsociado', 'fotoVoucher', 'fotoFirma'];
    fileInputs.forEach(id => {
      const element = document.getElementById(id);
      if (element) element.value = '';
    });
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
      
      // Preparar archivos como base64
      const archivosBase64 = {};
      const archivosParaConvertir = [
        { campo: 'fotoAsociado', nombre: 'fotoAsociado' },
        { campo: 'fotoVoucher', nombre: 'fotoVoucher' },
        { campo: 'fotoFirma', nombre: 'fotoFirma' }
      ];

      for (const archivo of archivosParaConvertir) {
        if (formData[archivo.campo]) {
          archivosBase64[archivo.nombre] = await asociadoService.fileToBase64(formData[archivo.campo]);
        }
      }

      // PREPARAR DATOS EXACTAMENTE COMO ESPERA EL BACKEND
      const datosEnvio = {
        // Campos principales
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
        
        // Archivos como base64
        ...archivosBase64,
        
        // Cónyuge - solo si se completó y se mostró el formulario
        conyuge: mostrarConyuge && conyugeData.nombre ? {
          nombre: conyugeData.nombre,
          apellidoPaterno: conyugeData.apellidoPaterno,
          apellidoMaterno: conyugeData.apellidoMaterno,
          dni: conyugeData.dni,
          fechaNacimiento: conyugeData.fechaNacimiento || null,
          gradoEstudios: conyugeData.gradoEstudios
        } : null,
        
        // Hijos - solo si se mostró el formulario
        hijos: mostrarHijos ? formData.hijos.map(hijo => ({
          nombre: hijo.nombre,
          dni: hijo.dni,
          genero: hijo.genero,
          fechaNacimiento: hijo.fechaNacimiento,
          gradoEstudios: hijo.gradoEstudios
        })) : []
      };

      // Limpiar campos undefined
      Object.keys(datosEnvio).forEach(key => {
        if (datosEnvio[key] === undefined) {
          datosEnvio[key] = '';
        }
      });

      console.log('Datos finales a enviar:', {
        ...datosEnvio,
        fotoAsociado: datosEnvio.fotoAsociado ? '[BASE64_IMAGE]' : '',
        fotoVoucher: datosEnvio.fotoVoucher ? '[BASE64_IMAGE]' : '',
        fotoFirma: datosEnvio.fotoFirma ? '[BASE64_IMAGE]' : '',
        conyuge: datosEnvio.conyuge ? '[CONYUGE_DATA]' : null,
        hijos: datosEnvio.hijos.length > 0 ? `[${datosEnvio.hijos.length} HIJOS]` : []
      });

      const resultado = await asociadoService.registrarAsociado(datosEnvio);
      
      setMessage({
        type: 'success',
        text: `Asociado registrado correctamente. ID: ${resultado.value || resultado.id || 'N/A'}`
      });

      limpiarFormulario();

    } catch (error) {
      console.error('Error en handleSubmit:', error);
      
      let errorMessage = 'Error al registrar el asociado';
      
      if (error.response?.data) {
        // Si hay respuesta del servidor
        errorMessage = error.response.data.message || JSON.stringify(error.response.data);
      } else if (error.message.includes('validación') || error.message.includes('validation')) {
        errorMessage = error.message;
      } else if (error.message.includes('400')) {
        errorMessage = 'Datos inválidos enviados al servidor. Verifique que todos los campos estén correctos.';
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Error de conexión. Verifique que el servidor esté funcionando.';
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
          <div key={field.name} className={`form-group ${field.fullWidth ? 'full-width' : ''}`}>
            <label>{field.label}:{field.required && <span className="required">*</span>}</label>
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
            ) : field.type === 'file' ? (
              <>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  onChange={handleFileChange}
                  accept={field.accept}
                  required={field.required}
                />
                {formData[field.name] && (
                  <small>Archivo seleccionado: {formData[field.name].name}</small>
                )}
              </>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
                maxLength={field.maxLength}
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
    { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Ingrese nombre' },
    { name: 'apellidoPaterno', label: 'Apellido Paterno', type: 'text', required: true, placeholder: 'Ingrese apellido paterno' },
    { name: 'apellidoMaterno', label: 'Apellido Materno', type: 'text', required: true, placeholder: 'Ingrese apellido materno' },
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
    { name: 'dni', label: 'DNI', type: 'text', required: true, maxLength: '8', placeholder: '8 dígitos' }
  ];

  const camposUbicacion = [
    { name: 'departamento', label: 'Departamento', type: 'text', required: true, placeholder: 'Ej: Lima' },
    { name: 'provincia', label: 'Provincia', type: 'text', required: true, placeholder: 'Ej: Lima' },
    { name: 'distrito', label: 'Distrito', type: 'text', required: true, placeholder: 'Ej: Miraflores' },
    { name: 'direccion', label: 'Dirección', type: 'text', required: true, placeholder: 'Dirección completa', fullWidth: true },
    { name: 'baseZonal', label: 'Base Zonal', type: 'text', required: true, placeholder: 'Base zonal asignada' }
  ];

  const camposContacto = [
    { name: 'numeroCelular', label: 'Número Celular', type: 'tel', required: true, placeholder: 'Ej: 987654321' },
    { name: 'correoActual', label: 'Correo Electrónico', type: 'email', required: true, placeholder: 'ejemplo@correo.com' }
  ];

  const camposInformacionAdicional = [
    { name: 'ocupacion', label: 'Ocupación', type: 'text', required: true, placeholder: 'Ej: Ingeniero' },
    { name: 'nacionalidad', label: 'Nacionalidad', type: 'text', required: true, placeholder: 'Ej: Peruana' },
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
    { name: 'numeroRuc', label: 'Número RUC (opcional)', type: 'text', required: false, placeholder: '11 dígitos' },
    { name: 'numeroLibretaMilitar', label: 'Libreta Militar (opcional)', type: 'text', required: false, placeholder: 'Número de libreta' }
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
                <label>{field.label}:{field.required && <span className="required">*</span>}</label>
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
        <div className="section-toggle">
          <button 
            type="button" 
            onClick={() => setMostrarConyuge(!mostrarConyuge)} 
            className="toggle-btn"
          >
            {mostrarConyuge ? "x Ocultar Cónyuge" : "+ Agregar Cónyuge"}
          </button>
        </div>

        {mostrarConyuge && (
          <fieldset>
            <legend>Información del Cónyuge (Opcional)</legend>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={conyugeData.nombre}
                  onChange={handleConyugeChange}
                  placeholder="Nombre del cónyuge"
                />
              </div>
              <div className="form-group">
                <label>Apellido Paterno:</label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  value={conyugeData.apellidoPaterno}
                  onChange={handleConyugeChange}
                  placeholder="Apellido paterno"
                />
              </div>
              <div className="form-group">
                <label>Apellido Materno:</label>
                <input
                  type="text"
                  name="apellidoMaterno"
                  value={conyugeData.apellidoMaterno}
                  onChange={handleConyugeChange}
                  placeholder="Apellido materno"
                />
              </div>
              <div className="form-group">
                <label>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  value={conyugeData.dni}
                  onChange={handleConyugeChange}
                  placeholder="8 dígitos"
                  maxLength="8"
                />
              </div>
              <div className="form-group">
                <label>Fecha Nacimiento:</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={conyugeData.fechaNacimiento}
                  onChange={handleConyugeChange}
                />
              </div>
              <div className="form-group">
                <label>Grado Estudios:</label>
                <input
                  type="text"
                  name="gradoEstudios"
                  value={conyugeData.gradoEstudios}
                  onChange={handleConyugeChange}
                  placeholder="Grado de estudios"
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* Hijos */}
        <div className="section-toggle">
          <button 
            type="button" 
            onClick={() => setMostrarHijos(!mostrarHijos)} 
            className="toggle-btn"
          >
            {mostrarHijos ? "x Ocultar Hijos" : "+ Agregar Hijos"}
          </button>
        </div>

        {mostrarHijos && (
          <fieldset>
            <legend>Hijos (Opcional)</legend>
            
            {formData.hijos.map((hijo, index) => (
              <div key={index} className="hijo-block">
                <div className="hijo-header">
                  <h4>Hijo #{index + 1}</h4>
                  <button 
                    type="button" 
                    onClick={() => eliminarHijo(index)} 
                    className="remove-btn"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      value={hijo.nombre}
                      onChange={(e) => handleHijoChange(index, 'nombre', e.target.value)}
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div className="form-group">
                    <label>DNI:</label>
                    <input
                      type="text"
                      value={hijo.dni}
                      onChange={(e) => handleHijoChange(index, 'dni', e.target.value)}
                      placeholder="8 dígitos"
                      maxLength="8"
                    />
                  </div>
                  <div className="form-group">
                    <label>Género:</label>
                    <select
                      value={hijo.genero}
                      onChange={(e) => handleHijoChange(index, 'genero', e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Fecha Nacimiento:</label>
                    <input
                      type="date"
                      value={hijo.fechaNacimiento}
                      onChange={(e) => handleHijoChange(index, 'fechaNacimiento', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Grado Estudios:</label>
                    <input
                      type="text"
                      value={hijo.gradoEstudios}
                      onChange={(e) => handleHijoChange(index, 'gradoEstudios', e.target.value)}
                      placeholder="Grado de estudios"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" onClick={agregarHijo} className="add-btn">
              + Agregar Hijo
            </button>
          </fieldset>
        )}

        <div className="form-actions">
          <button type="button" onClick={limpiarFormulario} className="clear-btn">
            Limpiar Formulario
          </button>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Registrando...' : 'Registrar Solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioAsociado;