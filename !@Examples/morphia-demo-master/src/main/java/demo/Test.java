package demo;

import com.mongodb.MongoClient;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;

public class Test {
    public static void main(String[] args) throws Exception {
        Morphia morphia = new Morphia();
        morphia.map(Repository.class).map(Programmer.class);
        
        MongoClient mongoClient = MongoClientHelper.getMongoClient();
        mongoClient.dropDatabase("test");
        
        Datastore ds = morphia.createDatastore(mongoClient, "test");
        ds.ensureIndexes();

        Programmer scott = createScott();
        ds.save(scott);

        Organization mongodb = new Organization();
        mongodb.userName = "mongodb";
        mongodb.name = "mongodb";
        mongodb.since = SimpleDateFormat.getDateInstance().parse("Jan 8, 2009");
        ds.save(mongodb);

        Repository mongoDocs = new Repository(mongodb, "docs");
        ds.save(mongoDocs);

        Repository scottDocs = new Repository(scott, "docs", mongoDocs);
        ds.save(scottDocs);

        Programmer jeff = createJeff();
        ds.save(jeff);

        // increment followers of scott by one
        UpdateOperations<Programmer> incrementFollowing = ds.createUpdateOperations(Programmer.class).inc("followers", 1);
        Query<Programmer> queryForScott = ds.find(Programmer.class, "userName", "scotthernandez");
        ds.update(queryForScott, incrementFollowing);

        System.out.println(queryForScott.get());
    }

    private static Programmer createScott() throws ParseException {
        Programmer scott = new Programmer();
        scott.userName = "scotthernandez";
        scott.name = "Scott Hernandez";
        scott.since = SimpleDateFormat.getDateInstance().parse("Aug 12, 2009");
        scott.active = true;
        scott.followers = 8;
        scott.following = Arrays.asList("moraes", "stickfigure");
        return scott;
    }

    private static Programmer createJeff() throws ParseException {
        Programmer scott = new Programmer();
        scott.userName = "jyemin";
        scott.name = "Jeff Yemin";
        scott.since = SimpleDateFormat.getDateInstance().parse("Oct 7, 2011");
        scott.active = true;
        scott.followers = 4;
        scott.following = Arrays.asList("scotthernandez");
        return scott;
    }
}



