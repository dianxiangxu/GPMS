package gpms.dao.test;

import static org.junit.Assert.*;
import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.TestClass;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class UserReferenceCheckTest {

	MongoClient mongoClient;
	Morphia morphia;
	Datastore datastore;
	String dbName = "GPMS";
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;
	UserProfile newUserProfile;
	UserAccount newUserAccount;
	
	@Before
	public void setup()
	{
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		datastore = morphia.createDatastore(mongoClient, dbName);
		newUserAccountDAO = new UserAccountDAO(morphia, mongoClient, dbName);
		newUserProfileDAO = new UserProfileDAO(morphia, mongoClient, dbName);
	}
	
	@After
	public void cleanup()
	{
		
	}
	
	@Test
	public void testAddandReference() 
	{
		long count = newUserAccountDAO.count();
		newUserProfile = new UserProfile("Shane", "Bernthal", "Walsh");
		newUserAccount= new UserAccount("sWalsh");
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);
		
		
		assertTrue(count+1 == newUserAccountDAO.count());		
	}

}
