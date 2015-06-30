package gpms.dao.test;

import static org.junit.Assert.*;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.AuditLog;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class ProposalDAOTest {

	// private final static Logger logger = LoggerFactory
	// .getLogger(MongoDBConnector.class);

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
				.map(ProjectInfo.class).map(AuditLog.class);
		pdao = new ProposalDAO(mongo, morphia, dbName);
		// datastore = morphia.createDatastore(mongo, dbName);
	}
	
	@Test
	public void testCreatingEditingProposal() throws UnknownHostException
	{
		Proposal prop;
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
		
		UserProfile piProfile = upDAO.findByUserAccount(ua);
		List<UserProfile> upList = upDAO.findAll();
		int index = -1;
		
		List<Proposal> pList = pdao.proposalByPiId(piProfile);
		
		if(pList.size() > 0)
		{
			System.out.println("To create a new proposal enter \"N\"");
			System.out.println("To edit existing proposal enter \"E\"");
			do
			{
				System.out.println("Please enter youre choice : ");
				input = scan.next();
			}while(input.charAt(0) != 'E' && input.charAt(0) != 'N');
		}
		else 
		{
			input = "N";
		}
		
		if(input.charAt(0) == 'E')
		{
			do
			{
				count = 0;
				for(Proposal p : pList)
				{
					if(!p.getIsDeleted())
					{
						System.out.println("Proposal numnber : " + count);
						System.out.println(p.toString());
					}	
					count++;
				}
				
				do
				{
					System.out.println("Please chose a proposal : ");
					index = scan.nextInt();
				}while(index < 0 || index > pList.size());
				prop = pList.get(index);
				
				System.out.println("To delete enter \"D\"");
				System.out.println("To update enter \"U\"");
				
				do
				{
					System.out.println("Please enter selection : ");
					input = scan.next();
				}while(input.charAt(0) != 'D' && input.charAt(0) != 'U');
				
				if(input.charAt(0) == 'D')
				{
					pdao.deleteProposal(prop, piProfile);
				}
				
			}while(input.charAt(0) == 'D');
		}
		else
		{
			System.out.println("Now creating new proposal...");
			prop = new Proposal();
			prop.getInvestigatorInfo().setPi(piProfile);
			upList.remove(piProfile);
			System.out.println("Please enter a Proposal number: ");
			input = scan.next();
			prop.setProposalNo(input);
			prop.setDateReceived(new Date());
		}
		
		//Proposal Status
		System.out.println("Proposal Status is : ");
		System.out.println(prop.getProposalStatus().toString());
		
		System.out.println("Do you wish to change the status ?(Y or N) ");
		do
		{
			System.out.println("Please enter choice : ");
			input = scan.next();
			input.toUpperCase();
		}while(input.charAt(0) != 'Y' && input.charAt(0) != 'N');
		
		count = 0;
		if(input.charAt(0) == 'Y')
		{
			System.out.println("Please choose one of the following, ");
			for(Status stat : Status.values())
			{
				System.out.println(count++ + " " + stat.toString());
			}
			System.out.println("Please choose a Status : ");
			do
			{
				System.out.println("Please enter your choice :");
				index =scan.nextInt();
			}while(index < 0 || index > Status.values().length);
			pdao.setEditProposalStatus(prop, Status.values()[index], piProfile);
		}
		
		//Investigator Information set\edit
		System.out.println("Investigator Information is : ");
		InvestigatorInfo invInf = prop.getInvestigatorInfo().clone();
		
		assertTrue(prop.getInvestigatorInfo().equals(invInf));
		assertTrue(prop.getInvestigatorInfo() != invInf);
		
		System.out.println(invInf.toString());
		
		ArrayList<UserProfile> coPiList = invInf.getCo_pi();
		ArrayList<UserProfile> seniorPersonnelList = invInf.getSeniorPersonnel();
		
		System.out.println("Do you wish to edit Investigator info? (Y or N)");
		do
		{
			System.out.println("Please choose : ");
			input = scan.next();
			input.toUpperCase();
		}while(input.charAt(0) != 'N' && input.charAt(0) != 'Y');
		
		
		if(input.charAt(0) == 'Y')
		{
			do
			{
				input = "";
				count = 0;
				System.out.println("Here's your co-pi list : ");
				for(UserProfile up : coPiList)
				{
					upList.remove(up);
					System.out.println(count + " " + up.toString());
					count++;
				}
				
				System.out.println("If you wish to add a co-pi enter \"A\"");
				System.out.println("If you wish to remove a co-pi enter \"R\"");
				System.out.println("If you wish to exit \"E\"");
				do
				{
					System.out.println("Please enter your answer");
					input = scan.next();
				}while(input.charAt(0) != 'A' && input.charAt(0) != 'R' && input.charAt(0) != 'E');
				count = 0;
				if(input.charAt(0) == 'R')
				{
					for(UserProfile up : coPiList)
					{
						System.out.println(count++ + " " + up.toString());
					}
					do
					{
						System.out.println("Please enter an index :");
						index = scan.nextInt();
					}while(index < 0 || index > coPiList.size());
					upList.add(coPiList.remove(index));
				}
				else if (input.charAt(0) == 'A' && upList.size() > 0)
				{
					for(UserProfile up : upList)
					{
						System.out.println(count++ + " " + up.toString());
					}
					do
					{
						System.out.println("Please enter an index :");
						index = scan.nextInt();
					}while(index < 0 || index > upList.size());
					coPiList.add(upList.remove(index));
				}				
			}while(input.charAt(0) != 'E');
		
		
			do{
				input = "";
				count = 0;
				System.out.println("Here's your Senior Personnel list : ");
				for(UserProfile up : seniorPersonnelList)
				{
					upList.remove(up);
					System.out.println(count++ + " " + up.toString());
				}
				
				System.out.println("If you wish to add a Senior Personnel enter \"A\"");
				System.out.println("If you wish to remove a Senior Personnel enter \"R\"");
				System.out.println("If you wish to exit \"E\"");
				do
				{
					System.out.println("Please enter your answer");
					input = scan.next();
				}while(input.charAt(0) != 'A' && input.charAt(0) != 'R' && input.charAt(0) != 'E');
				count = 0;
				if(input.charAt(0) == 'R')
				{
					for(UserProfile up : seniorPersonnelList)
					{
						System.out.println(count++ + " " + up.toString());
					}
					do
					{
						System.out.println("Please enter an index :");
						index = scan.nextInt();
					}while(index < 0 || index > seniorPersonnelList.size());
					upList.add(seniorPersonnelList.remove(index));
				}
				else if (input.charAt(0) == 'A' && upList.size() > 0)
				{
					for(UserProfile up : upList)
					{
						System.out.println(count++ + " " + up.toString());
					}
					do
					{
						System.out.println("Please enter an index :");
						index = scan.nextInt();
					}while(index < 0 || index > upList.size());
					seniorPersonnelList.add(upList.remove(index));
				}				
			}while(input.charAt(0) != 'E');
		}

		pdao.setEditInvestigatorInfo(prop, invInf, piProfile);
		
		System.out.println("New investigator info is : ");
		System.out.println(prop.getInvestigatorInfo().toString());
		
		//ProjectInformation sProjectInfo projInf = prop.getProjectInfo().clone();et\edit
		ProjectInfo projInf = prop.getProjectInfo().clone();
		
		assertTrue(prop.getProjectInfo().equals(projInf));
		assertTrue(prop.getProjectInfo() != projInf);
		
		System.out.println("Project Information is : ");
		System.out.println(projInf.toString());
		System.out.println("Do you wish to edit project information ?(Y or N)");
		
		do
		{
			System.out.println("Please choose");
			input = scan.next();
		}while(input.charAt(0) != 'Y' && input.charAt(0) != 'N');
		
		if(input.charAt(0) == 'Y')
		{
			System.out.println("Please enter the project title : ");
			input = scan.next();
			projInf.setProjectTitle(input);
			
			ProjectType projType = projInf.getProjectType();
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
			
			//projInf.setProjectType(projType);
			
			TypeOfRequest typeOfReq = projInf.getTypeOfRequest();
			
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
			
			//projInf.setTypeOfRequest(typeOfReq);
			
			System.out.println("How many days from today is the proposal due?");
			index = scan.nextInt();
			//Converting to milliseconds
			long time = System.currentTimeMillis() + index * 24 * 60 * 60 * 1000;
			Date dueDate = new Date(time);
			projInf.setDueDate(dueDate);
			
			ProjectPeriod projPer = projInf.getProjectPeriod();
			
			System.out.println("How many days from today is the project begin?");
			index = scan.nextInt();
			//Converting to milliseconds
			time = System.currentTimeMillis() + index * 24 * 60 * 60 * 1000;
			Date from = new Date(time);
			projPer.setFrom(from);
			
			System.out.println("How many days from today is the project end?");
			index = scan.nextInt();
			//Converting to milliseconds
			time = System.currentTimeMillis() + index * 24 * 60 * 60 * 1000;
			Date to = new Date(time);
			projPer.setTo(to);
			
			//projInf.setProjectPeriod(projPer);
			
			ProjectLocation projLoc = projInf.getProjectLocation();
			
			System.out.println("Is the project off-campus :(T or F)");
			input = scan.next();
			desicion = (input.charAt(0) == 'T') ? true : false;
			projLoc.setOffCampus(desicion);
			
			System.out.println("Is the project on-campus :(T or F)");
			input = scan.next();
			desicion = (input.charAt(0) == 'T') ? true : false;
			projLoc.setOnCampus(desicion);
			
			//projInf.setProjectLocation(projLoc);
			
			pdao.setEditProjectInfo(prop, projInf, piProfile);
			
			System.out.println("New project information is : ");
			System.out.println(prop.getProjectInfo().toString());
		}
		//sponsor and budget information
		
		SponsorAndBudgetInfo sponAndBudg = prop.getSponsorAndBudgetInfo().clone();
		
		assertTrue(prop.getSponsorAndBudgetInfo().equals(sponAndBudg));
		assertTrue(prop.getSponsorAndBudgetInfo() != sponAndBudg);
		
		System.out.println("Sponsor and budget info is : ");
		System.out.println(sponAndBudg.toString());
		System.out.println("Do you wish to edit project information ?(Y or N)");
		
		do
		{
			System.out.println("Please choose");
			input = scan.next();
		}while(input.charAt(0) != 'Y' && input.charAt(0) != 'N');
		
		if(input.charAt(0) == 'Y')
		{
			List<String> grantingAgencies = sponAndBudg.getGrantingAgency();
			
			do
			{
				input = "";
				count = 0;
				System.out.println("Here's your agency name list : ");
				for(String agency : grantingAgencies)
				{
					System.out.println(count++ + " " + agency);
				}
				
				System.out.println("If you wish to add a granting agency enter \"A\"");
				System.out.println("If you wish to remove a granting agency enter \"R\"");
				System.out.println("If you wish to exit \"E\"");
				do
				{
					System.out.println("Please enter your answer");
					input = scan.next();
				}while(input.charAt(0) != 'A' && input.charAt(0) != 'R' && input.charAt(0) != 'E');
				count = 0;
				if(input.charAt(0) == 'R')
				{
					for(String agency : grantingAgencies)
					{
						System.out.println(count++ + " " + agency);
					}
					do
					{
						System.out.println("Please enter an index :");
						index = scan.nextInt();
					}while(index < 0 || index > coPiList.size());
					grantingAgencies.remove(index);
				}
				else if (input.charAt(0) == 'A' && grantingAgencies.size() > 0)
				{
					System.out.println("Please enter a granting agency :");
					input = scan.next();
					grantingAgencies.add(input);
				}				
			}while(input.charAt(0) != 'E');
			
			//sponAndBudg.setGrantingAgency(grantingAgencies);
			
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
		}
		
		pdao.setEditSponsorAndBudgetInfo(prop, sponAndBudg, piProfile);
		
		System.out.println("New Sponsor and budget info is : ");
		System.out.println(prop.getSponsorAndBudgetInfo().toString());
		scan.close();
	}
}