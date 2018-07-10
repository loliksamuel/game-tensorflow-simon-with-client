package Tensorflow.repo;

import Tensorflow.model.Game;
import Tensorflow.model.Model;
import org.springframework.data.jpa.repository.JpaRepository;


@org.springframework.stereotype.Repository
public interface RepoModel extends JpaRepository<Model, String> {
}
