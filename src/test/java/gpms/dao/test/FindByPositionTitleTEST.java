package gpms.dao.test;

import static org.junit.Assert.*;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import gpms.DAL.MongoDBConnector;
import gpms.dao.ProposalDAO;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.Proposal;
import gpms.model.SimplePersonnelData;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class FindByPositionTitleTEST 
{
	MongoClient mongoClient;
	Morphia morphia;
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;
	ProposalDAO newProposalDAO;
	String dbName = "GPMS";

	
	@Before
	public void initiate() {
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
		newProposalDAO = new ProposalDAO(mongoClient, morphia, dbName);
	}
	
	@Test
	public void findTest() throws UnknownHostException 
	{
		System.out.println("Test begins");
		List<Proposal> propList = newProposalDAO.findAll();
		System.out.println(propList.toString());
//		System.out.println("Made list");
		ObjectId id = propList.get(0).getId();
		System.out.println("ID is: " + id.toString());
		
		String searchQuery = "Dean";
		System.out.println("MADE DEAN");

		List<SimplePersonnelData> newList = newProposalDAO.PersonnelQuery(id, searchQuery);
		
		System.out.println("Made the Simple List");
		System.out.println(newList.toString());
		
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
//		System.out.println("FUCK");
	}

}
