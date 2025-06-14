package com.example.registro.security;

import com.example.registro.model.Usuario;
import com.example.registro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario registrar(Usuario usuario) throws Exception {
        if (usuarioRepository.findByUsuario(usuario.getUsuario()).isPresent()) {
            throw new Exception("El usuario ya existe");
        }
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> login(String usuario, String contrasena, String correoElectronico) {
        Optional<Usuario> optUsuario = usuarioRepository.findByUsuario(usuario);
        if (optUsuario.isPresent()) {
            Usuario u = optUsuario.get();
            boolean passOk = u.getContrasena().equals(contrasena);
            boolean correoOk = u.getCorreoElectronico().equalsIgnoreCase(correoElectronico);
            if (passOk && correoOk) {
                return Optional.of(u);
            }
        }
        return Optional.empty();
    }
}
