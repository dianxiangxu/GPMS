package gpms.dao.test;

import static org.junit.Assert.*;

import java.net.UnknownHostException;
import java.util.List;

import org.junit.Before;
import org.junit.Test;






import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserProfile;

import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

/**
 * Run this after one of the CreateUser tests, either the suite or Create100Users itself.
 * I'm building this to look for duplication errors when a user is saved.
 * We're starting at the ground level, making sure that the DAO's themselves aren't duplicating. 
 * @author Tommy
 *
 */
public class EditXUsers 
{
	UserAccountDAO accountDAO;
	UserProfileDAO profileDAO;
	
	@Before
	public void initiate()
	{
		MongoClient mongoClient = new MongoClient();
		Morphia morphia = new Morphia();
		String db = "GPMS";
		accountDAO = new UserAccountDAO(mongoClient, morphia, db);
		profileDAO = new UserProfileDAO(mongoClient, morphia, db);
	}
	
	@Test
	public void EditTest() throws UnknownHostException
	{
		//Start by changing a first name, and make sure number of entries in the db doesn't increase
		List<UserProfile> userList = profileDAO.findAll();
		
		//Make sure the list exists
		assertTrue(userList.size()>0);
		
		//Let's take the first thing in the list
		UserProfile editUser = userList.get(0);
		
		//Because our methods audit, we keep track of an an author and a target
		//So, the author of the changes will be whoever the second user is.
		UserProfile authorUser = userList.get(1);
		
		//If this is working as intended, it should take care of everything.
		profileDAO.setFirstName(authorUser, editUser, "Andross");
		
		
		
		//Make another list object from the db, both should be the same size if no
		//duplicates were created.
		List<UserProfile> checkList = profileDAO.findAll();
		assertTrue(checkList.size() == userList.size());
	}

}
