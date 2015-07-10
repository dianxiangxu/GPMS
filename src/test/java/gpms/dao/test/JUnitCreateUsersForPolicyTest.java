package gpms.dao.test;

import static org.junit.Assert.*;
import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class JUnitCreateUsersForPolicyTest {

	MongoClient mongoClient;
	Morphia morphia;
	String dbName = "GPMS";
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;

	@Before
	public void initiate() 
	{
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);

	}

	
	
	@Test
	public void test() 
	{
		String userAccount1 = "ADMIN";
		String userAccount2 = "User2";
		String userProfile1 = "ADMIN";
		String userProfile2 = "User";
		
		UserProfile us1 = new UserProfile();
		UserProfile us2 = new UserProfile();
		UserAccount ua1 = new UserAccount();
		UserAccount ua2 = new UserAccount();
		
		us1.setUserAccount(ua1);
		us2.setUserAccount(ua2);
		
		newUserAccountDAO.save(ua1);
		newUserProfileDAO.save(us1);
		newUserAccountDAO.save(ua2);
		newUserProfileDAO.save(us2);
		
		
		
	}

}
