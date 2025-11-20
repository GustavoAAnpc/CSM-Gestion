import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthService from '../services/auth.service';
import './css/Login.css'; // Asegúrate de crear esta ruta

export default function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setCargando(true);

        try {
            const data = await AuthService.login({ usuario, password });

            if (data.isSuccess && data.value?.token) {
                sessionStorage.setItem(
                    "admin",
                    JSON.stringify({
                        token: data.value.token,
                        usuario: data.value.usuario,
                        expira: data.value.expira,
                    })
                );
                navigate("/home");
            } else {
                setError(data.message || "Credenciales inválidas");
            }
        } catch (err) {
            console.error(err);
            setError("Error al iniciar sesión");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <i className="fas fa-hospital-alt"></i>
                        <span>CSM-Gestión</span>
                    </div>
                    <h2>Iniciar Sesión</h2>
                    <p>Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            id="usuario"
                            type="text"
                            placeholder="Ingresa tu usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                            disabled={cargando}
                            className="login-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={cargando}
                            className="login-input"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={cargando}
                        className={`login-btn ${cargando ? 'loading' : ''}`}
                    >
                        {cargando ? 'Iniciando sesión...' : 'Ingresar al sistema'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}