import { useState } from "react";
import { NavbarSimple } from "./components/NavBarSimple";
import Login from "./pages/Login";
import classes from "./App.module.css";

// pages
import Dashboard from "./pages/Dashboard";
import Funcionarios from "./pages/Funcionarios";
import CadastroTarefas from "./pages/CadastroTarefas";
import CadastroFuncionarios from "./pages/CadastroFuncionarios";
import AlterarFuncionarios from "./pages/AlterarFuncionarios";
import Relatorio from "./pages/Relatorio";
import Tarefas from "./pages/Tarefas";
import AlterarTarefas from "./pages/AlterarTarefas"; // 👈 página de edição de tarefas

export default function App() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(false);
  const [selectedFuncionarioId, setSelectedFuncionarioId] = useState(null);
  const [selectedTarefaId, setSelectedTarefaId] = useState(null);

  // permissões por perfil
  const permissions = {
    FUNCIONARIO: ["Dashboard", "Tarefas"],
    GESTOR: [
      "Dashboard",
      "Tarefas",
      "Funcionários",
      "Relatório",
      "CadastroTarefas",
      "CadastroFuncionarios",
      "AlterarFuncionarios",
      "AlterarTarefas"
    ],
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const hasAccess = permissions[user.role].includes(active);

  const contentMap = {
    Dashboard: <Dashboard user={user} />,
    Tarefas: (
  <Tarefas
    usuarioLogado={{ username: user.username, perfil: user.role }}
    setActive={setActive}
    setSelectedTarefaId={setSelectedTarefaId}
  />
),

    Funcionários: (
      <Funcionarios
        user={user}
        setActive={setActive}
        setSelectedFuncionarioId={setSelectedFuncionarioId}
      />
    ),
    Relatório: <Relatorio />,
    CadastroTarefas: (
      <CadastroTarefas
        setActive={setActive}
        usuarioLogado={{ username: user.username, perfil: user.role }}
      />
    ),
    CadastroFuncionarios: <CadastroFuncionarios setActive={setActive} />,
    AlterarFuncionarios: (
      <AlterarFuncionarios
        setActive={setActive}
        funcionarioId={selectedFuncionarioId}
      />
    ),
    AlterarTarefas: (
      <AlterarTarefas
        setActive={setActive}
        tarefaId={selectedTarefaId}
        usuarioLogado={{ username: user.username, perfil: user.role }}
      />
    ),
  };

  return (
    <div className={classes.layout}>
      <NavbarSimple
        active={active}
        setActive={setActive}
        open={open}
        setOpen={setOpen}
        permissions={permissions[user.role]}
        onLogout={() => setUser(null)}
      />

      <main className={classes.mainContent}>
        {hasAccess ? contentMap[active] : <h2>Acesso negado</h2>}
      </main>

      <button
        className={classes.hamburger}
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>
    </div>
  );
}
