package com.project.football.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "GAME")
@NoArgsConstructor
public class Game {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private String homeTeam;

    @Column
    private String foreignTeam;

    @Column
    private int homeScore;

    @Column
    private int foreignScore;

    @Column(columnDefinition = "boolean")
    private Boolean live;
}
