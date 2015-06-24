package gpms.dao.test;

import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.Address;
import gpms.model.PositionDetails;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.List;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class AuditTest 
{
	public static void main(String args[]) throws UnknownHostException
	{

		////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////
		/////////// AUDITING TEST  /////////////////////////////////////
		////////////////////////////////////////////////////////////////

		MongoClient mongoClient;
		Morphia morphia;
		UserAccountDAO newUserAccountDAO;
		UserProfileDAO newUserProfileDAO;
		String dbName = "GPMS";
		String username, password, firstname, middlename, lastname;
		UserAccount activeLog, newUserAccount2;
		Address newAddress;
		PositionDetails newDetails;
		UserProfile newUserProfile2;
		Scanner keyb;

		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		//datastore = morphia.createDatastore(mongoClient, dbName);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);

		//////////////////////////////////////////////////////////////
		////////  Mongo Log Suppression  /////////////////////////////
		//////////////////////////////////////////////////////////////
		Logger mongoLogger = Logger.getLogger( "org.mongodb.driver" );
		mongoLogger.setLevel(Level.SEVERE); 

		keyb = new Scanner(System.in);

		//Choose an active log in:
		List<UserAccount> userAccountList = newUserAccountDAO.findAll();
		for(int m = 0; m < userAccountList.size(); m++)
		{
			System.out.println(m + " " + userAccountList.get(m).getUserName());
		}

		System.out.println("Select a User (I recommend user zed: ");
		int accountIndex = keyb.nextInt();
		activeLog = userAccountList.get(accountIndex);
		UserProfile loggedIn = newUserProfileDAO.findByUserAccount(activeLog);

		//Now let's test the auditing.
		System.out.println("Logged in as : " + activeLog.getUserName());
		//We're going to search for a user profile name and test the changes.

		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);

		//Let's find Rodney and test changing him
		List<UserProfile> list = newUserProfileDAO.findAll();

		System.out.println("A list of Rodneys has been found: \n");

		for(int n = 0; n < list.size(); n++)
		{
			System.out.println(n + " " + list.get(n));
		}

		System.out.println("Choose a user to edit.");

		int index = keyb.nextInt();

		UserProfile temp = list.get(index);
		System.out.println("You have selected " + temp.getFirstName() + " " + temp.getLastName());


		//We're going to run through changes and there should be one audit log entry for everything
		//We'll first try to change a field to the exact same thing then change it to something new
		//Then verify that only one change occured.

		firstname = temp.getFirstName();
		middlename = temp.getMiddleName();
		lastname = temp.getLastName();

		newUserProfileDAO.setFirstName(loggedIn, temp, firstname);
		newUserProfileDAO.setFirstName(loggedIn, temp, "Changed");
		newUserProfileDAO.setMiddleName(loggedIn, temp, middlename);
		newUserProfileDAO.setMiddleName(loggedIn, temp, "The");
		newUserProfileDAO.setLastName(loggedIn, temp, lastname);
		newUserProfileDAO.setLastName(loggedIn, temp, "Field");
		
		//Now let's try changing some other entities in the collections.
		//Let's start with phone numbers.
		
		List<String> homeList = temp.getHomeNumbers();
		
		String number = homeList.get(0);
		System.out.println("The home number is: " + number);
		
		newUserProfileDAO.addHomeNumber(loggedIn, temp, number);
		newUserProfileDAO.addHomeNumber(loggedIn, temp, "208-208-2080");
		newUserProfileDAO.deleteHomeNumber(loggedIn, temp, number);
		
		
		
		
		
		
		
		
		
		keyb.close();

	}
}