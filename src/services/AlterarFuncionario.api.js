// src/services/AlterarFuncionario.api.js
import axios from "axios";

const API_URL = "http://localhost:8080/usuarios";

// GET - busca funcionário por ID
export const getFuncionarioById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// PUT - atualiza funcionário
export const updateFuncionario = async (id, funcionario) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    ...funcionario,
    perfil: "FUNCIONARIO", // força perfil FUNCIONARIO
  });
  return response.data;
};
