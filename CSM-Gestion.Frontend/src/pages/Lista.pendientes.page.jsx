import React, { useEffect, useState } from "react";
import ListaService from "../services/lista.service";
import { useNavigate } from "react-router-dom";
import '../pages/css/ListaPendientes.css';

const ListaAsociadosPorEstado = () => {
    const [estado] = useState("Pendiente");
    const [pagina, setPagina] = useState(1);
    const [tamanio, setTamanio] = useState(5);
    const [data, setData] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


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
                setData(response.value);  // value contiene items, totalPaginas, etc
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError("Error al obtener datos");
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

    const verDetalle = (id) => {
    navigate(`/asociado/${id}`);
    };

    return (
        <div className="lista-container">

            <h2>Asociados con estado: {estado}</h2>

            {error && <div className="error-box">{error}</div>}

            {cargando ? (
                <p>Cargando...</p>
            ) : data ? (
                <div className="contenido">
                    
                    <div className="tabla-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ display: "none" }}>ID</th>
                                    <th>Nombre Completo</th>
                                    <th>Género</th>
                                    <th>Fecha Registro</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.items.map((a) => (
                                    <tr key={a.asociadoId}>
                                        <td style={{ display: "none" }}>{a.asociadoId}</td>

                                        <td>{`${a.nombre} ${a.apellidoPaterno} ${a.apellidoMaterno}`}</td>

                                        <td>
                                            {a.genero === "Masculino" ? (
                                                <i className="fa-solid fa-person"></i>
                                            ) : (
                                                <i className="fa-solid fa-person-dress"></i>
                                            )}
                                        </td>

                                        <td>{new Date(a.fechaRegistro).toLocaleDateString()}</td>
                                        <td>{a.estado}</td>
                                        <td>
                                            <button onClick={() => verDetalle(a.asociadoId)}>Ver</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

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
                </div>
            ) : (
                <p>No hay datos</p>
            )}
        </div>
    );
};

export default ListaAsociadosPorEstado;
