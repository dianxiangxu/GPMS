//Written by : Hector C. Ortiz 

package gpms.dao;

import gpms.DAL.MongoDBConnector;
import gpms.model.AuditLog;
import gpms.model.AuditLogInfo;
import gpms.model.GPMSCommonInfo;
import gpms.model.InvestigatorInfo;
import gpms.model.InvestigatorRefAndPosition;
import gpms.model.ProjectInfo;
import gpms.model.ProjectLocation;
import gpms.model.ProjectType;
import gpms.model.Proposal;
import gpms.model.ProposalInfo;
import gpms.model.SimplePersonnelData;
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
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class ProposalDAO extends BasicDAO<Proposal, String> {
	private static final String DBNAME = "GPMS";
	public static final String COLLECTION_NAME = "proposal";
	private static Morphia morphia;
	private static Datastore ds;
	private AuditLog audit = new AuditLog();

	private static Morphia getMorphia() throws UnknownHostException,
			MongoException {
		if (morphia == null) {
			morphia = new Morphia().map(Proposal.class);
		}
		return morphia;
	}

	@Override
	public Datastore getDatastore() {
		if (ds == null) {
			try {
				ds = getMorphia().createDatastore(MongoDBConnector.getMongo(),
						DBNAME);
			} catch (UnknownHostException | MongoException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return ds;
	}

	public ProposalDAO(MongoClient mongo, Morphia morphia, String dbName) {
		super(mongo, morphia, dbName);
	}

	public List<Proposal> findAll() throws UnknownHostException {
		
		Datastore ds = getDatastore();
		
		return ds.createQuery(Proposal.class).asList();
	}

	public Proposal findProposalByProposalID(ObjectId id)
			throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("_id").equal(id).get();
	}

	public void deleteProposal(Proposal proposal, UserProfile authorProfile,
			GPMSCommonInfo gpmsCommonObj) {
		Datastore ds = getDatastore();
		proposal.setProposalStatus(Status.DELETED);
		AuditLog entry = new AuditLog(authorProfile, "Deleted Proposal for "
				+ proposal.getProjectInfo().getProjectTitle(), new Date());
		proposal.addEntryToAuditLog(entry);
		ds.save(proposal);
	}

	public void setEditProposalStatus(Proposal proposal, Status status,
			UserProfile authorProfile, GPMSCommonInfo gpmsCommonObj) {
		if (!proposal.getProposalStatus().equals(status)) {
			Datastore ds = getDatastore();
			proposal.setProposalStatus(status);
			audit = new AuditLog(authorProfile, "Edited Proposal Status for "
					+ proposal.getProjectInfo().getProjectTitle() + " as "
					+ status, new Date());
			proposal.addEntryToAuditLog(audit);
			ds.save(proposal);
		}
	}

	public void setEditProposalNumber(Proposal proposal, String number,
			UserProfile authorProfile) {
		if (!proposal.getProposalNo().equals(number)) {
			Datastore ds = getDatastore();
			proposal.setProposalNo(number);
			AuditLog entry = new AuditLog(authorProfile,
					"Edited Proposal Number", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditDateReceived(Proposal proposal, Date date,
			UserProfile authorProfile) {
		if (!proposal.getDateReceived().equals(date)) {
			Datastore ds = getDatastore();
			proposal.setDateReceived(date);
			AuditLog entry = new AuditLog(authorProfile,
					"Edited Date Received", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditInvestigatorInfo(Proposal proposal,
			InvestigatorInfo invInf, UserProfile authorProfile) {
		if (!proposal.getInvestigatorInfo().equals(invInf)) {
			Datastore ds = getDatastore();
			proposal.setInvestigatorInfo(invInf);
			AuditLog entry = new AuditLog(authorProfile,
					"Edited Investogator Information", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditProjectInfo(Proposal proposal, ProjectInfo projInf,
			UserProfile authorProfile) {
		if (!proposal.getProposalStatus().equals(projInf)) {
			Datastore ds = getDatastore();
			proposal.setProjectInfo(projInf);
			AuditLog entry = new AuditLog(authorProfile,
					"Edited Project Information", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditSponsorAndBudgetInfo(Proposal proposal,
			SponsorAndBudgetInfo sponAndBudgInf, UserProfile authorProfile) {
		if (!proposal.getSponsorAndBudgetInfo().equals(sponAndBudgInf)) {
			Datastore ds = getDatastore();
			proposal.setSponsorAndBudgetInfo(sponAndBudgInf);
			AuditLog entry = new AuditLog(authorProfile,
					"Edited Sponsor and Budget Information", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public List<Proposal> proposalByPiId(UserProfile piId)
			throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class)
				.field("investigator info.PI.user profile").equal(piId)
				.asList();
	}

	public List<Proposal> proposalByPiDepartment(String department)
			throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class)
				.field("investigator info.PI.department").equal(department)
				.asList();
	}

	public List<Proposal> proposalByCoPiId(UserProfile coPiId)
			throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class)
				.field("investigator info.CO-PI.user profile").equal(coPiId)
				.asList();
	}

	public List<Proposal> proposalByCoPiDepartment(String department)
			throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class)
				.field("investigator info.CO-PI.department").equal(department)
				.asList();
	}

	public List<Proposal> proposalBySeniorPersonnelId(
			UserProfile seniorPersonnelId) throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class)
				.field("investigator info.senior personnel.user profile")
				.equal(seniorPersonnelId).asList();
	}

	public List<Proposal> proposalBySeniorPersonnelDepartment(String department)
			throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class)
				.field("investigator info.senior personnel.department")
				.equal(department).asList();
	}

	public List<ProposalInfo> findAllForProposalGrid(int offset, int limit,
			String projectTitle, String proposedBy, String receivedOnFrom,
			String receivedOnTo, Double totalCostsFrom, Double totalCostsTo,
			String proposalStatus) throws UnknownHostException, ParseException {
		Datastore ds = getDatastore();
		ArrayList<ProposalInfo> proposals = new ArrayList<ProposalInfo>();

		Query<Proposal> proposalQuery = ds.createQuery(Proposal.class);
		Query<UserProfile> profileQuery = ds.createQuery(UserProfile.class);
		Query<UserAccount> accountQuery = ds.createQuery(UserAccount.class);

		if (projectTitle != null) {
			proposalQuery.field("project info.project title")
					.containsIgnoreCase(projectTitle);
		}

		// investigator info.PI.user profile
		if (proposedBy != null) {
			accountQuery.field("username").containsIgnoreCase(proposedBy);
			profileQuery.criteria("user id").in(accountQuery.asKeyList());
			proposalQuery.criteria("investigator info.PI.user profile").in(
					profileQuery.asKeyList());
		}

		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		if (receivedOnFrom != null) {
			Date receivedOnF = formatter.parse(receivedOnFrom);
			proposalQuery.field("date received").greaterThanOrEq(receivedOnF);
		}
		if (receivedOnTo != null) {
			Date receivedOnT = formatter.parse(receivedOnTo);
			proposalQuery.field("date received").lessThanOrEq(receivedOnT);
		}

		if (totalCostsFrom != null && totalCostsFrom != 0.0) {
			// proposalQuery.filter("sponsor and budget info.total costs >",
			// totalCostsFrom);
			proposalQuery.field("sponsor and budget info.total costs")
					.greaterThanOrEq(totalCostsFrom);
		}
		if (totalCostsTo != null && totalCostsTo != 0.0) {
			// proposalQuery.filter("sponsor and budget info.total costs <=",
			// totalCostsTo);
			proposalQuery.field("sponsor and budget info.total costs")
					.lessThanOrEq(totalCostsTo);
		}

		if (proposalStatus != null) {
			proposalQuery.field("proposal status").equal(proposalStatus);
		}

		int rowTotal = proposalQuery.asList().size();
		List<Proposal> allProposals = proposalQuery.offset(offset - 1)
				.limit(limit).asList();

		for (Proposal userProposal : allProposals) {
			ProposalInfo proposal = new ProposalInfo();

			// Proposal
			proposal.setRowTotal(rowTotal);
			proposal.setId(userProposal.getId().toString());
			proposal.setProposalNo(userProposal.getProposalNo());

			// ProjectInfo
			proposal.setProjectTitle(userProposal.getProjectInfo()
					.getProjectTitle());

			ProjectType pt = userProposal.getProjectInfo().getProjectType();
			if (pt.getIsResearchBasic()) {
				proposal.setProjectType("Research-basic");
			} else if (pt.getIsResearchApplied()) {
				proposal.setProjectType("Research-applied");
			} else if (pt.getIsResearchDevelopment()) {
				proposal.setProjectType("Research-development");
			} else if (pt.getIsInstruction()) {
				proposal.setProjectType("Instruction");
			} else if (pt.getIsOtherSponsoredActivity()) {
				proposal.setProjectType("Other sponsored activity");
			}

			TypeOfRequest tor = userProposal.getProjectInfo()
					.getTypeOfRequest();
			if (tor.isPreProposal()) {
				proposal.getTypeOfRequest().add("Pre-proposal");
			} else if (tor.isNewProposal()) {
				proposal.getTypeOfRequest().add("New proposal");
			} else if (tor.isContinuation()) {
				proposal.getTypeOfRequest().add("Continuation");
			} else if (tor.isSupplement()) {
				proposal.getTypeOfRequest().add("Supplement");
			}

			ProjectLocation pl = userProposal.getProjectInfo()
					.getProjectLocation();
			if (pl.isOffCampus()) {
				proposal.setProjectLocation("Off-campus");
			} else if (pl.isOnCampus()) {
				proposal.setProjectLocation("On-campus");
			}

			// SponsorAndBudgetInfo
			proposal.setGrantingAgencies(userProposal.getSponsorAndBudgetInfo()
					.getGrantingAgency());
			proposal.setDirectCosts(userProposal.getSponsorAndBudgetInfo()
					.getDirectCosts());
			proposal.setFaCosts(userProposal.getSponsorAndBudgetInfo()
					.getFACosts());
			proposal.setTotalCosts(userProposal.getSponsorAndBudgetInfo()
					.getTotalCosts());
			proposal.setFaRate(userProposal.getSponsorAndBudgetInfo()
					.getFARate());

			proposal.setDateReceived(userProposal.getDateReceived());

			proposal.setDueDate(userProposal.getProjectInfo().getDueDate());
			proposal.setProjectPeriodFrom(userProposal.getProjectInfo()
					.getProjectPeriod().getFrom());
			proposal.setProjectPeriodTo(userProposal.getProjectInfo()
					.getProjectPeriod().getTo());

			proposal.setProposalStatus(userProposal.getProposalStatus());

			if (userProposal.getProposalStatus() == Status.DELETED) {
				proposal.setDeleted(true);
			}

			ArrayList<AuditLogInfo> allAuditLogs = new ArrayList<AuditLogInfo>();

			if (userProposal.getAuditLog() != null
					&& userProposal.getAuditLog().size() != 0) {
				for (AuditLog userProfileAudit : userProposal.getAuditLog()) {
					AuditLogInfo userAuditLog = new AuditLogInfo();
					userAuditLog.setActivityDate(userProfileAudit
							.getActivityDate());
					userAuditLog.setUserFullName(userProfileAudit
							.getUserProfileId().getFullName());
					userAuditLog.setAction(userProfileAudit.getAction());

					allAuditLogs.add(userAuditLog);
				}
			}
			Collections.sort(allAuditLogs);

			Date lastAudited = null;
			String lastAuditedBy = new String();
			String lastAuditAction = new String();
			if (allAuditLogs.size() > 0) {
				AuditLogInfo auditLog = allAuditLogs.get(0);
				lastAudited = auditLog.getActivityDate();
				lastAuditedBy = auditLog.getUserFullName();
				lastAuditAction = auditLog.getAction();
			}

			proposal.setLastAudited(lastAudited);
			proposal.setLastAuditedBy(lastAuditedBy);
			proposal.setLastAuditAction(lastAuditAction);

			// PI, CO-PI and Senior UserProfiles
			proposal.setPiUser(userProposal.getInvestigatorInfo().getPi()
					.getUserRef().getId().toString());

			ArrayList<InvestigatorRefAndPosition> allCoPI = userProposal
					.getInvestigatorInfo().getCo_pi();
			for (InvestigatorRefAndPosition coPI : allCoPI) {
				proposal.getCopiUsers().add(
						coPI.getUserRef().getId().toString());
			}

			ArrayList<InvestigatorRefAndPosition> allSeniors = userProposal
					.getInvestigatorInfo().getSeniorPersonnel();
			for (InvestigatorRefAndPosition senior : allSeniors) {
				proposal.getSeniorUsers().add(
						senior.getUserRef().getId().toString());
			}

			proposals.add(proposal);
		}
		return proposals;
	}

	/**
	 * 
	 * TODO is this method working as intended?
	 * Appears to just query by ID
	 */
	public Proposal findProposalDetailsByProposalID(ObjectId id) {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("_id").equal(id).get();
	}

	public List<AuditLogInfo> findAllForProposalAuditLogGrid(int offset,
			int limit, ObjectId id, String action, String auditedBy,
			String activityOnFrom, String activityOnTo) throws ParseException {
		Datastore ds = getDatastore();

		Query<Proposal> proposalQuery = ds.createQuery(Proposal.class);

		Proposal q = proposalQuery.field("_id").equal(id).get();

		ArrayList<AuditLogInfo> allAuditLogs = new ArrayList<AuditLogInfo>();
		int rowTotal = 0;
		if (q.getAuditLog() != null && q.getAuditLog().size() != 0) {
			for (AuditLog poposalAudit : q.getAuditLog()) {
				AuditLogInfo proposalAuditLog = new AuditLogInfo();
				boolean isActionMatch = false;
				boolean isAuditedByMatch = false;
				boolean isActivityDateFromMatch = false;
				boolean isActivityDateToMatch = false;

				if (action != null) {
					if (poposalAudit.getAction().toLowerCase()
							.contains(action.toLowerCase())) {
						isActionMatch = true;
					}
				} else {
					isActionMatch = true;
				}

				if (auditedBy != null) {
					if (poposalAudit.getUserProfileId().getUserAccount()
							.getUserName().toLowerCase()
							.contains(auditedBy.toLowerCase())) {
						isAuditedByMatch = true;
					} else if (poposalAudit.getUserProfileId().getFirstName()
							.toLowerCase().contains(auditedBy.toLowerCase())) {
						isAuditedByMatch = true;
					} else if (poposalAudit.getUserProfileId().getMiddleName()
							.toLowerCase().contains(auditedBy.toLowerCase())) {
						isAuditedByMatch = true;
					} else if (poposalAudit.getUserProfileId().getLastName()
							.toLowerCase().contains(auditedBy.toLowerCase())) {
						isAuditedByMatch = true;
					}
				} else {
					isAuditedByMatch = true;
				}

				DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
				if (activityOnFrom != null) {
					Date activityDateFrom = formatter.parse(activityOnFrom);
					if (poposalAudit.getActivityDate().compareTo(
							activityDateFrom) > 0) {
						isActivityDateFromMatch = true;
					} else if (poposalAudit.getActivityDate().compareTo(
							activityDateFrom) < 0) {
						isActivityDateFromMatch = false;
					} else if (poposalAudit.getActivityDate().compareTo(
							activityDateFrom) == 0) {
						isActivityDateFromMatch = true;
					}
				} else {
					isActivityDateFromMatch = true;
				}

				if (activityOnTo != null) {
					Date activityDateTo = formatter.parse(activityOnTo);
					if (poposalAudit.getActivityDate()
							.compareTo(activityDateTo) > 0) {
						isActivityDateToMatch = false;
					} else if (poposalAudit.getActivityDate().compareTo(
							activityDateTo) < 0) {
						isActivityDateToMatch = true;
					} else if (poposalAudit.getActivityDate().compareTo(
							activityDateTo) == 0) {
						isActivityDateToMatch = true;
					}
				} else {
					isActivityDateToMatch = true;
				}

				if (isActionMatch && isAuditedByMatch
						&& isActivityDateFromMatch && isActivityDateToMatch) {
					proposalAuditLog.setUserName(poposalAudit
							.getUserProfileId().getUserAccount().getUserName());
					proposalAuditLog.setUserFullName(poposalAudit
							.getUserProfileId().getFullName());
					proposalAuditLog.setAction(poposalAudit.getAction());
					proposalAuditLog.setActivityDate(poposalAudit
							.getActivityDate());

					allAuditLogs.add(proposalAuditLog);
				}
			}
		}

		Collections.sort(allAuditLogs);

		rowTotal = allAuditLogs.size();
		if (rowTotal > 0) {
			for (AuditLogInfo t : allAuditLogs) {
				t.setRowTotal(rowTotal);
			}
		}

		if (rowTotal >= (offset + limit - 1)) {
			return allAuditLogs.subList(offset - 1, offset + limit - 1);
		} else {
			return allAuditLogs.subList(offset - 1, rowTotal);
		}
	}

	public Proposal findNextProposalWithSameProjectTitle(ObjectId id,
			String newProjectTitle) {
		Datastore ds = getDatastore();

		Query<Proposal> proposalQuery = ds.createQuery(Proposal.class);

		Pattern pattern = Pattern.compile("^" + newProjectTitle + "$",
				Pattern.CASE_INSENSITIVE);

		proposalQuery.and(proposalQuery.criteria("_id").notEqual(id),
				proposalQuery.criteria("project info.project title")
						.containsIgnoreCase(pattern.pattern()));
		return proposalQuery.get();
	}

	public Proposal findAnyProposalWithSameProjectTitle(String newProjectTitle) {
		Datastore ds = getDatastore();

		Query<Proposal> proposalQuery = ds.createQuery(Proposal.class);

		Pattern pattern = Pattern.compile("^" + newProjectTitle + "$",
				Pattern.CASE_INSENSITIVE);

		proposalQuery.criteria("project info.project title")
				.containsIgnoreCase(pattern.pattern());
		return proposalQuery.get();
	}
	
	//Creating a method here to find related personnel relative to the PI, CoPI, and Senior Personnel
	//"Find Business Manager for..." etc
	//Will attempt a generic build so that one can search for Deans, etc.
	
	public List<SimplePersonnelData> PersonnelQuery(ObjectId id, String searchQuery)
	{
		ArrayList<SimplePersonnelData> spdList = new ArrayList<SimplePersonnelData>();
		SimplePersonnelData newEntry;
		Proposal queryProposal=null;
		try 
		{
			queryProposal = findProposalByProposalID(id);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		InvestigatorRefAndPosition pi = queryProposal.getInvestigatorInfo().getPi();
		String collegeSearch = pi.getCollege();
		System.out.println("The college is: " + collegeSearch);
		System.out.println("The college is: " + collegeSearch);
		System.out.println("The college is: " + collegeSearch);
		System.out.println("The college is: " + collegeSearch);
		System.out.println("The college is: " + collegeSearch);
		System.out.println("The college is: " + collegeSearch);
		System.out.println("The college is: " + collegeSearch);
		
		MongoClient mongoClient;
		mongoClient = MongoDBConnector.getMongo();
		
		Datastore ds = getDatastore();
		
		//Working out how to get through linked collections
		Query<UserProfile> q = ds.createQuery(UserProfile.class).field("details.college").equal(collegeSearch);
//		UserProfile q = profileQuery.field("details.college").equal(collegeSearch).get();
//		ds.createQuery(Proposal.class)
//		.field("investigator info.senior personnel.user profile")
//		.equal(userProfile).asList().size();
		List<UserProfile> queryProfileList = q.asList();
		for(int a = 0; a < queryProfileList.size(); a++)
		{
			newEntry = new SimplePersonnelData(queryProfileList.get(a));
			spdList.add(newEntry);		
		}
		
		ArrayList<SimplePersonnelData> queryList = new ArrayList();
		return spdList;
	}
	
}