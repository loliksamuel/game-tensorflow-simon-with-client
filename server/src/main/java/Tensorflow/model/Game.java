package Tensorflow.model;


import javax.persistence.Entity;

@Entity
public class Game extends EntityBase{




    private boolean isActive;
    private String  seq;

    public Game() {
    }





    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getSeq() {
        return seq;
    }

    public void setSeq(String aSeq) {
        seq = aSeq;
    }
}
