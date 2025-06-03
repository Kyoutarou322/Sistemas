package com.example.registro.service;

import org.springframework.stereotype.Service;
import com.example.registro.model.Usuario;
import com.example.registro.repository.UsuarioRepository;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario registrarUsuario(Usuario usuario) {
        if (usuario.getUsuario() == null || usuario.getContrasena() == null || usuario.getCorreoElectronico() == null || usuario.getNombres() == null) {
            throw new IllegalArgumentException("Todos los campos son obligatorios");
        }

        if (usuarioRepository.existsByUsuario(usuario.getUsuario())) {
            throw new IllegalArgumentException("El nombre de usuario ya está en uso");
        }

        if (usuarioRepository.existsByCorreoElectronico(usuario.getCorreoElectronico())) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado");
        }

        // ❌ No hashees la contraseña
        return usuarioRepository.save(usuario);
    }

    public boolean validarLogin(String usuario, String passwordPlano) {
        Optional<Usuario> optionalUser = usuarioRepository.findByUsuario(usuario);
        if (optionalUser.isEmpty()) {
            return false;
        }
        Usuario user = optionalUser.get();
        // Comparación directa
        return user.getContrasena().equals(passwordPlano);
    }
}
