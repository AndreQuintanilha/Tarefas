/*import { useTarefasStore } from "../store/useTarefasStore";

export default function Dashboard() {

  // pega tarefas do sistema
  const { tarefas } = useTarefasStore();

  // ===== MÉTRICAS =====
  const concluidas = tarefas.filter(
    t => t.status === "Concluída"
  ).length;

  const emAndamento = tarefas.filter(
    t => t.status === "Em andamento"
  ).length;

  const pausadas = tarefas.filter(
    t => t.status === "Pausada"
  ).length;

  return (
    <div>
      <h1>Painel Dashboard</h1>

      <h3>Resumo Geral</h3>

      <p>✅ Tarefas concluídas: {concluidas}</p>
      <p>🚧 Em andamento: {emAndamento}</p>
      <p>⏸️ Pausadas: {pausadas}</p>
    </div>
  );
}

*/

export default function Dashboard() {
  return (
    <div>
      <h1>Painel Dashboard</h1>
      <p>Visão geral das atividades e métricas do sistema.</p>
    </div>
  );
}