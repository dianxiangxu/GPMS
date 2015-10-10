package gpms.rest;

import gpms.DAL.DataModel;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.ActiveUser;
import gpms.model.Address;
import gpms.model.UserAccount;
import gpms.model.UserProfile;
import gpms.queue.ProcessingFactory;
import gpms.queue.TaskQueue;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;



@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Path("/Registration")
public class RegistrationService 
{
	private DataModel dm = new DataModel();
	private final static String queueName = "processing-queue";
	private MongoClient mongoClient= MongoDBConnector.getMongo();
	private Morphia morphia = new Morphia();
	private String dbName = "db_gpms";
	private UserAccountDAO userAccountDAO;
	private UserAccount newUserAccount;
	private UserProfileDAO userProfileDAO;
	private UserProfile newUserProfile;
	private boolean Authorized = true;


	public  RegistrationService() 
	{	
		dm = new DataModel();
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello() 
	{
		return "Hello Users";
	}

	// Register Users
	@POST
	@Path("/NewUser")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response userRegister(@FormParam("firstname") String firstname,
			@FormParam("middlename") String middleName,
			@FormParam("lastname") String lastname,
			@FormParam("username") String userName,
			@FormParam("password") String password,
			@FormParam("dob") String dob, 
			@FormParam("gender") String gender,
			@FormParam("street") String street,
			@FormParam("apt") String apt_misc,
			@FormParam("city") String city,
			@FormParam("state") String state,
			@FormParam("zip") String zipCode,
			@FormParam("country") String country,
			@FormParam("mobileNumber") String mobileNumber,
			@FormParam("officeNumber") String officeNumber,
			@FormParam("homeNumber") String homeNumber,
			@FormParam("workEmail") String workEmail,
			@FormParam("personalEmail") String personalEmail,
			@Context HttpServletRequest req) throws Exception {


		
		try 
		{
			userAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
			userProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
			newUserProfile = new UserProfile();
			newUserAccount = new UserAccount();
			newUserProfile.setFirstName(firstname);
			if(middleName!=null)
			{
				newUserProfile.setMiddleName(middleName);	
			}
			newUserProfile.setLastName(lastname);

			//Date of Birth block
			//Will either have to parse a string to figure out the date
			//Or get the form changed up a bit
			//Parsing is obviously not the preferred option
			//Date dobDate = new Calendar.set(year, month, date);


			//Address Construction Block
			Address newAddress = new Address();
			newAddress.setCity(city);
			newAddress.setState(state);
			newAddress.setZipcode(zipCode);
			newAddress.setCountry(country);
			newAddress.setStreet(street);
			if(apt_misc!=null)
			{
				newAddress.setApt(apt_misc);
			}

			newUserProfile.getAddresses().add(newAddress);
			
			//Emails and Phone Numbers
			newUserProfile.getWorkEmails().add(workEmail);
			newUserProfile.getPersonalEmails().add(personalEmail);
			newUserProfile.getHomeNumbers().add(homeNumber);
			newUserProfile.getOfficeNumbers().add(officeNumber);
			newUserProfile.getMobileNumbers().add(mobileNumber);


			//Account Setup
			newUserAccount.setUserName(userName);
			newUserAccount.setPassword(password);





			//This point should scan for a user in the database
			//If the user account name exists, we should not allow the creation of an account object.
			

			UserAccount findAccount = null;
			findAccount = userAccountDAO.findByUserName(userName);

			

			if (findAccount!=null)
			{
				Authorized = false;
				java.net.URI location = new java.net.URI(
						"../index.jsp?error=nouser");
				return Response.seeOther(location).build();
			}
		}
		catch(Exception e)
		{

		}

		if (Authorized) 
		{

			//I believe this is where it should create a user.
			//UserRegister request = new UserRegister(userInfo);

			//Not sure what this variable is yet.
			//int qId = 0;

			newUserProfile.setUserId(newUserAccount);
			userAccountDAO.save(newUserAccount);
			
			userProfileDAO.save(newUserProfile);

			/**
			 * TODO create this Object to keep track of a logged in user
			 */
			ActiveUser user = new ActiveUser(newUserProfile);

			if (user != null) {
				setMySessionID(req, user.getID());
				java.net.URI location = new java.net.URI("../home.jsp");
				return Response.seeOther(location).build();
			} else {
				java.net.URI location = new java.net.URI(
						"../index.jsp?error=nouser");
				return Response.seeOther(location).build();
			}
		}


		return null;
	}


	private void setMySessionID(@Context HttpServletRequest req, String UserID) {
		try {
			if (req == null) {
				System.out.println("Null request in context");
			}
			HttpSession session = req.getSession();
			if (session.getAttribute("userid") == null) {
				// id = System.currentTimeMillis();
				session.setAttribute("userid", UserID);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	public int getMySessionId(@Context HttpServletRequest req) {
		HttpSession session = req.getSession();
		if (session.getAttribute("userid") != null) {
			return (int) session.getAttribute("userid");
		}
		return 0;
	}

	@GET
	@Path("/GetUserID")
	@Produces(MediaType.TEXT_PLAIN)
	public String getMyUserId(@Context HttpServletRequest req) {
		HttpSession session = req.getSession();
		if (session.getAttribute("userid") != null) {
			return session.getAttribute("userid").toString();
		}
		return "0";
	}

	//
	//	@GET
	//	@Path("/GetUserID")
	//	@Produces(MediaType.TEXT_PLAIN)
	//	public String getMyUserId(@Context HttpServletRequest req) throws Exception {
	//		HttpSession session = req.getSession();
	//		if (session.getAttribute("userid") != null) {
	//			ActiveUser request = new ActiveUser();
	//			int qId = 0;
	//			Date now = new Date();
	//			SimpleDateFormat formatNow = new SimpleDateFormat(
	//					"yyyy-MM-dd HH:mm:ss");
	//
	//			String startTime = formatNow.format(now);
	//			// Get current time
	//			long start = System.currentTimeMillis();
	//
	//			TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
	//			if (queue != null) {
	//				queue.add(request);
	//				qId = dm.InsertQueue("GetUserID", startTime);
	//			}
	//			while (!request.isCompleted()) {
	//				Thread.currentThread();
	//				Thread.sleep(5);
	//			}
	//			// Get elapsed time in milliseconds
	//			long elapsedTimeMillis = System.currentTimeMillis() - start;
	//
	//			dm.UpdateQueue(qId, elapsedTimeMillis);
	//
	//			return session.getAttribute("userid").toString();
	//		}
	//		return "0";
	//	}
}

