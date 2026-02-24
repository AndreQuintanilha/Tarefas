package com.tarefa.model;

//Importa todas as anotações do JPA (Hibernate / Jakarta Persistence)
import jakarta.persistence.*;

//Indica que essa classe é uma ENTIDADE do banco de dados (vira uma tabela)
@Entity
public class Tarefa {

 // Define que este atributo é a chave primária (ID) da tabela
 @Id

 // Define que o valor do ID será gerado automaticamente pelo banco
 // IDENTITY = auto incremento (1, 2, 3, 4...)
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 // Campo que armazenará o título da tarefa
 private String titulo;

 // Campo que armazenará a descrição detalhada da tarefa
 private String descricao;

 // Campo que representa o status da tarefa
 // Exemplo: aberto, andamento, finalizado
 private String status;

 // Define relacionamento MUITOS para UM:
 // várias tarefas podem pertencer a um único usuário
 @ManyToOne
 private Usuario usuario; // usuário responsável pela tarefa

 // =========================
 // GETTERS E SETTERS
 // =========================

 // Retorna o valor do id da tarefa
 public Long getId() {
     return id;
 }

 // Define (altera) o valor do id da tarefa
 public void setId(Long id) {
     this.id = id;
 }

 // Retorna o título da tarefa
 public String getTitulo() {
     return titulo;
 }

 // Define o título da tarefa
 public void setTitulo(String titulo) {
     this.titulo = titulo;
 }

 // Retorna a descrição da tarefa
 public String getDescricao() {
     return descricao;
 }

 // Define a descrição da tarefa
 public void setDescricao(String descricao) {
     this.descricao = descricao;
 }

 // Retorna o status atual da tarefa
 public String getStatus() {
     return status;
 }

 // Define o status da tarefa
 public void setStatus(String status) {
     this.status = status;
 }

 // Retorna o usuário responsável pela tarefa
 public Usuario getUsuario() {
     return usuario;
 }

 // Define qual usuário é responsável pela tarefa
 public void setUsuario(Usuario usuario) {
     this.usuario = usuario;
 }
}
