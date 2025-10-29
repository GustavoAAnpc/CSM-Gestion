    import { useNavigate } from "react-router-dom";
    import { useState } from "react";
    import { HttpClient } from "../services/http.service";

    const { post } = HttpClient();

    export default function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
        const data = await post("/auth", { usuario, password });

        if (data.isSuccess && data.value?.token) {
            sessionStorage.setItem(
            "admin",
            JSON.stringify({
                token: data.value.token,
                usuario: data.value.usuario,
                expira: data.value.expira,
            })
            );
            navigate("/"); // redirige con React Router
        } else {
            setError(data.message || "Credenciales inválidas");
        }
        } catch (err) {
        console.error(err);
        setError("Error al iniciar sesión");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
            />
            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
            />
            <button type="submit" style={{ width: "100%", padding: 8 }}>
            Ingresar
            </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
    }
