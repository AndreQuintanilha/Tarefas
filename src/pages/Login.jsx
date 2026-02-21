import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ==============================
  // FUNÇÃO DE LOGIN
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* =====================================================
       ✅ LOGIN SIMULADO (USADO AGORA - SEM BACKEND)
       ===================================================== */

    // Se digitar "gestor" entra como gestor
    if (username === "gestor") {
      onLogin({
        nome: "Gestor do Sistema",
        role: "GESTOR",
      });
    } else {
      // qualquer outro usuário vira funcionário
      onLogin({
        nome: username,
        role: "FUNCIONARIO",
      });
    }

    
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "120px auto",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2>🔐 Login - Tech Titan System</h2>

      <form onSubmit={handleSubmit}>
        {/* USUÁRIO */}
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginTop: "20px" }}
        />

        {/* SENHA */}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Entrar
        </button>
      </form>

      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        👉 Digite <b>gestor</b> para acessar como gestor
      </p>

      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        👉 Digite <b>funcionario</b> para acessar como funcionário
      </p>
   
   </div>
  );
}

/* import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =====================================================
    // LOGIN REAL COM BACKEND (Spring Boot)
    // =====================================================
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        alert("Usuário ou senha inválidos");
        return;
      }

      const data = await response.json();

      // Backend deve retornar algo assim:
      // {
      //   nome: "Andre",
      //   role: "GESTOR", // ou "FUNCIONARIO"
      //   token: "JWT_TOKEN"
      // }

      // Salva usuário logado no App.jsx
      onLogin(data);
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Erro ao conectar com servidor");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "120px auto",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2>🔐 Login - Tech Titan System</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginTop: "20px" }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
} */