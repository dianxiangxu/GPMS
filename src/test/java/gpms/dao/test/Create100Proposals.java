package gpms.dao.test;

import static org.junit.Assert.*;

import java.net.UnknownHostException;
import java.util.List;
import java.util.Random;

import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.InvestigatorInfo;
import gpms.model.InvestigatorRefAndPosition;
import gpms.model.Proposal;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;


public class Create100Proposals 
{
	MongoClient mongoClient;
	Morphia morphia;
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;
	ProposalDAO newProposalDAO;
	String dbName = "GPMS";
	final int MAXIMUM_PROPOSALS = 100; //Adjust this to make more or less profiles with the generator.

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
	public void creationTest() throws UnknownHostException
	{
		//We'll make 100 proposals.  Each user will be made to have one proposal.
		//We'll have up to 4 co-pi's added, and up to 2 senior personnel added
		List<UserProfile> masterList = newUserProfileDAO.findAll();
		List<UserProfile> pullList = newUserProfileDAO.findAll();

		while(!pullList.isEmpty())
		{
			//Remove a user from the list
			Random rand = new Random();
			int choice = rand.nextInt(pullList.size());


			UserProfile propProfile = pullList.remove(choice);

			//This will populate the investigator info position with details
			//Currently this is set up to just use the first pos det item from the list of them from each user
			Proposal newProposal = new Proposal();
			InvestigatorInfo newInfo = new InvestigatorInfo();

			InvestigatorRefAndPosition newInvPos = new InvestigatorRefAndPosition();

			newInvPos.setCollege(propProfile.getDetails(0).getCollege());
			newInvPos.setDepartment(propProfile.getDetails(0).getDepartment());
			newInvPos.setPositionType(propProfile.getDetails(0).getPositionType());
			newInvPos.setPositionTitle(propProfile.getDetails(0).getPositionTitle());
			newInvPos.setUserRef(propProfile);


			newInfo.setPi(newInvPos);

			int totalCops = rand.nextInt(5);
			for(int a = 0; a < totalCops; a++)
			{
				newInfo.addCo_pi(makeCoPI(masterList, newInfo));

			}

			int totalSeniors = rand.nextInt(2)+1;
			for(int b = 0; b < totalSeniors; b++)
			{
				newInfo.addSeniorPersonnel(makeSenior(masterList, newInfo));
			}
			
			newProposal.setInvestigatorInfo(newInfo);
			newProposalDAO.save(newProposal);
		}




	}

	public InvestigatorRefAndPosition makeCoPI(List<UserProfile> theMasterList, InvestigatorInfo theInfo)
	{
		Random rand = new Random();
		int coChoice = rand.nextInt(theMasterList.size());
		UserProfile copProfile = theMasterList.get(coChoice);
		InvestigatorRefAndPosition newInvPos = new InvestigatorRefAndPosition();

		newInvPos.setCollege(copProfile.getDetails(0).getCollege());
		newInvPos.setDepartment(copProfile.getDetails(0).getDepartment());
		newInvPos.setPositionType(copProfile.getDetails(0).getPositionType());
		newInvPos.setPositionTitle(copProfile.getDetails(0).getPositionTitle());
		newInvPos.setUserRef(copProfile);

		return newInvPos;
	}

	public InvestigatorRefAndPosition makeSenior(List<UserProfile> theMasterList, InvestigatorInfo theInfo)
	{
		Random rand = new Random();
		int coChoice = rand.nextInt(theMasterList.size());
		UserProfile copProfile = theMasterList.get(coChoice);
		InvestigatorRefAndPosition newInvPos = new InvestigatorRefAndPosition();

		newInvPos.setCollege(copProfile.getDetails(0).getCollege());
		newInvPos.setDepartment(copProfile.getDetails(0).getDepartment());
		newInvPos.setPositionType(copProfile.getDetails(0).getPositionType());
		newInvPos.setPositionTitle(copProfile.getDetails(0).getPositionTitle());
		newInvPos.setUserRef(copProfile);
		
		return newInvPos;
	}
}