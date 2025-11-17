import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ConsultaService from "../services/consulta.service";

export default function AsociadoDetalle() {
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

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    if (!data) return <p>No hay información del asociado.</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Información de la Solicitud</h2>

            {/* Información básica */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Datos Personales</h3>
                <p><strong>ID:</strong> {data.asociadoId}</p>
                <p><strong>Nombre:</strong> {data.nombre} {data.apellidoPaterno} {data.apellidoMaterno}</p>
                <p><strong>DNI:</strong> {data.dni}</p>
                <p><strong>Fecha Nacimiento:</strong> {data.fechaNacimiento}</p>
                <p><strong>Género:</strong> {data.genero}</p>
                <p><strong>Correo:</strong> {data.correoActual}</p>
                <p><strong>Celular:</strong> {data.numeroCelular}</p>
            </div>

            {/* Dirección */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Dirección</h3>
                <p><strong>Dirección:</strong> {data.direccion}</p>
                <p><strong>Distrito:</strong> {data.distrito}</p>
                <p><strong>Provincia:</strong> {data.provincia}</p>
                <p><strong>Departamento:</strong> {data.departamento}</p>
            </div>

            {/* Documentos - Imágenes */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Documentos Adjuntos</h3>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {data.fotoAsociado && (
                        <button 
                            onClick={() => openImageModal(data.fotoAsociado, "Foto del Asociado")}
                            style={{
                                padding: "10px 15px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            📷 Ver Foto Asociado
                        </button>
                    )}
                    
                    {data.fotoVoucher && (
                        <button 
                            onClick={() => openImageModal(data.fotoVoucher, "Voucher")}
                            style={{
                                padding: "10px 15px",
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            💰 Ver Voucher
                        </button>
                    )}
                    
                    {data.fotoFirma && (
                        <button 
                            onClick={() => openImageModal(data.fotoFirma, "Firma")}
                            style={{
                                padding: "10px 15px",
                                backgroundColor: "#ffc107",
                                color: "black",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            ✍️ Ver Firma
                        </button>
                    )}
                </div>
            </div>

            {/* Cónyuge */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Cónyuge</h3>
                {data.conyuge ? (
                    <>
                        <p><strong>Nombre:</strong> {data.conyuge.nombre} {data.conyuge.apellidoPaterno} {data.conyuge.apellidoMaterno}</p>
                        <p><strong>DNI:</strong> {data.conyuge.dni}</p>
                        <p><strong>Fecha Nacimiento:</strong> {data.conyuge.fechaNacimiento}</p>
                        <p><strong>Grado de Estudios:</strong> {data.conyuge.gradoEstudios}</p>
                    </>
                ) : (
                    <p>No tiene cónyuge registrado.</p>
                )}
            </div>

            {/* Hijos */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Hijos</h3>
                {data.hijos?.length > 0 ? (
                    data.hijos.map((hijo, index) => (
                        <div key={index} style={{ 
                            border: "1px solid #ddd", 
                            padding: "10px", 
                            marginBottom: "10px", 
                            borderRadius: "5px" 
                        }}>
                            <p><strong>Nombre:</strong> {hijo.nombre}</p>
                            <p><strong>DNI:</strong> {hijo.dni}</p>
                            <p><strong>Género:</strong> {hijo.genero}</p>
                            <p><strong>Fecha Nacimiento:</strong> {hijo.fechaNacimiento}</p>
                            <p><strong>Grado de Estudios:</strong> {hijo.gradoEstudios}</p>
                        </div>
                    ))
                ) : (
                    <p>No tiene hijos registrados.</p>
                )}
            </div>

            {/* Modal para mostrar imágenes */}
            {modalOpen && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        maxWidth: "90%",
                        maxHeight: "90%",
                        position: "relative"
                    }}>
                        <h3 style={{ marginBottom: "15px" }}>{imageTitle}</h3>
                        <img 
                            src={`data:image/jpeg;base64,${currentImage}`} 
                            alt={imageTitle}
                            style={{ 
                                maxWidth: "100%", 
                                maxHeight: "70vh",
                                display: "block"
                            }}
                        />
                        <button 
                            onClick={closeModal}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                        >
                            ×
                        </button>
                        <div style={{ textAlign: "center", marginTop: "10px" }}>
                            <button 
                                onClick={closeModal}
                                style={{
                                    padding: "8px 15px",
                                    backgroundColor: "#6c757d",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}