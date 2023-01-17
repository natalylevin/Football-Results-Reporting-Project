package com.project.football.controllers;


import com.project.football.dto.StatsDto;
import com.project.football.model.Game;
import com.project.football.services.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("api")
public class GameController {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/game/lives", method = RequestMethod.GET)
    public ResponseEntity<?> getLiveGames() {
        try {
            Iterable<Game> liveGames = appService.getLiveGames();
            return new ResponseEntity<>(liveGames, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/game/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAllGames() {
        try {
            Iterable<Game> liveGames = appService.getAllGames();
            return new ResponseEntity<>(liveGames, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/game", method = RequestMethod.PUT)
    public ResponseEntity<?> editGame(@RequestBody Game game) {

        try {
            Game modified = appService.editGame(game);
            return new ResponseEntity<>(modified, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/game", method = RequestMethod.POST)
    public ResponseEntity<?> addGame(@RequestBody Game game) {

        try {
            Game modified = appService.addGame(game);
            return new ResponseEntity<>(modified, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/game/leagueTable", method = RequestMethod.GET)
    public ResponseEntity<?> getLeagueTable(@RequestParam(required = false) String includeLive) {
        boolean _includeLive = includeLive != null;
        try {
            Collection<StatsDto> leagueTable = appService.getLeagueTable(_includeLive);
            return new ResponseEntity<>(leagueTable, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
