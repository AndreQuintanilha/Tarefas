// src/pages/AlterarTarefas.jsx
import { useEffect, useState } from "react";
import { updateTarefa, getTarefasPorUsuario, getTarefas } from "../services/tarefa.api";
import "../style/AlterarTarefas.css";

export default function AlterarTarefas({ tarefaId, setActive, usuarioLogado }) {
  const [tarefa, setTarefa] = useState({
    titulo: "",
    descricao: "",
    status: "",
  });

  useEffect(() => {
    const carregarTarefa = async () => {
      let data;
      if (usuarioLogado.perfil === "GESTOR") {
        data = await getTarefas();
      } else {
        data = await getTarefasPorUsuario(usuarioLogado.username);
      }
      const encontrada = data.find((t) => t.id === tarefaId);
      if (encontrada) {
        setTarefa({
          titulo: encontrada.titulo,
          descricao: encontrada.descricao,
          status: encontrada.status,
        });
      }
    };
    carregarTarefa();
  }, [tarefaId, usuarioLogado]);

  const handleChange = (e) => {
    setTarefa({ ...tarefa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTarefa(tarefaId, tarefa, usuarioLogado.username, usuarioLogado.perfil);
    alert("Tarefa atualizada com sucesso!");
    setActive("Tarefas");
  };

  return (
    <div className="alterar-container">
      <h2>Alterar Tarefa</h2>
      <form onSubmit={handleSubmit} className="alterar-form">
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={tarefa.titulo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descrição:
          <textarea
            name="descricao"
            value={tarefa.descricao}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={tarefa.status}
            onChange={handleChange}
            required
          >
            <option value="ABERTO">Aberto</option>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDO">Concluido</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setActive("Tarefas")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
