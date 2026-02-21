import { useState } from "react";
import "../style/CadastroFuncionarios.css";

export default function CadastroFuncionarios({ setActive }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoFuncionario = {
      nome,
      cpf,
      dataNascimento,
      cargo,
      email,
      status: "Ativo",
    };

    console.log("Funcionário:", novoFuncionario);

    alert("Funcionário cadastrado com sucesso!");

    // limpar formulário
    setNome("");
    setCpf("");
    setDataNascimento("");
    setCargo("");
    setEmail("");

    setActive("Funcionários");
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Funcionário</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Nome Completo:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>

        <label>
          CPF:
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </label>

        <label>
          Data de Nascimento:
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Cargo:
          <select
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option>Analista</option>
            <option>Gerente</option>
            <option>Coordenador</option>
            <option>Estagiário</option>
          </select>
        </label>

        

        <button type="submit">Cadastrar Funcionário</button>
      </form>
    </div>
  );
}


/*
import { useState } from "react";
import "../style/CadastroFuncionarios.css";

export default function CadastroFuncionarios({ setActive }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoFuncionario = {
      nome,
      cpf,
      dataNascimento,
      cargo,
      email,
      status: "Ativo",
    };

    console.log("Funcionário:", novoFuncionario);

    alert("Funcionário cadastrado com sucesso!");

    // limpar formulário
    setNome("");
    setCpf("");
    setDataNascimento("");
    setCargo("");
    setEmail("");

    setActive("Funcionários");
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Funcionário</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Nome Completo:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>

        <label>
          CPF:
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </label>

        <label>
          Data de Nascimento:
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Cargo:
          <select
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option>Analista</option>
            <option>Gerente</option>
            <option>Coordenador</option>
            <option>Estagiário</option>
          </select>
        </label>

        <label>
  Usuário:
  <input
    type="text"
    value={usuario}
    onChange={(e) => setUsuario(e.target.value)}
    required
  />
</label>

<label>
  Senha:
  <input
    type="password"
    value={senha}
    onChange={(e) => setSenha(e.target.value)}
    required
  />
</label>

        <button type="submit">Cadastrar Funcionário</button>
      </form>
    </div>
  );
}
 */