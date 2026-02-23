import { useEffect, useState } from "react";
import { getFuncionarios, deleteFuncionario } from "../services/funcionario.api";

export default function Funcionarios({ setActive, setSelectedFuncionarioId }) {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const data = await getFuncionarios();
      setFuncionarios(data);
    };
    carregar();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente apagar este funcionário?")) {
      await deleteFuncionario(id);
      const data = await getFuncionarios();
      setFuncionarios(data);
    }
  };

  const abrirCadastro = () => {
    setActive("CadastroFuncionarios");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
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

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((f) => (
            <tr key={f.id}>
              <td>{f.nome}</td>
              <td>{f.email}</td>
              <td>{f.username}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedFuncionarioId(f.id); // guarda ID
                    setActive("AlterarFuncionarios"); // abre página de alteração
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(f.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
