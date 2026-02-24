// src/pages/AlterarTarefas.jsx
import { useEffect, useState } from "react";
import { updateTarefa, getTarefasPorUsuario, getTarefas } from "../services/tarefa.api";

export default function AlterarTarefas({ tarefaId, setActive, usuarioLogado }) {
  const [tarefa, setTarefa] = useState({
    titulo: "",
    descricao: "",
    status: "",
  });

  // Carregar dados da tarefa selecionada
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
    setActive("Tarefas"); // volta para lista
  };

  return (
    <div>
      <h2>Alterar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={tarefa.titulo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={tarefa.descricao}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={tarefa.status}
            onChange={handleChange}
          >
            <option value="ABERTO">ABERTO</option>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDO">Concluídao</option>
          </select>
        </div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => setActive("Tarefas")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
