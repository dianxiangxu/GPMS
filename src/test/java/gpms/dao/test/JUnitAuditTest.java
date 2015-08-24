package gpms.dao.test;

import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class JUnitAuditTest 
{
	MongoClient mongoClient;
	Morphia morphia;
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;
	String dbName = "GPMS";

	@Before
	public void initiate()
	{
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
		//////////////////////////////////////////////////////////////
		////////  Mongo Log Suppression  /////////////////////////////
		//////////////////////////////////////////////////////////////
		Logger mongoLogger = Logger.getLogger( "org.mongodb.driver" );
		mongoLogger.setLevel(Level.SEVERE); 
	}

	@Test
	public void test() throws UnknownHostException {



		////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////
		/////////// AUDITING TEST  /////////////////////////////////////
		////////////////////////////////////////////////////////////////


		String firstname, middlename, lastname;
		UserAccount activeAccount, newUserAccount2;
		UserProfile author, target, newUserProfile2;



		List<UserAccount> userAccountList = newUserAccountDAO.findAll();
		activeAccount = userAccountList.get(0);
		author = newUserProfileDAO.findByUserAccount(activeAccount);
		System.out.println(userAccountList.toString());

		//Our target will be user 2 on the list
		//This also relies on having the 2 user creation test run beforehand, so that we actually have
		//at least two users to use
		target = newUserProfileDAO.findByUserAccount(userAccountList.get(1));
		


		//We're going to run through changes and there should be one audit log entry for everything
		//We'll first try to change a field to the exact same thing then change it to something new
		//Then verify that only one change occured.

		firstname = target.getFirstName();
		middlename = target.getMiddleName();
		lastname = target.getLastName();

		newUserProfileDAO.setFirstName(author, target, firstname);
		newUserProfileDAO.setFirstName(author, target, "Pedro-Julio");
		newUserProfileDAO.setMiddleName(author, target, middlename);
		newUserProfileDAO.setMiddleName(author, target, "The");
		newUserProfileDAO.setLastName(author, target, lastname);
		newUserProfileDAO.setLastName(author, target, "Field");

		//Now let's try changing some other entities in the collections.
		//Let's start with phone numbers.

		List<String> homeList = target.getHomeNumbers();

		String number = homeList.get(0);
		System.out.println("The home number is: " + number);


		newUserProfileDAO.addHomeNumber(author, target, number);
		newUserProfileDAO.addHomeNumber(author, target, "704-467-2124");
		newUserProfileDAO.addHomeNumber(author, target, "208-208-2080");
		newUserProfileDAO.deleteHomeNumber(author, target, number);


	}
}


