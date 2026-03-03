
import axios from "axios";
import CadastroTarefas from "../pages/CadastroTarefas";

const API_URL = "http://localhost:8080/tarefas";


export const getTarefaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};


export const updateTarefa = async (id, tarefa) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    ...tarefa,
    perfil: "FUNCIONARIO", 
  });
  return response.data;
};
