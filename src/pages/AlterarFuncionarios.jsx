import { useState, useEffect } from "react";
import "../style/CadastroFuncionarios.css";
import { getFuncionarioById, updateFuncionario } from "../services/AlterarFuncionario.api";

export default function AlterarFuncionarios({ setActive, funcionarioId }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  // Carregar dados do funcionário ao abrir a página
  useEffect(() => {
    const carregarFuncionario = async () => {
      try {
        const f = await getFuncionarioById(funcionarioId);
        setNome(f.nome);
        setEmail(f.email);
        setUsername(f.username);
        setSenha(f.senha || ""); // se o backend não retorna senha, deixa vazio
      } catch (error) {
        console.error("Erro ao carregar funcionário:", error);
      }
    };

    if (funcionarioId) {
      carregarFuncionario();
    }
  }, [funcionarioId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const funcionarioAtualizado = {
      nome,
      email,
      username,
      senha,
      perfil: "FUNCIONARIO", // mantém perfil FUNCIONARIO
    };

    try {
      await updateFuncionario(funcionarioId, funcionarioAtualizado);
      alert("Funcionário alterado com sucesso!");
      setActive("Funcionários");
    } catch (error) {
      console.error(error);
      alert("Erro ao alterar funcionário");
    }
  };

  return (
    <div className="form-container">
      <h2>Alterar Funcionário</h2>

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

        <button type="submit">Alterar Funcionário</button>
      </form>
    </div>
  );
}
