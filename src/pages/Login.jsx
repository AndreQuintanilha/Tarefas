import { useState } from "react";
import "../style/login.css";
import { login } from "../services/login.api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(username, password); 
      // Exemplo: "Login realizado com sucesso! Perfil: GESTOR"

      if (result.startsWith("Login realizado")) {
        // Extrai o perfil da resposta
        const perfil = result.split("Perfil: ")[1].trim();

        // Passa o usuário com o perfil correto para o App.jsx
        onLogin({ nome: username, role: perfil });
      } else {
        setError("Usuário ou senha inválidos");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Login - Tech Titans System</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      
    </div>
  );
}
