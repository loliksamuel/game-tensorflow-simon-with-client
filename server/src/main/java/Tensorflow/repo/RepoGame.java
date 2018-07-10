package Tensorflow.repo;


import Tensorflow.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Repository
public interface RepoGame extends JpaRepository<Game, String> {
}
