package gpms.dao;

/**
 * @author Thomas Volz
 * 
 * @author Milson Munakami
 */

import gpms.DAL.MongoDBConnector;
import gpms.model.Address;
import gpms.model.AuditLog;
import gpms.model.AuditLogInfo;
import gpms.model.GPMSCommonInfo;
import gpms.model.PositionDetails;
import gpms.model.Proposal;
import gpms.model.UserAccount;
import gpms.model.UserInfo;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.text.ParseException;
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

public class UserProfileDAO extends BasicDAO<UserProfile, String> {
	private static final String DBNAME = "GPMS";
	public static final String COLLECTION_NAME = "userprofile";

	private static Morphia morphia;
	private static Datastore ds;
	private AuditLog audit;

	private static Morphia getMorphia() throws UnknownHostException,
			MongoException {
		if (morphia == null) {
			morphia = new Morphia().map(UserProfile.class);
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
				e.printStackTrace();
			}
		}
		ds.ensureIndexes();
		return ds;
	}

	public UserProfileDAO(MongoClient mongo, Morphia morphia, String dbName) {
		super(mongo, morphia, dbName);
	}

	// public UserProfile getUserProfile(ObjectId id) {
	// return UserProfile;
	// }

	/**
	 * 
	 * @return list of all users in the ds
	 * @throws UnknownHostException
	 */
	public List<UserProfile> findAll() throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(UserProfile.class).asList();
	}

	/*
	 * This is example format for grid Info object bind that is customized to
	 * bind in grid
	 */
	public List<UserInfo> findAllForUserGrid(int offset, int limit,
			String userName, String college, String department,
			String positionType, String positionTitle, Boolean isActive)
			throws UnknownHostException {
		Datastore ds = getDatastore();
		ArrayList<UserInfo> users = new ArrayList<UserInfo>();

		List<UserProfile> userProfiles = ds.createQuery(UserProfile.class)
				.offset(offset - 1).limit(limit).asList();
		int rowTotal = ds.createQuery(UserProfile.class).asList().size();
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
			users.add(user);
		}
		return users;
	}

	public List<UserProfile> findUsersForGrid(int offset, int limit,
			String firstName, String college, String department,
			String postitionTitle, String postitionType, Boolean isActive)
			throws UnknownHostException {
		Datastore ds = getDatastore();
		// ArrayList<UserInfo> users = new ArrayList<UserInfo>();

		// TODO: add filters based on attributes
		// Set UserAccount based on userName

		Query<UserProfile> q = ds.createQuery(UserProfile.class);

		if (firstName != null) {
			q.field("first name").contains(firstName);
		}

		if (college != null) {
			q.field("details.college").contains(college);
		}
		if (department != null) {
			q.field("details.department").contains(department);
		}

		if (postitionTitle != null) {
			q.field("details.position title").contains(postitionTitle);
		}

		if (postitionType != null) {
			q.field("details.position type").contains(postitionType);
		}

		if (isActive != null) {
			q.field("is deleted").equals(!isActive);
		}
		List<UserProfile> userProfiles = q.offset(offset - 1).limit(limit)
				.asList();

		return userProfiles;

		// int rowTotal = userProfiles.size();
		// for (UserProfile userProfile : userProfiles) {
		// UserInfo user = new UserInfo();
		// user.setRowTotal(rowTotal);
		// user.setId(userProfile.getId().toString());
		// user.setUserName(userProfile.getUserAccount().getUserName());
		// user.setFullName(userProfile.getFirstName() + " "
		// + userProfile.getMiddleName() + " "
		// + userProfile.getLastName());
		//
		// // TODO: TO bind the PI, Co-PI and Senior Proposal Count
		// user.setNoOfPIedProposal(CountPIProposal(userProfile));
		// user.setNoOfCoPIedProposal(CountCoPIProposal(userProfile));
		// user.setNoOfSenioredProposal(CountSeniorProposal(userProfile));
		// // Date today = Calendar.getInstance().getTime();
		// //
		// // SimpleDateFormat formatter = new SimpleDateFormat(
		// // "yyyy-MM-dd hh.mm.ss");
		// // String folderName = formatter.format(today);
		// // // DateFormat dfm = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// // String d = formatter.parse(userProfile.getUserAccount()
		// // .getAddedOn());
		// //
		// // user.setAddedOn(d);
		// user.setAddedOn(userProfile.getUserAccount().getAddedOn());
		// // TODO: get the lastUpdated for User here
		// Date lastUpdated =
		// userProfile.getAuditLog().get(userProfile.getAuditLog().size()-1).getActivityDate();
		// user.setLastUpdated(lastUpdated);
		//
		// user.setDeleted(userProfile.getUserAccount().isDeleted());
		// users.add(user);
		// }
		// return users;
	}

	public List<AuditLogInfo> findAllForUserAuditLogGrid(int offset, int limit,
			ObjectId userId, String action, String auditedBy,
			String activityOnFrom, String activityOnTo) throws ParseException,
			UnknownHostException {

		Datastore ds = getDatastore();
		UserProfile q = ds.createQuery(UserProfile.class).field("_id")
				.equal(userId).get();
		// .order("audit log.activity on")

		ArrayList<AuditLogInfo> allAuditLogs = new ArrayList<AuditLogInfo>();
		int rowTotal = 0;
		if (q.getAuditLog() != null && q.getAuditLog().size() != 0) {
			rowTotal = q.getAuditLog().size();
			for (AuditLog userProfileAudit : q.getAuditLog()) {
				AuditLogInfo userAuditLog = new AuditLogInfo();
				userAuditLog.setRowTotal(rowTotal);
				userAuditLog.setUserName(userProfileAudit.getUserProfileId()
						.getUserAccount().getUserName());
				userAuditLog.setUserFullName(userProfileAudit
						.getUserProfileId().getFirstName()
						+ " "
						+ userProfileAudit.getUserProfileId().getMiddleName()
						+ " "
						+ userProfileAudit.getUserProfileId().getLastName());
				userAuditLog.setAction(userProfileAudit.getAction());
				userAuditLog
						.setActivityDate(userProfileAudit.getActivityDate());

				allAuditLogs.add(userAuditLog);
			}
		}

		if (q.getUserAccount().getAuditLog() != null
				&& q.getUserAccount().getAuditLog().size() != 0) {
			rowTotal += q.getUserAccount().getAuditLog().size();
			for (AuditLog userAccountAudit : q.getUserAccount().getAuditLog()) {
				AuditLogInfo userAuditLog = new AuditLogInfo();
				userAuditLog.setRowTotal(rowTotal);
				userAuditLog.setUserName(userAccountAudit.getUserProfileId()
						.getUserAccount().getUserName());
				userAuditLog.setUserFullName(userAccountAudit
						.getUserProfileId().getFirstName()
						+ " "
						+ userAccountAudit.getUserProfileId().getMiddleName()
						+ " "
						+ userAccountAudit.getUserProfileId().getLastName());
				userAuditLog.setAction(userAccountAudit.getAction());
				userAuditLog
						.setActivityDate(userAccountAudit.getActivityDate());

				allAuditLogs.add(userAuditLog);
			}

		}
		// Query<AuditLogInfo> q = ds.createQuery(AuditLogInfo.class);
		// TODO Filter the AuditLog based on these Filters
		// if (action != null) {
		// q.field("first name").contains(action);
		// }
		//
		// if (auditedBy != null) {
		// q.field("first name").contains(auditedBy);
		// }
		//
		// SimpleDateFormat formatter = new
		// SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// // Need to do Range for give 2 Dates
		// if (activityOnFrom != null) {
		//
		// Date activityDateFrom = formatter.parse(activityOnFrom);
		// q.field("startDate").greaterThanOrEq(activityDateFrom);
		// }
		//
		// if (activityOnTo != null) {
		// Date activityDateTo = formatter.parse(activityOnTo);
		// q.field("startDate").lessThanOrEq(activityDateTo);
		// }
		//
		// List<AuditLogInfo> userAuditLogs = q.offset(offset - 1).limit(limit)
		// .asList();

		// List<AuditLogInfo> userAuditLogs = ds.createQuery(AuditLogInfo.class)
		// .offset(offset - 1).limit(limit).asList();

		Collections.sort(allAuditLogs);

		if (rowTotal >= (offset + limit - 1)) {
			return allAuditLogs.subList(offset - 1, offset + limit - 1);
		} else {
			return allAuditLogs.subList(offset - 1, rowTotal);
		}
	}

	private int countPIProposal(UserProfile userProfile) {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class)
				.field("investigator info.PI.user profile").equal(userProfile)
				.asList().size();
	}

	private int countCoPIProposal(UserProfile userProfile) {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class)
				.field("investigator info.CO-PI.user profile")
				.equal(userProfile).asList().size();
	}

	private int countSeniorPersonnel(UserProfile userProfile) {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class)
				.field("investigator info.senior personnel.user profile")
				.equal(userProfile).asList().size();
	}

	public UserProfile findUserByProfileID(ObjectId id) {
		Datastore ds = getDatastore();
		return ds.createQuery(UserProfile.class).field("_id").equal(id).get();
	}

	public UserProfile findByID(String id) {
		Datastore ds = getDatastore();
		return ds.createQuery(UserProfile.class).field("_id").equal(id).get();
	}

	public UserProfile findByUserAccount(UserAccount userAccount) {
		Datastore ds = getDatastore();

		// UserProfile temp = query.field("user id.$id").equal(id).get();
		// UserProfile tempUser = ds.createQuery(UserProfile.class);
		// .field("user id.id").equal(id).get();
		return ds.createQuery(UserProfile.class).field("user id")
				.equal(userAccount).get();
	}

	public void deleteUserProfileByUserID(UserProfile userProfile,
			UserProfile authorProfile, GPMSCommonInfo gpmsCommonObj) {
		Datastore ds = getDatastore();
		audit = new AuditLog(authorProfile,
				"Deleted user " + userProfile.getFirstName() + " "
						+ userProfile.getMiddleName() + " "
						+ userProfile.getLastName(), new Date());
		userProfile.addEntryToAuditLog(audit);

		userProfile.setDeleted(true);
		ds.save(userProfile);
	}

	public void activateUserProfileByUserID(UserProfile userProfile,
			UserProfile authorProfile, GPMSCommonInfo gpmsCommonObj,
			Boolean isActive) {
		Datastore ds = getDatastore();
		audit = new AuditLog(authorProfile,
				"Deleted user " + userProfile.getFirstName() + " "
						+ userProfile.getMiddleName() + " "
						+ userProfile.getLastName(), new Date());
		userProfile.addEntryToAuditLog(audit);

		userProfile.setDeleted(!isActive);
		ds.save(userProfile);

	}

	/**
	 * 
	 * @param firstName
	 *            first name to search by
	 * @return list of users matching the first name
	 */
	public List<UserProfile> findByFirstName(String firstName) {
		// Could not make this work with .find methods. It threw errors every
		// time.
		// Had to use a query and createQuery method, and to search by field,
		// seems stable this way
		Datastore ds = getDatastore();
		Query<UserProfile> q = ds.createQuery(UserProfile.class)
				.field("first name").equal(firstName);
		return q.asList();
	}

	public List<UserProfile> findByFirstNameIgnoreCase(String firstName) {
		// This may be the go-to method for searching by name.
		// Still needs more testing, I believe it may actually look for any
		// phrase that
		// contains the given search query, ie: a search of "rIck" would return
		// both a "RICK" and a "Brick".
		// But these "similarities" may be preferred
		Datastore ds = getDatastore();
		Query<UserProfile> query = ds.createQuery(UserProfile.class);
		query.criteria("first name").containsIgnoreCase(firstName);
		// Query<UserProfile> q =
		// ds.createQuery(UserProfile.class).criteria("first name").containsIgnoreCase(firstName);
		return query.asList();
	}

	// /**
	// * Returns list sorted by First Name
	// * @param firstName
	// * @return
	// */
	// public List<UserProfile> sortAllByFirstName(String firstName)
	// {
	// //Could not make this work with .find methods. It threw errors every
	// time.
	// //Had to use a query and createQuery method, and to search by field,
	// seems stable this way
	// Datastore ds = getDatastore();
	// Query<UserProfile> q = ds.find(UserProfile.class).
	// return q.asList();
	// }

	/**
	 * Name search for specified name at param
	 * 
	 * @param middleName
	 *            middle name to search for
	 * @return list of all users in the ds with middleName
	 */
	public List<UserProfile> findByMiddleName(String middleName) {
		// Could not make this work with .find methods. It threw errors every
		// time.
		// Had to use a query and createQuery method, and to search by field,
		// seems stable this way
		Datastore ds = getDatastore();
		Query<UserProfile> q = ds.createQuery(UserProfile.class)
				.field("middle name").equal(middleName);
		return q.asList();
	}

	/**
	 * Name search for specified name at param
	 * 
	 * @param lastName
	 *            last name to search for
	 * @return list of all users in the ds with lastName
	 */
	public List<UserProfile> findByLastName(String lastName) {
		Datastore ds = getDatastore();
		Query<UserProfile> q = ds.createQuery(UserProfile.class)
				.field("last name").equal(lastName);
		return q.asList();
	}

	/**
	 * 
	 * @param email
	 * @return
	 */
	public UserProfile findByEmail(String email) {
		// May be the
		Datastore ds = getDatastore();
		UserProfile res = ds.find(UserProfile.class).filter("email = ", email)
				.get();
		return res;
	}

	/**
	 * Sets the first name of a user profile
	 * 
	 * @param profile
	 *            the user profile to change
	 * @param newName
	 *            the new name to set
	 */
	public void setFirstName(UserProfile author, UserProfile target,
			String newName) {
		// Accesscontrol ac = new Accesscontrol();
		// ac.getXACMLdecision(userName, resource, action);
		// Datastore ds = getDatastore();
		if (!target.getFirstName().equals(newName)) {
			audit = new AuditLog(author, "Edited first name", new Date());
			target.addEntryToAuditLog(audit);
			target.setFirstName(newName);
			ds.save(target);
		}
	}

	/**
	 * Sets the middle name of a user profile
	 * 
	 * @param profile
	 *            the user profile to change
	 * @param newName
	 *            the new name to set
	 */
	public void setMiddleName(UserProfile author, UserProfile target,
			String newName) {
		Datastore ds = getDatastore();
		if (!target.getMiddleName().equals(newName)) {
			audit = new AuditLog(author, "Edited middle name", new Date());
			target.addEntryToAuditLog(audit);
			target.setMiddleName(newName);
			ds.save(target);
		}
	}

	/**
	 * Sets the last name of a user profile
	 * 
	 * @param profile
	 *            the user profile to change
	 * @param newName
	 *            the new name to set
	 */
	public void setLastName(UserProfile author, UserProfile target,
			String newName) {
		Datastore ds = getDatastore();
		if (!target.getLastName().equals(newName)) {
			audit = new AuditLog(author, "Edited last name", new Date());
			target.addEntryToAuditLog(audit);
			target.setLastName(newName);
			ds.save(target);
		}
	}

	public void setDateOfBirth(UserProfile author, UserProfile target,
			Date newDOB) {
		Datastore ds = getDatastore();
		if (!target.getDateOfBirth().equals(newDOB)) {
			audit = new AuditLog(author, "Edited Date Of Birth", new Date());
			target.addEntryToAuditLog(audit);
			target.setDateOfBirth(newDOB);
			ds.save(target);
		}
	}

	public void setGender(UserProfile author, UserProfile target,
			String newGender) {
		Datastore ds = getDatastore();
		if (!target.getGender().equals(newGender)) {
			audit = new AuditLog(author, "Edited Gender", new Date());
			target.addEntryToAuditLog(audit);
			target.setGender(newGender);
			ds.save(target);
		}
	}

	// /**
	// * Returns a list of the details lists
	// * @param profile
	// * @return
	// */
	// public List getDetailsList(UserProfile profile)
	// {
	// List<PositionDetails> list = profile.getDetailsList();
	//
	// return list;
	// }

	/**
	 * Delete a specific "details" entry from a user profile
	 * 
	 * @param profile
	 *            the profile to use
	 * @param details
	 *            the details to delete
	 */
	public void removeDetails(UserProfile author, UserProfile target,
			PositionDetails details) {
		Datastore ds = getDatastore();
		audit = new AuditLog(author, "Removed details", new Date());
		target.addEntryToAuditLog(audit);
		target.getDetails().remove(target.getDetails().indexOf(details));
		ds.save(target);
	}

	/**
	 * Add a details object to the details of the user
	 * 
	 * @param profile
	 *            the profile to use
	 * @param details
	 *            the details to add
	 */
	public void addDetails(UserProfile author, UserProfile target,
			PositionDetails details) {
		Datastore ds = getDatastore();
		audit = new AuditLog(author, "Added details", new Date());
		target.addEntryToAuditLog(audit);
		target.getDetails().add(details);
		ds.save(target);
	}

	public void addOfficeNumber(UserProfile author, UserProfile target,
			String number) {
		Datastore ds = getDatastore();
		if (!target.getOfficeNumbers().contains(number)) {
			audit = new AuditLog(author, "Added office number " + number,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getOfficeNumbers().add(number);
			ds.save(target);
		}
	}

	public void deleteOfficeNumber(UserProfile author, UserProfile target,
			String number) {
		Datastore ds = getDatastore();
		if (target.getOfficeNumbers().contains(number)) {
			audit = new AuditLog(author, "Deleted office number " + number,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getOfficeNumbers().remove(
					target.getOfficeNumbers().indexOf(number));
			ds.save(target);
		}
	}

	public void addHomeNumber(UserProfile author, UserProfile target,
			String number) {
		Datastore ds = getDatastore();
		if (!target.getHomeNumbers().contains(number)) {
			audit = new AuditLog(author, "Added home number " + number,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getHomeNumbers().add(number);
			ds.save(target);
		}
	}

	public void deleteHomeNumber(UserProfile author, UserProfile target,
			String number) {
		Datastore ds = getDatastore();
		if (target.getHomeNumbers().contains(number)) {
			audit = new AuditLog(author, "Deleted home number " + number,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getHomeNumbers().remove(
					target.getHomeNumbers().indexOf(number));
			ds.save(target);
		}
	}

	public void addMobileNumber(UserProfile author, UserProfile target,
			String number) {
		Datastore ds = getDatastore();
		if (!target.getMobileNumbers().contains(number)) {
			audit = new AuditLog(author, "Added mobile number " + number,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getMobileNumbers().add(number);
			ds.save(target);
		}
	}

	public void deleteMobileNumber(UserProfile author, UserProfile target,
			String number) {
		Datastore ds = getDatastore();
		if (target.getMobileNumbers().contains(number)) {
			audit = new AuditLog(author, "Deleted mobile number " + number,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getMobileNumbers().remove(
					target.getMobileNumbers().indexOf(number));
			ds.save(target);
		}
	}

	public void addOtherNumber(UserProfile author, UserProfile target,
			String number) {
		Datastore ds = getDatastore();
		if (!target.getOtherNumbers().contains(number)) {
			audit = new AuditLog(author, "Added other number " + number,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getOtherNumbers().add(number);
			ds.save(target);
		}
	}

	public void deleteOtherNumber(UserProfile author, UserProfile target,
			String number) {
		Datastore ds = getDatastore();
		if (target.getOtherNumbers().contains(number)) {
			audit = new AuditLog(author, "Deleted other number " + number,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getOtherNumbers().remove(
					target.getOtherNumbers().indexOf(number));
			ds.save(target);
		}
	}

	public void addAddress(UserProfile author, UserProfile target,
			Address address) {
		Datastore ds = getDatastore();
		if (!target.getAddresses().contains(address)) {
			audit = new AuditLog(author,
					"Edited address " + address.toString(), new Date());
			target.addEntryToAuditLog(audit);
			target.getAddresses().add(address);
			ds.save(target);
		}
	}

	public void addWorkEmail(UserProfile author, UserProfile target,
			String email) {
		Datastore ds = getDatastore();
		if (!target.getWorkEmails().contains(email)) {
			audit = new AuditLog(author, "Added work email " + email,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getWorkEmails().add(email);
			ds.save(target);
		}
	}

	public void deleteWorkEmail(UserProfile author, UserProfile target,
			String email) {
		Datastore ds = getDatastore();
		if (target.getWorkEmails().contains(email)) {
			audit = new AuditLog(author, "Deleted work email " + email,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getWorkEmails()
					.remove(target.getWorkEmails().indexOf(email));
			ds.save(target);
		}
	}

	public void addPersonalEmail(UserProfile author, UserProfile target,
			String email) {
		Datastore ds = getDatastore();
		if (!target.getPersonalEmails().contains(email)) {
			audit = new AuditLog(author, "Added personal email " + email,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getPersonalEmails().add(email);
			ds.save(target);
		}
	}

	public void deletePersonalEmail(UserProfile author, UserProfile target,
			String email) {
		Datastore ds = getDatastore();
		if (target.getPersonalEmails().contains(email)) {
			audit = new AuditLog(author, "Deleted personal email " + email,
					new Date());
			target.addEntryToAuditLog(audit);
			target.getPersonalEmails().remove(
					target.getPersonalEmails().indexOf(email));
			ds.save(target);
		}
	}

	/**
	 * Dangerous method, will erase all entries. When it works Used only for
	 * testing, will be removed later
	 */
	public void deleteAll() {
		Datastore ds = getDatastore();
		ds.delete(ds.createQuery(UserProfile.class));
	}
}
