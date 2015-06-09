package gpms.gui;

import gpms.dao.UserProfileDAO;
import gpms.model.User;
import gpms.model.UserProfile;

import java.net.UnknownHostException;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

/**
 * For now this class holds example implementation of creation of Users in the application
 * In final implemenation, these methods will be finalized for user input.
 * @author Thomas Volz
 *
 */
public class UserEntryExample
{

	public static void main (String args[]) throws UnknownHostException
	{
		String firstName, middleName, lastName;
		String userName;
		//Create the mongo, the morphia, and the datastore objects needed for entry
		MongoClient mongo = new MongoClient("localhost");
		Morphia morphia = new Morphia();
		Datastore ds = morphia.createDatastore(mongo, "GPMS");

		// Query for all users in the database
		System.out.println("Users before we start:");
		Query<User> users = ds.find(User.class);
		for (User u : users.fetch()) 
		{
			System.out.println("User: " + u);
		}

		//This will create a user to add to the database.
		//This will also automatically create a username for the user
		UserProfileDAO newUserProfileDAO = new UserProfileDAO(mongo, morphia);
		
		//This starts with a basic 3 name user entry in the database
		firstName = "Rick";
		middleName= "Andrew";
		lastName = "Hunter";
		UserProfile newUser = new UserProfile(firstName, middleName, lastName);
		
//		newUserProfileDAO.save(newUser);

//		System.out.println(firstName.charAt(0));
		
//		String firstChar = firstName.indexOf(0);
//		
		
		
	}

}
