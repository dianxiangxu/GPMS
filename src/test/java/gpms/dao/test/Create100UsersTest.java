package gpms.dao.test;

import static org.junit.Assert.*;

import java.util.List;
import java.util.Random;

import gpms.DAL.DepartmentsPositionsCollection;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
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
	final int MAXIMUM_PROFILES = 100; //Adjust this to make more or less profiles with the generator.

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
//			String proposal = "proposal"+creationCounter;
			String userProfile = "userName"+creationCounter;
			String userAccount = "userAccount"+creationCounter;
			
			UserAccount newAccount = new UserAccount();
			UserProfile newProfile = new UserProfile();
			Proposal newProposal = new Proposal();
			InvestigatorInfo newInfo = new InvestigatorInfo();
			InvestigatorRefAndPosition newInvPos = new InvestigatorRefAndPosition();
			
			newInvPos.setUserRef(newProfile);
			newInfo.setPi(newInvPos);
			newProposal.setInvestigatorInfo(newInfo);
			newAccount.setUserName(userAccount);
			newProfile.setFirstName(userProfile);
			newProfile.setUserId(newAccount);
			
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
			
			newProfile.getDetails().add(newDetails);
			
			//Save the informations
			newUserAccountDAO.save(newAccount);
			newUserProfileDAO.save(newProfile);
			newProposalDAO.save(newProposal);
			
			//Increment Count
			creationCounter++;
		}
	}
}
