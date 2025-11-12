// services/http.service.js
const rutaBase = import.meta.env.VITE_AUTH_API;

export const HttpClient = () => {
    const defaultHttpOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const adminString = sessionStorage.getItem('admin');
        if (adminString) {
            const admin = JSON.parse(adminString);
            if (admin?.token) {
                defaultHttpOptions.headers.Authorization = `Bearer ${admin.token}`;
            }
        }
    } catch (error) {
        console.error("Error parsing user token from sessionStorage:", error);
    }

    const handleResponse = async (response) => {
        if (!response.ok) {
            const errorData = await response.text().catch(() => ({})); 
            try {
                const jsonData = JSON.parse(errorData);
                const error = new Error('HTTP error');
                error.status = response.status;
                error.data = jsonData;
                throw error;
            } catch {
                const error = new Error(errorData || 'HTTP error');
                error.status = response.status;
                error.data = { message: errorData };
                throw error;
            }
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        return response.text(); 
    };

    const handleError = (error) => {
        console.error("HTTP error:", error);
        throw error;
    };

    // GET modificado para aceptar body
    const get = (url, payload = null, httpOptions = {}) => {
        const options = {
            ...defaultHttpOptions,
            ...httpOptions,
            method: 'GET',
        };

        // Si hay payload, lo agregamos al body
        if (payload) {
            options.body = JSON.stringify(payload);
        }

        return fetch(`${rutaBase}${url}`, options)
            .then(handleResponse)
            .catch(handleError);
    };

    const post = (url, payload, httpOptions = {}) => {
        const options = {
            ...defaultHttpOptions,
            ...httpOptions,
            method: 'POST',
            body: JSON.stringify(payload),
        };
        return fetch(`${rutaBase}${url}`, options)
            .then(handleResponse)
            .catch(handleError);
    };

    const put = (url, payload, httpOptions = {}) => {
        const options = {
            ...defaultHttpOptions,
            ...httpOptions,
            method: 'PUT',
            body: JSON.stringify(payload),
        };
        return fetch(`${rutaBase}${url}`, options)
            .then(handleResponse)
            .catch(handleError);
    };

    const del = (url, httpOptions = {}) => {
        const options = {
            ...defaultHttpOptions,
            ...httpOptions,
            method: 'DELETE',
        };
        return fetch(`${rutaBase}${url}`, options)
            .then(handleResponse)
            .catch(handleError);
    };

    return {
        get,
        post,
        put, 
        del,
    };
};