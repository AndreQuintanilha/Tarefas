import { useState } from "react";
import { registerTarefa } from "../services/CadastroTarefa.api"; // 👈 importa serviço
import "../style/CadastroTarefas.css";

export default function CadastroTarefas({ setActive, usuarioLogado }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("aberto");
  const [responsavel, setResponsavel] = useState(usuarioLogado.username); // 👈 já pega do login

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaTarefa = {
      titulo,
      descricao,
      status,
      usuario: { username: responsavel }, // 👈 formato correto
    };

    try {
      await registerTarefa(novaTarefa);
      alert("Tarefa cadastrada com sucesso!");

      // limpar campos
      setTitulo("");
      setDescricao("");
      setStatus("aberto");

      setActive("Tarefas"); // volta para lista
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error);
      alert("Erro ao cadastrar tarefa");
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Tarefas</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>

        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>

        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="ABERTO">Aberto</option>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDo">Concluído</option>
          </select>
        </label>

        <label>
          Responsável (usuario):
          <input
            type="text"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            required
          />
        </label>

        <button type="submit">Cadastrar Tarefa</button>
      </form>
    </div>
  );
}
