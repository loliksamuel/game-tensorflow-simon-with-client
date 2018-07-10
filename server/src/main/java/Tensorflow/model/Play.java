package Tensorflow.model;


import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Play extends EntityBase{




    @ManyToOne
    @JoinColumn(name="game_id", nullable=false)
    private Game   game;
    private String userName;
    private int     score;

    public Play() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int aScore) {
        score = aScore;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

}
