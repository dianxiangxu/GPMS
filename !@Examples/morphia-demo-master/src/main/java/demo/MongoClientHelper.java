package demo;

import java.net.UnknownHostException;
import java.util.ResourceBundle;

import com.mongodb.MongoClient;

public class MongoClientHelper {

    private static MongoClient mongoSingleton = null;

    public static synchronized MongoClient getMongoClient()
            throws UnknownHostException {

        /**
         * Double-Checked Locking idiom
         * http://en.wikipedia.org/wiki/Double-checked_locking
         */
        if (mongoSingleton == null) {

            synchronized (MongoClientHelper.class) {
                if (mongoSingleton == null) {

                    ResourceBundle bundle = ResourceBundle.getBundle("mongodb");
                    String host = bundle.getString("host");

                    int port = Integer.parseInt(bundle.getString("port"));

                    mongoSingleton = new MongoClient(host, port);

                }
            }
        }

        return mongoSingleton;
    }

}
