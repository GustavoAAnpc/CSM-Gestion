export default function AsociadoInfo({ data }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Datos del Asociado</h2>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p><b>Nombre:</b> {data.nombre} {data.apellidoPaterno} {data.apellidoMaterno}</p>
        <p><b>DNI:</b> {data.dni}</p>
        <p><b>Dirección:</b> {data.direccion}</p>
        <p><b>Correo:</b> {data.correoActual}</p>
      </div>
    </div>
  );
}
