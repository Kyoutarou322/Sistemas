package com.example.registro.controller;

import com.example.registro.model.Usuario;
import com.example.registro.security.AuthService; 
import com.example.registro.repository.UsuarioRepository;
import java.util.Optional;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UsuarioRepository usuarioRepository;

  @PostMapping("/register")
public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
    System.out.println("Usuario recibido para registro: " + usuario);
    try {
        Usuario nuevoUsuario = authService.registrar(usuario);
        return ResponseEntity.ok(Collections.singletonMap("mensaje", "Usuario registrado correctamente"));
    } catch (Exception e) {
        String msg = e.getMessage();
        if (msg != null && msg.contains("ya existe")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Collections.singletonMap("mensaje", "Este usuario no está disponible"));
        }
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Collections.singletonMap("mensaje", "Error al registrar usuario"));
    }
}



@PostMapping("/login")
public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
    Optional<Usuario> u = authService.login(usuario.getUsuario(), usuario.getContrasena(), usuario.getCorreoElectronico());
    if (u.isPresent()) {
        return ResponseEntity.ok(u.get());
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("mensaje", "Credenciales inválidas"));
    }
}

}
