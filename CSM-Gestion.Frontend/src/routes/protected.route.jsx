import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'
import { BaseLayout } from '../shared/base.layout';

export const ProtectedRoute = () => {
    const navigate = useNavigate();
    let isAuthenticated = false;

    try {
        const token = sessionStorage.getItem('admin');
        if (token) {
            const tokenParsed = JSON.parse(token);
            isAuthenticated = !!tokenParsed;
        }
    }
    catch (error) {
        console.error("Error parsing user token from sessionStorage:", error);
        isAuthenticate = false;
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/', { replace: true });
        }

    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <BaseLayout>
            <Outlet />
        </BaseLayout>
    );
}