package gpms.dao.test;

import static org.junit.Assert.*;

import java.net.UnknownHostException;
import java.util.List;

import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import org.bson.types.ObjectId;
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
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
	}
	
	@After
	public void cleanup()
	{
		
	}
	
	@Test
	public void testAddandReference() throws UnknownHostException 
	{
		long count = newUserAccountDAO.count();
		newUserProfile = new UserProfile("Shane", "Bernthal", "Walsh");
		newUserAccount= new UserAccount("sWalsh");
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);
		
		assertTrue(count+1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();
		
		newUserProfile = new UserProfile("Hector", "Caleb", "Ortiz");
		newUserAccount = new UserAccount("hOrtiz");
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);
		
		assertTrue(count+1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();
		
		newUserProfile = new UserProfile("Thomas", "", "Volz");
		newUserAccount = new UserAccount("tVolz");
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);
		
		assertTrue(count+1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();
		
		newUserProfile = new UserProfile("Milsen", "", "Muyasaki");
		newUserAccount = new UserAccount("mMuyasaki");
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);
		
		assertTrue(count+1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();
		
		newUserProfile = new UserProfile("Diangxian", "", "Xu");
		newUserAccount= new UserAccount("dXu");
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);
		
		assertTrue(count+1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();
		
		newUserProfile = new UserProfile("William", "", "Bush");
		newUserAccount= new UserAccount("wBush");
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);
		
		assertTrue(count+1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();
		
		newUserProfile = new UserProfile("Turner", "", "Borges");
		newUserAccount= new UserAccount("tBorges");
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);
		
		assertTrue(count+1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();	
		
		List<UserProfile> upList = newUserProfileDAO.findAll();
		
		for(UserProfile up : upList)
		{
			System.out.println(up.toString());
		}
	}
	
//	@Test
//	public void testGetUserProfileFromAccount()
//	{
////		Need to find a user profile whose user account reference id matches a user account id
//		newUserProfile = new UserProfile("Charles", "Knight", "Dayman");
//		newUserAccount = new UserAccount("cDayman");
//		newUserProfile.setUserId(newUserAccount);
//		newUserAccountDAO.save(newUserAccount);
//		newUserProfileDAO.save(newUserProfile);
//		
//		
//		UserProfile findUserProfile;
//		ObjectId checkID;
//		
//		checkID = newUserAccount.getId();
//		findUserProfile = newUserProfileDAO.findByUserID(checkID);
//		
//		System.out.println("Found Profile: " + findUserProfile.toString());
//		
//	}

	
	
}
