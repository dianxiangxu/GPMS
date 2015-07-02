package gpms.rest;

import gpms.model.Proposal;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/jsonServices")
public class JerseyClientSevice {
	@GET
	@Path("/print/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public UserProfile produceJSON(@PathParam("name") String name) {

		UserProfile user = new UserProfile(name, "", "Munakami");

		return user;
	}

	@GET
	@Path("/print/UserProfile")
	@Produces(MediaType.APPLICATION_JSON)
	public UserProfile produceUserProfileJSON() {

		UserProfile userProfile = new UserProfile();

		return userProfile;
	}

	@GET
	@Path("/print/UserAccount")
	@Produces(MediaType.APPLICATION_JSON)
	public UserAccount produceUserAccountJSON() {

		UserAccount userAccount = new UserAccount();

		return userAccount;
	}

	@GET
	@Path("/print/Proposal")
	@Produces(MediaType.APPLICATION_JSON)
	public Proposal produceProposalJSON() {

		Proposal proposal = new Proposal();

		return proposal;
	}

	@POST
	@Path("/send")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response consumeJSON(UserProfile user) {

		String output = user.toString();

		return Response.status(200).entity(output).build();
	}
}
