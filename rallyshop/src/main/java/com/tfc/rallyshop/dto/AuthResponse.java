package com.tfc.rallyshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String nombre;
    private Long id;
    private String rol;
}
