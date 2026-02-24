import { useEffect, useState } from "react";
import { getTarefas, getTarefasPorUsuario, deleteTarefa, updateTarefa } from "../services/tarefa.api";

export default function Tarefas({ setActive, setSelectedTarefaId, usuarioLogado }) {
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

      // recarrega lista após deletar
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

    await updateTarefa(id, tarefaAtualizada, usuarioLogado.username, usuarioLogado.perfil);

    // Atualiza lista local
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: novoStatus } : t))
    );
  };

  const abrirCadastro = () => {
    setActive("CadastroTarefas");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1>Tarefas</h1>
        {usuarioLogado.perfil === "GESTOR" && (
          <button
            onClick={abrirCadastro}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cadastrar Tarefas
          </button>
        )}
      </div>

      <p>
        Lista de tarefas{" "}
        {usuarioLogado.perfil === "GESTOR" ? "da empresa" : `do usuário ${usuarioLogado.username}`}
      </p>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Responsável</th>
            {usuarioLogado.perfil === "GESTOR" && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {tarefas.length === 0 ? (
            <tr>
              <td colSpan={usuarioLogado.perfil === "GESTOR" ? "5" : "4"}>
                Nenhuma tarefa encontrada
              </td>
            </tr>
          ) : (
            tarefas.map((tarefa) => (
              <tr key={tarefa.id}>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>
                  {usuarioLogado.perfil === "FUNCIONARIO" ? (
                    <select
                      value={tarefa.status}
                      onChange={(e) => handleStatusChange(tarefa.id, e.target.value)}
                    >
                      <option value="ABERTO">Aberto</option>
                      <option value="PENDENTE">Pendente</option>
                      <option value="EM_ANDAMENTO">Em andamento</option>
                      <option value="CONCLUIDO">Concluído</option>
                    </select>
                  ) : (
                    tarefa.status
                  )}
                </td>
                <td>{tarefa.usuario?.username}</td>
                {usuarioLogado.perfil === "GESTOR" && (
                  <td>
                    <button
                      onClick={() => {
                        setSelectedTarefaId(tarefa.id);
                        setActive("AlterarTarefas");
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(tarefa.id)}
                      style={{ marginLeft: "10px", color: "red" }}
                    >
                      Apagar
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
