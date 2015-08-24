package gpms.dao.test;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.GPMSCommonInfo;
import gpms.model.InvestigatorInfo;
import gpms.model.InvestigatorRefAndPosition;
import gpms.model.PositionDetails;
import gpms.model.ProjectInfo;
import gpms.model.ProjectLocation;
import gpms.model.ProjectPeriod;
import gpms.model.ProjectType;
import gpms.model.Proposal;
import gpms.model.SponsorAndBudgetInfo;
import gpms.model.Status;
import gpms.model.TypeOfRequest;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class editProposalDAOTest {
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
	private List<UserProfile> upList;
	private InvestigatorRefAndPosition irap = new InvestigatorRefAndPosition();

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

		ua = uaDAO.findByUserName("userAccount0");
		piProfile = upDAO.findByUserAccount(ua);

		List<Proposal> pList = pdao.proposalByPiId(piProfile);
		if (pList.size() < 1) {
			fail("No proposals to edit");
		}

		prop = pList.get(0);
	}

	@Test
	public void editInitialInfo() {
		System.out.println("Chainging Proposal Status...");
		pdao.setEditProposalStatus(prop, Status.values()[2], piProfile,
				new GPMSCommonInfo());
		assertTrue(prop.getProposalStatus().equals(Status.values()[2]));
	}

	@Test
	public void editInvestigatorInfo() throws UnknownHostException,
			CloneNotSupportedException {
		upList = upDAO.findAll();

		InvestigatorInfo invInf = prop.getInvestigatorInfo().clone();
		ArrayList<InvestigatorRefAndPosition> coPiList = invInf.getCo_pi();
		ArrayList<InvestigatorRefAndPosition> seniorPersonnelList = invInf
				.getSeniorPersonnel();

		int coPiCount = coPiList.size();
		int seniorPersonnelCount = seniorPersonnelList.size();

		assertTrue(prop.getInvestigatorInfo().equals(invInf));
		assertTrue(prop.getInvestigatorInfo() != invInf);

		// Investigator information part
		System.out.println("Editing Investigator Information...");

		if (coPiCount > 0) {
			coPiList.remove(0);
			assertTrue(coPiList.size() == --coPiCount);
		}
		if (seniorPersonnelCount > 0) {
			seniorPersonnelList.remove(0);
			assertTrue(seniorPersonnelList.size() == --seniorPersonnelCount);
		}

		UserProfile newToAdd = upList.remove(0);

		irap.setUserRef(newToAdd);
		irap.setCollege(newToAdd.getDetails(0).getCollege());
		irap.setDepartment(newToAdd.getDetails(0).getDepartment());
		irap.setPositionTitle(newToAdd.getDetails(0).getPositionTitle());
		irap.setPositionType(newToAdd.getDetails(0).getPositionType());

		coPiList.add(irap);

		assertTrue(coPiList.size() == ++coPiCount);

		newToAdd = upList.remove(0);

		irap.setUserRef(newToAdd);
		irap.setCollege(newToAdd.getDetails(0).getCollege());
		irap.setDepartment(newToAdd.getDetails(0).getDepartment());
		irap.setPositionTitle(newToAdd.getDetails(0).getPositionTitle());
		irap.setPositionType(newToAdd.getDetails(0).getPositionType());

		seniorPersonnelList.add(irap);
		assertTrue(seniorPersonnelList.size() == ++seniorPersonnelCount);

		pdao.setEditInvestigatorInfo(prop, invInf, piProfile);
	}

	@Test
	public void editProjectInfo() throws CloneNotSupportedException {
		// Project Information Part
		System.out.println("Now editing Project Information...");
		ProjectInfo projInf = prop.getProjectInfo().clone();

		assertTrue(prop.getProjectInfo().equals(projInf));
		assertTrue(prop.getProjectInfo() != projInf);

		projInf.setProjectTitle("Data Base Stuff");
		assertTrue(projInf.getProjectTitle().equals("Data Base Stuff"));

		ProjectType projType = projInf.getProjectType();

		projType.setIsResearchBasic(true);
		assertTrue(projType.getIsResearchBasic() == true);

		TypeOfRequest typeOfReq = projInf.getTypeOfRequest();

		typeOfReq.setPreProposal(false);
		assertTrue(typeOfReq.isPreProposal() == false);
		typeOfReq.setNewProposal(false);
		assertTrue(typeOfReq.isNewProposal() == false);
		typeOfReq.setContinuation(true);
		assertTrue(typeOfReq.isContinuation() == true);
		typeOfReq.setSupplement(false);
		assertTrue(typeOfReq.isSupplement() == false);

		// current time + days till its due * hours in a day * minutes in a hour
		// * seconds in a minute * millisecound in a second
		long time = System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000;
		Date dueDate = new Date(time);
		projInf.setDueDate(dueDate);
		assertTrue(projInf.getDueDate().equals(new Date(time)));

		ProjectPeriod projPer = projInf.getProjectPeriod();

		// current time + days till its due * hours in a day * minutes in a hour
		// * seconds in a minute * millisecound in a second
		time = System.currentTimeMillis() + 25 * 24 * 60 * 60 * 1000;
		Date from = new Date(time);
		projPer.setFrom(from);
		assertTrue(projPer.getFrom().equals(new Date(time)));

		// current time + days till its due * hours in a day * minutes in a hour
		// * seconds in a minute * millisecound in a second
		time = System.currentTimeMillis() + 80 * 24 * 60 * 60 * 1000;
		Date to = new Date(time);
		projPer.setTo(to);
		assertTrue(projPer.getTo().equals(new Date(time)));

		ProjectLocation projLoc = projInf.getProjectLocation();

		projLoc.setOffCampus(true);
		assertTrue(projLoc.isOffCampus() == true);

		projLoc.setOnCampus(false);
		assertTrue(projLoc.isOnCampus() == false);

		pdao.setEditProjectInfo(prop, projInf, piProfile);
	}

	@Test
	public void editSponsorAndBudgetInfo() throws CloneNotSupportedException {
		SponsorAndBudgetInfo sponAndBudg = prop.getSponsorAndBudgetInfo()
				.clone();
		List<String> grantingAgencies = sponAndBudg.getGrantingAgency();
		int grantingAgenciesCount = grantingAgencies.size();

		assertTrue(prop.getSponsorAndBudgetInfo().equals(sponAndBudg));
		assertTrue(prop.getSponsorAndBudgetInfo() != sponAndBudg);

		System.out.println("Now editing Sponsor and budget info...");

		grantingAgencies.remove(0);
		assertTrue(grantingAgencies.size() == --grantingAgenciesCount);

		grantingAgencies.add("Pizzeria Roura");
		assertTrue(grantingAgencies.size() == ++grantingAgenciesCount);

		sponAndBudg.setDirectCosts(10063.43);
		assertTrue(sponAndBudg.getDirectCosts() == 10063.43);

		sponAndBudg.setFACosts(433.75);
		assertTrue(sponAndBudg.getFACosts() == 433.75);

		sponAndBudg.setTotalCosts(sponAndBudg.getDirectCosts()
				+ sponAndBudg.getFACosts());
		assertTrue(sponAndBudg.getTotalCosts() == sponAndBudg.getDirectCosts()
				+ sponAndBudg.getFACosts());

		sponAndBudg.setFARate(0.3);
		assertTrue(sponAndBudg.getFARate() == 0.3);

		pdao.setEditSponsorAndBudgetInfo(prop, sponAndBudg, piProfile);
	}
}