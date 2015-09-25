package gpms.dao.test;

import static org.junit.Assert.*;

import java.net.UnknownHostException;
import java.util.List;

import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.PositionDetails;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class UserReferenceCheckTest {

	MongoClient mongoClient;
	Morphia morphia;
	Datastore datastore;
	String dbName = "GPMS";
	UserAccountDAO newUserAccountDAO;
	UserProfileDAO newUserProfileDAO;
	UserProfile newUserProfile;
	UserAccount newUserAccount;

	@Before
	public void setup() {
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		datastore = morphia.createDatastore(mongoClient, dbName);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
		// mongoClient.dropDatabase(dbName);
	}

	@After
	public void cleanup() {

	}

	@Test
	public void testAddandReference() throws UnknownHostException {
		long count = newUserAccountDAO.count();
		PositionDetails pd = new PositionDetails();

		newUserProfile = new UserProfile();
		newUserProfile.setFirstName("Shane");
		newUserProfile.setMiddleName("Bernthal");
		newUserProfile.setLastName("Walsh");

		newUserAccount = new UserAccount();
		newUserAccount.setUserName("sWalsh");

		pd.setCollege("Engeneering");
		pd.setDepartment("Computer Engeneering");
		pd.setPositionTitle("Non-Tenured");
		pd.setPositionType("Research Professor");

		newUserProfile.getDetails().add(pd);
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);

		assertTrue(count + 1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();

		newUserProfile = new UserProfile();
		newUserProfile.setFirstName("Hector");
		newUserProfile.setMiddleName("Caleb");
		newUserProfile.setLastName("Ortiz");

		newUserAccount = new UserAccount();
		newUserAccount.setUserName("hOrtiz");

		pd.setCollege("Engeneering");
		pd.setDepartment("Computer Science");
		pd.setPositionTitle("Tenured");
		pd.setPositionType("Professor");

		newUserProfile.getDetails().add(pd);
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);

		assertTrue(count + 1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();

		newUserProfile = new UserProfile();
		newUserProfile.setFirstName("Thomas");
		newUserProfile.setLastName("Volz");

		newUserAccount = new UserAccount();
		newUserAccount.setUserName("tVolz");

		pd.setCollege("Engeneering");
		pd.setDepartment("Computer Science");
		pd.setPositionTitle("Tenured");
		pd.setPositionType("Distinguished Professor");

		newUserProfile.getDetails().add(pd);
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);

		assertTrue(count + 1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();

		newUserProfile = new UserProfile();
		newUserProfile.setFirstName("Milson");
		newUserProfile.setLastName("Munakami");

		newUserAccount = new UserAccount();
		newUserAccount.setUserName("milsonmun");

		pd.setCollege("Engineering");
		pd.setDepartment("Computer Engeneering");
		pd.setPositionTitle("Teaching Faculty");
		pd.setPositionType("Lecturer");

		newUserProfile.getDetails().add(pd);
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);

		assertTrue(count + 1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();

		newUserProfile = new UserProfile();
		newUserProfile.setFirstName("Diangxian");
		newUserProfile.setLastName("Xu");

		newUserAccount = new UserAccount();
		newUserAccount.setUserName("dXu");

		pd.setCollege("Engeneering");
		pd.setDepartment("Computer Science");
		pd.setPositionTitle("Tenured");
		pd.setPositionType("Professor");

		newUserProfile.getDetails().add(pd);
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);

		assertTrue(count + 1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();

		newUserProfile = new UserProfile();
		newUserProfile.setFirstName("William");
		newUserProfile.setFirstName("H");
		newUserProfile.setLastName("Bush");

		newUserAccount = new UserAccount();
		newUserAccount.setUserName("wBush");

		pd.setCollege("Science");
		pd.setDepartment("Biology");
		pd.setPositionTitle("Non-tenured");
		pd.setPositionType("Reaserch Professor");

		newUserProfile.getDetails().add(pd);
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);

		assertTrue(count + 1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();

		newUserProfile = new UserProfile();
		newUserProfile.setFirstName("Turner");
		newUserProfile.setLastName("Borges");

		newUserAccount = new UserAccount();
		newUserAccount.setUserName("tBorges");

		pd.setCollege("Engeneering");
		pd.setDepartment("Electrical Engineering");
		pd.setPositionTitle("Research Staff");
		pd.setPositionType("Research Associate");

		newUserProfile.getDetails().add(pd);
		newUserProfile.setUserId(newUserAccount);
		newUserAccountDAO.save(newUserAccount);
		newUserProfileDAO.save(newUserProfile);

		assertTrue(count + 1 == newUserAccountDAO.count());
		count = newUserAccountDAO.count();

		List<UserProfile> upList = newUserProfileDAO.findAll();

		for (UserProfile up : upList) {
			System.out.println(up.toString());
		}
	}
}