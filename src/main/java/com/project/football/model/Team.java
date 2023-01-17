package com.project.football.model;


import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;


@Entity
@Table(
        name = "TEAM", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"name"})
})
@Data
@AllArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;

    public Team() {
    }

    ;
    @Column
    private String name;
}
