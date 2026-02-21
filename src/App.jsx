import { useState } from "react";
import { NavbarSimple } from "./components/NavBarSimple";
import Login from "./pages/Login";
import classes from "./App.module.css";

// pages
import Dashboard from "./pages/Dashboard";
import Funcionarios from "./pages/Funcionarios";
import CadastroTarefas from "./pages/CadastroTarefas";
import CadastroFuncionarios from "./pages/CadastroFuncionarios";
import Relatorio from "./pages/Relatorio";
import Tarefas from "./pages/Tarefas";

export default function App() {
  const [user, setUser] = useState(null); // 👈 usuário começa deslogado
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(false);

  // permissões
  const permissions = {
    FUNCIONARIO: ["Dashboard", "Tarefas"],
    GESTOR: [
      "Dashboard",
      "Tarefas",
      "Funcionários",
      "Relatório",
      "CadastroTarefas",
      "CadastroFuncionarios",
    ],
  };

  // 🔐 SE NÃO ESTIVER LOGADO → MOSTRA LOGIN
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const hasAccess = permissions[user.role].includes(active);

  const contentMap = {
  Dashboard: <Dashboard user={user} />,
  Tarefas: <Tarefas user={user} setActive={setActive} />,
  Funcionários: <Funcionarios user={user} setActive={setActive} />,
  Relatório: <Relatorio />,
  CadastroTarefas: <CadastroTarefas setActive={setActive} />,
  CadastroFuncionarios: <CadastroFuncionarios setActive={setActive} />,
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