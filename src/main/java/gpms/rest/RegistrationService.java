package gpms.rest;

import gpms.DAL.DataModel;
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




@Path("/Registration")
public class RegistrationService 
{

	private MongoClient mongoClient = null;
	private Morphia morphia = null;
	private String dbName = "GPMS";
	private UserAccountDAO userAccountDAO = null;
	private UserAccount newUserAccount;
	private UserProfileDAO userProfileDAO = null;
	private UserProfile newUserProfile;

	private ProposalDAO proposalDAO = null;
	private boolean Authorized;

	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public class UsersService {
		DataModel dm = null;
		private final static String queueName = "processing-queue";

		public UsersService() {
			dm = new DataModel();
		}

		@GET
		@Produces(MediaType.TEXT_PLAIN)
		public String sayPlainTextHello() {
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
				if(apt_misc!=null)
				{
					newAddress.setApt(apt_misc);
				}
				
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
				UserAccountDAO newAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);

				UserAccount findAccount = null;
				findAccount = newAccountDAO.findByUserName(userName);

				boolean Authorized = true;

				if (findAccount==null)
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

				newUserProfile.setUserAccount(newUserAccount);


				Date now = new Date();
				SimpleDateFormat formatNow = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");

				String startTime = formatNow.format(now);
				// Get current time
				long start = System.currentTimeMillis();

//				TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
//				if (queue != null) {
//					queue.add(newUserProfile);
//					qId = dm.InsertQueue("Register", startTime);
//				}
//				while (!request.isCompleted()) {
//					Thread.currentThread();
//					Thread.sleep(5);
//				}
				// Get elapsed time in milliseconds
				long elapsedTimeMillis = System.currentTimeMillis() - start;

//				dm.UpdateQueue(qId, elapsedTimeMillis);
				
				/**
				 * TODO create this Object to keep track of a logged in user
				 */
				ActiveUser user = req.getResponse();

				if (user != null) {
					setMySessionID(req, user.get_uid());
					java.net.URI location = new java.net.URI("../home.jsp");
					return Response.seeOther(location).build();
				} else {
					java.net.URI location = new java.net.URI(
							"../index.jsp?error=nouser");
					return Response.seeOther(location).build();
				}
			}

		} catch (Exception e) {
			return Response.status(403).type("text/plain").entity(e.getMessage()).build();
		}
		return null;
	}


	private void setMySessionID(@Context HttpServletRequest req, int uid) {
		try {
			if (req == null) {
				System.out.println("Null request in context");
			}
			HttpSession session = req.getSession();
			if (session.getAttribute("userid") == null) {
				// id = System.currentTimeMillis();
				session.setAttribute("userid", uid);
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


	@GET
	@Path("/GetUserID")
	@Produces(MediaType.TEXT_PLAIN)
	public String getMyUserId(@Context HttpServletRequest req) throws Exception {
		HttpSession session = req.getSession();
		if (session.getAttribute("userid") != null) {
			ActiveUser request = new ActiveUser();
			int qId = 0;
			Date now = new Date();
			SimpleDateFormat formatNow = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");

			String startTime = formatNow.format(now);
			// Get current time
			long start = System.currentTimeMillis();

			TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
			if (queue != null) {
				queue.add(request);
				qId = dm.InsertQueue("GetUserID", startTime);
			}
			while (!request.isCompleted()) {
				Thread.currentThread();
				Thread.sleep(5);
			}
			// Get elapsed time in milliseconds
			long elapsedTimeMillis = System.currentTimeMillis() - start;

			dm.UpdateQueue(qId, elapsedTimeMillis);

			return session.getAttribute("userid").toString();
		}
		return "0";
	}
}
}
