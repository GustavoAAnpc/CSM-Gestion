import { useEffect, useState } from "react";
import { obtenerAsociado } from "../api/asociadoService";

export default function PerfilAsociado() {
  const [asociado, setAsociado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerAsociado()
      .then(setAsociado)
      .catch(() => setError("Error al conectar con el backend"));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!asociado) return <p className="text-gray-600">Cargando datos...</p>;

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Perfil del Asociado</h1>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <p><b>Nombre:</b> {asociado.nombre} {asociado.apellidoPaterno} {asociado.apellidoMaterno}</p>
        <p><b>DNI:</b> {asociado.dni}</p>
        <p><b>Fecha de nacimiento:</b> {asociado.fechaNacimiento}</p>
        <p><b>Género:</b> {asociado.genero}</p>
        <p><b>Ocupación:</b> {asociado.ocupacion}</p>
        <p><b>Correo:</b> {asociado.correoActual}</p>
        <p><b>Dirección:</b> {asociado.direccion}</p>
        <p><b>Estado civil:</b> {asociado.estadoCivil}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Cónyuge</h2>
        <p>{asociado.conyuge?.nombre} {asociado.conyuge?.apellidoPaterno} {asociado.conyuge?.apellidoMaterno}</p>
        <p>DNI: {asociado.conyuge?.dni}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Hijos</h2>
        <ul className="list-disc list-inside">
          {asociado.hijos?.map((h, i) => (
            <li key={i}>
              {h.nombre} — {h.gradoEstudios}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
