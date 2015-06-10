package gpms.dao;

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
	public UserProfileDAO(Morphia morphia, MongoClient mongo, String dbName) {
		super(mongo, morphia, dbName);
	}

	public List<UserProfile> findAll() throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(UserProfile.class).asList();
	}

	public User findByEmail(String email) {
		Datastore ds = getDatastore();
		User res = ds.find(User.class).filter("email = ", email).get();
		return res;
	}

	/**
	 * Method for changing the first name of a user
	 * 
	 * @param userProfile
	 * @param firstName
	 * @throws MongoException
	 * @throws UnknownHostException
	 */
	public void changeFirstName(ObjectId id, String firstName)
			throws UnknownHostException, MongoException {
		Datastore ds = getDatastore();
		UpdateOperations<UserProfile> ops;
		Query<UserProfile> updateQuery = ds.createQuery(UserProfile.class)
				.field("_id").equal(id);
		ops = ds.createUpdateOperations(UserProfile.class).set("firstname",
				firstName);
		ds.update(updateQuery, ops);

	}

}
