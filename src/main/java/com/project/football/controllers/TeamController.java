package com.project.football.controllers;
import com.project.football.model.Team;
import com.project.football.services.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class TeamController {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/team/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAllTeams() {
        try {
            Iterable<Team> teams = appService.getAllTeams();
            return new ResponseEntity<>(teams, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
