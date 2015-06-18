package gpms.dao.test;

/**
 * @author Thomas Volz
 */

import static org.junit.Assert.*;
import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;



public class CRUDTestForUserProfileAndAccount
{

	MongoClient mongoClient;
	Morphia morphia;
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;
	String dbName = "GPMS";
	
	@Before
	public void initiate() throws UnknownHostException, MongoException {
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		//datastore = morphia.createDatastore(mongoClient, dbName);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);

	}

	
	@Test
	public void getID() throws UnknownHostException 
	{
		UserProfile tempUser;
		
		//We may want to list all elements of a certain type, then make a choice to operate on a specific one
		//But for now let's try and find Rico
		List tempList = newUserProfileDAO.findAll();
//		List<UserProfile> userList = newUserProfileDAO.findByFirstNameIgnoreCase("rico"); 
//		System.out.println(userList.toString());
		System.out.println("HEY THIS IS WHERE THINGS NEED TO PRINT!");
		System.out.println(tempList.toString());
		
	}

}
