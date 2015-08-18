package gpms.rest;

import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.ProposalInfo;
import gpms.model.Status;
import gpms.model.UserAccount;
import gpms.model.UserInfo;
import gpms.model.UserProfile;

import java.io.IOException;
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

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.mongodb.morphia.Morphia;

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

	public ProposalService() {
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

		if (proposalObj != null && proposalObj.has("ReceivedOnFrom")) {
			receivedOnFrom = proposalObj.get("ReceivedOnFrom").getTextValue();
		}

		if (proposalObj != null && proposalObj.has("ReceivedOnTo")) {
			receivedOnTo = proposalObj.get("ReceivedOnTo").getTextValue();
		}

		if (proposalObj != null && proposalObj.has("ProposalStatus")) {
			proposalStatus = proposalObj.get("ProposalStatus").getTextValue();
		}

		proposals = proposalDAO.findAllForProposalGrid(offset, limit,
				projectTitle, proposedBy, totalCostsFrom, totalCostsTo,
				receivedOnFrom, receivedOnTo, proposalStatus);

		return proposals;
	}
}
