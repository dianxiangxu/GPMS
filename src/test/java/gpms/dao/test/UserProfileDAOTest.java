package gpms.dao.test;

import static org.junit.Assert.*;
import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Morphia;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class UserProfileDAOTest {

	MongoClient mongoClient;
	Morphia morphia;
	// Datastore datastore;
	String dbName = "GPMS";
	String firstName, middleName, lastName;
	String userName;
	long count;
	UserProfileDAO newUserProfileDAO;
	UserProfile newUserProfile;
	UserAccountDAO newUserAccountDAO;

	@Before
	public void initiate() throws UnknownHostException, MongoException {
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(UserProfile.class).map(UserAccount.class);
		// datastore = morphia.createDatastore(mongoClient, dbName);
		newUserAccountDAO = new UserAccountDAO(mongoClient, morphia, dbName);
		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);

		firstName = "Rick";
		middleName = "Andrew";
		lastName = "Hunter";
	}

	@After
	public void cleanup() {
		// This line will nuke all items in the collection
		// newUserProfileDAO.deleteAll();
	}

	@Test
	public void test0() throws UnknownHostException {
		// Test creation of ds
		// Test that size does not increase
		count = newUserProfileDAO.count();
		System.out.println("Count of db is: " + newUserProfileDAO.count());
		List<UserProfile> list = newUserProfileDAO.findAll();
		System.out.println("DB Size is " + list.size());
		System.out.println(list.toString());
		assertTrue(count == newUserProfileDAO.count());
	}

	@Test
	public void testSearchByFirstName() {
		// Test that a user can be added and the first name can be retrieved.
		// Test that list size increments +1
		System.out.println("BEGINNING TESTSEARCHBYFIRSTNAME:");
		UserAccount ua = new UserAccount("tVolz");
		UserProfile newUser = new UserProfile();
		newUser.setFirstName(firstName);
		newUser.setMiddleName(middleName);
		newUser.setLastName(lastName);

		count = newUserProfileDAO.count();
		System.out.println("Count is: " + count);
		newUserAccountDAO.save(ua);
		newUser.setUserId(ua);
		newUserProfileDAO.save(newUser);
		System.out.println("DB size is: " + newUserProfileDAO.count());
		List<UserProfile> list = new ArrayList<UserProfile>();
		list = newUserProfileDAO.findByFirstName(firstName);
		System.out.println("Object at ind 0 is: " + list.get(0).toString());
		System.out.println("Object First name at ind 0 is: "
				+ list.get(0).getFirstName());
		System.out.println(list.toString());
		assertTrue(list.get(0).getFirstName().equals(firstName));
		assertTrue(count + 1 == newUserProfileDAO.count());
	}
	//
	// @Test
	// public void testSearchByMiddleName() {
	// // Test middleName search
	// UserProfile newUser = new UserProfile(firstName, middleName, lastName);
	// newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
	// count = newUserProfileDAO.count();
	// System.out.println("Count is: " + count);
	// newUserProfileDAO.save(newUser);
	// System.out.println("DB size is: " + newUserProfileDAO.count());
	// List<UserProfile> list = new ArrayList<UserProfile>();
	// list = newUserProfileDAO.findByMiddleName(middleName);
	// System.out.println("Object at ind 0 is: " + list.get(0).toString());
	// System.out.println("Object middle name at ind 0 is: "
	// + list.get(0).getMiddleName());
	//
	// assertTrue(list.get(0).getMiddleName().equals(middleName));
	// assertTrue(count + 1 == newUserProfileDAO.count());
	//
	// }
	//
	// @Test
	// public void testSearchByLastName() {
	// // Test lastName search
	// UserProfile newUser = new UserProfile(firstName, middleName, lastName);
	// newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
	// count = newUserProfileDAO.count();
	// System.out.println("Count is: " + count);
	// newUserProfileDAO.save(newUser);
	// System.out.println("DB size is: " + newUserProfileDAO.count());
	// List<UserProfile> list = new ArrayList<UserProfile>();
	// list = newUserProfileDAO.findByMiddleName(middleName);
	// System.out.println("Object at ind 0 is: " + list.get(0).toString());
	// System.out.println("Object last name at ind 0 is: "
	// + list.get(0).getLastName());
	//
	// assertTrue(list.get(0).getLastName().equals(lastName));
	// assertTrue(count + 1 == newUserProfileDAO.count());
	// }
	//
	// @Test
	// public void testSearchByFirstNameIgnoreCase() {
	// System.out.println("Launching test: SEARCHBYFIRSTNAMEIGNORECASE");
	// UserProfile newUser = new UserProfile(firstName, middleName, lastName);
	// UserProfile newUser2 = new UserProfile("rick", "Boris", "Sisco");
	// newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);
	// count = newUserProfileDAO.count();
	// System.out.println("Count is: " + count);
	// newUserProfileDAO.save(newUser);
	// newUserProfileDAO.save(newUser2);
	// System.out.println("DB size is: " + newUserProfileDAO.count());
	// List<UserProfile> list = new ArrayList<UserProfile>();
	// String testFirstNameChangeCase = "RIck";
	// list = newUserProfileDAO
	// .findByFirstNameIgnoreCase(testFirstNameChangeCase);
	// System.out.println("Object at ind 0 is: " + list.get(0).toString());
	// System.out.println("The list ignoring case is: " + list.toString());
	// assertTrue(list.get(0).getFirstName().equals("Rick"));
	// assertTrue(count + 2 == newUserProfileDAO.count());
	// }
	//
	// // @Test
	// // public void testSortByFirstName()
	// // {
	// // System.out.println("Launching test: SORTBYFIRSTNAME");
	// // UserProfile User1 = new UserProfile(firstName, middleName, lastName);
	// // String firstName2, middleName2, lastName2;
	// // firstName2 = "Albert";
	// // middleName2 = "Bradford";
	// // lastName2 = "Wesker";
	// // UserProfile User2 = new UserProfile(firstName2, middleName2,
	// lastName2);
	// // newUserProfileDAO = new UserProfileDAO(morphia, mongoClient, dbName);
	// // newUserProfileDAO.save(User1);
	// // newUserProfileDAO.save(User2);
	// // List<UserProfile> list = new ArrayList<UserProfile>();
	// // list = newUserProfileDAO.sortAllByFirstName();
	// //
	// // System.out.println(list.toString());
	// //
	// // }
	//
	//
	//
	// @Test
	// public void testPrintAll() throws UnknownHostException {
	// // List<UserProfile> list = new ArrayList<UserProfile>();
	// System.out.println("BEGINNNING TEST: PRINTALL");
	// UserProfileDAO upDAO = new UserProfileDAO(mongoClient, morphia, dbName);
	// List<UserProfile> upList = upDAO.findAll();
	// System.out.println(upList.toString());
	// }
	//
	// @Test
	// public void testSaveAddress()
	// {
	// System.out.println("Saving an address");
	// //Make an address
	// newUserProfile = new UserProfile("Doctor", "Address", "Goeshere");
	// Address newAddress = new Address();
	//
	// newAddress.setCity("Dublin");
	// newAddress.setState("Alabama");
	// newAddress.setStreet("12019 Torrey Pine Court");
	// newAddress.setZipcode("22192");
	//
	// newUserProfile.setAddress(newAddress);
	// newUserProfileDAO.save(newUserProfile);
	//
	// UserProfile tempProf;
	//
	// tempProf = newUserProfileDAO.findByFirstNameIgnoreCase("Doctor").get(0);
	// System.out.println("Test retrieval");
	// System.out.println(tempProf.toString());
	// System.out.println("Test address retrieval");
	// System.out.println(tempProf.getAddress().toString());
	//
	//
	// }

}
