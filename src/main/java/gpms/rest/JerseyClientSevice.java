package gpms.rest;

import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.GPMSCommonInfo;
import gpms.model.JSONTansformer;
import gpms.model.Proposal;
import gpms.model.UserAccount;
import gpms.model.UserInfo;
import gpms.model.UserProfile;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.json.JSONObject;
import org.mongodb.morphia.Morphia;

import com.google.gson.Gson;
import com.mongodb.MongoClient;

@Path("/jsonServices")
public class JerseyClientSevice {
	MongoClient mongoClient = null;
	Morphia morphia = null;
	String dbName = "GPMS";
	UserAccountDAO userAccountDAO = null;
	UserProfileDAO userProfileDAO = null;
	ProposalDAO proposalDAO = null;

	public JerseyClientSevice() {
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		userAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		userProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
		proposalDAO = new ProposalDAO(mongoClient, morphia, dbName);

	}

	@GET
	@Path("/print/{firstName}/{lastName}")
	@Produces(MediaType.APPLICATION_JSON)
	public UserProfile produceJSON(@PathParam("firstName") String firstName,
			@PathParam("lastName") String lastName) {

		UserProfile user = new UserProfile(firstName, "", lastName);

		return user;
	}

	@GET
	@Path("/print/UserAccount")
	@Produces(MediaType.APPLICATION_JSON)
	public String produceUserAccountJSON() throws JsonGenerationException,
			JsonMappingException, IOException {
		ArrayList<UserAccount> userAccounts = new ArrayList<UserAccount>();
		String response = null;

		try {
			userAccounts = (ArrayList<UserAccount>) userAccountDAO.findAll();
			response = JSONTansformer.ConvertToJSON(userAccounts);
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}

		return response;
	}

	@GET
	@Path("/print/Proposal")
	@Produces(MediaType.APPLICATION_JSON)
	public String produceProposalJSON() throws JsonGenerationException,
			JsonMappingException, IOException {
		ArrayList<Proposal> proposals = new ArrayList<Proposal>();
		String response = null;

		try {
			proposals = (ArrayList<Proposal>) proposalDAO.findAll();
			response = JSONTansformer.ConvertToJSON(proposals);
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}

		return response;
	}

	@POST
	@Path("/send")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response consumeJSON(UserProfile user) {

		String output = user.toString();

		return Response.status(200).entity(output).build();
	}
}
