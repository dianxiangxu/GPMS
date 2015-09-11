package gpms.rest;

import gpms.DAL.DataModel;
import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;
import gpms.queue.ProcessingFactory;
import gpms.queue.TaskQueue;

import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
				@FormParam("lastname") String lastname,
				@FormParam("username") String userName,
				@FormParam("email") String email,
				@FormParam("password") String password,
				@Context HttpServletRequest req) throws Exception {

			try 
			{
				newUserProfile = new UserProfile();
				newUserAccount = new UserAccount();
				newUserProfile.setFirstName(firstname);
				newUserProfile.setLastName(lastname);
				newUserProfile.getWorkEmails().add(email);

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

				TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
				if (queue != null) {
					queue.add(newUserProfile);
					qId = dm.InsertQueue("Register", startTime);
				}
				while (!request.isCompleted()) {
					Thread.currentThread();
					Thread.sleep(5);
				}
				// Get elapsed time in milliseconds
				long elapsedTimeMillis = System.currentTimeMillis() - start;

				dm.UpdateQueue(qId, elapsedTimeMillis);
				UsersObjects user = request.getResponse();

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

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response login(@FormParam("email") String email,
			@FormParam("password") String password,
			@Context HttpServletRequest req) {
		try {
			ArrayList<UsersObjects> userList = new ArrayList<UsersObjects>();
			DataModel dm = new DataModel();
			userList = dm.getAllUsers();

			boolean isFound = false;
			if (userList.size() != 0) {
				for (UsersObjects userVO : userList) {
					if (userVO.get_username().equals(email)
							|| userVO.get_email().equals(email)) {
						if (userVO.get_password().equals(password)) {
							isFound = true;

							UserLogin request = new UserLogin();
							int qId = 0;
							Date now = new Date();
							SimpleDateFormat formatNow = new SimpleDateFormat(
									"yyyy-MM-dd HH:mm:ss");

							String startTime = formatNow.format(now);
							// Get current time
							long start = System.currentTimeMillis();

							TaskQueue queue = ProcessingFactory
									.getTaskQueue(queueName);
							if (queue != null) {
								queue.add(request);
								qId = dm.InsertQueue("Login", startTime);
							}
							while (!request.isCompleted()) {
								Thread.currentThread();
								Thread.sleep(5);
							}
							// Get elapsed time in milliseconds
							long elapsedTimeMillis = System.currentTimeMillis()
									- start;

							dm.UpdateQueue(qId, elapsedTimeMillis);
							setMySessionID(req, userVO.get_uid());

							java.net.URI location = new java.net.URI(
									"../home.jsp");
							return Response.seeOther(location).build();
						} else {
							java.net.URI location = new java.net.URI(
									"../index.jsp?msg=error");
							return Response.seeOther(location).build();
						}
					}
				}
			} else {
				java.net.URI location = new java.net.URI(
						"../index.jsp?msg=error");
				return Response.seeOther(location).build();
			}
			if (!isFound) {
				java.net.URI location = new java.net.URI(
						"../index.jsp?msg=error");
				return Response.seeOther(location).build();
			}
		} catch (Exception e) {
			return Response.status(403).type("text/plain").entity(e.getMessage()).build();
		}
		// return
		// Response.status(403).type("text/plain").entity(message).build();
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

	// Logout users
	@GET
	@Path("/Logout")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response logout(@Context HttpServletRequest req) throws Exception {
		if (req == null) {
			System.out.println("Null request in context");
		}
		HttpSession session = req.getSession();
		if (session.getAttribute("userid") != null) {
			// session.setAttribute("userid", null);

			UserLogOut request = new UserLogOut();
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
				qId = dm.InsertQueue("LogOut", startTime);
			}
			while (!request.isCompleted()) {
				Thread.currentThread();
				Thread.sleep(5);
			}
			// Get elapsed time in milliseconds
			long elapsedTimeMillis = System.currentTimeMillis() - start;

			dm.UpdateQueue(qId, elapsedTimeMillis);

			session.removeAttribute("userid");
			session.invalidate();
			java.net.URI location = null;
			try {
				location = new java.net.URI("../index.jsp");
			} catch (URISyntaxException e) {
				e.printStackTrace();
			}
			return Response.seeOther(location).build();
		}
		return null;
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
	public String getMyUserId(@Context HttpServletRequest req) throws Exception {
		HttpSession session = req.getSession();
		if (session.getAttribute("userid") != null) {
			UserDetail request = new UserDetail();
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
}