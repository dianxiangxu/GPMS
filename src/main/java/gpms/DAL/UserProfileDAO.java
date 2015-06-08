package gpms.DAL;

import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.List;

import org.bson.types.ObjectId;

import com.google.code.morphia.Datastore;
import com.google.code.morphia.Morphia;
import com.google.code.morphia.query.Query;
import com.google.code.morphia.query.UpdateOperations;
import com.mongodb.MongoException;

public class UserProfileDAO extends UserDAO {
	private static final String DBNAME = "GPMS";
	public static final String COLLECTION_NAME = "userprofile";

	private static Morphia morphia;
	private static Datastore ds;

	private static Morphia getMorphia() throws UnknownHostException,
			MongoException {
		if (morphia == null) {
			morphia = new Morphia().map(UserProfile.class);
		}
		return morphia;
	}

	private static Datastore getDatastore() throws UnknownHostException,
			MongoException {
		if (ds == null) {
			ds = getMorphia().createDatastore(MongoDBConnector.getMongo(), DBNAME);
		}
		return ds;
	}

	/**
	 * saves the user profile in the database
	 * @param userProfile the user profile to save
	 * @throws UnknownHostException
	 */
	public static void saveUserProfile(UserProfile userProfile)
			throws UnknownHostException {
		Morphia morphia = getMorphia();
		Datastore ds = morphia.createDatastore(MongoDBConnector.getMongo(), DBNAME);
		ds.save(userProfile);
	}

	public static List<UserProfile> getAllUserProfiles()
			throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(UserProfile.class).asList();
	}
	
	
	
	/**
	 * Method for changing the first name of a user 
	 * @param userProfile
	 * @param firstName
	 * @throws MongoException 
	 * @throws UnknownHostException 
	 */
	public static void changeFirstName(ObjectId id, String firstName) throws UnknownHostException, MongoException
	{
		ds = getDatastore();
		UpdateOperations<UserProfile> ops;
		Query<UserProfile> updateQuery = ds.createQuery(UserProfile.class).field("_id").equal(id);
		ops = ds.createUpdateOperations(UserProfile.class).set("_firstname", firstName);
		ds.update(updateQuery, ops);
	
	}
	
	
}
