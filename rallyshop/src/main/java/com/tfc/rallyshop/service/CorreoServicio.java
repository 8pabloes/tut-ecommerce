package com.tfc.rallyshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class CorreoServicio {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarBienvenida(String destino, String nombre) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(destino);
        mensaje.setSubject("🎉 Bienvenido a TUT-RallyShop");
        mensaje.setText("Hola " + nombre + ",\n\n¡Gracias por registrarte en TUT-RallyShop! 🚗🔥\n\nYa puedes iniciar sesión en nuestra web.\n\nUn saludo,\nEl equipo de TUT-RallyShop.");
        mailSender.send(mensaje);
    }
}
