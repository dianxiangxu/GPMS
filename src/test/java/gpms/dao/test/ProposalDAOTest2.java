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
		Proposal prop;
		InvestigatorInfo invInf = new InvestigatorInfo();
		
		
		Scanner scan = new Scanner(System.in);
		UserProfileDAO upDAO = new UserProfileDAO(mongo, morphia, dbName);
		List<UserProfile> upList = upDAO.findAll();
		int index = -1;
		int count = 0;
		String input = "";
		
		List<Proposal> pList = pdao.findAll();
		
		for(Proposal p : pList)
		{
			System.out.println("Proposal numnber : " + count);
			System.out.println(p.toString());
			count++;
		}
		
		do
		{
			System.out.println("Please chose a proposal : ");
			index = scan.nextInt();
		}while(index < 0 || index > pList.size());
		prop = pList.get(index);
		invInf.setPi(prop.getInvestigatorInfo().getPi());
		//Investigator Information set\edit
		System.out.println("Investigator Information is : ");
		System.out.println(prop.getInvestigatorInfo().toString());
		
		ArrayList<UserProfile> coPiList = new ArrayList<UserProfile>();
		ArrayList<UserProfile> seniorPersonnelList = new ArrayList<UserProfile>();
		
		count = 0;
		input = "";
		if(upList.size() > 0)
		{

			System.out.println("Please Select a co-pi to add : ");
			for(UserProfile up : upList)
			{
				System.out.println("Do you wish to add(Y or N) : ");
				System.out.println(up.toString());
				do
				{
					System.out.println("Please enter youre choice.");
					input = scan.next();
				}while(input.charAt(0) != 'Y' && input.charAt(0) != 'N');
				if(input.charAt(0) == 'Y')
				{
					invInf.addCo_pi(up);
					//upList.remove(up);
				}
			}				
		}
		
		count = 0;
		input = "";
		if(upList.size() > 0)
		{

			System.out.println("Please Select a senior personnel to add : ");
			for(UserProfile up : upList)
			{
				System.out.println("Do you wish to add(Y or N) : ");
				System.out.println(up.toString());
				do
				{
					System.out.println("Please enter youre choice.");
					input = scan.next();
				}while(input.charAt(0) != 'Y' && input.charAt(0) != 'N');
				if(input.charAt(0) == 'Y')
				{
					invInf.addSeniorPersonnel(up);
					//upList.remove(up);
				}
			}				
		}
		
		pdao.setEditInvestigatorInfo(prop, invInf);
		
		System.out.println("New investigator info is : ");
		System.out.println(prop.getInvestigatorInfo().toString());
		
		//ProjectInformation set\edit
		System.out.println("Project Information is : ");
		System.out.println(prop.getProjectInfo().toString());
		
		ProjectInfo projInf = new ProjectInfo();
		System.out.println("Please enter the project title : ");
		input = scan.next();
		projInf.setProjectTitle(input);
		
		ProjectType projType = new ProjectType();
		boolean desicion;
		System.out.println("Please enter if is research-basic :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		projType.setIsResearchBasic(desicion);
		System.out.println("Please enter if is research-applied :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		projType.setIsResearchApplied(desicion);
		System.out.println("Please enter if is research-development :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		projType.setIsResearchDevelopment(desicion);
		System.out.println("Please enter if is instruction :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		projType.setIsInstruction(desicion);
		System.out.println("Please enter if is other sponsored activity :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		projType.setIsOtherSponsoredActivity(desicion);
		
		projInf.setProjectType(projType);
		
		TypeOfRequest typeOfReq = new TypeOfRequest();
		
		System.out.println("Please enter if is pre-proposal :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		typeOfReq.setPreProposal(desicion);
		System.out.println("Please enter if is new proposal :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		typeOfReq.setNewProposal(desicion);
		System.out.println("Please enter if is continuation :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		typeOfReq.setContinuation(desicion);
		System.out.println("Please enter if is supplement :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		typeOfReq.setSupplement(desicion);
		
		projInf.setTypeOfRequest(typeOfReq);
		
		System.out.println("How many days from today is the proposal due?");
		index = scan.nextInt();
		//Converting to milliseconds
		long time = index * 24 * 60 * 60 * 1000;
		Date dueDate = new Date(time);
		projInf.setDueDate(dueDate);
		
		ProjectPeriod projPer = new ProjectPeriod();
		
		System.out.println("How many days from today is the project begin?");
		index = scan.nextInt();
		//Converting to milliseconds
		time = index * 24 * 60 * 60 * 1000;
		Date from = new Date(time);
		projPer.setFrom(from);
		
		System.out.println("How many days from today is the project end?");
		index = scan.nextInt();
		//Converting to milliseconds
		time = index * 24 * 60 * 60 * 1000;
		Date to = new Date(time);
		projPer.setTo(to);
		
		projInf.setProjectPeriod(projPer);
		
		ProjectLocation projLoc = new ProjectLocation();
		
		System.out.println("Is the project off-campus :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		projLoc.setOffCampus(desicion);
		
		System.out.println("Is the project on-campus :(T or F)");
		input = scan.next();
		desicion = (input.charAt(0) == 'T') ? true : false;
		projLoc.setOnCampus(desicion);
		
		projInf.setProjectLocation(projLoc);
		
		pdao.setEditProjectInfo(prop, projInf);
		
		System.out.println("New project information is : ");
		System.out.println(prop.getProjectInfo().toString());
		
		//sponsor and budget information
		System.out.println("Sponsor and budget info is : ");
		System.out.println(prop.getSponsorAndBudgetInfo().toString());
		
		SponsorAndBudgetInfo sponAndBudg = new SponsorAndBudgetInfo();
		ArrayList<String> grantingAgencies = new ArrayList<String>();
		
		do
		{
			System.out.println("Please enter grenting agency name : ");
			input = scan.next();
			grantingAgencies.add(input);
			do
			{
				System.out.println("Do you wish to continue entering names? (Y or N)");
				input = scan.next();
			}while(input.charAt(0) != 'Y' && input.charAt(0) != 'N');
		}while(input.charAt(0) != 'N');
		
		sponAndBudg.setGrantingAgency(grantingAgencies);
		
		double costs = 0;
		
		System.out.println("Please enter the direct costs : ");
		costs = scan.nextDouble();
		sponAndBudg.setDirectCosts(costs);
		
		System.out.println("Please enter the F & A costs : ");
		costs = scan.nextDouble();
		sponAndBudg.setFACosts(costs);
		
		sponAndBudg.setTotalCosts(sponAndBudg.getDirectCosts() + sponAndBudg.getFACosts());
		
		System.out.println("Please enter F & A rate : ");
		costs = scan.nextDouble();
		sponAndBudg.setFARate(costs);
		
		pdao.setEditSponsorAndBudgetInfo(prop, sponAndBudg);
		
		System.out.println("New Sponsor and budget info is : ");
		System.out.println(prop.getSponsorAndBudgetInfo().toString());
		scan.close();
	}

}
