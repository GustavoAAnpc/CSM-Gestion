import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import { useEffect, useState } from 'react';

export const BaseLayout = ({ children }) => {
    const [admin, setAdmin] = useState('admin');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const adminString = sessionStorage.getItem('admin');
            if (adminString) {
                const admin = JSON.parse(adminString);
                if (admin?.adminString) {
                    setAdmin(admin.adminString);
                }
            }
        } catch (error) {
            console.error("Error leyendo paciente:", error);
        }
    }, []);

    const handlerLogout = () => {
        sessionStorage.removeItem('admin');
        navigate('/login', { replace: true });
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            
            <aside className="bg-dark text-white p-3" style={{ width: '240px' }}>
                <div className="mb-4">
                    <h4 className="text-center">CSM-Gestión</h4>
                </div>
                <NavLink to="/home" className="d-block text-white mb-2">- Inicio</NavLink>
                <h6 className="mt-4">Pages</h6>
                <NavLink to="/registro" className="d-block text-white mb-1">- Registrar Solicitud</NavLink>
                <NavLink to="/recetas" className="d-block text-white mb-1">- Recetas</NavLink>
                <NavLink to="/mascotas" className="d-block text-white mb-1">- Mascotas</NavLink>

                <button className="btn btn-outline-danger btn-sm ms-3" onClick={handlerLogout}>
                            Cerrar sesión
                        </button>
            </aside>
            <main className="flex-grow-1 d-flex flex-column">
                <div className="p-4" style={{ flexGrow: 1, overflowY: 'auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

BaseLayout.propTypes = {
    children: PropTypes.node.isRequired
};
