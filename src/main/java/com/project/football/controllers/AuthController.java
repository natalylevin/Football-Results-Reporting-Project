package com.project.football.controllers;
import com.project.football.exception.BadRequestException;
import com.project.football.model.User;
import com.project.football.services.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class AuthController {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/user/auth", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody User user) {
        User authUser = appService.auth(user.getUsername(), user.getPassword());
        if (authUser != null) {
            return ResponseEntity.ok(authUser);
        } else {
            throw new BadRequestException("Username or password are incorrect");
        }
    }
}
