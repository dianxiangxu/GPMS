package gpms.dao.test;

import static org.junit.Assert.assertTrue;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.GPMSCommonInfo;
import gpms.model.InvestigatorInfo;
import gpms.model.InvestigatorRefAndPosition;
import gpms.model.PositionDetails;
import gpms.model.ProjectInfo;
import gpms.model.ProjectPeriod;
import gpms.model.ProjectType;
import gpms.model.Proposal;
import gpms.model.SponsorAndBudgetInfo;
import gpms.model.Status;
import gpms.model.TypeOfRequest;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class TestClass {
	MongoClient mongoClient;
	Morphia morphia;
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;
	ProposalDAO newProposalDAO;
	String dbName = "GPMS";

	@Before
	public void initiate() throws UnknownHostException, MongoException {
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
		newProposalDAO = new ProposalDAO(mongoClient, morphia, dbName);
	}

	@Test
	public void setInitialInfo() {
		System.out.println("Now creating new proposal...");
		String proposalId = "55e8c7c096f52c00e8c429ba";
		ObjectId id = new ObjectId(proposalId);

		newProposalDAO.findAllSignatureForAProposal(id);
	}
}
