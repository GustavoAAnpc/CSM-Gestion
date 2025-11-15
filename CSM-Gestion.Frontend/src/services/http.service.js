// services/http.service.js
const rutaBase = import.meta.env.VITE_AUTH_API;
// DEBUG: Verificar la variable de entorno
console.log('🔍 VITE_AUTH_API desde http.service:', import.meta.env.VITE_AUTH_API);
console.log('🔍 rutaBase:', rutaBase);

export const HttpClient = () => {
    const defaultHttpOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // DEBUG: Ver qué hay en sessionStorage
    console.log('SessionStorage completo:', sessionStorage);
    
    try {
        const adminString = sessionStorage.getItem('admin');
        console.log('adminString:', adminString);
        
        if (adminString) {
            const admin = JSON.parse(adminString);
            console.log('admin object:', admin);
            
            if (admin?.token) {
                console.log('Token encontrado:', admin.token);
                defaultHttpOptions.headers.Authorization = `Bearer ${admin.token}`;
            } else {
                console.log('No se encontró token en admin object');
            }
        } else {
            console.log('No se encontró item "admin" en sessionStorage');
        }
    } catch (error) {
        console.error("Error parsing user token from sessionStorage:", error);
    }

    console.log('Headers finales:', defaultHttpOptions.headers);

    const handleResponse = async (response) => {
    console.log('🔍 Response status:', response.status);
    console.log('🔍 Response ok:', response.ok);
    console.log('🔍 Response headers:', response.headers);
    
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.text();
            console.log('🔍 Error response body:', errorData);
            
            // Intentar parsear como JSON
            try {
                const jsonData = JSON.parse(errorData);
                const error = new Error(jsonData.message || 'HTTP error');
                error.status = response.status;
                error.data = jsonData;
                throw error;
            } catch {
                // Si no es JSON, usar el texto plano
                const error = new Error(errorData || `HTTP error ${response.status}`);
                error.status = response.status;
                error.data = { message: errorData };
                throw error;
            }
        } catch (parseError) {
            console.error('🔍 Error parsing error response:', parseError);
            const error = new Error(`HTTP error ${response.status}`);
            error.status = response.status;
            error.data = { message: 'Unable to parse error response' };
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
    console.error("🔍 HTTP error details:", error);
    console.error("🔍 Error status:", error.status);
    console.error("🔍 Error data:", error.data);
    throw error;
};

    const get = (url, httpOptions = {}) => {
        const options = {
            ...defaultHttpOptions,
            ...httpOptions,
            method: 'GET',
        };
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
    
    console.log('🔍 Enviando POST a:', `${rutaBase}${url}`);
    console.log('🔍 Payload:', payload);
    console.log('🔍 Headers:', options.headers);
    
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