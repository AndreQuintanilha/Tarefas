import { useState } from "react";
import "../style/login.css";
import { login } from "../services/login.api";
import { Loader, Center } from "@mantine/core";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // apenas para simular delay visual
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result = await login(username, password);

      // 🔥 Agora o backend já retorna o usuário completo
      onLogin({
        id: result.id,
        username: result.username,
        role: result.perfil
      });

    } catch (err) {
      console.error(err);
      setError("Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: "100vh", flexDirection: "column" }}>
        <Loader size="lg" />
        <p>Entrando no sistema...</p>
      </Center>
    );
  }

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