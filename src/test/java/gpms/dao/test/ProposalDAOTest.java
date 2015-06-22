package gpms.dao.test;

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
		
		//Investigator Information set\edit
		System.out.println("Investigator Information is : ");
//		InvestigatorInfo invInf = prop.getInvestigatorInfo();
//		System.out.println(invInf.toString());
		System.out.println(prop.getInvestigatorInfo().toString());
		
		ArrayList<UserProfile> coPiList = prop.getInvestigatorInfo().getCo_pi();
		ArrayList<UserProfile> seniorPersonnelList = prop.getInvestigatorInfo().getSeniorPersonnel();
		
		if(upList.size() > 0)
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
				else if (input.charAt(0) == 'A')
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
			}while(input.charAt(0) != 'E' && upList.size() > 0);
		}
		
		if(upList.size() > 0)
		{
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
				else if (input.charAt(0) == 'A')
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
			}while(input.charAt(0) != 'E' && upList.size() > 0);
		}

		pdao.setEditInvestigatorInfo(prop, piProfile);
		
		System.out.println("New investigator info is : ");
		System.out.println(prop.getInvestigatorInfo().toString());
		
		//ProjectInformation set\edit
		System.out.println("Project Information is : ");
		System.out.println(prop.getProjectInfo().toString());
		
		ProjectInfo projInf = prop.getProjectInfo();
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
		long time = System.currentTimeMillis() + index * 24 * 60 * 60 * 1000;
		Date dueDate = new Date(time);
		projInf.setDueDate(dueDate);
		
		ProjectPeriod projPer = new ProjectPeriod();
		
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
		
		pdao.setEditProjectInfo(prop, piProfile);
		
		System.out.println("New project information is : ");
		System.out.println(prop.getProjectInfo().toString());
		
		//sponsor and budget information
		System.out.println("Sponsor and budget info is : ");
		System.out.println(prop.getSponsorAndBudgetInfo().toString());
		
		SponsorAndBudgetInfo sponAndBudg = prop.getSponsorAndBudgetInfo();
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
		
		pdao.setEditSponsorAndBudgetInfo(prop, piProfile);
		
		System.out.println("New Sponsor and budget info is : ");
		System.out.println(prop.getSponsorAndBudgetInfo().toString());
		scan.close();
	}
	
//	@Test
//	public void testRemoveInvestogatorsFromProposal() throws UnknownHostException {
//		long counter = pdao.count();
//		logger.debug("The count is [" + counter + "]");
//
//		List<Proposal> pList = pdao.findAll();
//		int count = 0;
//		Scanner scan = new Scanner(System.in);
//		int index = -1;
//		System.out.println("Select a proposals by index before we start.");
//
//		for (Proposal p : pList) {
//			System.out.println(count + " " + p.toString());
//		}
//		
//		do
//		{
//			System.out.println("Please enter index: ");
//			index = scan.nextInt();
//		}while(index < 0 || index > pList.size());
//		
//		Proposal prop = pList.get(index);
//		
//		System.out.println("Geting investigator info...");
//		InvestigatorInfo invInf = prop.getInvestigatorInfo();
//		
//		System.out.println("Geting Co-Pi list...");
//		
//		ArrayList<UserProfile> coPiList = invInf.getCo_pi();
//		
//		System.out.println("Generating Co-Pi list...");
//		
//		count = 0;
//		
//		for(UserProfile userProfile : coPiList)
//		{
//			System.out.println(count + " " + userProfile.toString());
//			count++;
//		}
//		
//		do
//		{
//			System.out.println("Select the one to delete.");
//			index = scan.nextInt();
//		}while(index < 0 || index > coPiList.size());
//		
//		pdao.removeCoPi(prop, index);
//		
//		System.out.println("Geting Senior Personnel list...");
//		
//		ArrayList<UserProfile> seniorPersonnelList = invInf.getSeniorPersonnel();
//		
//		System.out.println("Generating Senior Personnel list...");
//		
//		count = 0;
//		
//		for(UserProfile userProfile : seniorPersonnelList)
//		{
//			System.out.println(count + " " + userProfile.toString());
//			count++;
//		}
//		
//		do
//		{
//			System.out.println("Select the one to delete.");
//			index = scan.nextInt();
//		}while(index < 0 || index > coPiList.size());
//		
//		pdao.removeSeniorPersonnel(prop, index);
//		
//		System.out.println("Geting updated Proposal...");
//		
//		prop = pdao.proposalById(prop.getId());
//		
//		System.out.println("Geting investigator info...");
//		invInf = prop.getInvestigatorInfo();
//		
//		System.out.println("Geting Co-Pi list...");
//		
//		coPiList = invInf.getCo_pi();
//		
//		System.out.println("Generating Co-Pi list...");
//		
//		for(UserProfile userProfile : coPiList)
//		{
//			System.out.println(userProfile.toString());
//		}
//		
//		System.out.println("Geting Senior Personnel list...");
//		
//		seniorPersonnelList = invInf.getSeniorPersonnel();
//		
//		System.out.println("Generating Senior Personnel list...");
//		
//		for(UserProfile userProfile : seniorPersonnelList)
//		{
//			System.out.println(userProfile.toString());
//		}
//
//		//scan.close();
//		
//		System.out.println("Done!");
//	}
	
//	@Test
//	public void testUpdateInvestigatorInProposal() throws UnknownHostException {
//		long counter = pdao.count();
//		logger.debug("The count is [" + counter + "]");
//
//		List<Proposal> pList = pdao.findAll();
//		int count = 0;
//		Scanner scan = new Scanner(System.in);
//		int index = -1;
//		String input = "";
//		System.out.println("Select a proposals by index before we start.");
//
//		for (Proposal p : pList) {
//			System.out.println(count + " " + p.toString());
//		}
//		
//		do
//		{
//			System.out.println("Please enter index: ");
//			index = scan.nextInt();
//		}while(index < 0 || index > pList.size());
//		
//		Proposal prop = pList.get(index);
//		
//		System.out.println("Geting investigator info...");
//		InvestigatorInfo invInf = prop.getInvestigatorInfo();
//		
//		System.out.println("Geting Co-Pi list...");
//		
//		ArrayList<UserProfile> coPiList = invInf.getCo_pi();
//		
//		System.out.println("Generating Co-Pi list...");
//		
//		count = 0;
//		
//		for(UserProfile userProfile : coPiList)
//		{
//			System.out.println(count + " " + userProfile.toString());
//			count++;
//		}
//		
//		do
//		{
//			System.out.println("Select the one to update.");
//			index = scan.nextInt();
//		}while(index < 0 || index > coPiList.size());
//		
//		UserProfile coPi = coPiList.get(index);
//		
//		System.out.println("Selected " + coPi.toString());
//		//System.out.println("Please enter a new first name: ");
//		//input = scan.next();
//		
//		coPi.setFirstName("Jose");
//		
//		pdao.updateCoPi(prop, index, coPi);
//		
//		System.out.println("Geting Senior Personnel list...");
//		
//		ArrayList<UserProfile> seniorPersonnelList = invInf.getSeniorPersonnel();
//		
//		System.out.println("Generating Senior Personnel list...");
//		
//		count = 0;
//		
//		for(UserProfile userProfile : seniorPersonnelList)
//		{
//			System.out.println("This Line");
//			System.out.println(count + " " + userProfile.toString());
//			count++;
//		}
//		
//		do
//		{
//			System.out.println("Select the one to update.");
//			index = scan.nextInt();
//		}while(index < 0 || index > coPiList.size());
//		
//		UserProfile seniorPersonnel = coPiList.get(index);
//		
//		System.out.println("Selected " + seniorPersonnel.toString());
//		//System.out.println("Please enter a new first name: ");
//		//input = scan.next();
//		
//		seniorPersonnel.setFirstName("Pepe");
//		
//		pdao.updateSeniorPersonnel(prop, index, seniorPersonnel);
//		
//		System.out.println("Geting updated Proposal...");
//		
//		prop = pdao.proposalById(prop.getId());
//		
//		System.out.println("Geting investigator info...");
//		invInf = prop.getInvestigatorInfo();
//		
//		System.out.println("Geting Co-Pi list...");
//		
//		coPiList = invInf.getCo_pi();
//		
//		System.out.println("Generating Co-Pi list...");
//		
//		for(UserProfile userProfile : coPiList)
//		{
//			System.out.println(userProfile.toString());
//		}
//		
//		System.out.println("Geting Senior Personnel list...");
//		
//		seniorPersonnelList = invInf.getSeniorPersonnel();
//		
//		System.out.println("Generating Senior Personnel list...");
//		
//		for(UserProfile userProfile : seniorPersonnelList)
//		{
//			System.out.println(userProfile.toString());
//		}
//
//		scan.close();
//		
//		System.out.println("Done!");
//	}
	
//	@Test
//	public void TestAddProposal() throws UnknownHostException {
//		long counter = pdao.count();
//		logger.debug("The count is [" + counter + "]");
//
//		List<Proposal> pList = pdao.findAll();
//
//		System.out.println("Proposals before we start.");
//
//		for (Proposal p : pList) {
//			System.out.println(p.toString());
//		}
//
//		System.out.println("Now creating proposal...");
//
//		Proposal prop = new Proposal();
//		
//		UserProfileDAO upDAO = new UserProfileDAO(mongo, morphia, dbName);
//		
//		ArrayList<UserProfile> coPiList = new ArrayList<UserProfile>();
//		ArrayList<UserProfile> seniorPersonnelList = new ArrayList<UserProfile>();
//		List<UserProfile> upList = upDAO.findAll();
//		for (UserProfile up : upList) {
//			System.out.println("Existing UserProfile: " + up.toString());
//		}
//		System.out.println("Adding Investigator Info from Data Base...");
//
//		for (UserProfile up : upList) {
//			// TODO: check the PI is the user who is adding the Proposal and
//			// Co-PI/ Senior Personnel can be more than 1
//			// Co-PI/ Senior Personnel need to be IN Array
//			// I think we need to separate this part as different method cause
//			// Addin User to the Proposal can happen after the proposal has been
//			// already added?
//			// Also don't add the condition to check hard coded 4 and 10 here we
//			// already checked that in Info class while adding
//
//			if (up.getUserAccount().getUserName().equals("sWalsh")) {
//				pdao.addPi(prop, up);
//			} else if (coPiList.size() < MAX_CO_PI_NUM) {
//				coPiList.add(up);
//				System.out.println("The amount of co pi is " + coPiList.size());
//			} else if (seniorPersonnelList.size() < MAX_SENIOR_PERSONNEL_NUM) {
//				System.out.println("Adding senior personel");
//				seniorPersonnelList.add(up);
//			}
//		}
//		
//		pdao.addCoPiList(prop, coPiList);
//		pdao.addSeniorPersonelList(prop, seniorPersonnelList);
//
//		System.out.println("Adding project type info...");
//
//		ProjectType projType = new ProjectType();
//		projType.setIsResearchApplied(Boolean.TRUE);
//
//		System.out.println("Adding type of requiest info...");
//
//		TypeOfRequest tor = new TypeOfRequest();
//		tor.setPreProposal(Boolean.TRUE);
//
//		System.out.println("Adding project period info...");
//
//		ProjectPeriod pp = new ProjectPeriod();
//		pp.setFrom(new Date());
//		Date to = new Date();
//		pp.setTo(to);
//
//		System.out.println("Configuring all project information...");
//
//		ProjectInfo projInf = new ProjectInfo();
//		projInf.setProjectTitle("Software Security");
//		projInf.setProjectType(projType);
//		projInf.setTypeOfRequest(tor);
//		projInf.setDueDate(new Date());
//		projInf.setProjectPeriod(pp);
//
//		ProjectLocation pl = new ProjectLocation();
//		pl.setOffCampus(Boolean.TRUE);
//		pl.setOnCampus(Boolean.FALSE);
//		projInf.setProjectLocation(pl);
//
//		System.out.println("Adding sponsor and budget info...");
//
//		SponsorAndBudgetInfo sabi = new SponsorAndBudgetInfo();
//		sabi.addGrantingAgency("NFS");
//		sabi.addGrantingAgency("Orocovis");
//		sabi.setDirectCosts(1500000.00);
//		sabi.setFACosts(100000.00);
//		sabi.setTotalCosts(sabi.getDirectCosts() + sabi.getFACosts());
//		sabi.setFARate(12);
//
//		prop.setProposalNo("12");
//
//		// TODO: add the enum Status here
//		prop.setProposalStatus(Status.NEW);
//
//		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//		Date recievedDate = new Date();
//		try {
//			recievedDate = dateFormat.parse("2015-6-9");
//		} catch (ParseException e) {
//			e.printStackTrace();
//		}
//		prop.setDateReceived(recievedDate);
//
//		//prop.setInvestigatorInfo(invInf);
//		prop.setProjectInfo(projInf);
//		prop.setSponsorAndBudgetInfo(sabi);
//
//		pdao.save(prop);
//
//		pList = pdao.findAll();
//
//		System.out.println("Proposals after adding new proposal...");
//
//		for (Proposal p : pList) {
//			System.out.println(p.toString());
//		}
//	}
}