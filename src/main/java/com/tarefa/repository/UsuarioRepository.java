package com.tarefa.repository;

//Importa o JpaRepository do Spring Data JPA,
//que já possui vários métodos prontos para CRUD
import org.springframework.data.jpa.repository.JpaRepository;

//Importa a entidade Usuario (tabela usuario do banco)
import com.tarefa.model.Usuario;

//Importa Optional, usado quando o resultado pode existir ou não
import java.util.Optional;

//Cria a interface UsuarioRepository
//Ela herda funcionalidades prontas do JpaRepository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

 // Método de busca automática criado pelo Spring Data JPA
 // Procura um usuário pelo username (login)
 // Retorna Optional porque pode encontrar ou não o usuário
 Optional<Usuario> findByUsername(String username);
}
