
import axios from "axios";

const API_URL = "http://localhost:8080/auth/register";


export const registerFuncionario = async (funcionario) => {
  try {
    const response = await axios.post(API_URL, {
      ...funcionario,
      perfil: "FUNCIONARIO", 
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Erro no servidor";
  }
};
