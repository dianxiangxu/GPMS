package gpms.dao.test;

import static org.junit.Assert.*;
import gpms.DAL.MongoDBConnector;
import gpms.dao.TestClassDAO;
import gpms.model.TestClass;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.mapping.MappingException;
import org.mongodb.morphia.query.Query;
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
	Query<TestClass> query = null;
	TestClass test = new TestClass();
	List<TestClass> tests = new ArrayList<TestClass>();

	public SimpleCRUDTest() {
	}

	@Before
	public void initiate() throws UnknownHostException, MongoException {
		mongo = MongoDBConnector.getMongo();
		mongo.dropDatabase(dbName);

		morphia = new Morphia();
		morphia.map(TestClass.class);
		// morphia.mapPackage("gpms.model");

		testClassDao = new TestClassDAO(mongo, morphia, dbName);
		datastore = morphia.createDatastore(mongo, dbName);
		// ensureIndexes(): validates that an index exists for all fields
		// annotated with the @Indexed annotation, and if not it creates them
		datastore.ensureIndexes();

		query = datastore.createQuery(TestClass.class);
		test = new TestClass();
		tests = new ArrayList<TestClass>();
	}

	@Test
	public void testAllFunctinality() {
		// testCanSaveAndLoadATest
		long counter = testClassDao.count();
		logger.debug("The count is [" + counter + "]");

		TestClass t = new TestClass();
		t.setName("Milson");
		t.setSurname("Munakami");
		t.setEmail("milsonmun@gmail.com");
		t.setAge(29);
		t.setCompleted(Boolean.TRUE);
		testClassDao.save(t);

		// 1. using Count
		long newCounter = testClassDao.count();
		logger.debug("The new count is [" + newCounter + "]");

		assertTrue((counter + 1) == newCounter);

		// 2. Using Object Id
		assertEquals(t, datastore.get(TestClass.class, t.getId()));
		// You can use assertTrue, assertEqual, assertFalse, etc.

		// We can use following test to check Co-PIs count to be added twice for
		// same proposalId
		// assertEquals((counter + 1), datastore.get(TestClass.class, t.getId())
		// .getAllCo_PIs().size());

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

		// /************** Some default Methods **************///
		// count(): returns the total count of documents in the collection
		// count(Query<T> q): returns the total count of documents in the
		// collection that match the specified query criteria
		// delete(T entity): deletes a specified document from the collection
		// deleteById(K id): deletes the document with the specified id
		// deleteByQuery(Query<T> q): deletes all documents that match the
		// specified query
		// ensureIndexes(): validates that an index exists for all fields
		// annotated with the @Indexed annotation, and if not it creates them
		// exists(Query<T> q): returns true if there are documents in the
		// collection that match the specified query, otherwise returns false
		// find(): returns all documents in the collection
		// find(Query<T> q): returns all documents that match the specified
		// query
		// findIds(): returns the ids/keys of all documents in the collection
		// findIds(Query<T> q): returns the ids/keys of all documents in the
		// collection that match the specified query
		// findOne(Query<T> q): returns the first document that matches the
		// specified query; use this when you’re searching by a unique field (or
		// if you know you just want the first document)
		// get(K id): returns the document with the specified key
		// getCollection(): returns the underlying DBCollection for the DAO
		// getDatastore(): returns the underlying Datastore for the DAO
		// save(T entity): saves the specified document to the collection
		// update(Query<T> q, UpdateOperations<T> ops): updates all documents in
		// the collection that match the specified query with the operations
		// specified in the UpdateOperations object
		// updateFirst(Query<T> q, UpdateOperations<T> ops): updates the first
		// document in the collection that matches the specified query with the
		// operations specified in the UpdateOperations object
		//
		// 2. TO test the count with specified filter

		// we can have query with reference collection fields like
		// query.criteria("TestChild.BirthPlace").equal("Boise")
		query.and(query.criteria("Name").equal("Milson"),
				query.criteria("Surname").equal("Munakami"),
				query.criteria("Email").contains("milsonmun@gmail.com"));
		long existingCount = testClassDao.count(query);
		assertTrue(1 == existingCount);

		// 3. Use Query<T> q Everything : Don't Try this at Home! will delete
		// all records
		query = datastore.createQuery(TestClass.class);
		datastore.delete(query);
		// TODO :: Test for the Count = 0 after running above query
		long totalCount = testClassDao.count(query);
		assertTrue(0 == totalCount);

		// OR To specify the particular filter record
		t.setName("Milson");
		t.setSurname("Munakami");
		t.setEmail("milsonmun@gmail.com");
		t.setAge(29);
		t.setCompleted(Boolean.TRUE);
		testClassDao.save(t);

		// Either iterate through the DB with filter query
		test = datastore.find(TestClass.class).filter("Name = ", "Milson")
				.get();
		ObjectId testId = test.getId();

		// OR Even Easier way is:
		ObjectId savedId = t.getId();

		// Find and delete using:
		// 1.
		tests = testClassDao.findAllTests();
		for (TestClass t1 : tests) {
			System.out.println("Tests: " + t1);
			if (t1.getName().equals("Milson")) {
				// delete(T entity)
				datastore.delete(t1);
			}
		}

		// OR 2.
		// datastore.delete(TestClass.class, "Milson");

		// use a query 3.
		// datastore.delete(datastore.createQuery(TestClass.class).filter("isCompleted",
		// false));

		// FindAndDelete 4.
		// TestClass deletedTest =
		// datastore.findAndDelete(datastore.createQuery(TestClass.class).filter("Name",
		// "Milson"));

		// delete(Query<T> q): deletes all documents that match the specified
		// query
		// query.and(query.criteria("Name").equal("Milson"),
		// query.criteria("Surname").equal("Munakami"));
		// datastore.delete(query);

		// datastore.findAndModify(q, ops)

		// Test that record is deleted successfully! Many ways we can do this
		// like checking 1. the count with filters or 2. find record is null or
		// empty using exists()
		// Test any ways but we should NOT repeat the same test using different
		// methods -- > Quality of test code!

		assertNull(datastore.get(TestClass.class, t.getId()));
		// OR
		assertNull(datastore.get(TestClass.class, testId));
		// OR
		assertNull(datastore.get(TestClass.class, savedId));

		boolean exceptionThrown = false;

		try {
			datastore.get(TestClass.class, t.getId());
		} catch (RuntimeException e) {
			if (e.getCause() instanceof MappingException)
				exceptionThrown = true;
		}

		assertTrue(exceptionThrown);

		// assertFalse(Boolean.FALSE);
		// Boolean cached=cache.exists(key);
		// query.field("data."+EnumChannelType.FACEBOOK.name()).exists();

		// if (cached != null) return cached;

		// if(datastore.exists(testId) != null){
		// return true;
		// }
		// else{
		// return false;
		// }
		// datastore.exists(savedId);

		t.setName("Milson");
		t.setSurname("Munakami");
		t.setEmail("milsonmun@gmail.com");
		t.setAge(29);
		t.setCompleted(Boolean.TRUE);
		testClassDao.save(t);

		t.setName("Robinson");
		t.setSurname("Cruso");
		t.setEmail("robinhood@hotmail.com");
		t.setAge(100);
		t.setCompleted(Boolean.FALSE);
		testClassDao.save(t);

		savedId = t.getId();

		// testCanQueryForATest
		query = datastore.createQuery(TestClass.class).filter("Name = ",
				"Milson");

		TestClass result = (TestClass) query.asList().get(0);
		assertEquals(t, result);

		query = datastore.createQuery(TestClass.class).field("Name")
				.equal("Robinson");
		result = (TestClass) query.asList().get(0);
		assertEquals(t, result);

		// For using Referenced Collection Try this:
		// query =
		// datastore.createQuery(TestClass.class).field("ChildCollection.ChildFieldName").equal("ChildFieldValue");
		// result = (TestClass) query.asList().get(0);
		// assertEquals(t, result);

		// query =
		// datastore.createQuery(TestClass.class).field("ChildCollection.ChildFieldName").equal("CompareValueHere").order("ChildFieldValue").limit(100);
		// assertEquals(0, query.asList().size());

		// Test using Count verify the count is 2
		newCounter = testClassDao.count();
		logger.debug("The new count is [" + newCounter + "]"); // must be 2 as
																// we already
																// deleted
																// everything in
																// collection
																// records
		assertTrue(2 == newCounter);

		// Delete Robinson Test User by Id We can even do Iterative Ids delete
		datastore.delete(TestClass.class, savedId);
		assertNull(datastore.get(TestClass.class, savedId));

		// testCannotInsertDuplicateTestUsersWithSameEmailButCanEnterWithSameName
		// need to use : @Indexed(value = IndexDirection.ASC, name =
		// "testIndexName", unique = true) on Model
		TestClass t1 = new TestClass();
		t1.setName("Milson");
		t1.setSurname("Munakami");
		t1.setEmail("milsonmun@gmail.com");
		t1.setAge(29);
		t1.setCompleted(Boolean.TRUE);
		testClassDao.save(t1);

		TestClass t2 = new TestClass();
		t2.setName("Christhopher");
		t2.setSurname("Lee");
		t2.setEmail("milsonmun@gmail.com");
		t2.setAge(94);
		t2.setCompleted(Boolean.TRUE);
		testClassDao.save(t2);

		TestClass t3 = new TestClass();
		t3.setName("Milson");
		t3.setSurname("Lee");
		t3.setEmail("milsonmun@hotmail.com");
		t3.setAge(94);
		t3.setCompleted(Boolean.TRUE);
		testClassDao.save(t3);

		// Test the last Test User with same Email is not added!
		query = datastore.createQuery(TestClass.class).field("Email")
				.equal("milsonmun@gmail.com");
		result = (TestClass) query.asList().get(0);
		assertEquals(t1, result);

		// Test the last Test User with differnet Email with same Name is added!
		query = datastore.createQuery(TestClass.class).field("Email")
				.equal("milsonmun@hotmail.com");
		result = (TestClass) query.asList().get(0);
		assertEquals(t3, result);

	}
}
