package Tensorflow.repo;


import Tensorflow.model.Game;
import Tensorflow.model.Play;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Repository
public interface RepoPlay extends JpaRepository<Play, String> {
}
