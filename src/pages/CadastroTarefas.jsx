import { useState } from "react";
import "../style/CadastroTarefas.css";

export default function CadastroTarefas({ setActive }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prazo, setPrazo] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaTarefa = {
      titulo,
      descricao,
      prazo,
      prioridade,
      responsavel,
      status: "Em andamento",
      dataCriacao: new Date().toISOString(),
    };

    console.log("Tarefa:", novaTarefa);

    alert("Tarefa cadastrada com sucesso!");

    // limpar campos
    setTitulo("");
    setDescricao("");
    setPrazo("");
    setPrioridade("");
    setResponsavel("");

    setActive("Tarefas");
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Tarefas</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>

        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>

        <label>
          Responsável:
          <input
            type="text"
            placeholder="Nome do funcionário"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            required
          />
        </label>

        <label>
          Prazo:
          <input
            type="date"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            required
          />
        </label>

        <label>
          Prioridade:
          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>
        </label>

        <button type="submit">Cadastrar Tarefa</button>
      </form>
    </div>
  );
}