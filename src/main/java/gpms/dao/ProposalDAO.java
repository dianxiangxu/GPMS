//Written by : Hector C. Ortiz 

package gpms.dao;

import gpms.DAL.MongoDBConnector;
import gpms.model.AuditLog;
import gpms.model.AuditLogInfo;
import gpms.model.InvestigatorInfo;
import gpms.model.ProjectInfo;
import gpms.model.Proposal;
import gpms.model.ProposalInfo;
import gpms.model.SponsorAndBudgetInfo;
import gpms.model.Status;
import gpms.model.UserAccount;
import gpms.model.UserInfo;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
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

	public void setEditProposalNumber(Proposal proposal, String number,
			UserProfile author) {
		if (!proposal.getProposalNo().equals(number)) {
			Datastore ds = getDatastore();
			proposal.setProposalNo(number);
			AuditLog entry = new AuditLog(author, "Edited Proposal Number",
					new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditDateReceived(Proposal proposal, Date date,
			UserProfile author) {
		if (!proposal.getDateReceived().equals(date)) {
			Datastore ds = getDatastore();
			proposal.setDateReceived(date);
			AuditLog entry = new AuditLog(author, "Edited Date Received",
					new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public List<Proposal> findAll() throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).asList();
	}

	public void setEditInvestigatorInfo(Proposal proposal,
			InvestigatorInfo invInf, UserProfile author) {
		if (!proposal.getInvestigatorInfo().equals(invInf)) {
			Datastore ds = getDatastore();
			proposal.setInvestigatorInfo(invInf);
			AuditLog entry = new AuditLog(author,
					"Edited Investogator Information", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditProjectInfo(Proposal proposal, ProjectInfo projInf,
			UserProfile author) {
		if (!proposal.getProposalStatus().equals(projInf)) {
			Datastore ds = getDatastore();
			proposal.setProjectInfo(projInf);
			AuditLog entry = new AuditLog(author, "Edited Project Information",
					new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditSponsorAndBudgetInfo(Proposal proposal,
			SponsorAndBudgetInfo sponAndBudgInf, UserProfile author) {
		if (!proposal.getSponsorAndBudgetInfo().equals(sponAndBudgInf)) {
			Datastore ds = getDatastore();
			proposal.setSponsorAndBudgetInfo(sponAndBudgInf);
			AuditLog entry = new AuditLog(author,
					"Edited Sponsor and Budget Information", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditProposalStatus(Proposal proposal, Status status,
			UserProfile author) {
		if (!proposal.getProposalStatus().equals(status)) {
			Datastore ds = getDatastore();
			proposal.setProposalStatus(status);
			AuditLog entry = new AuditLog(author, "Edited Proposal Status",
					new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void deleteProposal(Proposal proposal, UserProfile author) {
		Datastore ds = getDatastore();
		proposal.setProposalStatus(Status.DELETED);
		AuditLog entry = new AuditLog(author, "Deleted Proposal", new Date());
		proposal.addEntryToAuditLog(entry);
		ds.save(proposal);
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

	public Proposal proposalById(ObjectId id) throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("_id").equal(id).get();
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
			Boolean proposalStatus) throws UnknownHostException {
		Datastore ds = getDatastore();
		ArrayList<ProposalInfo> proposals = new ArrayList<ProposalInfo>();

		Query<Proposal> proposalQuery = ds.createQuery(Proposal.class);
		Query<UserProfile> profileQuery = ds.createQuery(UserProfile.class);
		Query<UserAccount> accountQuery = ds.createQuery(UserAccount.class);

		if (projectTitle != null) {
			proposalQuery.field("project info.project title")
					.containsIgnoreCase(projectTitle);
		}

		// if (auditedBy != null) {
		// if (userProfileAudit.getUserProfileId().getUserAccount()
		// .getUserName().toLowerCase()
		// .contains(auditedBy.toLowerCase())) {
		// isAuditedByMatch = true;
		// } else if (userProfileAudit.getUserProfileId()
		// .getFirstName().toLowerCase()
		// .contains(auditedBy.toLowerCase())) {
		// isAuditedByMatch = true;
		// } else if (userProfileAudit.getUserProfileId()
		// .getMiddleName().toLowerCase()
		// .contains(auditedBy.toLowerCase())) {
		// isAuditedByMatch = true;
		// } else if (userProfileAudit.getUserProfileId()
		// .getLastName().toLowerCase()
		// .contains(auditedBy.toLowerCase())) {
		// isAuditedByMatch = true;
		// }
		// } else {
		// isAuditedByMatch = true;
		// }

		if (totalCostsFrom != null) {
			proposalQuery.field("sponsor and budget info.total costs")
					.greaterThanOrEq(totalCostsFrom);
		}
		if (totalCostsTo != null) {
			proposalQuery.field("sponsor and budget info.total costs")
					.lessThanOrEq(totalCostsTo);
		}
		if (receivedOnFrom != null) {
			proposalQuery.field("details.position type").equal(receivedOnFrom);
		}
		if (receivedOnTo != null) {
			proposalQuery.field("details.position title").equal(receivedOnTo);
		}
		if (proposalStatus != null) {
			proposalQuery.field("proposal status").equal(proposalStatus);
		}

		// profileQuery.and(profileQuery.criteria("_id").notEqual(id)
		List<UserProfile> userProfiles = profileQuery.offset(offset - 1)
				.limit(limit).asList();

		int rowTotal = profileQuery.asList().size();
		for (UserProfile userProfile : userProfiles) {
			UserInfo user = new UserInfo();
			user.setRowTotal(rowTotal);
			user.setId(userProfile.getId().toString());
			user.setUserName(userProfile.getUserAccount().getUserName());
			user.setFullName(userProfile.getFirstName() + " "
					+ userProfile.getMiddleName() + " "
					+ userProfile.getLastName());

			user.setNoOfPIedProposal(countPIProposal(userProfile));
			user.setNoOfCoPIedProposal(countCoPIProposal(userProfile));
			user.setNoOfSenioredProposal(countSeniorPersonnel(userProfile));

			user.setAddedOn(userProfile.getUserAccount().getAddedOn());

			ArrayList<AuditLogInfo> allAuditLogs = new ArrayList<AuditLogInfo>();

			if (userProfile.getAuditLog() != null
					&& userProfile.getAuditLog().size() != 0) {
				if (userProfile.getUserAccount().getAuditLog() != null
						&& userProfile.getUserAccount().getAuditLog().size() != 0) {
					for (AuditLog userAccountAudit : userProfile
							.getUserAccount().getAuditLog()) {
						AuditLogInfo userAuditLog = new AuditLogInfo();

						userAuditLog.setActivityDate(userAccountAudit
								.getActivityDate());
						userAuditLog.setUserFullName(userAccountAudit
								.getUserProfileId().getFirstName()
								+ " "
								+ userAccountAudit.getUserProfileId()
										.getMiddleName()
								+ " "
								+ userAccountAudit.getUserProfileId()
										.getLastName());
						userAuditLog.setAction(userAccountAudit.getAction());

						allAuditLogs.add(userAuditLog);
					}

				}

				for (AuditLog userProfileAudit : userProfile.getAuditLog()) {
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

			user.setLastAudited(lastAudited);
			user.setLastAuditedBy(lastAuditedBy);
			user.setLastAuditAction(lastAuditAction);

			user.setDeleted(userProfile.getUserAccount().isDeleted());
			user.setActive(userProfile.getUserAccount().isActive());
			users.add(user);
		}
		return users;
	}
}