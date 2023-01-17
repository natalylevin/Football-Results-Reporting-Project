package com.project.football;

import com.project.football.services.AppService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class FootballApplication {

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(FootballApplication.class, args);
        AppService appService = ctx.getBean(AppService.class);
        appService.init();
    }

}
