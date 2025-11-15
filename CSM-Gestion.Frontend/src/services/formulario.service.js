    import axios from 'axios';

    const API_BASE_URL = import.meta.env.VITE_AUTH_API;

    const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
    });

    // Interceptor mejorado para ver más detalles del error
    api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error de API completo:', error);
        
        if (error.code === 'ERR_NETWORK') {
        throw new Error('No se puede conectar con el servidor.');
        }
        
        if (error.response) {
        // Mostrar más detalles del error 400
        console.error('Respuesta de error del servidor:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        
        const serverError = error.response.data;
        let errorMessage = `Error del servidor: ${error.response.status}`;
        
        if (serverError && typeof serverError === 'object') {
            // Si el backend envía un objeto de error con detalles
            if (serverError.message) {
            errorMessage = serverError.message;
            }
            if (serverError.errors) {
            // Si hay errores de validación
            const validationErrors = Object.values(serverError.errors).flat().join(', ');
            errorMessage = `Errores de validación: ${validationErrors}`;
            }
        } else if (typeof serverError === 'string') {
            errorMessage = serverError;
        }
        
        throw new Error(errorMessage);
        }
        
        throw error;
    }
    );

    class AsociadoService {
    async registrarAsociado(asociadoData) {
        try {
        console.log('Enviando datos al backend:', this.limpiarParaLog(asociadoData));
        
        const response = await api.post('/asociado', asociadoData);
        
        console.log('Respuesta exitosa del backend:', response.data);
        return response.data;
        
        } catch (error) {
        console.error('Error completo en registrarAsociado:', error);
        throw error;
        }
    }

    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
        });
    }

    limpiarParaLog(data) {
        const copia = { ...data };
        if (copia.fotoAsociado) copia.fotoAsociado = '[BASE64_IMAGE]';
        if (copia.fotoVoucher) copia.fotoVoucher = '[BASE64_IMAGE]';
        if (copia.fotoFirma) copia.fotoFirma = '[BASE64_IMAGE]';
        return copia;
    }
    }

    export default new AsociadoService();