// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { getTarefas } from "../services/tarefa.api";
import { getFuncionarios } from "../services/funcionario.api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../style/Dashboard.css";

export default function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const tarefasData = await getTarefas();
        const funcionariosData = await getFuncionarios();
        setTarefas(tarefasData);
        setFuncionarios(funcionariosData);
      } catch (error) {
        console.error("Erro ao carregar dados do Dashboard:", error);
      }
    };
    carregar();
  }, []);

  // Agrupar tarefas por status
  const statusCount = tarefas.reduce((acc, t) => {
    const status = t.status?.toUpperCase() || "DESCONHECIDO";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCount).map((status) => ({
    name: status,
    value: statusCount[status],
  }));

  const COLORS = ["#0088FE", "#FFBB28", "#13bd4c", "#020202"];

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Cards de totais */}
      <div className="cards-container">
        <div className="card">
          <h2>Total de Tarefas</h2>
          <p>{tarefas.length}</p>
        </div>
        <div className="card">
          <h2>Total de Funcionários</h2>
          <p>{funcionarios.length}</p>
        </div>
      </div>

      {/* Gráfico de pizza */}
      <div className="chart-container">
        <h2>Status das Tarefas</h2>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="40%"   // desloca o gráfico para a esquerda
                cy="50%"
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              {/* Legenda ao lado direito */}
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>Nenhuma tarefa encontrada para exibir no gráfico.</p>
        )}
      </div>
    </div>
  );
}
