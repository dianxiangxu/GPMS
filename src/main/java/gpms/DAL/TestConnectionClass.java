package gpms.DAL;

import gpms.model.UserProfile;

import java.net.UnknownHostException;

import com.mongodb.MongoException;

/**
 * Testing class for use of the mongoDBConnector
 * @author Thomas Volz
 *
 */
public class TestConnectionClass 
{
	public static void main (String args[]) throws UnknownHostException, MongoException
	{
//		MongoDBConnector connection;
//		connection = new MongoDBConnector("GPMS");
		
		//Here we will test the creation of a new user and addition to the database.
		
		//Create a new User with only First, Middle, Last
		UserProfile newProfile;
		newProfile = new UserProfile("Maximillian", "Genius", "Sterling");
		
		UserProfile newProfile2;
		newProfile2 = new UserProfile("John", "Jonah", "Jameson");
		
		//Attempt to save the user profile in the db
		UserProfileDAO newUserDAO;
		newUserDAO = new UserProfileDAO();

		newUserDAO.saveUserProfile(newProfile);
		newUserDAO.saveUserProfile(newProfile2);

		
		
	}
}
