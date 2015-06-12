package gpms.dao.test;

import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.InvestigatorInfo;
import gpms.model.PositionDetails;
import gpms.model.ProjectInfo;
import gpms.model.ProjectLocation;
import gpms.model.ProjectPeriod;
import gpms.model.ProjectType;
import gpms.model.Proposal;
import gpms.model.SponsorAndBudgetInfo;
import gpms.model.Status;
import gpms.model.TypeOfRequest;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class ProposalDAOTest {

	private final static Logger logger = LoggerFactory
			.getLogger(MongoDBConnector.class);

	private MongoClient mongo;
	private Morphia morphia;
	private ProposalDAO pdao;
	private final String dbName = "GPMS";

	// Datastore datastore;

	private static final int MAX_CO_PI_NUM = 4;
	private static final int MAX_SENIOR_PERSONNEL_NUM = 10;
	@Before
	public void initiate() throws UnknownHostException, MongoException 
	{
		mongo = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(Proposal.class).map(InvestigatorInfo.class)
				.map(ProjectType.class);
		morphia.map(TypeOfRequest.class).map(ProjectPeriod.class)
				.map(SponsorAndBudgetInfo.class);
		morphia.map(UserProfile.class).map(PositionDetails.class)
				.map(ProjectInfo.class);
		pdao = new ProposalDAO(morphia, mongo, dbName);
		//datastore = morphia.createDatastore(mongo, dbName);
	}

	@Test
	public void TestAddProposal() throws UnknownHostException 
	{
		long counter = pdao.count();
		logger.debug("The count is [" + counter + "]");

		List<Proposal> pList = pdao.findAll();

		System.out.println("Proposals before we start.");

		for (Proposal p : pList) 
		{
			System.out.println(p.toString());
		}

		System.out.println("Now creating proposal...");

		Proposal prop = new Proposal();

		InvestigatorInfo invInf = new InvestigatorInfo();

		UserProfileDAO upDAO = new UserProfileDAO(morphia, mongo, dbName);

		List<UserProfile> upList = upDAO.findAll();
		for (UserProfile up : upList) {
			System.out.println("Existing UserProfile: " + up.toString());
		}
		System.out.println("Adding Investigator Info from Data Base...");

		for (UserProfile up : upList) {
			// TODO: check the PI is the user who is adding the Proposal and
			// Co-PI/ Senior Personnel can be more than 1
			// Co-PI/ Senior Personnel need to be IN Array
			// I think we need to separate this part as different method cause
			// Addin User to the Proposal can happen after the proposal has been
			// already added?
			// Also don't add the condition to check hard coded 4 and 10 here we
			// already checked that in Info class while adding

			if(up.getUserId().getUserName().equals("xu"))
			{
				invInf.setPi(up);
			}
			else if(invInf.getCo_pi().size() <= MAX_CO_PI_NUM)
			{
				invInf.addCo_pi(up);
				System.out.println("The amount of co pi is " + invInf.getCo_pi().size());
			}
			else if (prop.getSeniorPersonnel().size() <= MAX_SENIOR_PERSONNEL_NUM)
			{
				System.out.println("Adding senior personel");
				invInf.addSeniorPersonnel(up);
			}
		}

		System.out.println("Adding project type info...");

		ProjectType projType = new ProjectType();
		projType.setIsResearchApplied(Boolean.TRUE);

		System.out.println("Adding type of requiest info...");

		TypeOfRequest tor = new TypeOfRequest();
		tor.setPreProposal(Boolean.TRUE);

		System.out.println("Adding project period info...");

		ProjectPeriod pp = new ProjectPeriod();
		pp.setFrom(new Date());
		Date to = new Date();
		pp.setTo(to);

		System.out.println("Configuring all project information...");

		ProjectInfo projInf = new ProjectInfo();
		projInf.setProjectTitle("Software Security");
		projInf.setProjectType(projType);
		projInf.setTypeOfRequest(tor);
		projInf.setDueDate(new Date());
		projInf.setProjectPeriod(pp);

		ProjectLocation pl = new ProjectLocation();
		pl.setOffCampus(Boolean.TRUE);
		pl.setOnCampus(Boolean.FALSE);
		projInf.setProjectLocation(pl);

		System.out.println("Adding sponsor and budget info...");

		SponsorAndBudgetInfo sabi = new SponsorAndBudgetInfo();
		sabi.addGrantingAgency("NFS");
		sabi.addGrantingAgency("Orocovis");
		sabi.setDirectCosts(1500000.00);
		sabi.setFACosts(100000.00);
		sabi.setTotalCosts(sabi.getDirectCosts() + sabi.getFACosts());
		sabi.setFARate(12);

		prop.setProposalNo("12");

		// TODO: add the enum Status here
		prop.setProposalStatus(Status.NEW);

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date recievedDate = new Date();
		try {
			recievedDate = dateFormat.parse("2015-6-9");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		prop.setDateReceived(recievedDate);

		prop.setInvestigatorInfo(invInf);
		prop.setProjectInfo(projInf);
		prop.setSponsorAndBudgetInfo(sabi);

		pdao.save(prop);

		pList = pdao.findAll();

		System.out.println("Proposals after adding new proposal...");

		for (Proposal p : pList) {
			System.out.println(p.toString());
		}
	}
}
