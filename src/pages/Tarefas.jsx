export default function Tarefas({ user, setActive }) {

  const abrirCadastro = () => {
    setActive("CadastroTarefas");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Tarefas</h1>

        {user?.role?.toUpperCase() === "GESTOR" && (
  <button onClick={abrirCadastro}>
    Cadastrar Tarefas
  </button>
)}
      </div>

      <p>Lista de Tarefas da empresa.</p>
    </div>
  );
}