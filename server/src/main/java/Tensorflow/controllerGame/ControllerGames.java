package Tensorflow.controllerGame;


import Tensorflow.model.Game;
import Tensorflow.repo.RepoGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/games")
public class ControllerGames {
    @Autowired
    RepoGame repoGame;








    @GetMapping("")
    public List<Game> games(){
        return repoGame.findAll();

    }

    @GetMapping("/{gameid}")
    public Game game(@PathVariable("gameid")  String id){
        return repoGame.getOne(id);
    }





    @PutMapping("/{gameid}")
    public String updateGame(@PathVariable("gameid")  String id){
        String userName ="user";
        Date d = new  java.util.Date();
        int score = 0;
        String gameId = "";
        Game game = new Game();
        game.setActive(true);



        repoGame.save(game);
        return "game with id :"+id+" is saved";
    }


    @PostMapping("{size}")
    public String createGame(@PathVariable(name="size", required = false) Optional<Integer> size){
        if (size.isPresent() == false)
            size = Optional.of(10);

        Date d = new  java.util.Date();
        int score = 0;
        String gameId = "";
        Game game = new Game();
        game.setActive(true);

        game.setSeq(createNewSeq(size.get()));

        repoGame.save(game);
        return  game.getId();
    }

    public String createNewSeq(int  size){
        final char[] array = { 'P', 'Y', 'G', 'O' };
        StringBuffer s = new StringBuffer();
        Random rand = new Random();
        int[] arr = new int[size];
        for (int  i=0 ; i < size; i++)
        {
            int  n = rand.nextInt(4) ;
            s.append(array[n]);

        }
        return s.toString();
    }



}
