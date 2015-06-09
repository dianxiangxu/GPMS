package gpms.dao.test;

import static org.junit.Assert.assertTrue;

import java.net.UnknownHostException;
import java.util.List;

import gpms.DAL.MongoDBConnector;
import gpms.dao.CustomerDAO;
import gpms.dao.TestClassDAO;
import gpms.model.Address;
import gpms.model.Customer;
import gpms.model.TestClass;
import gpms.model.User;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.QueryResults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class SimpleCRUDTest {
	private final static Logger logger = LoggerFactory
			.getLogger(MongoDBConnector.class);

	private MongoClient mongo;
	private Morphia morphia;
	private TestClassDAO testClassDao;
	private final String dbName = "testDB";
	Datastore datastore;

	public SimpleCRUDTest() {
	}

	@Before
	public void initiate() throws UnknownHostException, MongoException {
		mongo = MongoDBConnector.getMongo();
		morphia = new Morphia();
		morphia.map(TestClass.class);
		testClassDao = new TestClassDAO(mongo, morphia, dbName);
		datastore = morphia.createDatastore(mongo, dbName);
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void test() {
		long counter = testClassDao.count();
		logger.debug("The count is [" + counter + "]");

		TestClass t = new TestClass();
		t.setName("Milson");
		t.setSurname("Munakami");
		t.setEmail("milsonmun@gmail.com");
		t.setAge(29);
		t.setCompleted(Boolean.TRUE);
		testClassDao.save(t);

		long newCounter = testClassDao.count();
		logger.debug("The new count is [" + newCounter + "]");

		assertTrue((counter + 1) == newCounter);
		// You can use
		// assertEqual, assertFalse, etc.

		// List<TestClass> testUsers = testClassDao.findAllTests();
		// for (TestClass c : testUsers) {
		// System.out.println("TestClass: " + c);
		// }

		// //
		// Query<TestClass> query = datastore.createQuery(TestClass.class);
		// query.and(query.criteria("accounts.name").equal("Personal Account"),
		// query.criteria("address.number").equal("81"),
		// query.criteria("name").contains("Bank"));
		//
		// QueryResults<TestClass> retrievedTests = testClassDao.find(query);
		//
		// for (TestClass retrievedTest : retrievedTests) {
		//
		// // For simple field do like:
		// System.out.println(retrievedTest.getName());
		//
		// // If field is Embedded but not ARRAY do like:
		// // System.out.println(retrievedCustomer.getAddress().getPostcode());
		//
		// // if the field is Embedded but ARRAY do like:
		// // System.out.println(retrievedTest.getAccounts().get(0).getName());
		//
		// // testClassDao.delete(retrievedTest);
		// }
		//
		// // Query for all tests in the database
		// System.out.println("Tests after save:");
		// Query<TestClass> tests = datastore.find(TestClass.class);
		// for (TestClass test : tests.fetch()) {
		// System.out.println("Test: " + test);
		// }
		//
		// // Remove our users
		// // Query<TestClass> q = datastore.createQuery(TestClass.class);
		// // datastore.delete(q);
	}
}
