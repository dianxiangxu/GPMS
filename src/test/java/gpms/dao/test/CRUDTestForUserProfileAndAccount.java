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
	public void getUserChangeName() throws UnknownHostException 
	{
		UserProfile tempUser;
		
		//We may want to list all elements of a certain type, then make a choice to operate on a specific one
		//But for now let's try and find Rico
		
		List<UserProfile> userList = newUserProfileDAO.findByFirstNameIgnoreCase("rico"); 
		System.out.println(userList.toString());
		
		//We have our user profile object stored in a list.  In final
		//Let's work with just the first person now.
		//This assignment can make it less confusing to manipulate the object.
		tempUser = userList.get(0);
		//Let's run some things so we can see that stuff pops and returns..
		System.out.println("Unique ID is: " + tempUser.getId());
		System.out.println("First Name: " + tempUser.getFirstName());
		System.out.println("Middle Name: " + tempUser.getMiddleName());
		System.out.println("Last Name: " + tempUser.getLastName());
		System.out.println("Office Numbers: " + tempUser.getOfficeNumbers().toString());
		System.out.println("Home Numbers: " + tempUser.getHomeNumbers().toString());
		
		//I want to change his name.
		//Let's change his first name, it was "Rico", I want to change it to...
		newUserProfileDAO.setFirstName(tempUser, "Maximus Dangerous");
		//Now I want to put it back in saved and changed.
//		newUserProfileDAO.save(tempUser);
		//Let's go back to the DB and check that it's the only thing there.  That means alt tab or w/e
	}
	
	
	@Test
	public void findByID() throws UnknownHostException
	{
		//Here's a more complex task, we've been working on retrieving a unique User ID, the one created by 
		//Mongo / Morphia (not our user account id's like bananaMan7000
		//We want to use this ID to find every object in the db that the user is attached to.
		//With "Rico" as our guinea pig again, let's grab him out of the DB.
		
		//Here's how we create a list of people.
		List<UserProfile> userList = newUserProfileDAO.findAll();
		//In our final implementation this might be a printed list.
		//For now:
		System.out.println(userList.toString());
		//Let's just grab our guy up front.
		
		UserProfile tempUser = userList.get(0);
		//Let's get his user account and see if we can print out his ID.
		System.out.println("User Account ID: " + tempUser.getUserAccount().getId());
		
		
	}

}
