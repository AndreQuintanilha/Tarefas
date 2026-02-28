import { useEffect, useState } from "react";
import {
  getTarefas,
  getTarefasPorUsuario,
} from "../services/tarefa.api";
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

export default function Dashboard({ usuarioLogado }) {
  const [tarefas, setTarefas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  // ================= CARREGAR DADOS =================
  useEffect(() => {
    const carregar = async () => {
      try {
        let tarefasData = [];

        if (usuarioLogado.perfil === "GESTOR") {
          tarefasData = await getTarefas();
          const funcionariosData = await getFuncionarios();
          setFuncionarios(funcionariosData);
        } else {
          tarefasData = await getTarefasPorUsuario(
            usuarioLogado.username
          );
        }

        setTarefas(tarefasData);
      } catch (error) {
        console.error("Erro ao carregar Dashboard:", error);
      }
    };

    if (usuarioLogado) carregar();
  }, [usuarioLogado]);

  // ================= AGRUPAR STATUS =================
  const statusCount = tarefas.reduce((acc, t) => {
    const status = t.status?.toUpperCase() || "DESCONHECIDO";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCount).map((status) => ({
    name: status,
    value: statusCount[status],
  }));

  const totalConcluidas =
    statusCount["CONCLUIDO"] ||
    statusCount["CONCLUÍDO"] ||
    0;

  const COLORS = ["#0088FE", "#FFBB28", "#13bd4c", "#ff4444"];

  // ================= % DENTRO DA PIZZA =================
  const renderPercentLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    // evita porcentagem muito pequena
    if (percent < 0.05) return null;

    const RADIAN = Math.PI / 180;

    const radius =
      innerRadius + (outerRadius - innerRadius) * 0.6;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={18}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <div className="container-fluid dashboard-container">

      {/* ===== TITULO ===== */}
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="dashboard-title">Painel de Gestão</h1>
        </div>
      </div>

      {/* ===== CARDS ===== */}
      <div className="row justify-content-center g-4 mb-4">

        <div className="col-12 col-md-8 col-lg-5 col-xl-4">
          <div className="dashboard-card">
            <h2>Total de Tarefas</h2>
            <p>{tarefas.length}</p>
          </div>
        </div>

        {usuarioLogado.perfil === "GESTOR" && (
          <div className="col-12 col-md-8 col-lg-5 col-xl-4">
            <div className="dashboard-card">
              <h2>Total de Funcionários</h2>
              <p>{funcionarios.length}</p>
            </div>
          </div>
        )}

        {usuarioLogado.perfil === "FUNCIONARIO" && (
          <div className="col-12 col-md-8 col-lg-5 col-xl-4">
            <div className="dashboard-card card-success">
              <h2>Total Concluídas</h2>
              <p>{totalConcluidas}</p>
            </div>
          </div>
        )}

      </div>

      {/* ===== GRAFICO ===== */}
      <div className="row justify-content-center">
        <div className="col-12 col-xl-8">

          <div className="chart-container text-center">
            <h2>Status das Tarefas</h2>

            {data.length > 0 ? (
              <div className="chart-box">
                <ResponsiveContainer width="100%" height={450}>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="40%"
                      cy="50%"
                      outerRadius={160}
                      dataKey="value"
                      label={renderPercentLabel}
                      labelLine={false}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />

                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p>Nenhuma tarefa encontrada.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}