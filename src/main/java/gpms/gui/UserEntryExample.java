package gpms.gui;

import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

/**
 * For now this class holds example implementation of creation of Users in the
 * application In final implemenation, these methods will be finalized for user
 * input.
 * 
 * @author Thomas Volz
 *
 */
public class UserEntryExample {

	public static void main(String args[]) throws UnknownHostException {
		String firstName, middleName, lastName;
		String userName;
		// Create the mongo, the morphia, and the datastore objects needed for
		// entry
		MongoClient mongo = new MongoClient("localhost");
		Morphia morphia = new Morphia();
		Datastore ds = morphia.createDatastore(mongo, "GPMS");

		// This will create a user to add to the database.
		// This will also automatically create a username for the user
		UserProfileDAO newUserProfileDAO = new UserProfileDAO(mongo, morphia,
				"GPMS");

		// This starts with a basic 3 name user entry in the database
		firstName = "Rick";
		middleName = "Andrew";
		lastName = "Hunter";
		UserProfile newUser = new UserProfile();
		newUser.setFirstName(firstName);
		newUser.setMiddleName(middleName);
		newUser.setLastName(lastName);

		// System.out.println(firstName.charAt(0));

		// This will create an automatic user name using the first letter of the
		// first name
		// and the last name
		String firstChar = firstName.substring(0, 1);
		userName = firstChar + lastName;
		userName = userName.toLowerCase();
		System.out.println(userName);
		UserAccountDAO newUserAccountDAO = new UserAccountDAO(mongo, morphia,
				"GPMS");

		UserAccount newUserAccount = new UserAccount(userName);

		newUserProfileDAO.save(newUser);
		newUserAccountDAO.save(newUserAccount);

		// newUserAccountDAO.save

	}

}
