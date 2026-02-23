// src/services/login.api.js
import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = async (username, senha) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      senha, //  backend espera "senha"
    });
    return response.data; // backend retorna String
  } catch (error) {
    throw error.response ? error.response.data : "Erro no servidor";
  }
};

export const register = async (usuario) => {
  try {
    const response = await axios.post(`${API_URL}/register`, usuario);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Erro no servidor";
  }
};
