package Tensorflow.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Proxy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Id;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.time.Instant;
import java.util.UUID;

@MappedSuperclass
@Proxy(lazy = false)
public abstract class EntityBase {
    @Id
    @Column(name = "id")
    private String id = UUID.randomUUID().toString();

    private String name;

    @CreatedDate
    private Instant dateStart = Instant.now();



    @JsonIgnore
    @CreatedBy
    private String createdBy;

    @JsonIgnore
    @LastModifiedBy
    private String lastModifiedBy;

    public EntityBase() {

    }

    public EntityBase(String name) {
        this.setName(name);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getDateStart() {
        return dateStart;
    }

    public void setDateStart(Instant dateStart) {
        this.dateStart = dateStart;
    }



    public void validate() {
        return;
    }

    /**
     * Determines the equality of two DtoBase objects. If the
     * supplied object is null, returns false. If both objects are of the same
     * class, and their <code>id</code> values are populated and equal, return
     * <code>true</code>. Otherwise, return <code>false</code>.
     *
     * @param that An Object
     * @return A boolean
     * @see java.lang.Object#equals(java.lang.Object)
     */
    public boolean equals(Object that) {
        if (that == null) {
            return false;
        }
        if (this.getClass().equals(that.getClass())) {
            EntityBase thatTE = (EntityBase) that;
            if (this.getId() == null || thatTE.getId() == null) {
                return false;
            }
            if (this.getId().equals(thatTE.getId())) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns the hash value of this object.
     *
     * @return An int
     * @see java.lang.Object#hashCode()
     */
    public int hashCode() {
        if (getId() == null) {
            return -1;
        }
        return getId().hashCode();
    }


    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    @Override
    public String toString() {
        return getClass().getName() + ": " + getName();
    }


}
