import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ConsultaService from "../services/consulta.service";
import './css/DetalleSolicitud.css';

export default function DetalleSolicitud() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    const [imageTitle, setImageTitle] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const response = await ConsultaService.obtenerDatosAsociado(id);

                if (response.isSuccess) {
                    setData(response.value);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError("Error al cargar datos");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

    const openImageModal = (imageBase64, title) => {
        setCurrentImage(imageBase64);
        setImageTitle(title);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentImage("");
        setImageTitle("");
    };
    if (loading) return <div className="cargando-detalle">Cargando...</div>;
    if (error) return <div className="error-detalle">{error}</div>;
    if (!data) return <div className="sin-datos">No hay información del asociado.</div>;

    return (
        <div className="asociado-detalle-container">
            <h2>Información de la Solicitud</h2>

            {/* Información básica */}
            <div className="detalle-seccion">
                <h3>Datos Personales</h3>
                <div className="datos-grid">
                    <div className="dato-item">
                        <strong>ID</strong>
                        <p>{data.asociadoId}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Nombre Completo</strong>
                        <p>{data.nombre} {data.apellidoPaterno} {data.apellidoMaterno}</p>
                    </div>
                    <div className="dato-item">
                        <strong>DNI</strong>
                        <p>{data.dni}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Fecha Nacimiento</strong>
                        <p>{data.fechaNacimiento}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Género</strong>
                        <p>{data.genero}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Correo</strong>
                        <p>{data.correoActual}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Celular</strong>
                        <p>{data.numeroCelular}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Ocupación</strong>
                        <p>{data.ocupacion}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Nacionalidad</strong>
                        <p>{data.nacionalidad}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Estado Civil</strong>
                        <p>{data.estadoCivil}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Grado Instrucción</strong>
                        <p>{data.gradoInstruccion}</p>
                    </div>
                    {data.numeroLibretaMilitar && (
                        <div className="dato-item">
                            <strong>Libreta Militar</strong>
                            <p>{data.numeroLibretaMilitar}</p>
                        </div>
                    )}
                    {data.numeroRuc && (
                        <div className="dato-item">
                            <strong>RUC</strong>
                            <p>{data.numeroRuc}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Dirección */}
            <div className="detalle-seccion">
                <h3>Dirección</h3>
                <div className="datos-grid">
                    <div className="dato-item">
                        <strong>Dirección</strong>
                        <p>{data.direccion}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Distrito</strong>
                        <p>{data.distrito}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Provincia</strong>
                        <p>{data.provincia}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Departamento</strong>
                        <p>{data.departamento}</p>
                    </div>
                    <div className="dato-item">
                        <strong>Base Zonal</strong>
                        <p>{data.baseZonal}</p>
                    </div>
                </div>
            </div>

            {/* Documentos - Imágenes */}
            <div className="detalle-seccion">
                <h3>Documentos Adjuntos</h3>
                <div className="documentos-container">
                    {data.fotoAsociado && (
                        <button 
                            onClick={() => openImageModal(data.fotoAsociado, "Foto del Asociado")}
                            className="doc-btn doc-btn-foto"
                        >
                            📷 Ver Foto Asociado
                        </button>
                    )}
                    
                    {data.fotoVoucher && (
                        <button 
                            onClick={() => openImageModal(data.fotoVoucher, "Voucher")}
                            className="doc-btn doc-btn-voucher"
                        >
                            💰 Ver Voucher
                        </button>
                    )}
                    
                    {data.fotoFirma && (
                        <button 
                            onClick={() => openImageModal(data.fotoFirma, "Firma")}
                            className="doc-btn doc-btn-firma"
                        >
                            ✍️ Ver Firma
                        </button>
                    )}
                </div>
            </div>

            {/* Cónyuge */}
            <div className="detalle-seccion">
                <h3>Cónyuge</h3>
                {data.conyuge && data.conyuge.nombre ? (
                    <div className="conyuge-content">
                        <div className="datos-grid">
                            <div className="dato-item">
                                <strong>Nombre</strong>
                                <p>{data.conyuge.nombre} {data.conyuge.apellidoPaterno} {data.conyuge.apellidoMaterno}</p>
                            </div>
                            <div className="dato-item">
                                <strong>DNI</strong>
                                <p>{data.conyuge.dni}</p>
                            </div>
                            <div className="dato-item">
                                <strong>Fecha Nacimiento</strong>
                                <p>{data.conyuge.fechaNacimiento}</p>
                            </div>
                            <div className="dato-item">
                                <strong>Grado de Estudios</strong>
                                <p>{data.conyuge.gradoEstudios}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="no-data-message">No tiene cónyuge registrado.</p>
                )}
            </div>

            {/* Hijos */}
            <div className="detalle-seccion">
                <h3>Hijos</h3>
                {data.hijos && data.hijos.length > 0 ? (
                    <div className="hijos-container">
                        {data.hijos.map((hijo, index) => (
                            <div key={index} className="hijo-item">
                                <div className="datos-grid">
                                    <div className="dato-item">
                                        <strong>Nombre</strong>
                                        <p>{hijo.nombre}</p>
                                    </div>
                                    <div className="dato-item">
                                        <strong>DNI</strong>
                                        <p>{hijo.dni}</p>
                                    </div>
                                    <div className="dato-item">
                                        <strong>Género</strong>
                                        <p>{hijo.genero}</p>
                                    </div>
                                    <div className="dato-item">
                                        <strong>Fecha Nacimiento</strong>
                                        <p>{hijo.fechaNacimiento}</p>
                                    </div>
                                    <div className="dato-item">
                                        <strong>Grado de Estudios</strong>
                                        <p>{hijo.gradoEstudios}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-data-message">No tiene hijos registrados.</p>
                )}
            </div>

            {/* Modal para mostrar imágenes */}
            {modalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{imageTitle}</h3>
                            <button className="modal-close-btn" onClick={closeModal}>
                                ×
                            </button>
                        </div>
                        <img 
                            src={`data:image/jpeg;base64,${currentImage}`} 
                            alt={imageTitle}
                            className="modal-image"
                        />
                        <div className="modal-footer">
                            <button className="modal-footer-btn" onClick={closeModal}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}