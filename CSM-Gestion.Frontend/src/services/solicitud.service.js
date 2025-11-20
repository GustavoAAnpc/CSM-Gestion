import httpClient from "./http.service";

class SolicitudService {
    solicitudHandler(id,estado) {
        return httpClient.patch(`/asociado/solicitud/${id}?estado=${estado}`);
    }
}
export default new SolicitudService();
