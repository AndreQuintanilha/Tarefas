import { useEffect, useState } from "react";
import {
  getTarefas,
  getTarefasPorUsuario,
  deleteTarefa,
  updateTarefa,
} from "../services/tarefa.api";
import "../style/Tarefas.css";

export default function Tarefas({
  setActive,
  setSelectedTarefaId,
  usuarioLogado,
}) {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      let data;
      if (usuarioLogado.perfil === "GESTOR") {
        data = await getTarefas();
      } else {
        data = await getTarefasPorUsuario(usuarioLogado.username);
      }
      setTarefas(data);
    };
    carregar();
  }, [usuarioLogado]);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente apagar esta tarefa?")) {
      await deleteTarefa(id);
      if (usuarioLogado.perfil === "GESTOR") {
        setTarefas(await getTarefas());
      } else {
        setTarefas(await getTarefasPorUsuario(usuarioLogado.username));
      }
    }
  };

  const handleStatusChange = async (id, novoStatus) => {
    const tarefa = tarefas.find((t) => t.id === id);
    if (!tarefa) return;

    const tarefaAtualizada = { ...tarefa, status: novoStatus };
    await updateTarefa(
      id,
      tarefaAtualizada,
      usuarioLogado.username,
      usuarioLogado.perfil
    );

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: novoStatus } : t))
    );
  };

  const abrirCadastro = () => {
    setActive("CadastroTarefas");
  };

  // Mapeamento de status para classes CSS
  const statusClassMap = {
    ABERTO: "status-aberto",
    PENDENTE: "status-pendente",
    EM_ANDAMENTO: "status-em-andamento",
    CONCLUIDO: "status-concluido",
    CONCLUÍDO: "status-concluido", 
  };

  return (
    <div className="tarefas-container">
      <div className="tarefas-header">
        <h1>Tarefas</h1>
        {usuarioLogado.perfil === "GESTOR" && (
          <button onClick={abrirCadastro}>Cadastrar Tarefa</button>
        )}
      </div>

      <p>
        Lista de tarefas{" "}
        {usuarioLogado.perfil === "GESTOR"
          ? "da empresa"
          : `do usuário ${usuarioLogado.username}`}
      </p>

      <div className="tarefas-grid">
        {tarefas.length === 0 ? (
          <p>Nenhuma tarefa encontrada</p>
        ) : (
          tarefas.map((t) => (
            <div
              key={t.id}
              className={`tarefa-card ${statusClassMap[t.status] || ""}`}
            >
              <div className="card-info">
                <h3>{t.titulo}</h3>
                <p>
                  <strong>Descrição:</strong> {t.descricao}
                </p>
                <p>
                  <strong>Status:</strong> {t.status}
                </p>
                <p>
                  <strong>Responsável:</strong> {t.usuario?.username}
                </p>
              </div>

              {usuarioLogado.perfil === "GESTOR" && (
                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setSelectedTarefaId(t.id);
                      setActive("AlterarTarefas");
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t.id)}
                  >
                    Apagar
                  </button>
                </div>
              )}

              {usuarioLogado.perfil === "FUNCIONARIO" && (
                <div className="card-actions">
                  <label className="status-label">
                    Alterar Status:
                    <select
                      value={t.status}
                      onChange={(e) =>
                        handleStatusChange(t.id, e.target.value)
                      }
                    >
                      <option value="ABERTO">Aberto</option>
                      <option value="PENDENTE">Pendente</option>
                      <option value="EM_ANDAMENTO">Em andamento</option>
                      <option value="CONCLUIDO">Concluído</option>
                    </select>
                  </label>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
