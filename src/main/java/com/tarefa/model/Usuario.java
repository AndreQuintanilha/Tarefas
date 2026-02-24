package com.tarefa.model;

//Importa a anotação que transforma a classe em uma entidade do banco
import jakarta.persistence.Entity;

//Importa anotação para geração automática de valores
import jakarta.persistence.GeneratedValue;

//Importa os tipos de estratégia de geração do ID
import jakarta.persistence.GenerationType;

//Importa anotação que define chave primária
import jakarta.persistence.Id;

//Indica que essa classe representa uma tabela no banco de dados
@Entity
public class Usuario {

 // Define este campo como chave primária da tabela
 @Id

 // Define que o banco gera automaticamente o ID (auto incremento)
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 // Campo que armazena o nome completo do usuário
 private String nome;

 // Campo que armazena o email do usuário
 private String email;

 // Nome de usuário usado para realizar login no sistema
 private String username;

 // Senha do usuário para autenticação
 // (em sistemas reais deve ser criptografada)
 private String senha;

 // Define o tipo de usuário no sistema
 // Exemplo: "GESTOR" ou "FUNCIONARIO"
 private String perfil;

 
 // GETTERS E SETTERS
 

 // Retorna o ID do usuário
 public Long getId() {
     return id;
 }

 // Define o ID do usuário
 public void setId(Long id) {
     this.id = id;
 }

 // Retorna o nome do usuário
 public String getNome() {
     return nome;
 }

 // Define o nome do usuário
 public void setNome(String nome) {
     this.nome = nome;
 }

 // Retorna o email do usuário
 public String getEmail() {
     return email;
 }

 // Define o email do usuário
 public void setEmail(String email) {
     this.email = email;
 }

 // Retorna o username (login)
 public String getUsername() {
     return username;
 }

 // Define o username do usuário
 public void setUsername(String username) {
     this.username = username;
 }

 // Retorna a senha do usuário
 public String getSenha() {
     return senha;
 }

 // Define a senha do usuário
 public void setSenha(String senha) {
     this.senha = senha;
 }

 // Retorna o perfil do usuário (cargo/permissão)
 public String getPerfil() {
     return perfil;
 }

 // Define o perfil do usuário
 public void setPerfil(String perfil) {
     this.perfil = perfil;
 }
}
