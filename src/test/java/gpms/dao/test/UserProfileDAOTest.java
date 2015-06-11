package gpms.dao.test;

import static org.junit.Assert.*;
import gpms.DAL.MongoDBConnector;
import gpms.dao.TestClassDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.TestClass;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;



public class UserProfileDAOTest {

	MongoClient mongoClient;
	Morphia morphia;
	TestClassDAO testClassDAO;
	Datastore datastore;
	String dbName = "testBox";
	String firstName, middleName, lastName;
	String userName;
	long count;
	UserProfileDAO newUserProfileDAO;

	@Before
	public void initiate() throws UnknownHostException, MongoException 
	{
		mongoClient = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(TestClass.class);
		datastore = morphia.createDatastore(mongoClient, dbName);

		firstName = "Rick";
		middleName = "Andrew";
		lastName = "Hunter";	
	}

	@After
	public void cleanup()
	{
		//This line will nuke all items in the collection
		//		newUserProfileDAO.deleteAll();
	}


	@Test public void test0() throws UnknownHostException
	{
		//Test creation of ds
		//Test that size does not increase
		newUserProfileDAO = new UserProfileDAO(morphia, mongoClient, dbName);
		count = newUserProfileDAO.count();
		System.out.println("Count of db is: " + newUserProfileDAO.count());
		List<UserProfile> list = newUserProfileDAO.findAll();
		System.out.println("DB Size is " + list.size());
		System.out.println(list.toString());
		assertTrue(count == newUserProfileDAO.count());	
	}

	@Test
	public void testSearchByFirstName()
	{
		//Test that a user can be added and the first name can be retrieved.
		//Test that list size increments +1
		UserProfile newUser = new UserProfile(firstName, middleName, lastName);
		newUserProfileDAO = new UserProfileDAO(morphia, mongoClient, dbName);
		count = newUserProfileDAO.count();
		System.out.println("Count is: " + count);
		newUserProfileDAO.save(newUser);
		System.out.println("DB size is: " +newUserProfileDAO.count());
		List<UserProfile> list = new ArrayList<UserProfile>();
		list = newUserProfileDAO.findByFirstName(firstName);
		System.out.println("Object at ind 0 is: " +list.get(0).toString());
		System.out.println("Object First name at ind 0 is: " + list.get(0).getFirstName());
		System.out.println(list.toString());
		assertTrue(list.get(0).getFirstName().equals(firstName));
		assertTrue(count+1 == newUserProfileDAO.count());
	}

	@Test public void testSearchByMiddleName()
	{
		//Test middleName search
		UserProfile newUser = new UserProfile(firstName, middleName, lastName);
		newUserProfileDAO = new UserProfileDAO(morphia, mongoClient, dbName);
		count = newUserProfileDAO.count();
		System.out.println("Count is: " + count);
		newUserProfileDAO.save(newUser);
		System.out.println("DB size is: " +newUserProfileDAO.count());
		List<UserProfile> list = new ArrayList<UserProfile>();
		list = newUserProfileDAO.findByMiddleName(middleName);
		System.out.println("Object at ind 0 is: " + list.get(0).toString());
		System.out.println("Object middle name at ind 0 is: " + list.get(0).getMiddleName());

		assertTrue(list.get(0).getMiddleName().equals(middleName));
		assertTrue(count+1 == newUserProfileDAO.count());

	}

	@Test public void testSearchByLastName()
	{
		//Test lastName search
		UserProfile newUser = new UserProfile(firstName, middleName, lastName);
		newUserProfileDAO = new UserProfileDAO(morphia, mongoClient, dbName);
		count = newUserProfileDAO.count();
		System.out.println("Count is: " + count);
		newUserProfileDAO.save(newUser);
		System.out.println("DB size is: " +newUserProfileDAO.count());
		List<UserProfile> list = new ArrayList<UserProfile>();
		list = newUserProfileDAO.findByMiddleName(middleName);
		System.out.println("Object at ind 0 is: " + list.get(0).toString());
		System.out.println("Object last name at ind 0 is: " + list.get(0).getLastName());

		assertTrue(list.get(0).getLastName().equals(lastName));
		assertTrue(count+1 == newUserProfileDAO.count());
	}
	
	
	@Test 
	public void testSearchByFirstNameIgnoreCase()
	{
		System.out.println("Launching test: SEARCHBYFIRSTNAMEIGNORECASE");
		UserProfile newUser = new UserProfile(firstName, middleName, lastName);
		UserProfile newUser2 = new UserProfile("rick", "Boris", "Sisco");
		newUserProfileDAO = new UserProfileDAO(morphia, mongoClient, dbName);
		count = newUserProfileDAO.count();
		System.out.println("Count is: " + count);
		newUserProfileDAO.save(newUser);
		newUserProfileDAO.save(newUser2);
		System.out.println("DB size is: " +newUserProfileDAO.count());
		List<UserProfile> list = new ArrayList<UserProfile>();
		String testFirstNameChangeCase = "RIck";
		list = newUserProfileDAO.findByFirstNameIgnoreCase(testFirstNameChangeCase);
		System.out.println("Object at ind 0 is: " +list.get(0).toString());
		System.out.println("The list ignoring case is: " + list.toString());
		assertTrue(list.get(0).getFirstName().equals("Rick"));
		assertTrue(count+2 == newUserProfileDAO.count());	
	}

//	@Test
//	public void testSortByFirstName()
//	{
//		System.out.println("Launching test: SORTBYFIRSTNAME");
//		UserProfile User1 = new UserProfile(firstName, middleName, lastName);
//		String firstName2, middleName2, lastName2;
//		firstName2 = "Albert";
//		middleName2 = "Bradford";
//		lastName2 = "Wesker";
//		UserProfile User2 = new UserProfile(firstName2, middleName2, lastName2);
//		newUserProfileDAO = new UserProfileDAO(morphia, mongoClient, dbName);
//		newUserProfileDAO.save(User1);
//		newUserProfileDAO.save(User2);
//		List<UserProfile> list = new ArrayList<UserProfile>();
//		list = newUserProfileDAO.sortAllByFirstName();
//		
//		System.out.println(list.toString());
//		
//	}
	
}