import httpClient from "./http.service";

class ConsultaService {
    buscarAsociadosPorNombre(nombre) {
        return httpClient.post("/asociado/buscarPorNombre", {
            Nombre: nombre
        });
    }

    buscarPorApellidos(data) {
        return httpClient.post("/asociado/buscarPorNombreApellidos", data);
    }
    obtenerDatosAsociado(id) {
        return httpClient.get(`/asociado/${id}`);
    }
}

export default new ConsultaService();
