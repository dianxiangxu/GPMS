package gpms.gui;

import gpms.model.Address;
import gpms.model.User;

import java.net.UnknownHostException;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class MorphiaExample {

	public static void main(String[] args) throws UnknownHostException,
			MongoException {
		// Create a Mongo instance that points to the MongoDB running on
		// local host
		MongoClient mongo = new MongoClient("localhost");

		// Create a Morphia object and map our model classes
		Morphia morphia = new Morphia();
		morphia.map(User.class).map(Address.class);

		// Create a data store
		Datastore ds = morphia.createDatastore(mongo, "morphiaexample");

		// Query for all users in the database
		System.out.println("Users before we start:");
		Query<User> users = ds.find(User.class);
		for (User u : users.fetch()) {
			System.out.println("User: " + u);
		}

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
		users = ds.find(User.class);
		for (User u : users.fetch()) {
			System.out.println("User: " + u);
		}

		// Remove our users
		// Query<User> q = ds.createQuery(User.class);
		// ds.delete(q);

		// Re-show, to verify that the users have been deleted
		System.out.println("Users after delete:");
		users = ds.find(User.class);
		for (User u : users.fetch()) {
			System.out.println("User: " + u);
		}
	}
}