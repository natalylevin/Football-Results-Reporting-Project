package com.project.football.dto;

public class StatsDto {
    public String teamName;
    public int wins;
    public int losses;
    public int gamesPlayed;
    public int draws;
    public int goalsFor;
    public int goalsAgainst;
    public int goalsDiff;
    public int points;

    public StatsDto(String teamName) {
        this.teamName = teamName;
    }
}
