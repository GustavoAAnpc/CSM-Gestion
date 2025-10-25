import axios from "axios";

const API_URL = "http://localhost:5261/api/asociado"; // cambia puerto si es distinto

export async function obtenerAsociado() {
  const response = await axios.get(API_URL);
  return response.data;
}
