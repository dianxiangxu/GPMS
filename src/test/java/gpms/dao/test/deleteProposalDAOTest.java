package gpms.dao.test;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.InvestigatorInfo;
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
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class deleteProposalDAOTest 
{
	private final static Logger logger = LoggerFactory
			.getLogger(MongoDBConnector.class);

	private MongoClient mongo;
	private Morphia morphia;
	private ProposalDAO pdao;
	private final String dbName = "GPMS";
	private Proposal prop;
	private UserAccountDAO uaDAO;
	private UserProfileDAO upDAO;
	private UserAccount ua;
	private UserProfile piProfile;

	@Before
	public void initiate() throws UnknownHostException, MongoException {
		mongo = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(Proposal.class).map(InvestigatorInfo.class)
				.map(ProjectType.class);
		morphia.map(TypeOfRequest.class).map(ProjectPeriod.class)
				.map(SponsorAndBudgetInfo.class);
		morphia.map(UserProfile.class).map(PositionDetails.class)
				.map(ProjectInfo.class);
		pdao = new ProposalDAO(mongo, morphia, dbName);

		uaDAO = new UserAccountDAO(mongo, morphia, "GPMS");
		upDAO = new UserProfileDAO(mongo, morphia, "GPMS");

		ua = uaDAO.findByUserName("hOrtiz");
		piProfile = upDAO.findByUserAccount(ua);

		List<Proposal> pList = pdao.findAll();
		if (pList.size() < 1) {
			fail("No proposals to edit");
		}

		prop = pList.get(0);
	}

	@Test
	public void deleteProposalTest() throws UnknownHostException {
		pdao.deleteProposal(prop, piProfile);
		assertTrue(prop.getProposalStatus().equals(Status.values()[6]));

		Proposal p;
		pdao.delete(prop);
		p = pdao.proposalById(prop.getId());
		assertTrue(p == null);
	}

}
