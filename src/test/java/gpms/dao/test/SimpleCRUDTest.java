package gpms.dao.test;

import static org.junit.Assert.*;
import gpms.model.Address;
import gpms.model.User;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;

import com.mongodb.MongoClient;

public class SimpleCRUDTest {
	String dbName = new String("bank");
	MongoClient mongo = new MongoClient();
	Morphia morphia = new Morphia();
	Datastore ds = morphia.createDatastore(mongo, dbName);

	public SimpleCRUDTest() {
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void test() {
		// fail("Not yet implemented");

		// Create an object to persist to the database
		Address address = new Address();
		address.setStreet("123 Some Street");
		address.setCity("My City");
		address.setState("ST");
		address.setZipcode("12345");

		User user = new User();
		user.setFirstName("Steven");
		user.setLastName("Haines");
		user.setAge(39);
		user.setAddress(address);

		// Insert the user into the database
		ds.save(user);

		// Query for all users in the database
		System.out.println("Users after save:");
		Query<User> users = ds.find(User.class);
		for (User u : users.fetch()) {
			System.out.println("User: " + u);
		}

		// Remove our users
		// Query<User> q = ds.createQuery(User.class);
		// ds.delete(q);
	}

}
