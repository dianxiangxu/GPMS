package gpms.dao.test;

/**
 * @author Batman
 * why isn't Batman hyphenated but Spider-Man is?
 * 
 */

import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.Address;
import gpms.model.InvestigatorInfo;
import gpms.model.PositionDetails;
import gpms.model.Proposal;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
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
	UserAccount newUserAccount, newUserAccount2;
	UserProfile newUserProfile, newUserProfile2;
	PositionDetails newDetails;
	Address newAddress;
	String firstName, middleName, lastName;

	@Before
	public void initiate() throws UnknownHostException, MongoException {
		mongoClient = MongoDBConnector.getMongo();
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
	public void testCreateCompleteUser() {
		// Test updated to create two entries.

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
		newUserProfile.getAddresses().add(newAddress);
		newUserProfile.getDetails().add(newDetails);
		newUserProfile.getDetails().add(moreDetails);

		// Here we finalize our data entry and add it through our dao.
		newUserAccountDAO.save(newUserAccount);
		// UserAccount must be saved first as UserProfile has an @reference to
		// it.
		// References cannot be made to an object that does not exist.
		newUserProfileDAO.save(newUserProfile);

		// We need to create a proposal and we need to create an investigator
		// for this proposal.

		InvestigatorInfo firstInv = new InvestigatorInfo();
		Proposal proposal1 = new Proposal();

		// firstInv.setPi(newUserProfile);

		proposal1.setProposalNo(10001);
		proposal1.setInvestigatorInfo(firstInv);

		ProposalDAO newProposalDAO = new ProposalDAO(mongoClient, morphia,
				dbName);
		newProposalDAO.save(proposal1);

		// public Proposal() {
		// proposalNo = new String();
		// dateReceived = new Date();
		// investigatorInfo = new InvestigatorInfo();
		// projectInfo = new ProjectInfo();
		// sponsorAndBudgetInfo = new SponsorAndBudgetInfo();
		// costShareInfo = new CostShareInfo();
		// universityCommitments = new UniversityCommitments();
		// conflicOfInterest = new ConflictOfInterest();
		// complianceInfo = new ComplianceInfo();
		// }

		// ///////////////////////////////////////////////////////////////
		// //////////////////////////////////////////////////////////////
		// /// SECOND USER CREATION BEGINS BELOW //////////////////////
		// ////////////////////////////////////////////////////////////
		// ///////////////////////////////////////////////////////////

		// User Creation Test
		// Let's make a second person.
		firstName = "Doctor";
		middleName = "Rodney";
		lastName = "McKay";

		userName = "drodmack";

		passWord = "chevron";

		// First we create the user account object.
		// The boolean of false is currently passed in for some reason, it's for
		// the delete flag
		// in the class file. It may be removed later.
		newUserAccount2 = new UserAccount();
		newUserAccount2.setUserName(userName);
		newUserAccount2.setPassword(passWord);

		// He can choose to fill in specific details now or at a later date.
		// For now, it may be easiest to use our basic constructor.

		newUserProfile2 = new UserProfile();
		newUserProfile2.setFirstName(firstName);
		newUserProfile2.setLastName(lastName);
		newUserProfile2.setMiddleName(middleName);

		// This lets us create the object which makes the addition of
		// information a bit easier to manage.
		// Let's add the reference to the UserAccount
		newUserProfile2.setUserId(newUserAccount);

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

		positionType = "Science Personnel";
		positionTitle = "Senior Science Commander";
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
		positionType = "Master of Dungeons";
		positionTitle = "Dungeon Master";
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

		System.out.println("2 users added");

	}

}
