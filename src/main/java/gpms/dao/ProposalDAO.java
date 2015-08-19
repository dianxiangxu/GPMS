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

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;

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

	// TODO: For Grid binding
	public List<ProposalInfo> findProposalsForGrid(int offset, int limit,
			String projectTitle, String totalCostsFrom, String totalCostsTo,
			Boolean proposalStatus, String proposedBy, Date receivedOnFrom,
			Date receivedOnTo, Boolean isActive) throws UnknownHostException {
		Datastore ds = getDatastore();
		return null; // Please make sure it bind every details/ fields on
						// ProposalInfo Object otherwise Grid can't be binded
	}

	public List<ProposalInfo> findAllForProposalGrid(int offset, int limit,
			String projectTitle, String proposedBy, Double totalCostsFrom,
			Double totalCostsTo, String receivedOnFrom, String receivedOnTo,
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

		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		if (receivedOnFrom != null) {
			Date receivedOnF = formatter.parse(receivedOnFrom);
			proposalQuery.field("date received").greaterThanOrEq(receivedOnF);
		}
		if (receivedOnTo != null) {
			Date receivedOnT = formatter.parse(receivedOnTo);
			proposalQuery.field("date received").lessThanOrEq(receivedOnT);
		}
		if (proposalStatus != null) {
			proposalQuery.field("proposal status").equal(proposalStatus);
		}

		List<Proposal> allProposals = proposalQuery.offset(offset - 1)
				.limit(limit).asList();

		int rowTotal = proposalQuery.asList().size();
		for (Proposal userProposal : allProposals) {
			ProposalInfo proposal = new ProposalInfo();

			// Proposal
			proposal.setRowTotal(rowTotal);
			proposal.setId(userProposal.getId().toString());
			proposal.setProposalNo(userProposal.getProposalNo());
			proposal.setDateReceived(userProposal.getDateReceived());
			proposal.setProposalStatus(userProposal.getProposalStatus());

			if (userProposal.getProposalStatus() == Status.DELETED) {
				proposal.setDeleted(true);
			}

			// PI, CO-PI and Senior UserProfiles

			proposal.setPIUser(userProposal.getInvestigatorInfo().getPi()
					.getUserRef().getId().toString());

			ArrayList<InvestigatorRefAndPosition> allCoPI = userProposal
					.getInvestigatorInfo().getCo_pi();
			for (InvestigatorRefAndPosition coPI : allCoPI) {
				proposal.getCOPIUsers().add(
						coPI.getUserRef().getId().toString());
			}

			ArrayList<InvestigatorRefAndPosition> allSeniors = userProposal
					.getInvestigatorInfo().getSeniorPersonnel();
			for (InvestigatorRefAndPosition senior : allSeniors) {
				proposal.getSeniorPersonnelUsers().add(
						senior.getUserRef().getId().toString());
			}

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

			proposal.setDueDate(userProposal.getProjectInfo().getDueDate());
			proposal.setProjectPeriodFrom(userProposal.getProjectInfo()
					.getProjectPeriod().getFrom());
			proposal.setProjectPeriodTo(userProposal.getProjectInfo()
					.getProjectPeriod().getTo());

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
			proposal.setFACosts(userProposal.getSponsorAndBudgetInfo()
					.getFACosts());
			proposal.setTotalCosts(userProposal.getSponsorAndBudgetInfo()
					.getTotalCosts());
			proposal.setFARate(userProposal.getSponsorAndBudgetInfo()
					.getFARate());

			ArrayList<AuditLogInfo> allAuditLogs = new ArrayList<AuditLogInfo>();

			if (userProposal.getAuditLog() != null
					&& userProposal.getAuditLog().size() != 0) {
				for (AuditLog userProfileAudit : userProposal.getAuditLog()) {
					AuditLogInfo userAuditLog = new AuditLogInfo();
					userAuditLog.setActivityDate(userProfileAudit
							.getActivityDate());
					userAuditLog
							.setUserFullName(userProfileAudit
									.getUserProfileId().getFirstName()
									+ " "
									+ userProfileAudit.getUserProfileId()
											.getMiddleName()
									+ " "
									+ userProfileAudit.getUserProfileId()
											.getLastName());
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

			proposals.add(proposal);
		}
		return proposals;
	}
}