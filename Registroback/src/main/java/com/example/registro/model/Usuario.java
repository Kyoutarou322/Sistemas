package com.example.registro.model;

import com.fasterxml.jackson.annotation.JsonProperty; // para JsonProperty
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 150)
  private String nombres;

  @Column(nullable = false, unique = true, length = 50)
  private String usuario;

  @Column(nullable = false)
  private String contrasena;

  @Column(name = "correo_electronico", nullable = false, unique = true, length = 100)
  @JsonProperty("correo_electronico")
  private String correoElectronico;
}
