package gpms.rest;

import gpms.DAL.DepartmentsPositionsCollection;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.AuditLogInfo;
import gpms.model.GPMSCommonInfo;
import gpms.model.JSONTansformer;
import gpms.model.UserAccount;
import gpms.model.UserInfo;
import gpms.model.UserProfile;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
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
import org.mongodb.morphia.query.Query;

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
	@Produces({ MediaType.APPLICATION_JSON })
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
	@Produces({ MediaType.APPLICATION_JSON })
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
	@Path("/GetUsersByProfileId")
	public String produceUserByProfileId(String message)
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

		user = userProfileDAO.findUserByProfileID(id);

		// user.getUserAccount().getUserName();

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
	@Path("/GetUsersAuditLogList")
	public List<AuditLogInfo> produceUsersAuditLogJSON(String message)
			throws JsonGenerationException, JsonMappingException, IOException,
			ParseException {
		List<AuditLogInfo> usersAuditLogs = new ArrayList<AuditLogInfo>();

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

		usersAuditLogs = userProfileDAO.findAllForUserAuditLogGrid(offset,
				limit, userId, action, auditedBy, activityOnFrom, activityOnTo);

		// users = (ArrayList<UserInfo>) userProfileDAO.findAllForUserGrid();
		// response = JSONTansformer.ConvertToJSON(users);

		return usersAuditLogs;
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
				.findUserByProfileID(authorId);

		UserProfile userProfile = userProfileDAO.findUserByProfileID(id);
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

		for (String profile : profiles) {
			ObjectId id = new ObjectId(profile);
			ObjectId authorId = new ObjectId(userProfileID);

			GPMSCommonInfo gpmsCommonObj = new GPMSCommonInfo();
			gpmsCommonObj.setUserName(userName);
			gpmsCommonObj.setUserProfileID(userProfileID);
			gpmsCommonObj.setCultureName(cultureName);

			UserProfile authorProfile = userProfileDAO
					.findUserByProfileID(authorId);

			UserProfile userProfile = userProfileDAO.findUserByProfileID(id);
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
				.findUserByProfileID(authorId);

		UserProfile userProfile = userProfileDAO.findUserByProfileID(id);
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
	public Boolean checkUniqueUserName(String message)
			throws JsonProcessingException, IOException {
		// {"userUniqueObj":{"UserID":"userAccount1","UserName":"55b9225454ffd82dc052a32a"},"gpmsCommonObj":{"UserName":"superuser","UserProfileID":"55b9225454ffd82dc052a32a","CultureName":"en-US"}}

		String userID = new String();
		String newUserName = new String();
		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

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

		ObjectId id = new ObjectId(userID);

		// UserAccount userAccountObj =
		// userAccountDAO.findByUserName(newUserName);

		// Key<UserProfile> userObj = UserAccount.getKey();

		List<UserProfile> userProfiles = userProfileDAO
				.findAllUsersWithSameUserName(id, newUserName);

		// UserAccount useraccount = userAccountDAO.findByUserName(newUserName);

		if (userProfiles.size() > 0) {
			return false;
		} else {
			return true;
		}

	}
}
