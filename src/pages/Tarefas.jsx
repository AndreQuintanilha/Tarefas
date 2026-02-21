export default function Tarefas({ setActive }) {
  const abrirCadastro = () => {
    setActive("CadastroTarefas");
  };

  return (
    <div>
      {/* Linha do título + botão */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Tarefas</h1>

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
      </div>

      <p>Lista de Tarefas da empresa.</p>
    </div>
  );
}