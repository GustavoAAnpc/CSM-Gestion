import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/Home.page';
import LoginPage from "../pages/Login.page.jsx";
import { ProtectedRoute } from './protected.route';


export const RutasApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<HomePage />} />
                </Route>
            </Routes>    
        </BrowserRouter>
    );
}

export default RutasApp;