package Tensorflow.controllerGame;

import Tensorflow.model.Game;
import Tensorflow.model.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import Tensorflow.repo.RepoGame;
import Tensorflow.repo.RepoModel;

@RestController
@RequestMapping("/models")
public class ControllerModels {


    @Autowired
    RepoModel repoModel;

    @GetMapping("")
    public String model(){
        return "Tensorflow/model";
    }


    @PostMapping("")
    public String saveModel(){

        repoModel.save(new Model());
        return "Tensorflow.model is saved";
    }









}
