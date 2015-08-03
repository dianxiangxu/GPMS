package demo;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;

@Entity("repos")
public class Repository {
    @Id
    ObjectId id;
    @Reference
    Member owner;
    String name;
    @Reference(lazy = true) Repository forkedFrom;

    Repository() {}

    public Repository(final Member owner, final String name) {
        this(owner, name, null);
    }

    Repository(final Member owner, final String name, final Repository forkedFrom) {
        this.owner = owner;
        this.name = name;
        this.forkedFrom = forkedFrom;
    }

    @Override
    public String toString() {
        return "Repository{" +
                "id=" + id +
                ", owner=" + owner +
                ", name='" + name + '\'' +
                ", forkedFrom='" + forkedFrom + '\'' +
                '}';
    }
}
