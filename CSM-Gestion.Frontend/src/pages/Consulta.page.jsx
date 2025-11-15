import React, { useState } from 'react';
import ConsultaService from "../services/consulta.service";
import '../pages/css/Consulta.css';

const BuscarAsociado = () => {
    const [nombre, setNombre] = useState('');
    const [resultados, setResultados] = useState([]);
    const [asociadoSeleccionado, setAsociadoSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    const buscarAsociados = async () => {
        if (!nombre.trim()) {
            setError('Por favor ingresa un nombre');
            return;
        }

        setCargando(true);
        setError('');
        setResultados([]);
        setAsociadoSeleccionado(null);

        try {
            console.log("BASE URL ACTUAL:", import.meta.env.VITE_API_URL); 
            const data = await ConsultaService.buscarAsociadosPorNombre(nombre);

            
            if (data.isSuccess && data.value) {
                setResultados(data.value);
            } else {
                setError(data.message || 'No se encontraron resultados');
            }
        } catch (err) {
            console.error('Error en búsqueda:', err);
            setError(err.data?.message || 'Error al buscar asociados');
        } finally {
            setCargando(false);
        }
    };

    const seleccionarAsociado = async (asociado) => {
        setCargando(true);
        setError('');

        try {
            const data = await ConsultaService.buscarPorApellidos({
                nombre: asociado.nombre,
                apellidoPaterno: asociado.apellidoPaterno,
                apellidoMaterno: asociado.apellidoMaterno
            });

            
            if (data.isSuccess) {
                setAsociadoSeleccionado(data.value);
            } else {
                setError(data.message || 'Error al cargar datos del asociado');
            }
        } catch (err) {
            setError(err.data?.message || 'Error al cargar datos del asociado');
        } finally {
            setCargando(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            buscarAsociados();
        }
    };

    return (
        <div className="buscar-asociado-container">
            
            <div className="busqueda-section">
                <h2>Buscar Asociado</h2>
                
                <div className="busqueda-input">
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ingresa el nombre del asociado"
                        disabled={cargando}
                    />
                    <button 
                        onClick={buscarAsociados}
                        disabled={cargando || !nombre.trim()}
                    >
                        {cargando ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}
            </div>

            <div className="resultados-container">
                <div className="resultados-lateral">
                    <h3>Resultados de Búsqueda</h3>
                    {resultados.length > 0 ? (
                        <div className="lista-resultados">
                            {resultados.map((asociado, index) => (
                                <div 
                                    key={index}
                                    className={`resultado-item ${
                                        asociadoSeleccionado && 
                                        asociadoSeleccionado.nombre === asociado.nombre &&
                                        asociadoSeleccionado.apellidoPaterno === asociado.apellidoPaterno &&
                                        asociadoSeleccionado.apellidoMaterno === asociado.apellidoMaterno
                                            ? 'seleccionado' : ''
                                    }`}
                                    onClick={() => seleccionarAsociado(asociado)}
                                >
                                    <strong>{asociado.nombre} {asociado.apellidoPaterno} {asociado.apellidoMaterno}</strong>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !cargando && <p>No hay resultados</p>
                    )}
                </div>

                <div className="detalle-asociado">
                    {asociadoSeleccionado ? (
                        <div className="detalle-content">
                            <h3>Detalles del Asociado</h3>
                            
                            <div className="seccion-datos">
                                <h4>Información Personal</h4>
                                <div className="datos-grid">
                                    <div><strong>Nombre:</strong> {asociadoSeleccionado.nombre}</div>
                                    <div><strong>Apellido Paterno:</strong> {asociadoSeleccionado.apellidoPaterno}</div>
                                    <div><strong>Apellido Materno:</strong> {asociadoSeleccionado.apellidoMaterno}</div>
                                    <div><strong>DNI:</strong> {asociadoSeleccionado.dni}</div>
                                    <div><strong>Fecha Nacimiento:</strong> {asociadoSeleccionado.fechaNacimiento}</div>
                                    <div><strong>Género:</strong> {asociadoSeleccionado.genero}</div>
                                    <div><strong>Estado Civil:</strong> {asociadoSeleccionado.estadoCivil}</div>
                                    <div><strong>Nacionalidad:</strong> {asociadoSeleccionado.nacionalidad}</div>
                                </div>
                            </div>

                            <div className="seccion-datos">
                                <h4>Información de Contacto</h4>
                                <div className="datos-grid">
                                    <div><strong>Dirección:</strong> {asociadoSeleccionado.direccion}</div>
                                    <div><strong>Departamento:</strong> {asociadoSeleccionado.departamento}</div>
                                    <div><strong>Provincia:</strong> {asociadoSeleccionado.provincia}</div>
                                    <div><strong>Distrito:</strong> {asociadoSeleccionado.distrito}</div>
                                    <div><strong>Celular:</strong> {asociadoSeleccionado.numeroCelular}</div>
                                    <div><strong>Correo:</strong> {asociadoSeleccionado.correoActual}</div>
                                </div>
                            </div>

                            <div className="seccion-datos">
                                <h4>Información Laboral</h4>
                                <div className="datos-grid">
                                    <div><strong>Ocupación:</strong> {asociadoSeleccionado.ocupacion}</div>
                                    <div><strong>Grado Instrucción:</strong> {asociadoSeleccionado.gradoInstruccion}</div>
                                    <div><strong>Base Zonal:</strong> {asociadoSeleccionado.baseZonal}</div>
                                    <div><strong>RUC:</strong> {asociadoSeleccionado.numeroRuc}</div>
                                    <div><strong>Libreta Militar:</strong> {asociadoSeleccionado.numeroLibretaMilitar}</div>
                                </div>
                            </div>

                            {asociadoSeleccionado.conyuge && (
                                <div className="seccion-datos">
                                    <h4>Cónyuge</h4>
                                    <div className="datos-grid">
                                        <div><strong>Nombre:</strong> {asociadoSeleccionado.conyuge.nombre} {asociadoSeleccionado.conyuge.apellidoPaterno} {asociadoSeleccionado.conyuge.apellidoMaterno}</div>
                                        <div><strong>DNI:</strong> {asociadoSeleccionado.conyuge.dni}</div>
                                        <div><strong>Fecha Nacimiento:</strong> {asociadoSeleccionado.conyuge.fechaNacimiento}</div>
                                        <div><strong>Grado Estudios:</strong> {asociadoSeleccionado.conyuge.gradoEstudios}</div>
                                    </div>
                                </div>
                            )}

                            {asociadoSeleccionado.hijos && asociadoSeleccionado.hijos.length > 0 && (
                                <div className="seccion-datos">
                                    <h4>Hijos</h4>
                                    {asociadoSeleccionado.hijos.map((hijo, index) => (
                                        <div key={index} className="hijo-item">
                                            <div><strong>Nombre:</strong> {hijo.nombre}</div>
                                            <div><strong>DNI:</strong> {hijo.dni}</div>
                                            <div><strong>Género:</strong> {hijo.genero}</div>
                                            <div><strong>Fecha Nacimiento:</strong> {hijo.fechaNacimiento}</div>
                                            <div><strong>Grado Estudios:</strong> {hijo.gradoEstudios}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="placeholder-detalle">
                            <p>Selecciona un asociado para ver sus detalles</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuscarAsociado;