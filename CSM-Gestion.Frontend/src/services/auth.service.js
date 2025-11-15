import httpClient from "./http.service";

class AuthService {
    login(data) {
        return httpClient.post("/auth", {
            usuario: data.usuario,
            password: data.password
        });
    }
}
export default new AuthService();
