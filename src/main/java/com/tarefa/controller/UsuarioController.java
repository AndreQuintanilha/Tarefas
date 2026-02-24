package com.tarefa.controller;

import com.tarefa.model.Usuario;
import com.tarefa.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todos os usuários
    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // Buscar usuário por ID
    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    // Atualizar usuário
    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNome(usuarioAtualizado.getNome());
            usuario.setEmail(usuarioAtualizado.getEmail());
            usuario.setUsername(usuarioAtualizado.getUsername());
            usuario.setSenha(usuarioAtualizado.getSenha());
            usuario.setPerfil(usuarioAtualizado.getPerfil());
            return usuarioRepository.save(usuario);
        }).orElse(null);
    }

    // Deletar usuário por ID
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }

    // Deletar todos os usuários
    @DeleteMapping
    public void deletarTodos() {
        usuarioRepository.deleteAll();
    }
}
