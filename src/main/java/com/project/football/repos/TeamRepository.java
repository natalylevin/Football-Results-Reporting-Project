package com.project.football.repos;
import com.project.football.model.Game;
import com.project.football.model.Team;
import com.project.football.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Integer> {

}
