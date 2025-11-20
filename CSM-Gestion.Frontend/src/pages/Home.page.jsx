import '../pages/css/HomePage.css';
export const HomePage = () => {
    return (
        <div    >
            <div className="home-card">
                <h1 className="home-title">Centro Social Mollebamba</h1>
                <p className="home-subtitle">Sistema de Gestión Administrativa</p>

                <div className="home-grid">
                    <div className="home-feature">
                        <i className="fas fa-users"></i>
                        <h3>Gestión de Asociados</h3>
                        <p>Registro, actualización y búsqueda de asociados del sistema.</p>
                    </div>

                    <div className="home-feature">
                        <i className="fas fa-file-alt"></i>
                        <h3>Administración Documentaria</h3>
                        <p>Control de solicitudes, documentos y trámites del asociado.</p>
                    </div>

                    <div className="home-feature">
                        <i className="fas fa-chart-bar"></i>
                        <h3>Reportes y Estadísticas</h3>
                        <p>Visualización de métricas para la toma de decisiones.</p>
                    </div>

                    <div className="home-feature">
                        <i className="fas fa-user-shield"></i>
                        <h3>Panel Administrativo</h3>
                        <p>Acceso a funciones avanzadas para administradores.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
