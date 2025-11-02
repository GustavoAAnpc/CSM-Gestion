import React, { useState } from 'react';
import asociadoService from '../services/formulario.service';
import './FormularioAsociado.css';

const FormularioAsociado = () => {
  const [formData, setFormData] = useState({
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
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Preparar datos para enviar
      const datosEnvio = { ...formData };

      // Convertir archivos a base64 si existen
      if (formData.fotoAsociado) {
        const base64Foto = await asociadoService.fileToBase64(formData.fotoAsociado);
        datosEnvio.fotoAsociado = base64Foto;
        // También puedes enviar el nombre del archivo si tu API lo requiere
        // datosEnvio.nombreFotoAsociado = asociadoService.getFileName(formData.fotoAsociado);
      }

      if (formData.fotoVoucher) {
        const base64Voucher = await asociadoService.fileToBase64(formData.fotoVoucher);
        datosEnvio.fotoVoucher = base64Voucher;
      }

      if (formData.fotoFirma) {
        const base64Firma = await asociadoService.fileToBase64(formData.fotoFirma);
        datosEnvio.fotoFirma = base64Firma;
      }

      // Limpiar campos de archivo del objeto principal
      delete datosEnvio.fotoAsociadoFile;
      delete datosEnvio.fotoVoucherFile;
      delete datosEnvio.fotoFirmaFile;

      const resultado = await asociadoService.registrarAsociado(datosEnvio);
      
      setMessage({
        type: 'success',
        text: `Asociado registrado correctamente. ID: ${resultado.value}`
      });

      // Limpiar formulario
      setFormData({
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
      });

      // Limpiar inputs de archivo
      document.getElementById('fotoAsociado').value = '';
      document.getElementById('fotoVoucher').value = '';
      document.getElementById('fotoFirma').value = '';

    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message
      });
    } finally {
      setLoading(false);
    }
  };

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
        <fieldset>
          <legend>Información Personal</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Apellido Paterno:</label>
              <input
                type="text"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Apellido Materno:</label>
              <input
                type="text"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha de Nacimiento:</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Género:</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div className="form-group">
              <label>DNI:</label>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                required
                maxLength="8"
              />
            </div>
          </div>
        </fieldset>

        {/* Ubicación */}
        <fieldset>
          <legend>Ubicación</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Departamento:</label>
              <input
                type="text"
                name="departamento"
                value={formData.departamento}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Provincia:</label>
              <input
                type="text"
                name="provincia"
                value={formData.provincia}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Distrito:</label>
              <input
                type="text"
                name="distrito"
                value={formData.distrito}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Base Zonal:</label>
            <input
              type="text"
              name="baseZonal"
              value={formData.baseZonal}
              onChange={handleInputChange}
              required
            />
          </div>
        </fieldset>

        {/* Contacto */}
        <fieldset>
          <legend>Contacto</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Número Celular:</label>
              <input
                type="tel"
                name="numeroCelular"
                value={formData.numeroCelular}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Correo Electrónico:</label>
              <input
                type="email"
                name="correoActual"
                value={formData.correoActual}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Información Adicional */}
        <fieldset>
          <legend>Información Adicional</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Ocupación:</label>
              <input
                type="text"
                name="ocupacion"
                value={formData.ocupacion}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Nacionalidad:</label>
              <input
                type="text"
                name="nacionalidad"
                value={formData.nacionalidad}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Estado Civil:</label>
              <select
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viudo">Viudo</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Grado de Instrucción:</label>
              <select
                name="gradoInstruccion"
                value={formData.gradoInstruccion}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="Primaria">Primaria</option>
                <option value="Secundaria">Secundaria</option>
                <option value="Técnico">Técnico</option>
                <option value="Universitario">Universitario</option>
                <option value="Maestría">Maestría</option>
                <option value="Doctorado">Doctorado</option>
              </select>
            </div>
            <div className="form-group">
              <label>Número RUC (opcional):</label>
              <input
                type="text"
                name="numeroRuc"
                value={formData.numeroRuc}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Libreta Militar (opcional):</label>
              <input
                type="text"
                name="numeroLibretaMilitar"
                value={formData.numeroLibretaMilitar}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Archivos */}
        <fieldset>
          <legend>Documentos Adjuntos</legend>
          <div className="form-row">
            <div className="form-group file-input">
              <label>Foto del Asociado:</label>
              <input
                id="fotoAsociado"
                type="file"
                name="fotoAsociado"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              <small>Formatos aceptados: JPG, PNG, JPEG</small>
            </div>

            <div className="form-group file-input">
              <label>Voucher de Pago:</label>
              <input
                id="fotoVoucher"
                type="file"
                name="fotoVoucher"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              <small>Formatos aceptados: JPG, PNG, JPEG</small>
            </div>

            <div className="form-group file-input">
              <label>Firma del Asociado:</label>
              <input
                id="fotoFirma"
                type="file"
                name="fotoFirma"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              <small>Formatos aceptados: JPG, PNG, JPEG</small>
            </div>
          </div>
        </fieldset>

        {/* Información del Cónyuge */}
        <fieldset>
          <legend>Información del Cónyuge (opcional)</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="conyuge.nombre"
                value={formData.conyuge.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Apellido Paterno:</label>
              <input
                type="text"
                name="conyuge.apellidoPaterno"
                value={formData.conyuge.apellidoPaterno}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Apellido Materno:</label>
              <input
                type="text"
                name="conyuge.apellidoMaterno"
                value={formData.conyuge.apellidoMaterno}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>DNI:</label>
              <input
                type="text"
                name="conyuge.dni"
                value={formData.conyuge.dni}
                onChange={handleInputChange}
                maxLength="8"
              />
            </div>
            <div className="form-group">
              <label>Fecha Nacimiento:</label>
              <input
                type="date"
                name="conyuge.fechaNacimiento"
                value={formData.conyuge.fechaNacimiento}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Grado de Estudios:</label>
              <input
                type="text"
                name="conyuge.gradoEstudios"
                value={formData.conyuge.gradoEstudios}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Registrando...' : 'Registrar Asociado'}
        </button>
      </form>
    </div>
  );
};

export default FormularioAsociado;