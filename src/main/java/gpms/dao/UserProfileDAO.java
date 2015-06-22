package gpms.dao;

/**
 * @author Thomas Volz
 * 
 * @author Milson Munakami
 */

import gpms.DAL.MongoDBConnector;
import gpms.model.Address;
import gpms.model.AuditLog;
import gpms.model.PositionDetails;
import gpms.model.Proposal;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;

import com.mongodb.DBRef;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class UserProfileDAO extends BasicDAO<UserProfile, String> {
	private static final String DBNAME = "GPMS";
	public static final String COLLECTION_NAME = "userprofile";

	private static Morphia morphia;
	private static Datastore ds;
	private AuditLog audit;
	
	
	private static Morphia getMorphia() throws UnknownHostException,
			MongoException {
		if (morphia == null) {
			morphia = new Morphia().map(UserProfile.class);
		}
		return morphia;
	}

	@Override
	public Datastore getDatastore() {
		if (ds == null) {
			try {
				ds = getMorphia().createDatastore(MongoDBConnector.getMongo(),
						DBNAME);
			} catch (UnknownHostException | MongoException e) {
				e.printStackTrace();
			}
		}
		ds.ensureIndexes();
		return ds;
	}

	public UserProfileDAO(MongoClient mongo, Morphia morphia, String dbName) {
		super(mongo, morphia, dbName);
	}

	// public UserProfile getUserProfile(ObjectId id) {
	// return UserProfile;
	// }

	/**
	 * 
	 * @return list of all users in the ds
	 * @throws UnknownHostException
	 */
	public List<UserProfile> findAll() throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(UserProfile.class).asList();
	}

	public UserProfile findByID(ObjectId id) {
		Datastore ds = getDatastore();
		return ds.createQuery(UserProfile.class).field("id").equal(id).get();
	}

	public UserProfile findByUserAccount(UserAccount userAccount) 
	{
		Datastore ds = getDatastore();
		
//		UserProfile temp = query.field("user id.$id").equal(id).get();
//		UserProfile tempUser = ds.createQuery(UserProfile.class);
//				.field("user id.id").equal(id).get();
		return ds.createQuery(UserProfile.class).field("user id").equal(userAccount).get();
	}

	/**
	 * 
	 * @param firstName
	 *            first name to search by
	 * @return list of users matching the first name
	 */
	public List<UserProfile> findByFirstName(String firstName) {
		// Could not make this work with .find methods. It threw errors every
		// time.
		// Had to use a query and createQuery method, and to search by field,
		// seems stable this way
		Datastore ds = getDatastore();
		Query<UserProfile> q = ds.createQuery(UserProfile.class)
				.field("first name").equal(firstName);
		return q.asList();
	}

	public List<UserProfile> findByFirstNameIgnoreCase(String firstName) {
		// This may be the go-to method for searching by name.
		// Still needs more testing, I believe it may actually look for any
		// phrase that
		// contains the given search query, ie: a search of "rIck" would return
		// both a "RICK" and a "Brick".
		// But these "similarities" may be preferred
		Datastore ds = getDatastore();
		Query<UserProfile> query = ds.createQuery(UserProfile.class);
		query.criteria("first name").containsIgnoreCase(firstName);
		// Query<UserProfile> q =
		// ds.createQuery(UserProfile.class).criteria("first name").containsIgnoreCase(firstName);
		return query.asList();
	}

	// /**
	// * Returns list sorted by First Name
	// * @param firstName
	// * @return
	// */
	// public List<UserProfile> sortAllByFirstName(String firstName)
	// {
	// //Could not make this work with .find methods. It threw errors every
	// time.
	// //Had to use a query and createQuery method, and to search by field,
	// seems stable this way
	// Datastore ds = getDatastore();
	// Query<UserProfile> q = ds.find(UserProfile.class).
	// return q.asList();
	// }

	/**
	 * Name search for specified name at param
	 * 
	 * @param middleName
	 *            middle name to search for
	 * @return list of all users in the ds with middleName
	 */
	public List<UserProfile> findByMiddleName(String middleName) {
		// Could not make this work with .find methods. It threw errors every
		// time.
		// Had to use a query and createQuery method, and to search by field,
		// seems stable this way
		Datastore ds = getDatastore();
		Query<UserProfile> q = ds.createQuery(UserProfile.class)
				.field("middle name").equal(middleName);
		return q.asList();
	}

	/**
	 * Name search for specified name at param
	 * 
	 * @param lastName
	 *            last name to search for
	 * @return list of all users in the ds with lastName
	 */
	public List<UserProfile> findByLastName(String lastName) {
		Datastore ds = getDatastore();
		Query<UserProfile> q = ds.createQuery(UserProfile.class)
				.field("last name").equal(lastName);
		return q.asList();
	}

	/**
	 * 
	 * @param email
	 * @return
	 */
	public UserProfile findByEmail(String email) {
		// May be the
		Datastore ds = getDatastore();
		UserProfile res = ds.find(UserProfile.class).filter("email = ", email)
				.get();
		return res;
	}

	

	/**
	 * Sets the first name of a user profile
	 * @param profile the user profile to change
	 * @param newName the new name to set
	 */
	public void setFirstName(UserProfile profile, String newName)
	{
		Datastore ds = getDatastore();
		
		audit = new AuditLog(profile, "Edited first name", new Date());
		profile.addEntryToAuditLog(audit);
		profile.setFirstName(newName);
		ds.save(profile);
	}
	
	/**
	 * Sets the middle name of a user profile
	 * @param profile the user profile to change 
	 * @param newName the new name to set
	 */
	public void setMiddleName(UserProfile profile, String newName)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Edited middle name", new Date());
		profile.addEntryToAuditLog(audit);
		profile.setMiddleName(newName);
		ds.save(profile);
	}
	
	/**
	 * Sets the last name of a user profile
	 * @param profile the user profile to change
	 * @param newName the new name to set
	 */
	public void setLastName(UserProfile profile, String newName)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Edited last name", new Date());
		profile.addEntryToAuditLog(audit);
		profile.setLastName(newName);
		ds.save(profile);
	}
	

	/**
	 * Returns a list of the details lists
	 * @param profile
	 * @return
	 */
	public List getDetailsList(UserProfile profile)
	{
		List<PositionDetails> list = profile.getDetailsList();
		
		return list;
	}
	
	/**
	 * Delete a specific "details" entry from a user profile
	 * @param profile the profile to use
	 * @param details the details to delete
	 */
	public void removeDetails(UserProfile profile, PositionDetails details)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Removed details", new Date());
		profile.addEntryToAuditLog(audit);
		profile.deleteDetails(details);
		ds.save(profile);
	}
	
	/**
	 * Add a details object to the details of the user
	 * @param profile the profile to use
	 * @param details the details to add
	 */
	public void addDetails(UserProfile profile, PositionDetails details)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Added details", new Date());
		profile.addEntryToAuditLog(audit);
		profile.addDetails(details);
		ds.save(profile);
	}
	
	public void addOfficeNumber(UserProfile profile, String number)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Added office number " + number, new Date());
		profile.addEntryToAuditLog(audit);
		profile.addOfficeNumber(number);
		ds.save(profile);
	}
	
	public void deleteOfficeNumber(UserProfile profile, String number)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Deleted office number "+ number, new Date());
		profile.addEntryToAuditLog(audit);
		profile.deleteOfficeNumber(number);
		ds.save(profile);
	}
	
	public void addHomeNumber(UserProfile profile, String number)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Added home number " + number, new Date());
		profile.addEntryToAuditLog(audit);
		profile.addOfficeNumber(number);
		ds.save(profile);
	}
	
	public void deleteHomeNumber(UserProfile profile, String number)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Deleted home number " + number, new Date());
		profile.addEntryToAuditLog(audit);
		profile.deleteHomeNumber(number);
		ds.save(profile);
	}
	
	public void addMobileNumber(UserProfile profile, String number)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Added mobile number " + number, new Date());
		profile.addEntryToAuditLog(audit);
		profile.addMobileNumber(number);
		ds.save(profile);
	}
	
	public void deleteMobileNumber(UserProfile profile, String number)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Deleted mobile number " + number, new Date());
		profile.addEntryToAuditLog(audit);
		profile.deleteMobileNumber(number);
		ds.save(profile);
	}
	
	public void setAddress(UserProfile profile, Address address)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Edited address", new Date());
		profile.addEntryToAuditLog(audit);
		profile.setAddress(address);
		ds.save(profile);
	}
	
	public void addWorkEmail(UserProfile profile, String email)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Added work email " + email, new Date());
		profile.addEntryToAuditLog(audit);
		profile.addWorkEmail(email);
		ds.save(profile);
	}
	
	public void deleteWorkEmail(UserProfile profile, String email)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Deleted work email " + email, new Date());
		profile.addEntryToAuditLog(audit);
		profile.deleteWorkEmail(email);
		ds.save(profile);
	}

	public void addPersonalEmail(UserProfile profile, String email)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Added personal email " + email, new Date());
		profile.addEntryToAuditLog(audit);
		profile.addPersonalEmail(email);
		ds.save(profile);
	}
	
	public void deletePersonalEmail(UserProfile profile, String email)
	{
		Datastore ds = getDatastore();
		audit = new AuditLog(profile, "Deleted personal email " + email, new Date());
		profile.addEntryToAuditLog(audit);
		profile.deletePersonalEmail(email);
		ds.save(profile);
	}
	
	
	
	
	/**
	 * Dangerous method, will erase all entries. When it works Used only for
	 * testing, will be removed later
	 */
	public void deleteAll() {
		Datastore ds = getDatastore();
		ds.delete(ds.createQuery(UserProfile.class));
	}
}
