// src/services/CadastroTarefa.api.js
import axios from "axios";

const API_URL = "http://localhost:8080/tarefas";

// POST - cadastra nova tarefa
export const registerTarefa = async (tarefa) => {
  try {
    const response = await axios.post(API_URL, tarefa);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Erro no servidor";
  }
};
