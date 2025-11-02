import axios from 'axios';

const API_BASE_URL = 'http://localhost:5261/api';

class AsociadoService {
    async registrarAsociado(asociadoData) {
        try {
        const response = await axios.post(`${API_BASE_URL}/asociado`, asociadoData, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        return response.data;
        } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al registrar asociado');
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

    // Función para obtener el nombre del archivo
    getFileName(file) {
        return file.name.toLowerCase().replace(/\s+/g, '_');
    }
}

export default new AsociadoService();