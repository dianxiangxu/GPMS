package gpms.dao.test;

import static org.junit.Assert.*;

import java.net.UnknownHostException;
import java.util.Date;
import java.util.List;

import gpms.dao.ProposalDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.InvestigatorInfo;
import gpms.model.PositionDetails;
import gpms.model.ProjectInfo;
import gpms.model.ProjectPeriod;
import gpms.model.ProjectType;
import gpms.model.Proposal;
import gpms.model.SponsorAndBudgetInfo;
import gpms.model.TypeOfRequest;
import gpms.model.UserProfile;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class ProposalDAOTest 
{
	public ProposalDAOTest()
	{
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}
	
	@Test
	public void TestAddProposal() throws UnknownHostException
	{
		// Create a Mongo instance that points to the MongoDB running on
		// local host
		MongoClient mongo = new MongoClient("localhost");

		// Create a Morphia object and map our model classes
		Morphia morphia = new Morphia();
		morphia.map(Proposal.class).map(InvestigatorInfo.class).map(ProjectType.class);
		morphia.map(TypeOfRequest.class).map(ProjectPeriod.class).map(SponsorAndBudgetInfo.class);
		morphia.map(UserProfile.class).map(PositionDetails.class).map(ProjectInfo.class);
		
		ProposalDAO pdao = new ProposalDAO(mongo, morphia);
		
		List<Proposal> pList = pdao.getAllProposals();
		
		
		System.out.println("Proposals before we start.");
		
		for(Proposal p : pList)
		{
			System.out.println(p.toString());
		}
		
		System.out.println("Now creating proposal...");
		
		Proposal prop = new Proposal();
		
		InvestigatorInfo invInf = new InvestigatorInfo();
		
		UserProfileDAO upDAO = new UserProfileDAO(mongo, morphia); 
				
		List<UserProfile> upList = upDAO.findAll();
		
		System.out.println("Adding Investigator Info from Data Base...");
		
		for(UserProfile up : upList)
		{
			if(up.getFirstName() == "Dianxiang")
				invInf.set_pi(up);
			else if(invInf.get_co_pi().size() <= 4 )
				invInf.add_co_pi(up);
			else if(invInf.get_senior_personnel().size() <= 10)
				invInf.add_senior_personnel(up);
		}
		
		System.out.println("Adding project type info...");
		
		ProjectType projType = new ProjectType();
		projType.set_is_research_applied(true);
		
		System.out.println("Adding type of requiest info...");
		
		TypeOfRequest tor = new TypeOfRequest();
		tor.setIsPreProposal(true);
		
		System.out.println("Adding project period info...");
		
		ProjectPeriod pp = new ProjectPeriod();
		pp.setFrom(new Date());
		Date to = new Date();
		to.setDate(14);
		pp.setTo(to);
		
		System.out.println("Configuring all project information...");
		
		ProjectInfo projInf = new ProjectInfo();
		projInf.setProjectTitle("Software Security");
		projInf.setProjectType(projType);
		projInf.setTypeOfRequest(tor);
		projInf.setDueDate(new Date());
		projInf.setProjectPeriod(pp);
		projInf.setIsOnCampus(true);
		
		System.out.println("Adding sponsor and budget info...");
		
		SponsorAndBudgetInfo sabi = new SponsorAndBudgetInfo();
		sabi.addGrantingAgency("NFS");
		sabi.addGrantingAgency("Orocovis");
		sabi.setDirectCosts(1500000.00);
		sabi.setFACosts(100000.00);
		sabi.setTotalCosts(sabi.getDirectCosts() + sabi.getFACosts());
		sabi.setFARate(.12);
		
		prop.setProposalNo("12");
		prop.setDateReceived("6/9/2015");
		prop.setInvestigatorInfo(invInf);
		prop.setProjectInfo(projInf);
		prop.setSponsorAndBudgetInfo(sabi);
		
		pdao.save(prop);
		
		pList = pdao.getAllProposals();
		
		System.out.println("Proposals after adding new proposal...");
		
		for(Proposal p : pList)
		{
			System.out.println(p.toString());
		}
	}
}
