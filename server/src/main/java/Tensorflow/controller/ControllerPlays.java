package Tensorflow.controller;


import Tensorflow.model.Play;
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


    @PostMapping("{size}")
    public String createPlay(@PathVariable(name="size", required = false) Optional<Integer> size){
        if (size.isPresent() == false)
            size = Optional.of(10);

        Date d = new  Date();
        int score = 0;
        String gameId = "";
        Play play = new Play();
        play.setUserName("");
        play.setScore(score);



        repoPlay.save(play);
        return  play.getId();
    }





}
