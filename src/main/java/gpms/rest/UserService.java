package gpms.rest;

import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.GPMSCommonInfo;
import gpms.model.JSONTansformer;
import gpms.model.UserAccount;
import gpms.model.UserInfo;
import gpms.model.UserProfile;

import java.io.IOException;
import java.util.ArrayList;

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
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces(MediaType.APPLICATION_JSON)
	public String produceUsersJSON(String message)
			throws JsonGenerationException, JsonMappingException, IOException {
		ArrayList<UserInfo> users = new ArrayList<UserInfo>();
		String response = new String();

		users = (ArrayList<UserInfo>) userProfileDAO.findAllForUserGrid();
		response = JSONTansformer.ConvertToJSON(users);

		return response;
	}

	@POST
	@Path("/GetUsersByProfileId")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public String produceUserByProfileId(String message)
			throws JsonProcessingException, IOException {
		UserProfile user = new UserProfile();
		String response = new String();

		// {"attributeId":"55980da27e7e020a009b90b3","gpmsCommonObj":{"UserName":"superuser","UserAccountID":"1","CultureName":"en-US"}}
		String profileId = new String();
		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("attributeId")) {
			profileId = root.get("attributeId").getTextValue();
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

		// // build a JSON object using org.JSON
		// JSONObject obj = new JSONObject(message);
		//
		// // get the first result
		// String profileId = obj.getString("attributeId");

		//
		// // Embedded Object
		// JSONObject commonObj = obj.getJSONObject("gpmsCommonObj");
		// String userName = commonObj.getString("UserName");
		// String userProfileID = commonObj.getString("UserProfileID");
		// String cultureName = commonObj.getString("CultureName");

		ObjectId id = new ObjectId(profileId);

		System.out.println("Profile ID String: " + profileId
				+ ", Profile ID with ObjectId: " + id + ", User Name: "
				+ userName + ", User Profile ID: " + userProfileID
				+ ", Culture Name: " + cultureName);

		// int a = obj.getInt("age");
		// JSONObject gpmsCommonObj = obj.getJSONObject(obj
		// .getString("gpmsCommonObj"));
		// System.out.println("attributeId: " + n);

		GPMSCommonInfo gpmsCommonObj = new GPMSCommonInfo();
		gpmsCommonObj.setUserName(userName);
		gpmsCommonObj.setUserProfileID(userProfileID);
		gpmsCommonObj.setCultureName(cultureName);
		user = userProfileDAO.findUserByProfileID(id, gpmsCommonObj);

		// // Gson gson = new Gson();
		// Gson gson = new GsonBuilder().setPrettyPrinting().create();
		// response = gson.toJson(user, UserProfile.class);
		// response = gson.toJson(user);

		response = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(
				user);

		return response;
	}
	// DepartmentsPositionsCollection dtc = new
	// DepartmentsPositionsCollection();
	// Hashtable<String, Hashtable<String, Hashtable<String,
	// ArrayList<String>>>> collegeKey = dtc
	// .getAvailableDepartmentsAndPositions();
	// Set<String> keys = collegeKey.keySet();
}
