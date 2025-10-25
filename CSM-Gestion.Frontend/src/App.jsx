import { Routes, Route, NavLink } from "react-router-dom";
import PerfilAsociado from "./pages/PerfilAsociado";

export default function App() {
  return (
    <div className="p-6">
      <nav className="mb-4">
        <NavLink to="/" className="text-blue-600 font-bold">
          Inicio
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<PerfilAsociado />} />
      </Routes>
    </div>
  );
}
