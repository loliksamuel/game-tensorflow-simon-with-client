package Tensorflow.controller;


import Tensorflow.model.Game;
import Tensorflow.model.Play;
import Tensorflow.repo.RepoGame;
import Tensorflow.repo.RepoPlay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/plays")
public class ControllerPlays {
    @Autowired
    RepoPlay repoPlay;

    @Autowired
    RepoGame repoGame;






    @GetMapping("")
    public List<Play> plays(){
        return repoPlay.findAll();

    }

    @GetMapping("/{playid}")
    public Play play(@PathVariable("playid")  String id){
        return repoPlay.getOne(id);
    }





    @PutMapping("/{playid}")
    public String updateGame(@PathVariable("playid")  String id){
        String userName ="user";
        Date d = new  Date();
        int score = 0;
        String gameId = "";
        Play play = new Play();
        play.setScore(score);
        play.setUserName(userName);


        repoPlay.save(play);
        return "play with id :"+id+" is saved";
    }


    @PostMapping("random/{size}")
    public String createRandomPlay(@PathVariable(name="size", required = true) int size){


        Game game = repoGame.findAll().stream().filter(e -> e.getSeq().length() == size).findFirst().get();
        Date d = new  Date();
        int score = 0;
        String gameId = "";
        Play play = new Play();
        play.setUserName("");
        play.setScore(score);
        play.setGame(game);


        repoPlay.save(play);
        return  play.getId();
    }



    @PostMapping("{gameId}")
    public String createPlay(@PathVariable(name="gameId", required = false) String id){

        Game game = repoGame.getOne(id);

        Date d = new  Date();
        int score = 0;
        String gameId = "";
        Play play = new Play();
        play.setUserName("sam");
        play.setScore(score);
        play.setGame(game);


        repoPlay.save(play);
        return  play.getId();
    }


}
