import axios from "axios";

const API_URL = "http://localhost:8080/usuarios";

export const buscarUsuarioPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const atualizarUsuario = async (id, dados) => {
  const response = await axios.put(`${API_URL}/${id}`, dados);
  return response.data;
};