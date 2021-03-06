package gpms.dao.test;

import static org.junit.Assert.assertTrue;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.Address;
import gpms.model.InvestigatorInfo;
import gpms.model.InvestigatorRefAndPosition;
import gpms.model.PositionDetails;
import gpms.model.Proposal;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

/**
 * 
 * This will run through a test to create two users for our database
 * 
 * @author Thomas Volz thomasvolz@u.boisestate.edu
 *
 */
public class JUnitCreateTwoUsersTest {
	MongoClient mongoClient;
	Morphia morphia;
	String dbName = "GPMS";
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;

	@Before
	public void initiate() {
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);

	}

	@Test
	public void test() throws UnknownHostException {
		String username, password;
		UserAccount activeLog, newUserAccount2;
		Address newAddress;
		PositionDetails newDetails;
		UserProfile newUserProfile2;
		long dbSize = newUserProfileDAO.count();
		// We're going to change this one up a bit.
		// We'll be testing out our new auditing methods.
		// So let's take this from the top.
		// Step One, we're going to log in and make a user.

		// System.out.println("Welcome to the Official System of Systeming:\nPlease type in a user name:");
		activeLog = new UserAccount();
		// keyb = new Scanner(System.in);
		// username = keyb.nextLine();
		// System.out.println("Please type in a password");
		// password = keyb.nextLine();

		username = "batman";
		password = "robin";

		activeLog.setUserName(username);
		activeLog.setPassword(password);
		activeLog.setAddedOn(new Date());

		// System.out.println("A user account has been created for you, username: "
		// + activeLog.getUserName() + " password " + activeLog.getPassword());

		// System.out.println("Give us a first, middle, and last name and we'll handle the rest: ");
		String firstname, middlename, lastname;
		UserProfile newUserProfile = new UserProfile();
		// System.out.println("First name?: ");
		// firstname = keyb.nextLine();
		// System.out.println("Middle name?: ");
		// middlename = keyb.nextLine();
		// System.out.println("Last name?: ");
		// lastname = keyb.nextLine();

		firstname = "Bruce";
		middlename = "Grayson";
		lastname = "Wayne";

		newUserProfile.setFirstName(firstname);
		newUserProfile.setMiddleName(middlename);
		newUserProfile.setLastName(lastname);

		// System.out.println("Your user profile for " +
		// newUserProfile.getFirstName() + " " + newUserProfile.getMiddleName()
		// + " "
		// + newUserProfile.getLastName() + " has been created.");
		// System.out.println("We'll autopopulate the rest.");

		// Let's start with phone numbers.
		String workPhone, homePhone, cellPhone;
		workPhone = "208-466-1200";
		homePhone = "208-494-7492";
		cellPhone = "208-649-2568";

		// Let's add the numbers in.
		newUserProfile.getOfficeNumbers().add(workPhone);
		newUserProfile.getHomeNumbers().add(homePhone);
		newUserProfile.getMobileNumbers().add(cellPhone);

		// Rico also has an email address.
		String email = "superfly@yahoo.com";
		newUserProfile.getPersonalEmails().add(email);
		// Let's add a work one
		email = "officialsoundingemail@superserious.net";
		newUserProfile.getWorkEmails().add(email);

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

		street = "2601 W Boise Ave TRLR B";
		city = "Boise";
		state = "Idaho";
		zipcode = "83706";
		country = "United States";
		Address newAddress2 = new Address();
		newAddress2.setStreet(street);
		newAddress2.setCity(city);
		newAddress2.setState(state);
		newAddress2.setZipcode(zipcode);
		newAddress2.setCountry(country);

		// Now that we know his personal info we need some work info from him
		// Currently our PositionDetails class supports Strings only
		String positionType, positionTitle, department, college;
		// Enum may be supported in the future.
		// But for now let's set these deets
		positionTitle = "Research Professor";
		positionType = "Tenured Faculty";
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
		positionTitle = "Senior Lecturer";
		positionType = "Teaching Faculty";
		department = "Justice Leage";
		college = "Hogwarts";
		// Let's add this to details.
		moreDetails = new PositionDetails();
		moreDetails.setPositionTitle(positionTitle);
		moreDetails.setPositionType(positionType);
		moreDetails.setCollege(college);
		moreDetails.setDepartment(department);

		// Now let's add them to the user. Both our address and our details.
		newUserProfile.getAddresses().add(newAddress);
		newUserProfile.getAddresses().add(newAddress2);
		newUserProfile.getDetails().add(newDetails);
		newUserProfile.getDetails().add(moreDetails);
		newUserProfile.setUserId(activeLog);

		// Here we finalize our data entry and add it through our dao.
		newUserAccountDAO.save(activeLog);
		// UserAccount must be saved first as UserProfile has an @reference to
		// it.
		// References cannot be made to an object that does not exist.
		newUserProfileDAO.save(newUserProfile);

		// We need to create a proposal and we need to create an investigator
		// for this proposal.
		Proposal proposal1 = new Proposal();
		proposal1.setProposalNo(10001);

		InvestigatorInfo firstInv = new InvestigatorInfo();

		InvestigatorRefAndPosition pi = new InvestigatorRefAndPosition();
		pi.setUserRef(newUserProfile);
		pi.setUserProfileId(newUserProfile.getId().toString());
		pi.setCollege("College of Krypton Studies");
		pi.setDepartment("Headquarters Personnel");
		pi.setPositionType("Tenured Faculty");
		pi.setPositionTitle("Research Professor");

		firstInv.setPi(pi);

		proposal1.setInvestigatorInfo(firstInv);

		ProposalDAO newProposalDAO = new ProposalDAO(mongoClient, morphia,
				dbName);
		newProposalDAO.save(proposal1);

		assertTrue(newUserProfileDAO.count() == (dbSize + 1));

		// ////////////////////////////////////////////////////////////////
		// ////////////////////////////////////////////////////////////////
		// /////// Second User Creation Below... ////////////////////////
		// ////////////////////////////////////////////////////////////////
		// ////////////////////////////////////////////////////////////////

		String firstName = "Rodney";
		String middleName = "Meredith";
		String lastName = "McKay";

		String userName = "drodmack";
		String passWord = "chevron";

		// First we create the user account object.
		// The boolean of false is currently passed in for some reason, it's for
		// the delete flag
		// in the class file. It may be removed later.
		newUserAccount2 = new UserAccount();
		newUserAccount2.setUserName(userName);
		newUserAccount2.setPassword(passWord);
		newUserAccount2.setAddedOn(new Date());

		// He can choose to fill in specific details now or at a later date.
		// For now, it may be easiest to use our basic constructor.

		newUserProfile2 = new UserProfile();
		newUserProfile2.setFirstName(firstName);
		newUserProfile2.setLastName(lastName);
		newUserProfile2.setMiddleName(middleName);

		// This lets us create the object which makes the addition of
		// information a bit easier to manage.
		// Let's add the reference to the UserAccount
		newUserProfile2.setUserId(newUserAccount2);

		// Let's start with phone numbers.

		workPhone = "703-485-0352";
		homePhone = "703-492-2212";
		cellPhone = "703-866-0500";

		// Let's add the numbers in.
		newUserProfile2.getOfficeNumbers().add(workPhone);
		newUserProfile2.getHomeNumbers().add(homePhone);
		newUserProfile2.getMobileNumbers().add(cellPhone);

		email = "greatestguy@stargatebase.gov";
		newUserProfile2.getPersonalEmails().add(email);
		// Let's add a work one
		email = "yoursuperior@stargatecommand.org";
		newUserProfile2.getWorkEmails().add(email);

		// We need his living address too.

		street = "466 West Floridian Road";
		city = "Langley";
		state = "Virginia";
		zipcode = "22192";
		country = "United States";

		newAddress = new Address();
		newAddress.setStreet(street);
		newAddress.setCity(city);
		newAddress.setState(state);
		newAddress.setZipcode(zipcode);
		newAddress.setCountry(country);

		// Now that we know his personal info we need some work info from him
		// Currently our PositionDetails class supports Strings only

		// Enum may be supported in the future.
		// But for now let's set these deets
		positionTitle = "Senior Science Commander";
		positionType = "Science Personnel";
		department = "Stargate Command";
		college = "Super Smart University";

		// Let's add this to details.
		newDetails = new PositionDetails();
		newDetails.setPositionTitle(positionTitle);
		newDetails.setPositionType(positionType);
		newDetails.setCollege(college);
		newDetails.setDepartment(department);

		// But wait, he may have multiple details!
		moreDetails = new PositionDetails();
		positionTitle = "Dungeon Master";
		positionType = "Master of Dungeons";
		department = "Adventure";
		college = "Kickin Butt";
		// Let's add this to details.
		moreDetails = new PositionDetails();
		moreDetails.setPositionTitle(positionTitle);
		moreDetails.setPositionType(positionType);
		moreDetails.setCollege(college);
		moreDetails.setDepartment(department);

		// Now let's add them to the user. Both our address and our details.
		newUserProfile2.getAddresses().add(newAddress);
		newUserProfile2.getDetails().add(newDetails);
		newUserProfile2.getDetails().add(moreDetails);

		// Here we finalize our data entry and add it through our dao.
		newUserAccountDAO.save(newUserAccount2);
		// UserAccount must be saved first as UserProfile has an @reference to
		// it.
		// References cannot be made to an object that does not exist.
		newUserProfileDAO.save(newUserProfile2);

		InvestigatorInfo secondInv = new InvestigatorInfo();
		Proposal proposal2 = new Proposal();

		// secondInv.setPi(newUserProfile2);
		// secondInv.addCo_pi(newUserProfile);

		proposal2.setProposalNo(10002);
		proposal2.setInvestigatorInfo(secondInv);

		ProposalDAO nextProposalDAO = new ProposalDAO(mongoClient, morphia,
				dbName);

		nextProposalDAO.save(proposal2);

		assertTrue(newUserProfileDAO.count() == (dbSize + 2));

	}

}
