export const HomePage = () => {
    return (
        <div className="home-container">
            <div className="welcome-section">
                <div className="welcome-card">
                    <i className="fas fa-hospital-alt welcome-icon"></i>
                    <h1>Centro Social Mollebamba</h1>
                    <p className="welcome-subtitle">Sistema de Gestión Administrativa</p>
                    <div className="welcome-features">
                        <div className="feature-card">
                            <i className="fas fa-file-medical"></i>
                            <h3>Gestión de Solicitudes</h3>
                            <p>Administra y registra solicitudes de manera eficiente</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-paw"></i>
                            <h3>Control de Mascotas</h3>
                            <p>Gestiona la información de mascotas registradas</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-chart-line"></i>
                            <h3>Dashboard</h3>
                            <p>Visualiza métricas y reportes del sistema</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}