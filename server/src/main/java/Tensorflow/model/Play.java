package Tensorflow.model;


import javax.persistence.Entity;

@Entity
public class Play extends EntityBase{




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



}
