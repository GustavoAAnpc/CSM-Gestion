import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const adminData = sessionStorage.getItem("admin");
  const isLoggedIn = adminData ? true : false;

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> c573350 (cambios en el frontend correccion que lo hice en el backend xd)
