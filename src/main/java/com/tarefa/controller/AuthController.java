package com.tarefa.controller;



import com.tarefa.model.Usuario;
import com.tarefa.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Endpoint de login
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {

        Optional<Usuario> user = usuarioRepository.findByUsername(usuario.getUsername());

        if (user.isPresent() && user.get().getSenha().equals(usuario.getSenha())) {

            // opcional: evitar devolver a senha
            user.get().setSenha(null);

            return user.get();

        } else {
            throw new RuntimeException("Usuário ou senha inválidos!");
        }
    }

    // Endpoint para cadastrar usuário
    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}

