    import axios from 'axios';

    const API_BASE_URL = 'http://localhost:7156/api'; // Actualicé el puerto según tu error

    class AsociadoService {
    async registrarAsociado(asociadoData) {
        try {
        console.log('Datos a enviar:', JSON.stringify(asociadoData, null, 2));
        
        const response = await axios.post(`${API_BASE_URL}/asociado`, asociadoData, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        return response.data;
        } catch (error) {
        console.error('Error completo:', error);
        console.error('Response error:', error.response?.data);
        throw new Error(error.response?.data?.message || `Error al registrar asociado: ${error.message}`);
        }
    }

    // Función para convertir archivo a base64
    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Remover el prefijo data:application/octet-stream;base64,
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
        });
    }
    }

    export default new AsociadoService();