// src/services/tarefa.api.js
import axios from "axios";
const API_URL = "http://localhost:8080/tarefas";

export const getTarefas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTarefasPorUsuario = async (username) => {
  const response = await axios.get(`${API_URL}/usuario/${username}`);
  return response.data;
};


export const createTarefa = async (tarefa) => {
  const response = await axios.post(API_URL, tarefa);
  return response.data;
};

export const updateTarefa = async (id, tarefa, username, perfil) => {
  const response = await axios.put(
    `${API_URL}/${id}?username=${username}&perfil=${perfil}`,
    tarefa
  );
  return response.data;
};

export const deleteTarefa = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
