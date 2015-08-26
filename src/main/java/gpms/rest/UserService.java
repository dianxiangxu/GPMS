package gpms.rest;

import gpms.DAL.DepartmentsPositionsCollection;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.Address;
import gpms.model.AuditLogInfo;
import gpms.model.GPMSCommonInfo;
import gpms.model.InvestigatorRefAndPosition;
import gpms.model.JSONTansformer;
import gpms.model.PositionDetails;
import gpms.model.UserAccount;
import gpms.model.UserInfo;
import gpms.model.UserProfile;

import java.io.IOException;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.bson.types.ObjectId;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.mongodb.morphia.Morphia;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.MongoClient;

@Path("/users")
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
public class UserService {
	MongoClient mongoClient = null;
	Morphia morphia = null;
	String dbName = "GPMS";
	UserAccountDAO userAccountDAO = null;
	UserProfileDAO userProfileDAO = null;
	ProposalDAO proposalDAO = null;

	public UserService() {
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		userAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		userProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
		proposalDAO = new ProposalDAO(mongoClient, morphia, dbName);
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String returnString() {
		return "Hello World!";
	}

	@GET
	@Path("/search/{query}")
	public String findByFirstName(@PathParam("query") String query)
			throws JsonGenerationException, JsonMappingException, IOException {
		ArrayList<UserProfile> users = new ArrayList<UserProfile>();
		String response = new String();

		users = (ArrayList<UserProfile>) userProfileDAO
				.findByFirstNameIgnoreCase(query);
		response = JSONTansformer.ConvertToJSON(users);

		return response;
	}

	@GET
	@Path("/{firstname}")
	public String findUserDeatilsByFirstName(
			@PathParam("firstname") String query)
			throws JsonGenerationException, JsonMappingException, IOException {
		ArrayList<UserProfile> users = new ArrayList<UserProfile>();
		String response = new String();

		users = (ArrayList<UserProfile>) userProfileDAO
				.findByFirstNameIgnoreCase(query);
		response = JSONTansformer.ConvertToJSON(users);

		return response;
	}

	// For DropDown binding in Proposal Management
	@POST
	@Path("/GetAllUserDropdown")
	public HashMap<String, String> getAllUsers() throws UnknownHostException {
		HashMap<String, String> users = new HashMap<String, String>();
		List<UserProfile> userprofiles = userProfileDAO.findAll();
		for (UserProfile userProfile : userprofiles) {
			users.put(userProfile.getId().toString(), userProfile.getFullName());
		}
		return users;
	}

	@POST
	@Path("/GetAllUserList")
	public List<InvestigatorUsersAndPositions> getAllCollegesForUsers()
			throws UnknownHostException, JsonProcessingException, IOException {
		List<InvestigatorUsersAndPositions> usersPositions = userProfileDAO
				.findAllUsersAndPositions();

		return usersPositions;
	}

	@POST
	@Path("/GetAllPositionDetailsForAUser")
	public List<InvestigatorUsersAndPositions> getAllPositionDetailsForAUser(
			String message) throws UnknownHostException,
			JsonProcessingException, IOException {
		String userId = new String();

		ObjectMapper mapper = new ObjectMapper();

		JsonNode root = mapper.readTree(message);
		if (root != null && root.has("UserId")) {
			userId = root.get("UserId").getTextValue();
		}

		ObjectId id = new ObjectId(userId);

		List<InvestigatorUsersAndPositions> userPositions = userProfileDAO
				.findAllPositionDetailsForAUser(id);

		return userPositions;
	}

	@POST
	@Path("/GetDepartmentsForAUser")
	public List<String> getDepartmentsForAUser(String message)
			throws UnknownHostException, JsonProcessingException, IOException {
		String userId = new String();
		String college = new String();

		ObjectMapper mapper = new ObjectMapper();

		JsonNode root = mapper.readTree(message);
		if (root != null && root.has("UserId")) {
			userId = root.get("UserId").getTextValue();
		}
		if (root != null && root.has("college")) {
			college = root.get("college").getTextValue();
		}

		ObjectId id = new ObjectId(userId);

		List<String> userDepartments = userProfileDAO.findDepartmentsForAUser(
				id, college);

		return userDepartments;
	}

	@POST
	@Path("/GetPositionTypeForAUser")
	public List<String> getPositionTypeForAUser(String message)
			throws UnknownHostException, JsonProcessingException, IOException {
		String userId = new String();
		String college = new String();
		String department = new String();

		ObjectMapper mapper = new ObjectMapper();

		JsonNode root = mapper.readTree(message);
		if (root != null && root.has("UserId")) {
			userId = root.get("UserId").getTextValue();
		}
		if (root != null && root.has("college")) {
			college = root.get("college").getTextValue();
		}
		if (root != null && root.has("department")) {
			department = root.get("department").getTextValue();
		}

		ObjectId id = new ObjectId(userId);

		List<String> userDepartments = userProfileDAO
				.findPositionTypesForAUser(id, college, department);

		return userDepartments;
	}

	@POST
	@Path("/GetUsersList")
	public List<UserInfo> produceUsersJSON(String message)
			throws JsonGenerationException, JsonMappingException, IOException {
		List<UserInfo> users = new ArrayList<UserInfo>();

		int offset = 0, limit = 0;
		String userName = new String();
		String college = new String();
		String department = new String();
		String positionType = new String();
		String positionTitle = new String();
		Boolean isActive = null;

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("offset")) {
			offset = root.get("offset").getIntValue();
		}

		if (root != null && root.has("limit")) {
			limit = root.get("limit").getIntValue();
		}

		JsonNode userObj = root.get("userBindObj");
		if (userObj != null && userObj.has("UserName")) {
			userName = userObj.get("UserName").getTextValue();
		}

		if (userObj != null && userObj.has("College")) {
			college = userObj.get("College").getTextValue();
		}

		if (userObj != null && userObj.has("Department")) {
			department = userObj.get("Department").getTextValue();
		}

		if (userObj != null && userObj.has("PositionType")) {
			positionType = userObj.get("PositionType").getTextValue();
		}

		if (userObj != null && userObj.has("PositionTitle")) {
			positionTitle = userObj.get("PositionTitle").getTextValue();
		}

		if (userObj != null && userObj.has("IsActive")) {
			if (!userObj.get("IsActive").isNull()) {
				isActive = userObj.get("IsActive").getBooleanValue();
			} else {
				isActive = null;
			}
		}

		users = userProfileDAO.findAllForUserGrid(offset, limit, userName,
				college, department, positionType, positionTitle, isActive);

		// users = (ArrayList<UserInfo>) userProfileDAO.findAllForUserGrid();
		// response = JSONTansformer.ConvertToJSON(users);

		return users;
	}

	@POST
	@Path("/GetUserDetailsByProfileId")
	public String produceUserDetailsByProfileId(String message)
			throws JsonProcessingException, IOException {
		UserProfile user = new UserProfile();
		String response = new String();

		String profileId = new String();
		// String userName = new String();
		// String userProfileID = new String();
		// String cultureName = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("userId")) {
			profileId = root.get("userId").getTextValue();
		}

		// JsonNode commonObj = root.get("gpmsCommonObj");
		// if (commonObj != null && commonObj.has("UserName")) {
		// userName = commonObj.get("UserName").getTextValue();
		// }
		//
		// if (commonObj != null && commonObj.has("UserProfileID")) {
		// userProfileID = commonObj.get("UserProfileID").getTextValue();
		// }
		//
		// if (commonObj != null && commonObj.has("CultureName")) {
		// cultureName = commonObj.get("CultureName").getTextValue();
		// }

		// // build a JSON object using org.JSON
		// JSONObject obj = new JSONObject(message);
		//
		// // get the first result
		// String profileId = obj.getString("userId");

		// Alternatively
		// // Embedded Object
		// JSONObject commonObj = obj.getJSONObject("gpmsCommonObj");
		// String userName = commonObj.getString("UserName");
		// String userProfileID = commonObj.getString("UserProfileID");
		// String cultureName = commonObj.getString("CultureName");

		ObjectId id = new ObjectId(profileId);

		// System.out.println("Profile ID String: " + profileId
		// + ", Profile ID with ObjectId: " + id + ", User Name: "
		// + userName + ", User Profile ID: " + userProfileID
		// + ", Culture Name: " + cultureName);

		// GPMSCommonInfo gpmsCommonObj = new GPMSCommonInfo();
		// gpmsCommonObj.setUserName(userName);
		// gpmsCommonObj.setUserProfileID(userProfileID);
		// gpmsCommonObj.setCultureName(cultureName);

		user = userProfileDAO.findUserDetailsByProfileID(id);
		// user.getUserAccount();
		// user.getUserAccount().getUserName();
		// user.getUserAccount().getPassword();

		// Gson gson = new Gson();
		// .setDateFormat("EEE, dd MMM yyyy HH:mm:ss zzz").create();
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd")
				.excludeFieldsWithoutExposeAnnotation().setPrettyPrinting()
				.create();
		response = gson.toJson(user, UserProfile.class);

		// response = gson.toJson(user);

		// response =
		// mapper.writerWithDefaultPrettyPrinter().writeValueAsString(
		// user);

		return response;
	}

	@POST
	@Path("/GetUserAuditLogList")
	public List<AuditLogInfo> produceUserAuditLogJSON(String message)
			throws JsonGenerationException, JsonMappingException, IOException,
			ParseException {
		List<AuditLogInfo> userAuditLogs = new ArrayList<AuditLogInfo>();

		int offset = 0, limit = 0;
		String profileId = new String();
		String action = new String();
		String auditedBy = new String();
		String activityOnFrom = new String();
		String activityOnTo = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("offset")) {
			offset = root.get("offset").getIntValue();
		}

		if (root != null && root.has("limit")) {
			limit = root.get("limit").getIntValue();
		}

		if (root != null && root.has("userId")) {
			profileId = root.get("userId").getTextValue();
		}

		JsonNode auditLogBindObj = root.get("auditLogBindObj");
		if (auditLogBindObj != null && auditLogBindObj.has("Action")) {
			action = auditLogBindObj.get("Action").getTextValue();
		}

		if (auditLogBindObj != null && auditLogBindObj.has("AuditedBy")) {
			auditedBy = auditLogBindObj.get("AuditedBy").getTextValue();
		}

		if (auditLogBindObj != null && auditLogBindObj.has("ActivityOnFrom")) {
			activityOnFrom = auditLogBindObj.get("ActivityOnFrom")
					.getTextValue();
		}

		if (auditLogBindObj != null && auditLogBindObj.has("ActivityOnTo")) {
			activityOnTo = auditLogBindObj.get("ActivityOnTo").getTextValue();
		}

		ObjectId userId = new ObjectId(profileId);

		userAuditLogs = userProfileDAO.findAllForUserAuditLogGrid(offset,
				limit, userId, action, auditedBy, activityOnFrom, activityOnTo);

		// users = (ArrayList<UserInfo>) userProfileDAO.findAllForUserGrid();
		// response = JSONTansformer.ConvertToJSON(users);

		return userAuditLogs;
	}

	@POST
	@Path("/GetPositionDetailsHash")
	public Hashtable<String, Hashtable<String, Hashtable<String, ArrayList<String>>>> producePositionDetailsHash()
			throws JsonProcessingException, IOException {
		DepartmentsPositionsCollection dpc = new DepartmentsPositionsCollection();
		return dpc.getAvailableDepartmentsAndPositions();
	}

	@POST
	@Path("/GetCollegeList")
	public List<String> produceCollegeList() throws JsonProcessingException,
			IOException {
		DepartmentsPositionsCollection dpc = new DepartmentsPositionsCollection();
		return dpc.getCollegeKeys();
	}

	@POST
	@Path("/GetDepartmentList")
	public List<String> produceDepartmentList(String message)
			throws JsonProcessingException, IOException {
		DepartmentsPositionsCollection dpc = new DepartmentsPositionsCollection();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);
		String college = new String();
		if (root != null && root.has("college")) {
			college = root.get("college").getTextValue();
		}

		return dpc.getDepartmentKeys(college);
	}

	@POST
	@Path("/GetPositionTypeList")
	public List<String> producePositionTypeList(String message)
			throws JsonProcessingException, IOException {
		DepartmentsPositionsCollection dpc = new DepartmentsPositionsCollection();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);
		String college = new String();
		String department = new String();
		if (root != null && root.has("college")) {
			college = root.get("college").getTextValue();
		}
		if (root != null && root.has("department")) {
			department = root.get("department").getTextValue();
		}
		return dpc.getPositionType(college, department);
	}

	@POST
	@Path("/GetPositionTitleList")
	public List<String> producePositionTitleList(String message)
			throws JsonProcessingException, IOException {
		DepartmentsPositionsCollection dpc = new DepartmentsPositionsCollection();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);
		String college = new String();
		String department = new String();
		String positionType = new String();
		if (root != null && root.has("college")) {
			college = root.get("college").getTextValue();
		}
		if (root != null && root.has("department")) {
			department = root.get("department").getTextValue();
		}
		if (root != null && root.has("positionType")) {
			positionType = root.get("positionType").getTextValue();
		}
		return dpc.getPositionTitle(college, department, positionType);
	}

	@POST
	@Path("/DeleteUserByUserID")
	public String deleteUserByUserID(String message)
			throws JsonProcessingException, IOException {
		UserProfile user = new UserProfile();
		String response = new String();

		String profileId = new String();
		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("userId")) {
			profileId = root.get("userId").getTextValue();
		}

		JsonNode commonObj = root.get("gpmsCommonObj");
		if (commonObj != null && commonObj.has("UserName")) {
			userName = commonObj.get("UserName").getTextValue();
		}

		if (commonObj != null && commonObj.has("UserProfileID")) {
			userProfileID = commonObj.get("UserProfileID").getTextValue();
		}

		if (commonObj != null && commonObj.has("CultureName")) {
			cultureName = commonObj.get("CultureName").getTextValue();
		}

		// TODO : login set this session value
		// FOr Testing I am using HardCoded UserProfileID
		// userProfileID = "55b9225454ffd82dc052a32a";

		ObjectId id = new ObjectId(profileId);
		ObjectId authorId = new ObjectId(userProfileID);

		GPMSCommonInfo gpmsCommonObj = new GPMSCommonInfo();
		gpmsCommonObj.setUserName(userName);
		gpmsCommonObj.setUserProfileID(userProfileID);
		gpmsCommonObj.setCultureName(cultureName);

		UserProfile authorProfile = userProfileDAO
				.findUserDetailsByProfileID(authorId);

		UserProfile userProfile = userProfileDAO.findUserDetailsByProfileID(id);
		userProfileDAO.deleteUserProfileByUserID(userProfile, authorProfile,
				gpmsCommonObj);

		UserAccount userAccount = userAccountDAO.findByID(userProfile
				.getUserAccount().getId());
		userAccountDAO.deleteUserAccountByUserID(userAccount, authorProfile,
				gpmsCommonObj);

		// response.setContentType("text/html;charset=UTF-8");
		// response.getWriter().write("Success Data");

		// Gson gson = new GsonBuilder().setPrettyPrinting().create();
		// response = gson.toJson("Success", String.class);

		response = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(
				"Success");
		return response;
	}

	@POST
	@Path("/DeleteMultipleUsersByUserID")
	public String deleteMultipleUsersByUserID(String message)
			throws JsonProcessingException, IOException {
		UserProfile user = new UserProfile();
		String response = new String();

		String profileIds = new String();
		String profiles[] = new String[0];
		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("userIds")) {
			profileIds = root.get("userIds").getTextValue();
			profiles = profileIds.split(",");
		}

		JsonNode commonObj = root.get("gpmsCommonObj");
		if (commonObj != null && commonObj.has("UserName")) {
			userName = commonObj.get("UserName").getTextValue();
		}

		if (commonObj != null && commonObj.has("UserProfileID")) {
			userProfileID = commonObj.get("UserProfileID").getTextValue();
		}

		if (commonObj != null && commonObj.has("CultureName")) {
			cultureName = commonObj.get("CultureName").getTextValue();
		}

		ObjectId authorId = new ObjectId(userProfileID);

		GPMSCommonInfo gpmsCommonObj = new GPMSCommonInfo();
		gpmsCommonObj.setUserName(userName);
		gpmsCommonObj.setUserProfileID(userProfileID);
		gpmsCommonObj.setCultureName(cultureName);

		UserProfile authorProfile = userProfileDAO
				.findUserDetailsByProfileID(authorId);

		for (String profile : profiles) {
			ObjectId id = new ObjectId(profile);

			UserProfile userProfile = userProfileDAO
					.findUserDetailsByProfileID(id);
			userProfileDAO.deleteUserProfileByUserID(userProfile,
					authorProfile, gpmsCommonObj);

			UserAccount userAccount = userAccountDAO.findByID(userProfile
					.getUserAccount().getId());
			userAccountDAO.deleteUserAccountByUserID(userAccount,
					authorProfile, gpmsCommonObj);
		}
		response = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(
				"Success");
		return response;
	}

	@POST
	@Path("/UpdateUserIsActiveByUserID")
	public String updateUserIsActiveByUserID(String message)
			throws JsonProcessingException, IOException {
		UserProfile user = new UserProfile();
		String response = new String();

		String profileId = new String();
		Boolean isActive = true;
		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("userId")) {
			profileId = root.get("userId").getTextValue();
		}

		if (root != null && root.has("isActive")) {
			isActive = root.get("isActive").getBooleanValue();
		}

		JsonNode commonObj = root.get("gpmsCommonObj");
		if (commonObj != null && commonObj.has("UserName")) {
			userName = commonObj.get("UserName").getTextValue();
		}

		if (commonObj != null && commonObj.has("UserProfileID")) {
			userProfileID = commonObj.get("UserProfileID").getTextValue();
		}

		if (commonObj != null && commonObj.has("CultureName")) {
			cultureName = commonObj.get("CultureName").getTextValue();
		}

		ObjectId id = new ObjectId(profileId);
		ObjectId authorId = new ObjectId(userProfileID);

		GPMSCommonInfo gpmsCommonObj = new GPMSCommonInfo();
		gpmsCommonObj.setUserName(userName);
		gpmsCommonObj.setUserProfileID(userProfileID);
		gpmsCommonObj.setCultureName(cultureName);

		UserProfile authorProfile = userProfileDAO
				.findUserDetailsByProfileID(authorId);

		UserProfile userProfile = userProfileDAO.findUserDetailsByProfileID(id);
		userProfileDAO.activateUserProfileByUserID(userProfile, authorProfile,
				gpmsCommonObj, isActive);

		UserAccount userAccount = userAccountDAO.findByID(userProfile
				.getUserAccount().getId());
		userAccountDAO.activateUserAccountByUserID(userAccount, authorProfile,
				gpmsCommonObj, isActive);
		// return Response.ok("Success", MediaType.APPLICATION_JSON).build();

		response = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(
				"Success");
		return response;
	}

	@POST
	@Path("/CheckUniqueUserName")
	public String checkUniqueUserName(String message)
			throws JsonProcessingException, IOException {
		String userID = new String();
		String newUserName = new String();
		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

		String response = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		JsonNode userUniqueObj = root.get("userUniqueObj");
		if (userUniqueObj != null && userUniqueObj.has("UserID")) {
			userID = userUniqueObj.get("UserID").getTextValue();
		}

		if (userUniqueObj != null && userUniqueObj.has("NewUserName")) {
			newUserName = userUniqueObj.get("NewUserName").getTextValue();
		}

		JsonNode commonObj = root.get("gpmsCommonObj");
		if (commonObj != null && commonObj.has("UserName")) {
			userName = commonObj.get("UserName").getTextValue();
		}

		if (commonObj != null && commonObj.has("UserProfileID")) {
			userProfileID = commonObj.get("UserProfileID").getTextValue();
		}

		if (commonObj != null && commonObj.has("CultureName")) {
			cultureName = commonObj.get("CultureName").getTextValue();
		}

		ObjectId id = new ObjectId();
		UserProfile userProfile = new UserProfile();
		if (!userID.equals("0")) {
			id = new ObjectId(userID);
			userProfile = userProfileDAO.findNextUserWithSameUserName(id,
					newUserName);
		} else {
			userProfile = userProfileDAO
					.findAnyUserWithSameUserName(newUserName);
		}

		if (userProfile != null) {
			response = mapper.writerWithDefaultPrettyPrinter()
					.writeValueAsString("false");
		} else {
			response = mapper.writerWithDefaultPrettyPrinter()
					.writeValueAsString("true");
		}
		return response;

	}

	@POST
	@Path("/CheckUniqueEmail")
	public String checkUniqueEmail(String message)
			throws JsonProcessingException, IOException {
		String userID = new String();
		String newEmail = new String();
		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

		String response = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		JsonNode userUniqueObj = root.get("userUniqueObj");
		if (userUniqueObj != null && userUniqueObj.has("UserID")) {
			userID = userUniqueObj.get("UserID").getTextValue();
		}

		if (userUniqueObj != null && userUniqueObj.has("NewEmail")) {
			newEmail = userUniqueObj.get("NewEmail").getTextValue();
		}

		JsonNode commonObj = root.get("gpmsCommonObj");
		if (commonObj != null && commonObj.has("UserName")) {
			userName = commonObj.get("UserName").getTextValue();
		}

		if (commonObj != null && commonObj.has("UserProfileID")) {
			userProfileID = commonObj.get("UserProfileID").getTextValue();
		}

		if (commonObj != null && commonObj.has("CultureName")) {
			cultureName = commonObj.get("CultureName").getTextValue();
		}

		ObjectId id = new ObjectId(userID);

		UserProfile userProfile = userProfileDAO.findNextUserWithSameEmail(id,
				newEmail);

		if (userProfile != null) {
			response = mapper.writerWithDefaultPrettyPrinter()
					.writeValueAsString("false");
		} else {
			response = mapper.writerWithDefaultPrettyPrinter()
					.writeValueAsString("true");
		}
		return response;
	}

	@POST
	@Path("/SaveUpdateUser")
	public String saveUpdateUser(String message)
			throws JsonProcessingException, IOException, ParseException {

		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

		String userID = new String();

		UserAccount newAccount = new UserAccount();
		UserProfile newProfile = new UserProfile();

		UserProfile existingUserProfile = new UserProfile();

		String response = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		JsonNode commonObj = root.get("gpmsCommonObj");
		if (commonObj != null && commonObj.has("UserName")) {
			userName = commonObj.get("UserName").getTextValue();
		}

		if (commonObj != null && commonObj.has("UserProfileID")) {
			userProfileID = commonObj.get("UserProfileID").getTextValue();
		}

		if (commonObj != null && commonObj.has("CultureName")) {
			cultureName = commonObj.get("CultureName").getTextValue();
		}

		JsonNode userInfo = root.get("userInfo");

		if (userInfo != null && userInfo.has("UserName")) {
			newAccount.setUserName(userInfo.get("UserName").getTextValue());
		}

		if (userInfo != null && userInfo.has("Password")) {
			newAccount.setPassword(userInfo.get("Password").getTextValue());
		}

		newAccount.setAddedOn(new Date());

		if (userInfo != null && userInfo.has("IsActive")) {
			newAccount.setActive(Boolean.parseBoolean(userInfo.get("IsActive")
					.getTextValue()));
			newAccount.setDeleted(!Boolean.parseBoolean(userInfo
					.get("IsActive").getTextValue()));
			newProfile.setDeleted(!Boolean.parseBoolean(userInfo
					.get("IsActive").getTextValue()));
		}

		newProfile.setUserId(newAccount);

		if (userInfo != null && userInfo.has("UserID")) {
			userID = userInfo.get("UserID").getTextValue();
			if (userID != "0") {
				ObjectId id = new ObjectId(userID);
				existingUserProfile = userProfileDAO
						.findUserDetailsByProfileID(id);
				// newProfile.setId(id);
			}
		}

		if (userInfo != null && userInfo.has("FirstName")) {
			newProfile.setFirstName(userInfo.get("FirstName").getTextValue());
		}

		if (userInfo != null && userInfo.has("MiddleName")) {
			newProfile.setMiddleName(userInfo.get("MiddleName").getTextValue());
		}

		if (userInfo != null && userInfo.has("LastName")) {
			newProfile.setLastName(userInfo.get("LastName").getTextValue());
		}

		if (userInfo != null && userInfo.has("DOB")) {
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			Date dob = formatter.parse(userInfo.get("DOB").getTextValue());
			newProfile.setDateOfBirth(dob);
		}

		if (userInfo != null && userInfo.has("Gender")) {
			newProfile.setGender(userInfo.get("Gender").getTextValue());
		}

		Address newAddress = new Address();

		if (userInfo != null && userInfo.has("Street")) {
			newAddress.setStreet(userInfo.get("Street").getTextValue());
		}
		if (userInfo != null && userInfo.has("Apt")) {
			newAddress.setApt(userInfo.get("Apt").getTextValue());
		}
		if (userInfo != null && userInfo.has("City")) {
			newAddress.setCity(userInfo.get("City").getTextValue());
		}
		if (userInfo != null && userInfo.has("State")) {
			newAddress.setState(userInfo.get("State").getTextValue());
		}
		if (userInfo != null && userInfo.has("Zip")) {
			newAddress.setZipcode(userInfo.get("Zip").getTextValue());
		}
		if (userInfo != null && userInfo.has("Country")) {
			newAddress.setCountry(userInfo.get("Country").getTextValue());
		}

		newProfile.getAddresses().add(newAddress);

		if (userInfo != null && userInfo.has("OfficeNumber")) {
			newProfile.getOfficeNumbers().add(
					userInfo.get("OfficeNumber").getTextValue());
		}

		if (userInfo != null && userInfo.has("MobileNumber")) {
			newProfile.getMobileNumbers().add(
					userInfo.get("MobileNumber").getTextValue());
		}

		if (userInfo != null && userInfo.has("HomeNumber")) {
			newProfile.getHomeNumbers().add(
					userInfo.get("HomeNumber").getTextValue());
		}

		if (userInfo != null && userInfo.has("OtherNumber")) {
			newProfile.getOtherNumbers().add(
					userInfo.get("OtherNumber").getTextValue());
		}

		if (userInfo != null && userInfo.has("WorkEmail")) {
			newProfile.getWorkEmails().add(
					userInfo.get("WorkEmail").getTextValue());
		}

		if (userInfo != null && userInfo.has("PersonalEmail")) {
			newProfile.getPersonalEmails().add(
					userInfo.get("PersonalEmail").getTextValue());
		}

		if (userInfo != null && userInfo.has("SaveOptions")) {
			String[] rows = userInfo.get("SaveOptions").getTextValue()
					.split("#!#");

			for (String col : rows) {
				String[] cols = col.split("!#!");
				PositionDetails newDetails = new PositionDetails();
				newDetails.setCollege(cols[0]);
				newDetails.setDepartment(cols[1]);
				newDetails.setPositionType(cols[2]);
				newDetails.setPositionTitle(cols[3]);
				newProfile.getDetails().add(newDetails);
			}
		}

		// Need to Compare Equals before saving existingUserProfile and
		// newProfile

		// Save the informations
		userAccountDAO.save(newAccount);
		userProfileDAO.save(newProfile);

		response = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(
				"Success");
		return response;

	}
}
