export default function Funcionarios({ setActive }) {
  const abrirCadastro = () => {
    setActive("CadastroFuncionarios");
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
        <h1>Funcionários</h1>

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
          Cadastrar Funcionário
        </button>
      </div>

      <p>Lista de funcionários da empresa.</p>
    </div>
  );
}