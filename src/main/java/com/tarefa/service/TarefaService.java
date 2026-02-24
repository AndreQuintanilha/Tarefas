package com.tarefa.service;

import com.tarefa.model.Tarefa;
import com.tarefa.model.Usuario;
import com.tarefa.repository.TarefaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService {

    // Repository continua igual
    @Autowired
    private TarefaRepository tarefaRepository;

    // AGORA usamos o UsuarioService
    // (antes era UsuarioRepository direto)
    @Autowired
    private UsuarioService usuarioService;

    
    // LISTAR TODAS

    public List<Tarefa> listarTodas() {
        return tarefaRepository.findAll();
    }


    // LISTAR POR USUÁRIO

    public List<Tarefa> listarPorUsuario(String username) {
        return tarefaRepository.findByUsuarioUsername(username);
    }

    
    // CRIAR TAREFA
    
    public Tarefa criar(Tarefa tarefa) {

        // Verifica se veio usuário na requisição
        if (tarefa.getUsuario() != null &&
            tarefa.getUsuario().getUsername() != null) {

            // Agora busca através do UsuarioService
            // (mesma lógica, só mudou o lugar)
            Usuario usuario =
                    usuarioService.buscarPorUsername(
                            tarefa.getUsuario().getUsername()
                    );

            // Regra continua exatamente igual
            if (usuario != null &&
                "FUNCIONARIO".equalsIgnoreCase(usuario.getPerfil())) {

                tarefa.setUsuario(usuario);

            } else {
                throw new RuntimeException(
                        "Somente usuários com perfil FUNCIONARIO podem receber tarefas."
                );
            }
        }

        // Salva normalmente
        return tarefaRepository.save(tarefa);
    }

   
    // ATUALIZAR

    public Tarefa atualizar(Long id,
                            Tarefa tarefaAtualizada,
                            String username,
                            String perfil) {

        return tarefaRepository.findById(id).map(tarefa -> {

            // Gestor pode editar tudo
            if ("GESTOR".equalsIgnoreCase(perfil)) {
                tarefa.setTitulo(tarefaAtualizada.getTitulo());
                tarefa.setDescricao(tarefaAtualizada.getDescricao());

            // Funcionário só edita a própria tarefa
            } else if ("FUNCIONARIO".equalsIgnoreCase(perfil)
                    && tarefa.getUsuario() != null
                    && tarefa.getUsuario().getUsername().equals(username)) {

                tarefa.setTitulo(tarefaAtualizada.getTitulo());
                tarefa.setDescricao(tarefaAtualizada.getDescricao());
                tarefa.setStatus(tarefaAtualizada.getStatus());
            }

            return tarefaRepository.save(tarefa);

        }).orElse(null);
    }

    
    // DELETAR

    public void deletar(Long id) {
        tarefaRepository.deleteById(id);
    }

    
    // DELETAR TODAS
    
    public void deletarTodas() {
        tarefaRepository.deleteAll();
    }
}