package gpms.rest;

import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

@Path("/registration")
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })

public class RegistrationService {

	MongoClient mongoClient = null;
	Morphia morphia = null;
	String dbName = "GPMS";
	UserAccountDAO userAccountDAO = null;
	UserProfileDAO userProfileDAO = null;
	ProposalDAO proposalDAO = null;
	
	public RegistrationService()
	{
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		userAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		userProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
		
	}
	
}
