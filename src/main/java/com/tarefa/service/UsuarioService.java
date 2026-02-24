package com.tarefa.service;

//Importa a entidade Usuario
import com.tarefa.model.Usuario;

//Importa o repository de usuário
import com.tarefa.repository.UsuarioRepository;

//Permite injeção automática de dependência
import org.springframework.beans.factory.annotation.Autowired;

//Marca como serviço gerenciado pelo Spring
import org.springframework.stereotype.Service;

//Classe responsável SOMENTE por regras relacionadas ao usuário
@Service
public class UsuarioService {

 // Injeta o repository de usuário
 @Autowired
 private UsuarioRepository usuarioRepository;

 // Busca usuário pelo username
 // Mantém exatamente a mesma lógica que já existia no TarefaService
 public Usuario buscarPorUsername(String username) {

     // Busca no banco e retorna null caso não encontre
     return usuarioRepository
             .findByUsername(username)
             .orElse(null);
 }
}
