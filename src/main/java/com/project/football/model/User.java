package com.project.football.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Entity
@Data
@Table(name = "USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Username field required")
    private String username;

    @Min(value = 4, message = "Password must be at least 4 chars")
    @NotBlank(message = "Password field required")
    private String password;

    @Column(unique = true)
    private String token;
}