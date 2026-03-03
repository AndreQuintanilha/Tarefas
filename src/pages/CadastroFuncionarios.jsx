import { useState } from "react";
import "../style/CadastroFuncionarios.css";
import { registerFuncionario } from "../services/CadastroFuncionario.api";

export default function CadastroFuncionarios({ setActive }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoFuncionario = {
      nome,
      email,
      username,
      senha,
      
    };

    try {
      await registerFuncionario(novoFuncionario);
      alert("Funcionário cadastrado com sucesso!");

      
      setNome("");
      setEmail("");
      setUsername("");
      setSenha("");
      setActive("Funcionários");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar funcionário");
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Funcionário</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Nome Completo:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Usuário:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        <button type="submit">Cadastrar Funcionário</button>
      </form>
    </div>
  );
}
