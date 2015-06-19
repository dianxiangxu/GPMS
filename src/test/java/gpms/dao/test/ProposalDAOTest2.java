package gpms.dao.test;

import static org.junit.Assert.*;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
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
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class ProposalDAOTest2 {

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
		// datastore = morphia.createDatastore(mongo, dbName);
	}

	@Test
	public void TestAddProposal() throws UnknownHostException
	{
		boolean isLegit = false;
		String input = "";
		int count = 0;
		Scanner scan = new Scanner(System.in);
		UserAccount ua = new UserAccount();
		UserAccountDAO uaDAO = new UserAccountDAO(mongo, morphia, "GPMS");
		UserProfileDAO upDAO = new UserProfileDAO(mongo, morphia, "GPMS");
		
		while(isLegit != true)
		{
			System.out.println("Please enter your user account : ");
			input = scan.nextLine();
			ua = uaDAO.findByUserName(input);
			if(ua != null)
			{
				System.out.println("Please enter your password : ");
				input = scan.nextLine();
				if(input.equals(ua.getPassword()))
				{
					isLegit = true;
				}
			}
		}
		
		UserProfile up = upDAO.findByUserID(ua);
		System.out.println("Now finding proposals in wich you are PI...");
		List<Proposal> pList = pdao.proposalByPiId(up);
		for(Proposal p : pList)
		{
			System.out.println("Proposal number : " + count++);
			System.out.println(p.toString());
		}
		
		System.out.println("Now finding proposals in wich you are CO-PI...");
		pList = pdao.proposalByCoPiId(up);
		for(Proposal p : pList)
		{
			System.out.println("Proposal number : " + count++);
			System.out.println(p.toString());
		}
		
		System.out.println("Now finding proposals in wich you are Senior Personnel...");
		pList = pdao.proposalBySeniorPersonnelId(up);
		for(Proposal p : pList)
		{
			System.out.println("Proposal number : " + count++);
			System.out.println(p.toString());
		}
	}

}
