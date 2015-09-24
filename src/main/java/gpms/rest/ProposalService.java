package gpms.rest;

import gpms.DAL.MongoDBConnector;
import gpms.dao.DelegationDAO;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.AuditLogInfo;
import gpms.model.GPMSCommonInfo;
import gpms.model.Proposal;
import gpms.model.ProposalInfo;
import gpms.model.SignatureInfo;
import gpms.model.Status;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.io.IOException;
import java.net.UnknownHostException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
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

@Path("/proposals")
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
public class ProposalService {
	MongoClient mongoClient = null;
	Morphia morphia = null;
	String dbName = "GPMS";
	UserAccountDAO userAccountDAO = null;
	UserProfileDAO userProfileDAO = null;
	ProposalDAO proposalDAO = null;
	DelegationDAO delegationDAO = null;

	public ProposalService() {
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		userAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		userProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
		proposalDAO = new ProposalDAO(mongoClient, morphia, dbName);
		delegationDAO = new DelegationDAO(mongoClient, morphia, dbName);
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String returnString() {
		return "Hello World!";
	}

	@POST
	@Path("/GetProposalStatusList")
	public ArrayList<Status> getProposalStatusList()
			throws JsonProcessingException, IOException {
		return new ArrayList<Status>(Arrays.asList(Status.values()));
	}

	@POST
	@Path("/GetProposalsList")
	public List<ProposalInfo> produceProposalsJSON(String message)
			throws JsonGenerationException, JsonMappingException, IOException,
			ParseException {
		List<ProposalInfo> proposals = new ArrayList<ProposalInfo>();

		int offset = 0, limit = 0;
		String projectTitle = new String();
		String proposedBy = new String();
		Double totalCostsFrom = 0.0;
		Double totalCostsTo = 0.0;
		String receivedOnFrom = new String();
		String receivedOnTo = new String();
		String proposalStatus = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("offset")) {
			offset = root.get("offset").getIntValue();
		}

		if (root != null && root.has("limit")) {
			limit = root.get("limit").getIntValue();
		}

		JsonNode proposalObj = root.get("proposalBindObj");
		if (proposalObj != null && proposalObj.has("ProjectTitle")) {
			projectTitle = proposalObj.get("ProjectTitle").getTextValue();
		}

		if (proposalObj != null && proposalObj.has("ProposedBy")) {
			proposedBy = proposalObj.get("ProposedBy").getTextValue();
		}

		if (proposalObj != null && proposalObj.has("ReceivedOnFrom")) {
			receivedOnFrom = proposalObj.get("ReceivedOnFrom").getTextValue();
		}

		if (proposalObj != null && proposalObj.has("ReceivedOnTo")) {
			receivedOnTo = proposalObj.get("ReceivedOnTo").getTextValue();
		}

		if (proposalObj != null && proposalObj.has("TotalCostsFrom")) {
			if (proposalObj.get("TotalCostsFrom").getTextValue() != null) {
				totalCostsFrom = Double.valueOf(proposalObj.get(
						"TotalCostsFrom").getTextValue());
			}
		}

		if (proposalObj != null && proposalObj.has("TotalCostsTo")) {
			if (proposalObj.get("TotalCostsTo").getTextValue() != null) {
				totalCostsTo = Double.valueOf(proposalObj.get("TotalCostsTo")
						.getTextValue());
			}
		}

		if (proposalObj != null && proposalObj.has("ProposalStatus")) {
			proposalStatus = proposalObj.get("ProposalStatus").getTextValue();
		}

		proposals = proposalDAO.findAllForProposalGrid(offset, limit,
				projectTitle, proposedBy, receivedOnFrom, receivedOnTo,
				totalCostsFrom, totalCostsTo, proposalStatus);

		return proposals;
	}

	@POST
	@Path("/DeleteProposalByProposalID")
	public String deleteUserByProposalID(String message)
			throws JsonProcessingException, IOException {
		UserProfile user = new UserProfile();
		String response = new String();

		String proposalId = new String();
		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("proposalId")) {
			proposalId = root.get("proposalId").getTextValue();
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

		ObjectId id = new ObjectId(proposalId);
		ObjectId authorId = new ObjectId(userProfileID);

		GPMSCommonInfo gpmsCommonObj = new GPMSCommonInfo();
		gpmsCommonObj.setUserName(userName);
		gpmsCommonObj.setUserProfileID(userProfileID);
		gpmsCommonObj.setCultureName(cultureName);

		UserProfile authorProfile = userProfileDAO
				.findUserDetailsByProfileID(authorId);
		Proposal proposal = proposalDAO.findProposalByProposalID(id);

		proposalDAO.deleteProposal(proposal, authorProfile, gpmsCommonObj);

		response = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(
				"Success");
		return response;
	}

	@POST
	@Path("/DeleteMultipleProposalsByProposalID")
	public String deleteMultipleProposalsByProposalID(String message)
			throws JsonProcessingException, IOException {
		UserProfile user = new UserProfile();
		String response = new String();

		String proposalIds = new String();
		String proposals[] = new String[0];
		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("proposalIds")) {
			proposalIds = root.get("proposalIds").getTextValue();
			proposals = proposalIds.split(",");
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

		for (String proposalId : proposals) {
			ObjectId id = new ObjectId(proposalId);

			Proposal proposal = proposalDAO.findProposalByProposalID(id);

			proposalDAO.deleteProposal(proposal, authorProfile, gpmsCommonObj);
		}
		response = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(
				"Success");
		return response;
	}

	@POST
	@Path("/GetProposalDetailsByProposalId")
	public String produceProposalDetailsByProposalId(String message)
			throws JsonProcessingException, IOException {
		Proposal proposal = new Proposal();
		String response = new String();

		String proposalId = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		if (root != null && root.has("proposalId")) {
			proposalId = root.get("proposalId").getTextValue();
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
		//
		// GPMSCommonInfo gpmsCommonObj = new GPMSCommonInfo();
		// gpmsCommonObj.setUserName(userName);
		// gpmsCommonObj.setUserProfileID(userProfileID);
		// gpmsCommonObj.setCultureName(cultureName);

		ObjectId id = new ObjectId(proposalId);

		proposal = proposalDAO.findProposalDetailsByProposalID(id);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd")
				.excludeFieldsWithoutExposeAnnotation().setPrettyPrinting()
				.create();
		response = gson.toJson(proposal, Proposal.class);

		return response;
	}

	@POST
	@Path("/GetProposalAuditLogList")
	public List<AuditLogInfo> produceProposalAuditLogJSON(String message)
			throws JsonGenerationException, JsonMappingException, IOException,
			ParseException {
		List<AuditLogInfo> proposalAuditLogs = new ArrayList<AuditLogInfo>();

		int offset = 0, limit = 0;
		String proposalId = new String();
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

		if (root != null && root.has("proposalId")) {
			proposalId = root.get("proposalId").getTextValue();
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

		ObjectId id = new ObjectId(proposalId);

		proposalAuditLogs = proposalDAO.findAllForProposalAuditLogGrid(offset,
				limit, id, action, auditedBy, activityOnFrom, activityOnTo);

		// users = (ArrayList<UserInfo>) userProfileDAO.findAllForUserGrid();
		// response = JSONTansformer.ConvertToJSON(users);

		return proposalAuditLogs;
	}

	@POST
	@Path("/CheckUniqueProjectTitle")
	public String checkUniqueProjectTitle(String message)
			throws JsonProcessingException, IOException {
		String proposalID = new String();
		String newProjectTitle = new String();
		String userName = new String();
		String userProfileID = new String();
		String cultureName = new String();

		String response = new String();

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(message);

		JsonNode proposalUniqueObj = root.get("proposalUniqueObj");
		if (proposalUniqueObj != null && proposalUniqueObj.has("ProposalID")) {
			proposalID = proposalUniqueObj.get("ProposalID").getTextValue();
		}

		if (proposalUniqueObj != null
				&& proposalUniqueObj.has("NewProjectTitle")) {
			newProjectTitle = proposalUniqueObj.get("NewProjectTitle")
					.getTextValue();
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
		Proposal proposal = new Proposal();
		if (!proposalID.equals("0")) {
			id = new ObjectId(proposalID);
			proposal = proposalDAO.findNextProposalWithSameProjectTitle(id,
					newProjectTitle);
		} else {
			proposal = proposalDAO
					.findAnyProposalWithSameProjectTitle(newProjectTitle);
		}

		if (proposal != null) {
			response = mapper.writerWithDefaultPrettyPrinter()
					.writeValueAsString("false");
		} else {
			response = mapper.writerWithDefaultPrettyPrinter()
					.writeValueAsString("true");
		}
		return response;
	}

	@POST
	@Path("/GetAllSignatureForAProposal")
	public String getAllSignatureForAProposal(String message)
			throws UnknownHostException, JsonProcessingException, IOException,
			ParseException {
		String proposalId = new String();
		String response = new String();

		ObjectMapper mapper = new ObjectMapper();

		JsonNode root = mapper.readTree(message);
		if (root != null && root.has("proposalId")) {
			proposalId = root.get("proposalId").getTextValue();
		}

		ObjectId id = new ObjectId(proposalId);

		List<SignatureInfo> signatures = proposalDAO
				.findAllSignatureForAProposal(id);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd")
				.excludeFieldsWithoutExposeAnnotation().setPrettyPrinting()
				.create();
		response = gson.toJson(signatures, SignatureInfo.class);

		// for (SignatureInfo signatureInfo : signatures) {
		// // TODO : get all delegated User Info for this PI user and bind it
		// // into signature Object
		//
		// // Check if the proposal Id is exact to this proposal id
		//
		// // TODO : find all the delegated User for this Proposal Id
		// ObjectId userId = new ObjectId(signatureInfo.getUserProfileId());
		// List<SignatureInfo> delegatedUsers = delegationDAO
		// .findDelegatedUsersForAUser(userId,
		// signatureInfo.getPositionTitle(), proposalId);
		//
		// for (SignatureInfo delegatedUser : delegatedUsers) {
		// signatures.add(delegatedUser);
		// }
		//
		// }

		return response;
	}

}
