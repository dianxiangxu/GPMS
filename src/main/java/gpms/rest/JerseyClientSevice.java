package gpms.rest;

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

		UserProfile user = new UserProfile("Milson", "", "Munakami");

		return user;
	}

	@POST
	@Path("/send")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response consumeJSON(UserProfile user) {

		String output = user.toString();

		return Response.status(200).entity(output).build();
	}
}
