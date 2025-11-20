import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/Home.page';
import LoginPage from "../pages/Login.page.jsx";
import { ProtectedRoute } from './protected.route';
import FormularioPage from '../pages/Formulario.page.jsx';
import BuscarAsociado from '../pages/Consulta.page.jsx';
import ListaPendientes from '../pages/Lista.pendientes.page.jsx'
import Detalle from '../pages/Detalle.solicitud.page.jsx'

export const RutasApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/registro' element={<FormularioPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/buscar' element={<BuscarAsociado />} />
                    <Route path='/pendientes' element={<ListaPendientes />} />
                    <Route path='/asociado/:id' element={<Detalle />} />
                </Route>
            </Routes>    
        </BrowserRouter>
    );
}

export default RutasApp;