import { useEffect, useState } from "react";
import { getFuncionarios, deleteFuncionario } from "../services/funcionario.api";
import "../style/Funcionarios.css";

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
    <div className="funcionarios-container">
      <div className="funcionarios-header">
        <h1>Funcionários</h1>
        <button onClick={abrirCadastro}>Cadastrar Funcionário</button>
      </div>

      <p>Lista de funcionários da empresa.</p>

      <div className="funcionarios-grid">
        {funcionarios.length === 0 ? (
          <p>Nenhum funcionário encontrado</p>
        ) : (
          funcionarios.map((f) => (
            <div key={f.id} className="funcionario-card">
              <div className="card-info">
                <h3>{f.nome}</h3>
                <p><strong>Email:</strong> {f.email}</p>
                <p><strong>Usuário:</strong> {f.username}</p>
                
              </div>
              <div className="card-actions">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setSelectedFuncionarioId(f.id);
                    setActive("AlterarFuncionarios");
                  }}
                >
                  Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(f.id)}
                >
                  Apagar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
