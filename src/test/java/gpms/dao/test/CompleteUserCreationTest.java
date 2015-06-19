package gpms.dao.test;

/**
 * @author Batman
 * why isn't Batman hyphenated but Spider-Man is?
 * 
 */

import static org.junit.Assert.*;
import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.Address;
import gpms.model.Family;
import gpms.model.PositionDetails;
import gpms.model.User;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class CompleteUserCreationTest {

	MongoClient mongoClient;
	Morphia morphia;
	String dbName = "GPMS";
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;
	UserAccount newUserAccount;
	UserProfile newUserProfile;
	PositionDetails newDetails;
	Address newAddress;
	String firstName, middleName, lastName;

	@Before
	public void initiate() throws UnknownHostException, MongoException {
		mongoClient = MongoDBConnector.getMongo();
		mongoClient.dropDatabase(dbName);
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		// datastore = morphia.createDatastore(mongoClient, dbName);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);

	}

	@After
	public void postTest() {

	}

	@Test
	public void testCreateCompleteUser() throws UnknownHostException {
		// User Creation Test
		System.out.println("BEGGINING TEST CREATECOMPLETEUSER");
		// Let's make a person.
		firstName = "Rico";
		middleName = "Danger";
		lastName = "Rodriguez";

		// Rico first needs to select a userName for his account.
		String userName = "rrodriguez";
		// Rico needs a password for this account.
		String passWord = "justified";

		// First we create the user account object.
		// The boolean of false is currently passed in for some reason, it's for
		// the delete flag
		// in the class file. It may be removed later.
		newUserAccount = new UserAccount();
		newUserAccount.setUserName(userName);
		newUserAccount.setPassword(passWord);

		// Rico next moves on to creation of his user profile
		// He can choose to fill in specific details now or at a later date.
		// For now, it may be easiest to use our basic constructor.

		newUserProfile = new UserProfile();
		newUserProfile.setFirstName(firstName);
		newUserProfile.setLastName(lastName);
		newUserProfile.setMiddleName(middleName);

		// This lets us create the object which makes the addition of
		// information a bit easier to manage.
		// Let's add the reference to the UserAccount
		newUserProfile.setUserId(newUserAccount);

		// Rico needs to add some contact information.
		// Let's start with phone numbers.
		String workPhone, homePhone, cellPhone;
		workPhone = "208-466-1200";
		homePhone = "208-494-7492";
		cellPhone = "208-649-2568";

		// Let's add the numbers in.
		newUserProfile.addOfficeNumber(workPhone);
		newUserProfile.addHomeNumber(homePhone);
		newUserProfile.addMobileNumber(cellPhone);

		// Rico also has an email address.
		String email = "superfly@yahoo.com";
		newUserProfile.addPersonalEmail(email);
		// Let's add a work one
		email = "officialsoundingemail@superserious.net";
		newUserProfile.addWorkEmail(email);

		// We need his living address too.
		String street, city, state, zipcode, country;
		street = "12019 Torrey Pine Court";
		city = "Hoodbridge";
		state = "Zanzibar";
		zipcode = "83686";
		country = "United States";

		newAddress = new Address();
		newAddress.setStreet(street);
		newAddress.setCity(city);
		newAddress.setState(state);
		newAddress.setZipcode(zipcode);
		newAddress.setCountry(country);

		// Now that we know his personal info we need some work info from him
		// Currently our PositionDetails class supports Strings only
		String positionType, positionTitle, department, college;
		// Enum may be supported in the future.
		// But for now let's set these deets

		positionType = "Tenured Faculty";
		positionTitle = "Research Professor";
		department = "Headquarters Personnel";
		college = "College of Krypton Studies";

		// Let's add this to details.
		newDetails = new PositionDetails();
		newDetails.setPositionTitle(positionTitle);
		newDetails.setPositionType(positionType);
		newDetails.setCollege(college);
		newDetails.setDepartment(department);

		// But wait, he may have multiple details!
		PositionDetails moreDetails = new PositionDetails();
		positionType = "Teaching Faculty";
		positionTitle = "Senior Lecturer";
		department = "Justice Leage";
		college = "Hogwarts";
		// Let's add this to details.
		moreDetails = new PositionDetails();
		moreDetails.setPositionTitle(positionTitle);
		moreDetails.setPositionType(positionType);
		moreDetails.setCollege(college);
		moreDetails.setDepartment(department);

		// Now let's add them to the user. Both our address and our details.
		newUserProfile.setAddress(newAddress);
		newUserProfile.addDetails(newDetails);
		newUserProfile.addDetails(moreDetails);

		// Here we finalize our data entry and add it through our dao.
		newUserAccountDAO.save(newUserAccount);
		// UserAccount must be saved first as UserProfile has an @reference to
		// it.
		// References cannot be made to an object that does not exist.
		newUserProfileDAO.save(newUserProfile);

		// Query for all user accounts in the database
		System.out.println("Users using generic find() method:");
		List<UserAccount> userAccounts = newUserAccountDAO.find().asList();
		for (UserAccount ua : userAccounts) {
			System.out.println("User Account: " + ua);
		}

		// Alternately:
		System.out.println("Users using custom findAll() method:");
		userAccounts = newUserAccountDAO.findAll();
		for (UserAccount ua : userAccounts) {
			System.out.println("User Account using findAll: " + ua);
		}

		// Use the User Profile DAO
		System.out.println("User Profiles using DAO");
		List<UserProfile> userProfiles = new ArrayList<UserProfile>();
		userProfiles = newUserProfileDAO.findAll();// put
		// condition
		// here
		for (UserProfile up : userProfiles) {
			System.out.println("First Name: " + up.getFirstName());
			System.out.println("Last Name: " + up.getLastName());
			UserAccount user = up.getUserAccount();
			System.out.println("User Name:" + user.getUserName() + " and "
					+ "Password: " + user.getPassword());
		}

		System.out.println("Test complete");
	}
}
