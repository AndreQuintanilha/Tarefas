import { useEffect, useState } from "react";
import {
  buscarUsuarioPorId,
  atualizarUsuario
} from "../services/MeuPerfil.api";
import "../style/MeuPerfil.css";

export default function MeuPerfil({ usuarioLogado }) {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
  const carregarUsuario = async () => {
    try {
      const data = await buscarUsuarioPorId(usuarioLogado.id);
      setUsuario(data);
    } catch (error) {
      console.error(error);
      setErro("Erro ao carregar perfil.");
    }
  };

  if (usuarioLogado?.id) {
    carregarUsuario();
  }
}, [usuarioLogado]);

  const carregarUsuario = async () => {
    try {
      const data = await buscarUsuarioPorId(usuarioLogado.id);
      setUsuario(data);
    } catch (error) {
      console.error(error);
      setErro("Erro ao carregar perfil.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSalvar = async () => {
    try {
      const dadosAtualizados = {
        ...usuario,
        senha: novaSenha ? novaSenha : usuario.senha
      };

      await atualizarUsuario(usuario.id, dadosAtualizados);

      alert("Perfil atualizado com sucesso!");
      setNovaSenha("");
      setEditando(false);
      carregarUsuario();
    } catch (error) {
      console.error(error);
      setErro("Erro ao atualizar perfil.");
    }
  };

  if (erro) return <h2>{erro}</h2>;
  if (!usuario) return <h2>Carregando perfil...</h2>;

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2 className="perfil-title">Meu Perfil</h2>

        {!editando ? (
          <>
            <div className="perfil-info">
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Username:</strong> {usuario.username}</p>
              <p><strong>Perfil:</strong> {usuario.perfil}</p>
            </div>

            <button
              className="btn-primary"
              onClick={() => setEditando(true)}
            >
              Editar Perfil
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>Nome</label>
              <input
                name="nome"
                value={usuario.nome || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={usuario.email || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                value={usuario.username || ""}
                onChange={handleChange}
              />
            </div>

            
            {/* NOVA SENHA */}
            <div className="form-group">
              <label>Nova Senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Digite a nova senha"
              />
            </div>

            <div className="btn-group">
              <button className="btn-primary" onClick={handleSalvar}>
                Salvar
              </button>

              <button
                className="btn-danger"
                onClick={() => {
                  setEditando(false);
                  setNovaSenha("");
                }}
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}