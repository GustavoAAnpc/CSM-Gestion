import httpClient from "./http.service";

class ListaService {

    obtenerAsociadosPorEstado(estado, pagina = 1, tamanio = 5) {
        return httpClient.get(`/asociado/estado/${estado}`, {
            params: { pagina, tamanio }
        });
    }

}

export default new ListaService();
