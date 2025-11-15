import React, { useEffect, useState } from "react";
import ListaService from "../services/lista.service";
import '../pages/css/ListaPendientes.css';

const ListaAsociadosPorEstado = () => {
    const [estado] = useState("Pendiente");  // Puedes hacerlo dinámico si quieres
    const [pagina, setPagina] = useState(1);
    const [tamanio, setTamanio] = useState(5);
    const [data, setData] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [asociadoSeleccionado, setAsociadoSeleccionado] = useState(null);

    const cargarData = async () => {
        setCargando(true);
        setError("");
        try {
            const response = await ListaService.obtenerAsociadosPorEstado(
                estado,
                pagina,
                tamanio
            );

            if (response.isSuccess) {
                setData(response.value);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err.data?.message || "Error al obtener datos");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarData();
    }, [pagina, tamanio]);

    const siguiente = () => {
        if (data && pagina < data.totalPaginas) {
            setPagina(pagina + 1);
        }
    };

    const anterior = () => {
        if (pagina > 1) {
            setPagina(pagina - 1);
        }
    };

    return (
        <div className="lista-container">

            <h2>Asociados con estado: {estado}</h2>

            {error && <div className="error-box">{error}</div>}

            {cargando ? (
                <p>Cargando...</p>
            ) : data ? (
                <div className="contenido">

                    {/* TABLA */}
                    <div className="tabla-container">
                        <table className="tabla-asociados">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>DNI</th>
                                    <th>Departamento</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map((a) => (
                                    <tr
                                        key={a.asociadoId}
                                        onClick={() => setAsociadoSeleccionado(a)}
                                        className={
                                            asociadoSeleccionado?.asociadoId === a.asociadoId
                                                ? "fila-seleccionada"
                                                : ""
                                        }
                                    >
                                        <td>{a.nombre} {a.apellidoPaterno}</td>
                                        <td>{a.dni}</td>
                                        <td>{a.departamento}</td>
                                        <td>{a.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Paginación */}
                        <div className="paginacion">
                            <button disabled={pagina === 1} onClick={anterior}>
                                Anterior
                            </button>

                            <span>Página {data.numeroPagina} de {data.totalPaginas}</span>

                            <button
                                disabled={pagina === data.totalPaginas}
                                onClick={siguiente}
                            >
                                Siguiente
                            </button>

                            <select
                                value={tamanio}
                                onChange={(e) => setTamanio(Number(e.target.value))}
                            >
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                            </select>
                        </div>
                    </div>

                    {/* DETALLE */}
                    <div className="detalle-box">
                        {asociadoSeleccionado ? (
                            <div>
                                <h3>Detalle del Asociado</h3>
                                <p><strong>Nombre:</strong> {asociadoSeleccionado.nombre} {asociadoSeleccionado.apellidoPaterno} {asociadoSeleccionado.apellidoMaterno}</p>
                                <p><strong>DNI:</strong> {asociadoSeleccionado.dni}</p>
                                <p><strong>Dirección:</strong> {asociadoSeleccionado.direccion}</p>
                                <p><strong>Celular:</strong> {asociadoSeleccionado.numeroCelular}</p>
                                <p><strong>Correo:</strong> {asociadoSeleccionado.correoActual}</p>

                                {asociadoSeleccionado.conyuge && (
                                    <>
                                        <h4>Cónyuge</h4>
                                        <p><strong>Nombre:</strong> {asociadoSeleccionado.conyuge.nombre}</p>
                                        <p><strong>DNI:</strong> {asociadoSeleccionado.conyuge.dni}</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <p className="no-detalle">Selecciona un asociado</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No hay datos</p>
            )}
        </div>
    );
};

export default ListaAsociadosPorEstado;
