package Tensorflow.model;


import javax.persistence.Entity;

@Entity
public class Model extends EntityBase{


    private String modelName;


    public Model() {
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }


}
