// src/services/funcionario.api.js
import axios from "axios";

const API_URL = "http://localhost:8080/usuarios";

export const getFuncionarios = async () => {
  const response = await axios.get(API_URL);
  return response.data.filter((user) => user.perfil === "FUNCIONARIO");
};

export const createFuncionario = async (funcionario) => {
  const response = await axios.post(API_URL, {
    ...funcionario,
    perfil: "FUNCIONARIO",
  });
  return response.data;
};

export const updateFuncionario = async (id, funcionario) => {
  const response = await axios.put(`${API_URL}/${id}`, funcionario);
  return response.data;
};

export const deleteFuncionario = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
