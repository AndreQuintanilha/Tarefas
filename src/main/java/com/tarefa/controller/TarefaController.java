package com.tarefa.controller;

import com.tarefa.model.Tarefa;
import com.tarefa.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    // Listar todas as tarefas (gestor usa)
    @GetMapping
    public List<Tarefa> listar() {
        return tarefaService.listarTodas();
    }

    // Listar tarefas de um usuário específico (funcionário usa)
    @GetMapping("/usuario/{username}")
    public List<Tarefa> listarPorUsuario(@PathVariable String username) {
        return tarefaService.listarPorUsuario(username);
    }

    // Buscar tarefa por ID
    @GetMapping("/{id}")
    public Tarefa buscarPorId(@PathVariable Long id) {
        return tarefaService.listarTodas().stream()
                .filter(t -> t.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    // Criar nova tarefa vinculando pelo username do usuário
    @PostMapping
    public Tarefa criar(@RequestBody Tarefa tarefa) {
        return tarefaService.criar(tarefa);
    }

    // Atualizar tarefa com regra de permissão
    @PutMapping("/{id}")
    public Tarefa atualizar(
            @PathVariable Long id,
            @RequestBody Tarefa tarefaAtualizada,
            @RequestParam String username,
            @RequestParam String perfil) {
        return tarefaService.atualizar(id, tarefaAtualizada, username, perfil);
    }

    // Deletar tarefa por ID
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        tarefaService.deletar(id);
    }

    // Deletar todas as tarefas
    @DeleteMapping
    public void deletarTodas() {
        tarefaService.deletarTodas();
    }
}
