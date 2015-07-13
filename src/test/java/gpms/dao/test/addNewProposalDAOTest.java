package gpms.dao.test;

import static org.junit.Assert.assertTrue;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
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
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class addNewProposalDAOTest {

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
				.map(ProjectInfo.class).map(InvestigatorRefAndPosition.class);
		pdao = new ProposalDAO(mongo, morphia, dbName);

		uaDAO = new UserAccountDAO(mongo, morphia, "GPMS");
		upDAO = new UserProfileDAO(mongo, morphia, "GPMS");

		ua = uaDAO.findByUserName("batman");
		piProfile = upDAO.findByUserAccount(ua);

		List<Proposal> pList = pdao.findAll();
		if (pList.size() < 1) {
			prop = new Proposal();
			irap.setUserRef(piProfile);
			irap.setCollege(piProfile.getDetails(0).getCollege());
			irap.setDepartment(piProfile.getDetails(0).getDepartment());
			irap.setPositionTitle(piProfile.getDetails(0).getPositionTitle());
			irap.setPositionType(piProfile.getDetails(0).getPositionType());
			prop.getInvestigatorInfo().setPi(irap);
		} else {
			prop = pList.get(0);
		}
	}

	@Test
	public void setInitialInfo() {
		System.out.println("Now creating new proposal...");

		System.out.println("Now adding PI info...");
		InvestigatorInfo invInf = prop.getInvestigatorInfo().clone();
		assertTrue(prop.getInvestigatorInfo().equals(invInf));
		assertTrue(prop.getInvestigatorInfo() != invInf);

		irap.setUserRef(piProfile);
		irap.setCollege(piProfile.getDetails(0).getCollege());
		irap.setDepartment(piProfile.getDetails(0).getDepartment());
		irap.setPositionTitle(piProfile.getDetails(0).getPositionTitle());
		irap.setPositionType(piProfile.getDetails(0).getPositionType());

		invInf.setPi(irap);

		pdao.setEditInvestigatorInfo(prop, invInf, piProfile);

		assertTrue(prop.getInvestigatorInfo().equals(invInf));

		System.out.println("Now adding Proposal Number...");
		pdao.setEditProposalNumber(prop, "4", piProfile);
		assertTrue(prop.getProposalNo().equals("4"));

		Date date = new Date();

		System.out.println("Now adding Date Received...");
		pdao.setEditDateReceivedr(prop, date, piProfile);
		assertTrue(prop.getDateReceived().equals(date));

		System.out.println("Now adding Proposal Status...");
		pdao.setEditProposalStatus(prop, Status.values()[3], piProfile);
		assertTrue(prop.getProposalStatus().equals(Status.values()[3]));
	}

	@Test
	public void setInvestigatorInfo() throws UnknownHostException {
		int coPiCount = 0;
		int seniorPersonnelCount = 0;
		upList = upDAO.findAll();

		// Investigator information part
		System.out.println("Editing Investigator Information...");

		InvestigatorInfo invInf = prop.getInvestigatorInfo().clone();

		assertTrue(prop.getInvestigatorInfo().equals(invInf));
		assertTrue(prop.getInvestigatorInfo() != invInf);

		for (UserProfile up : upList) {
			if (!up.equals(prop.getInvestigatorInfo().getPi().getUserRef())) {
				irap = new InvestigatorRefAndPosition();
				irap.setUserRef(up);
				irap.setCollege(up.getDetails(0).getCollege());
				irap.setDepartment(up.getDetails(0).getDepartment());
				irap.setPositionTitle(up.getDetails(0).getPositionTitle());
				irap.setPositionType(up.getDetails(0).getPositionType());
				if (invInf.getCo_pi().size() < 4) {
					invInf.addCo_pi(irap);
					assertTrue(invInf.getCo_pi().size() == ++coPiCount);
				} else {
					invInf.addSeniorPersonnel(irap);
					assertTrue(invInf.getSeniorPersonnel().size() == ++seniorPersonnelCount);
				}
			}
		}
		pdao.setEditInvestigatorInfo(prop, invInf, piProfile);
	}

	@Test
	public void setProjectInformation() {
		// Project Information Part
		System.out.println("Now editing Project Information...");
		ProjectInfo projInf = prop.getProjectInfo().clone();

		assertTrue(prop.getProjectInfo().equals(projInf));
		assertTrue(prop.getProjectInfo() != projInf);

		projInf.setProjectTitle("Software Security");
		assertTrue(projInf.getProjectTitle().equals("Software Security"));

		ProjectType projType = projInf.getProjectType();

		projType.setIsResearchBasic(false);
		assertTrue(projType.getIsResearchBasic() == false);

		projType.setIsResearchApplied(true);
		assertTrue(projType.getIsResearchApplied() == true);

		projType.setIsResearchBasic(false);
		assertTrue(projType.getIsResearchBasic() == false);

		projType.setIsResearchDevelopment(false);
		assertTrue(projType.getIsResearchDevelopment() == false);

		projType.setIsInstruction(false);
		assertTrue(projType.getIsInstruction() == false);

		projType.setIsOtherSponsoredActivity(false);
		assertTrue(projType.getIsOtherSponsoredActivity() == false);

		TypeOfRequest typeOfReq = projInf.getTypeOfRequest();

		typeOfReq.setPreProposal(true);
		assertTrue(typeOfReq.isPreProposal() == true);

		typeOfReq.setNewProposal(true);
		assertTrue(typeOfReq.isNewProposal() == true);

		typeOfReq.setContinuation(false);
		assertTrue(typeOfReq.isContinuation() == false);

		typeOfReq.setSupplement(false);
		assertTrue(typeOfReq.isSupplement() == false);

		// current time + days till its due * hours in a day * minutes in a hour
		// * seconds in a minute * millisecound in a second
		long time = System.currentTimeMillis() + 5 * 24 * 60 * 60 * 1000;
		Date dueDate = new Date(time);
		projInf.setDueDate(dueDate);
		assertTrue(projInf.getDueDate().equals(new Date(time)));

		ProjectPeriod projPer = projInf.getProjectPeriod();

		// current time + days till its due * hours in a day * minutes in a hour
		// * seconds in a minute * millisecound in a second
		time = System.currentTimeMillis() + 20 * 24 * 60 * 60 * 1000;
		Date from = new Date(time);
		projPer.setFrom(from);
		assertTrue(projPer.getFrom().equals(new Date(time)));

		// current time + days till its due * hours in a day * minutes in a hour
		// * seconds in a minute * millisecound in a second
		time = System.currentTimeMillis() + 90 * 24 * 60 * 60 * 1000;
		Date to = new Date(time);
		projPer.setTo(to);
		assertTrue(projPer.getTo().equals(new Date(time)));

		ProjectLocation projLoc = projInf.getProjectLocation();

		projLoc.setOffCampus(false);
		assertTrue(projLoc.isOffCampus() == false);

		projLoc.setOnCampus(true);
		assertTrue(projLoc.isOnCampus() == true);

		pdao.setEditProjectInfo(prop, projInf, piProfile);
	}

	@Test
	public void setSponsorAndBudgetInfo() {
		int count = 0;

		System.out.println("Now editing Sponsor and budget info...");

		SponsorAndBudgetInfo sponAndBudg = prop.getSponsorAndBudgetInfo()
				.clone();

		assertTrue(prop.getSponsorAndBudgetInfo().equals(sponAndBudg));
		assertTrue(prop.getSponsorAndBudgetInfo() != sponAndBudg);

		List<String> grantingAgencies = sponAndBudg.getGrantingAgency();

		grantingAgencies.add("Orocovis");
		assertTrue(grantingAgencies.size() == count + 1);
		count++;
		grantingAgencies.add("Inter Bayamon");
		assertTrue(grantingAgencies.size() == count + 1);
		count++;

		sponAndBudg.setDirectCosts(100013.43);
		assertTrue(sponAndBudg.getDirectCosts() == 100013.43);

		sponAndBudg.setFACosts(4323.75);
		assertTrue(sponAndBudg.getFACosts() == 4323.75);

		sponAndBudg.setTotalCosts(sponAndBudg.getDirectCosts()
				+ sponAndBudg.getFACosts());
		assertTrue(sponAndBudg.getTotalCosts() == sponAndBudg.getDirectCosts()
				+ sponAndBudg.getFACosts());

		sponAndBudg.setFARate(0.7);
		assertTrue(sponAndBudg.getFARate() == 0.7);

		pdao.setEditSponsorAndBudgetInfo(prop, sponAndBudg, piProfile);
	}
}
