package com.project.football.services;


import com.project.football.dto.StatsDto;
import com.project.football.model.Game;
import com.project.football.model.Team;
import com.project.football.model.User;
import com.project.football.repos.GameRepository;
import com.project.football.repos.TeamRepository;
import com.project.football.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AppService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private GameRepository gameRepository;

    public void init() {

        if (userRepository.count() == 0) {
            User user = new User();
            user.setUsername("admin");
            user.setPassword("1234");
            userRepository.save(user);
        }

        if (teamRepository.count() == 0) {
            String[] teamNames = {
                    "LiverPoll",
                    "Barcelona",
                    "Manchester-United",
                    "Japan",
                    "Spain",
                    "Argentina",
                    "Sevilla FC",
                    "France",
                    "Chelsea",
                    "Manchester City",
                    "Juventus",
                    "Roma",
            };

            List<Team> teams = new ArrayList<>(12);
            Arrays.stream(teamNames).forEach(name -> teams.add(new Team(null, name)));
            teamRepository.saveAll(teams);
        }

        Game g1 = new Game();
        g1.setHomeTeam("Japan");
        g1.setHomeScore(1);
        g1.setForeignTeam("Roma");
        g1.setForeignScore(2);
        g1.setLive(false);

        Game g2 = new Game();
        g2.setLive(true);
        g2.setHomeTeam("France");
        g2.setHomeScore(2);
        g2.setForeignTeam("Spain");
        g2.setForeignScore(5);

        Game g3 = new Game();
        g3.setLive(true);
        g3.setHomeTeam("LiverPoll");
        g3.setHomeScore(2);
        g3.setForeignTeam("Argentina");
        g3.setForeignScore(5);

        List<Game> games = new ArrayList<>();
        games.add(g1);
        games.add(g2);
        games.add(g3);

        gameRepository.saveAll(games);
    }

    public User auth(String username, String password) {
        User user = userRepository.findByUsernameAndPw(username, password);
        if (user == null) return null;
        user.setToken(UUID.randomUUID().toString());
        userRepository.save(user);
        return user;
    }

    public Iterable<Game> getLiveGames() {
        return gameRepository.findAllByLiveTrue();
    }

    public Iterable<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Iterable<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Collection<StatsDto> getLeagueTable(boolean includeLive) {
        Iterable<Team> teams = teamRepository.findAll();
        Map<String, StatsDto> teamStats = new HashMap<>();

        Iterable<Game> games = null;

        if (includeLive) {
            games = gameRepository.findAll();
        } else {
            games = gameRepository.findAllByLiveFalse();
        }

        teams.forEach((team) -> {
            StatsDto stats = new StatsDto(team.getName());
            teamStats.put(team.getName(), stats);
        });

        games.forEach((game) -> {
            StatsDto homeStats = teamStats.get(game.getHomeTeam());
            StatsDto foreignStats = teamStats.get(game.getForeignTeam());

            homeStats.gamesPlayed++;
            foreignStats.gamesPlayed++;

            homeStats.goalsFor += game.getHomeScore();
            foreignStats.goalsFor += game.getHomeScore();

            homeStats.goalsAgainst += game.getForeignScore();
            foreignStats.goalsAgainst += game.getHomeScore();

            homeStats.goalsDiff += game.getHomeScore() - game.getForeignScore();
            foreignStats.goalsDiff += game.getForeignScore() - game.getHomeScore();

            if (game.getHomeScore() > game.getForeignScore()) {
                homeStats.wins++;
                foreignStats.losses++;
                homeStats.points += 3;
            }

            if (game.getForeignScore() > game.getHomeScore()) {
                foreignStats.wins++;
                homeStats.losses++;
                foreignStats.points += 3;
            }

            if (game.getForeignScore() == game.getHomeScore()) {
                homeStats.draws++;
                foreignStats.draws++;
                homeStats.points++;
                homeStats.points++;
            }
        });

        return teamStats.values();
    }

    public Game editGame(Game game) {
        return gameRepository.findById(game.getId())
                .map(original -> {
                    original.setHomeScore(game.getHomeScore());
                    original.setForeignScore(game.getForeignScore());
                    original.setHomeTeam(game.getHomeTeam());
                    original.setForeignTeam(game.getForeignTeam());
                    original.setLive(game.getLive());
                    return gameRepository.save(original);
                })
                .orElseThrow(() -> new RuntimeException("Unable to find a game with id " + game.getId()));
    }

    public Game addGame(Game game) {
        return gameRepository.save(game);
    }
}
