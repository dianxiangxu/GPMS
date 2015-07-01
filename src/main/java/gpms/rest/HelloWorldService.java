package gpms.rest;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.jaxrs.json.annotation.JSONP;

// Plain old Java Object it does not extend as class or implements 
// an interface

// The class registers its methods for the HTTP GET request using the @GET annotation. 
// Using the @Produces annotation, it defines that it can deliver several MIME types,
// text, XML and HTML. 

// The browser requests per default the HTML MIME type.

//Sets the path to base URL + /hello
@Path("/hello")
public class HelloWorldService {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello() {
		return "Hello Jersey";
	}

	// This method is called if XML is request
	@Path("{id}/xml")
	@GET
	@Produces(MediaType.TEXT_XML)
	public String sayXMLHello(@PathParam("id") String id) {
		return "<?xml version=\"1.0\"?>" + "<hello> Hello " + id + "</hello>";
	}

	// This method is called if HTML is request
	@Path("{id}/html")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String sayHtmlHello(@PathParam("id") String id) {
		return "<html> " + "<title>" + "Hello " + id + "</title>"
				+ "<body><h1>" + "Hello " + id + "</body></h1>" + "</html> ";
	}

	// Using Parameterized REST
	@GET
	@Path("/{parameter}")
	public Response responseMsg(@PathParam("parameter") String parameter,
			@DefaultValue("Nothing to say") @QueryParam("value") String value) {

		String output = "Hello from: " + parameter + " : " + value;

		return Response.status(200).entity(output).build();
	}

	// For JSON example
	@GET
	@Path("/GetAllProducts")
	@Produces(MediaType.APPLICATION_JSON)
	public String getAllProducts() {
		return "{\"name\":\"MAC\", \"quantity\":\"10\"}";
	}
}
