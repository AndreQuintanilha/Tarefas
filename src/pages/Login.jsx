import { useState } from "react";
import "../style/login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // LOGIN SIMULADO
    if (username === "gestor") {
      onLogin({
  username,
  role: username === "gestor" ? "GESTOR" : "FUNCIONARIO",
});
    } else {
      onLogin({ nome: username, role: "FUNCIONARIO" });
    }

    // FUTURO - BACKEND
    /*
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error("Usuário ou senha inválidos");
      const data = await response.json();
      onLogin(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com servidor");
    }
    */
  };

  return (
  <div className="login-container">
    <h2>🔐 Login - Tech Titans System</h2>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className="login-input"
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="login-input"
      />

      <button type="submit" className="login-button">
        Entrar
      </button>
    </form>

    <p className="login-info">
      👉 Digite <b>gestor</b> para acessar como gestor
    </p>

    <p className="login-info">
      👉 Digite <b>funcionario</b> para acessar como funcionário
    </p>
  </div>
);
}