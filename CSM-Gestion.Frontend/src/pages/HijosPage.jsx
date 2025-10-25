import { useEffect, useState } from "react";
import { obtenerAsociado } from "../api/asociadoService";
import HijosInfo from "../components/HijosInfo";

export default function HijosPage() {
  const [hijos, setHijos] = useState([]);

  useEffect(() => {
    obtenerAsociado().then(data => setHijos(data.hijos));
  }, []);

  if (!hijos.length) return <p>Cargando...</p>;

  return <HijosInfo hijos={hijos} />;
}
