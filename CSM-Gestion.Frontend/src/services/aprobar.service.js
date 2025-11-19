import httpClient from "./http.service";

class AprobarService {
    aprobarSolicitud(id) {
        return httpClient.patch(`/asociado/aprobar/${id}`);
    }
}
export default new AprobarService();
