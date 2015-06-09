package gpms.dao;

import gpms.DAL.MongoDBConnector;
import gpms.model.User;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class UserProfileDAO extends BasicDAO<UserProfile, String> {
	private static final String DBNAME = "GPMS";
	public static final String COLLECTION_NAME = "userprofile";

	private static Morphia morphia;
	private static Datastore ds;

	public UserProfileDAO(MongoClient mongo, Morphia morphia) {
		super(mongo, morphia, DBNAME);
	}

	public UserProfileDAO(Morphia morphia, MongoClient mongo, String dbName) {
		super(mongo, morphia, dbName);
	}

	/**
	 * Use with sys/out?
	 * @return a list of all users
	 */
	public List findAll() {
		return ds.find(UserProfile.class).asList();
	}

	/**
	 * Filter by age less than the specified age and then order by the age (youngest to oldest)
	 * @param age 
	 * @return
	 */
	public List findUnderAge(int age) {
		// Filter by age less than the specified age and then order by the age
		// (youngest to oldest)
		return ds.find(User.class).filter("age < ", age).order("age").asList();
	}

	public User findByEmail(String email) {
		User res = ds.find(User.class).filter("email = ", email).get();
		return res;
	}

	private static Morphia getMorphia() throws UnknownHostException,
			MongoException {
		if (morphia == null) {
			morphia = new Morphia().map(UserProfile.class);
		}
		return morphia;
	}

	/**
	 * saves the user profile in the database
	 * 
	 * @param userProfile
	 *            the user profile to save
	 * @throws UnknownHostException
	 */
	public static void saveUserProfile(UserProfile userProfile)
			throws UnknownHostException {
		Morphia morphia = getMorphia();
		Datastore ds = morphia.createDatastore(MongoDBConnector.getMongo(),
				DBNAME);
		ds.save(userProfile);
	}

	public static List<UserProfile> getAllUserProfiles()
			throws UnknownHostException {
		return ds.createQuery(UserProfile.class).asList();
	}

	/**
	 * Method for changing the first name of a user
	 * 
	 * @param userProfile
	 * @param firstName
	 * @throws MongoException
	 * @throws UnknownHostException
	 */
	public static void changeFirstName(ObjectId id, String firstName)
			throws UnknownHostException, MongoException {
		UpdateOperations<UserProfile> ops;
		Query<UserProfile> updateQuery = ds.createQuery(UserProfile.class)
				.field("_id").equal(id);
		ops = ds.createUpdateOperations(UserProfile.class).set("_firstname",
				firstName);
		ds.update(updateQuery, ops);

	}

}
