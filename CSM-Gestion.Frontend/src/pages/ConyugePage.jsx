import { useEffect, useState } from "react";
import { obtenerAsociado } from "../api/asociadoService";
import ConyugeInfo from "../components/ConyugeInfo";

export default function ConyugePage() {
  const [conyuge, setConyuge] = useState(null);

  useEffect(() => {
    obtenerAsociado().then(data => setConyuge(data.conyuge));
  }, []);

  if (!conyuge) return <p>Cargando...</p>;

  return <ConyugeInfo data={conyuge} />;
}
