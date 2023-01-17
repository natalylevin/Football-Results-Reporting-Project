package com.project.football.repos;
import com.project.football.model.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Integer> {
    Iterable<Game> findAllByLiveTrue();
    Iterable<Game> findAllByLiveFalse();
}
