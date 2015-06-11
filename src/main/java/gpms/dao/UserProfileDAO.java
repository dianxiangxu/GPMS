package gpms.dao;

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
	
	public UserProfileDAO(Morphia morphia, MongoClient mongo, String dbName) 
	{
		super(mongo, morphia, dbName);
	}

	/**
	 * 
	 * @return list of all users in the ds
	 * @throws UnknownHostException
	 */
	public List<UserProfile> findAll() throws UnknownHostException 
	{
		Datastore ds = getDatastore();
		return ds.createQuery(UserProfile.class).asList();
	}
	
	/**
	 * 
	 * @param firstName first name to search by
	 * @return list of users matching the first name
	 */
	public List<UserProfile> findByFirstName(String firstName) 
	{
		//Could not make this work with .find methods.  It threw errors every time.
		//Had to use a query and createQuery method, and to search by field, seems stable this way
		Datastore ds = getDatastore();
		Query<UserProfile> q = ds.createQuery(UserProfile.class).field("first name").equal(firstName);
		return q.asList();
	}
	
	public List<UserProfile> findByFirstNameIgnoreCase(String firstName) 
	{
		//Could not make this work with .find methods.  It threw errors every time.
		//Had to use a query and createQuery method, and to search by field, seems stable this way
		Datastore ds = getDatastore();
		Query<UserProfile> query = ds.createQuery(UserProfile.class);
		query.criteria("first name").containsIgnoreCase(firstName);
//		Query<UserProfile> q = ds.createQuery(UserProfile.class).criteria("first name").containsIgnoreCase(firstName);
		return query.asList();
	}
	
//	/**
//	 * Returns list sorted by First Name
//	 * @param firstName
//	 * @return
//	 */
//	public List<UserProfile> sortAllByFirstName(String firstName) 
//	{
//		//Could not make this work with .find methods.  It threw errors every time.
//		//Had to use a query and createQuery method, and to search by field, seems stable this way
//		Datastore ds = getDatastore();
//		Query<UserProfile> q = ds.find(UserProfile.class).
//		return q.asList();
//	}
	
	/**
	 * Name search for specified name at param
	 * @param middleName middle name to search for
	 * @return list of all users in the ds with middleName
	 */
	public List<UserProfile> findByMiddleName(String middleName) 
	{
		//Could not make this work with .find methods.  It threw errors every time.
		//Had to use a query and createQuery method, and to search by field, seems stable this way
		Datastore ds = getDatastore();
		Query<UserProfile> q = ds.createQuery(UserProfile.class).field("middle name").equal(middleName);
		return q.asList();
	}
	
	/**
	 * Name search for specified name at param
	 * @param lastName last name to search for
	 * @return list of all users in the ds with lastName
	 */
	public List<UserProfile> findByLastName(String lastName) 
	{
		//Could not make this work with .find methods.  It threw errors every time.
		//Had to use a query and createQuery method, and to search by field, seems stable this way
		Datastore ds = getDatastore();
		Query<UserProfile> q = ds.createQuery(UserProfile.class).field("last name").equal(lastName);
		return q.asList();
	}

	/**
	 * 
	 * @param email
	 * @return
	 */
	public UserProfile findByEmail(String email) 
	{
		//May be the 
		Datastore ds = getDatastore();
		UserProfile res = ds.find(UserProfile.class).filter("email = ", email).get();
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

	
	/**
	 * Dangerous method, will erase all entries.
	 * When it works
	 */
	public void deleteAll()
	{
		Datastore ds = getDatastore();
		ds.delete(ds.createQuery(UserProfile.class));
	}
}
