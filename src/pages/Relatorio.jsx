import { useEffect, useState } from "react";
import { getTarefas, getTarefasPorUsuario } from "../services/tarefa.api";
import "../style/Relatorio.css";

export default function Relatorio({ usuarioLogado }) {
  const [tarefas, setTarefas] = useState([]);
  const [filtroId, setFiltroId] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [resultado, setResultado] = useState(null);

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

  const handlePesquisar = () => {
  const normalizar = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

  const filtradas = tarefas.filter((t) => {
    const idMatch = filtroId ? t.id.toString() === filtroId : true;
    const statusMatch = filtroStatus
      ? normalizar(t.status) === normalizar(filtroStatus)
      : true;
    return idMatch && statusMatch;
  });

  const contagem = filtradas.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  setResultado({ filtradas, contagem });
};


  // Mapeamento de status para classes CSS
  const statusClassMap = {
    ABERTO: "status-aberto",
    PENDENTE: "status-pendente",
    EM_ANDAMENTO: "status-em-andamento",
    CONCLUIDO: "status-concluido",
    CONCLUÍDO: "status-concluido", // caso venha com acento
  };

  return (
    <div className="relatorio-container">
      <h1>Relatório de Tarefas</h1>

      <div className="filtros">
        <label>
          Filtrar por ID:
          <input
            type="text"
            value={filtroId}
            onChange={(e) => setFiltroId(e.target.value)}
            placeholder="Digite o ID da tarefa"
          />
        </label>

        <label>
          Filtrar por Status:
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="ABERTO">Aberto</option>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDO">Concluído</option>
          </select>
        </label>

        <button className="btn-pesquisar" onClick={handlePesquisar}>
          Pesquisar
        </button>
      </div>

      {resultado && (
        <>
          <div className="contagem">
            <h2>Contagem de Tarefas</h2>
            {Object.keys(resultado.contagem).length === 0 ? (
              <p>Nenhuma tarefa encontrada</p>
            ) : (
              <ul>
                {Object.entries(resultado.contagem).map(([status, qtd]) => (
                  <li key={status}>
                    {status}: {qtd}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="tarefas-grid">
            {resultado.filtradas.length === 0 ? (
              <p>Nenhuma tarefa encontrada</p>
            ) : (
              resultado.filtradas.map((t) => (
                <div
                  key={t.id}
                  className={`tarefa-card ${statusClassMap[t.status] || ""}`}
                >
                  <h3>{t.titulo}</h3>
                  <p><strong>ID:</strong> {t.id}</p>
                  <p><strong>Descrição:</strong> {t.descricao}</p>
                  <p><strong>Status:</strong> {t.status}</p>
                  <p><strong>Responsável:</strong> {t.usuario?.username}</p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
