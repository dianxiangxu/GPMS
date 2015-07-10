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
 		//mongoClient.dropDatabase(dbName);
 	}
 
 	@After
 	public void cleanup() {
 
 	}
 
 	@Test
 	public void testAddandReference() throws UnknownHostException {
 		long count = newUserAccountDAO.count();
		PositionDetails pd = new PositionDetails();
		
		
 		newUserProfile = new UserProfile("Shane", "Bernthal", "Walsh");
 		newUserAccount = new UserAccount("sWalsh");
		
		pd.setCollege("Engeneering");
		pd.setDepartment("Computer Engeneering");
		pd.setPositionTitle("Non-Tenured");
		pd.setPositionType("Research Professor");
		
		newUserProfile.addDetails(pd);
 		newUserProfile.setUserId(newUserAccount);
 		newUserAccountDAO.save(newUserAccount);
 		newUserProfileDAO.save(newUserProfile);
 
 		assertTrue(count + 1 == newUserAccountDAO.count());
 		count = newUserAccountDAO.count();
 
 		newUserProfile = new UserProfile("Hector", "Caleb", "Ortiz");
 		newUserAccount = new UserAccount("hOrtiz");
		
		
		pd.setCollege("Engeneering");
		pd.setDepartment("Computer Science");
		pd.setPositionTitle("Tenured");
		pd.setPositionType("Professor");
		
		newUserProfile.addDetails(pd);
 		newUserProfile.setUserId(newUserAccount);
 		newUserAccountDAO.save(newUserAccount);
 		newUserProfileDAO.save(newUserProfile);
 
 		assertTrue(count + 1 == newUserAccountDAO.count());
 		count = newUserAccountDAO.count();
 
 		newUserProfile = new UserProfile("Thomas", "", "Volz");
 		newUserAccount = new UserAccount("tVolz");
		
		pd.setCollege("Engeneering");
		pd.setDepartment("Computer Science");
		pd.setPositionTitle("Tenured");
		pd.setPositionType("Distinguished Professor");
		
		newUserProfile.addDetails(pd);
 		newUserProfile.setUserId(newUserAccount);
 		newUserAccountDAO.save(newUserAccount);
 		newUserProfileDAO.save(newUserProfile);
 
 		assertTrue(count + 1 == newUserAccountDAO.count());
 		count = newUserAccountDAO.count();
 
 		newUserProfile = new UserProfile("Milsen", "", "Muyasaki");
 		newUserAccount = new UserAccount("mMuyasaki");
		
		pd.setCollege("Engeneering");
		pd.setDepartment("Computer Engeneering");
		pd.setPositionTitle("Teaching Faculty");
		pd.setPositionType("Lecturer");
		
		newUserProfile.addDetails(pd);
 		newUserProfile.setUserId(newUserAccount);
 		newUserAccountDAO.save(newUserAccount);
 		newUserProfileDAO.save(newUserProfile);
 
 		assertTrue(count + 1 == newUserAccountDAO.count());
 		count = newUserAccountDAO.count();
 
 		newUserProfile = new UserProfile("Diangxian", "", "Xu");
 		newUserAccount = new UserAccount("dXu");
		
		pd.setCollege("Engeneering");
		pd.setDepartment("Computer Science");
		pd.setPositionTitle("Tenured");
		pd.setPositionType("Professor");
		
		newUserProfile.addDetails(pd);
 		newUserProfile.setUserId(newUserAccount);
 		newUserAccountDAO.save(newUserAccount);
 		newUserProfileDAO.save(newUserProfile);
 
 		assertTrue(count + 1 == newUserAccountDAO.count());
 		count = newUserAccountDAO.count();
 
 		newUserProfile = new UserProfile("William", "", "Bush");
 		newUserAccount = new UserAccount("wBush");
		
		pd.setCollege("Science");
		pd.setDepartment("Biology");
		pd.setPositionTitle("Non-tenured");
		pd.setPositionType("Reaserch Professor");
		
		newUserProfile.addDetails(pd);
 		newUserProfile.setUserId(newUserAccount);
 		newUserAccountDAO.save(newUserAccount);
 		newUserProfileDAO.save(newUserProfile);
 
 		assertTrue(count + 1 == newUserAccountDAO.count());
 		count = newUserAccountDAO.count();
 
 		newUserProfile = new UserProfile("Turner", "", "Borges");
 		newUserAccount = new UserAccount("tBorges");
		
		pd.setCollege("Engeneering");
		pd.setDepartment("Computer Science");
		pd.setPositionTitle("Research Staff");
		pd.setPositionType("Research Associate");
		
		newUserProfile.addDetails(pd);
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