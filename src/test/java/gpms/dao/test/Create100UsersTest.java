package gpms.dao.test;

import static org.junit.Assert.*;
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

public class Create100UsersTest {

	MongoClient mongoClient;
	Morphia morphia;
	String dbName = "GPMS";
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;
	ProposalDAO newProposalDAO;

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

		while(creationCounter < 100)
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
			newUserAccountDAO.save(newAccount);
			newUserProfileDAO.save(newProfile);
			newProposalDAO.save(newProposal);
			creationCounter++;
		}
	}
}
