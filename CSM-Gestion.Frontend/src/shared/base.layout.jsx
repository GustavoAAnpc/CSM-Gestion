import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import '../pages/css/BaseLayout.css';

export const BaseLayout = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        try {
            const adminString = sessionStorage.getItem('admin');
            if (adminString) {
                const adminData = JSON.parse(adminString);
                setAdmin(adminData);
            }
        } catch (error) {
            console.error("Error leyendo datos del administrador:", error);
        }
    }, []);

    const handlerLogout = () => {
        sessionStorage.removeItem('admin');
        navigate('/', { replace: true });
    };

    return (
        <div className={`layout-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo">
                        <i className="fas fa-hospital-alt"></i>
                        {!isCollapsed && <span>CSM-Gestión</span>}
                    </div>
                    <button
                        className="collapse-btn"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <div className="nav-label">Principal</div>
                        <NavLink
                            to="/inicio"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                            data-tooltip="Inicio"
                        >
                            <i className="fas fa-home"></i>
                            {!isCollapsed && <span>Inicio</span>}
                        </NavLink>

                        <NavLink
                            to="/registro"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                            data-tooltip="Registro"
                        >
                            <i className="fas fa-file-medical"></i>
                            {!isCollapsed && <span>Registro</span>}
                        </NavLink>

                        <NavLink
                            to="/pendientes"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                            data-tooltip="Solicitudes Pendientes"
                        >
                            <i className="fas fa-file-medical"></i>
                            {!isCollapsed && <span>Solicitudes Pendientes</span>}
                        </NavLink>

                        <NavLink
                            to="/buscar"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                            data-tooltip="Consultar Asociado"
                        >
                            <i className="fas fa-file-medical"></i>
                            {!isCollapsed && <span>Consultar Asociado</span>}
                        </NavLink>
                    </div>

                </nav>

                <div className="sidebar-footer">
                    <button
                        className="logout-btn"
                        onClick={handlerLogout}
                        title="Cerrar sesión"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        {!isCollapsed && <span>Cerrar sesión</span>}
                    </button>
                </div>
            </aside>


            <main className="main-content">
                <header className="content-header">
                    <div className="header-left">
                        <h1 className="page-title">
                            {getPageTitle(location.pathname)}
                        </h1>
                    </div>
                    <div className="header-right">
                        <div className="user-welcome">
                            <span>Bienvenido, {admin?.usuario}</span>
                        </div>
                    </div>
                </header>

                <div className="content-wrapper">
                    {children}
                </div>
            </main>
        </div>
    );
};


function getPageTitle(pathname) {
    const titles = {
        '/inicio': 'Inicio',
        '/buscar': 'Buscar Asociado',
        '/pendientes': 'Solicitudes Pendientes',
        '/registro': 'Registro'
    };
    return titles[pathname] || 'Centro Social Mollebamba';
}

BaseLayout.propTypes = {
    children: PropTypes.node.isRequired
};
