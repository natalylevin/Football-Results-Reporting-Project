package com.project.football.repos;
import com.project.football.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
    User findByUsernameAndPw(String username, String password);
}
