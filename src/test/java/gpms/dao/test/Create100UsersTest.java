package gpms.dao.test;

import static org.junit.Assert.*;

import java.util.List;
import java.util.Random;

import gpms.DAL.DepartmentsPositionsCollection;
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

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class Create100UsersTest {

	MongoClient mongoClient;
	Morphia morphia;
	String dbName = "GPMS";
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;
	ProposalDAO newProposalDAO;
	final int MAXIMUM_PROFILES = 2; //Adjust this to make more or less profiles with the generator.

	@Before
	public void initiate() 
	{
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
		newProposalDAO = new ProposalDAO(mongoClient, morphia, dbName);
	}

	

	@Test
	public void create100()
	{
		int creationCounter = 0;

		while(creationCounter < MAXIMUM_PROFILES)
		{
			String userProfile = "userName"+creationCounter;
			String userAccount = "userAccount"+creationCounter;
			String firstName = "firstName"+creationCounter;
			String middleName = "middleName"+creationCounter;
			String lastName = "lastName"+creationCounter;
			
			UserAccount newAccount = new UserAccount();
			UserProfile newProfile = new UserProfile();
			
			newAccount.setUserName(userAccount);
			newAccount.setPassword(userAccount);
			newProfile.setFirstName(firstName);
			
			Random rand1 = new Random();
			int haveMiddle = rand1.nextInt(3);
			if(haveMiddle < 1)
			{
				newProfile.setMiddleName(middleName);
			}
			
			newProfile.setLastName(lastName);
			newProfile.setUserId(newAccount);
			newProfile.getHomeNumbers().add("208-466-1200");
			newProfile.getOfficeNumbers().add("208-494-7492");
			newProfile.getMobileNumbers().add("208-702-4522");
			newProfile.getWorkEmails().add("workman@worksite.org");
			newProfile.getPersonalEmails().add("supercoolbro@yahoo.com");
			
			
			//Add two Position Detail objects to the user profile
			setTheDeets(newProfile);
			setTheDeets(newProfile);

			Address newAddress = new Address();
			
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
			
			Address newAddress2 = new Address();
			
			newProfile.getAddresses().add(newAddress);
			
			street = "466 West Floridian Road";
			city = "Langley";
			state = "Virginia";
			zipcode = "22192";
			country = "United States";

			newAddress2.setStreet(street);
			newAddress2.setCity(city);
			newAddress2.setState(state);
			newAddress2.setZipcode(zipcode);
			newAddress2.setCountry(country);
			
			newProfile.getAddresses().add(newAddress2);
			
			//Save the informations
			newUserAccountDAO.save(newAccount);
			newUserProfileDAO.save(newProfile);
			
			newUserProfileDAO.addHomeNumber(newProfile, newProfile, "208-938-9302");
			newUserProfileDAO.addWorkEmail(newProfile, newProfile, "alternatecontact@officialplace.com");
			


			
			//Increment Count
			creationCounter++;
		}
		
		
	}
	
	/**
	 * This method does some random assignment of position details to the profile
	 * @param theProfile
	 */
	public void setTheDeets(UserProfile theProfile)
	{
		DepartmentsPositionsCollection newThing = new DepartmentsPositionsCollection();
		List<String> firstList = newThing.getCollegeKeys(); 
		PositionDetails newDetails = new PositionDetails();
		Random rand = new Random();
		
		int choice1 = rand.nextInt(firstList.size());
		newDetails.setCollege(firstList.get(choice1));
		
		List<String> secondList = newThing.getDepartmentKeys(firstList.get(choice1));
		int choice2 = rand.nextInt(secondList.size());
		newDetails.setDepartment(secondList.get(choice2));
		
		List<String> thirdList = newThing.getPositionType(firstList.get(choice1), secondList.get(choice2));
		int choice3 = rand.nextInt(thirdList.size());
		newDetails.setPositionType(thirdList.get(choice3));
		
		List<String> fourthList = newThing.getPositionTitle(firstList.get(choice1), secondList.get(choice2), thirdList.get(choice3));
		int choice4 = rand.nextInt(fourthList.size());
		newDetails.setPositionTitle(fourthList.get(choice4));
		
		theProfile.getDetails().add(newDetails);
	}
}
