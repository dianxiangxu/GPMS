package gpms.gui;

import gpms.model.Address;
import gpms.model.Family;
import gpms.model.User;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;

import com.mongodb.MongoClient;

import java.util.List;

/**
 * 
 * @author shaines
 */
public class MorphiaReferenceExample {
	public static void main(String[] args) {
		try {
			// Create a Mongo instance that points to the MongoDB running on
			// local host
			MongoClient mongo = new MongoClient("localhost");

			// Create a Morphia object and map our model classes
			Morphia morphia = new Morphia();
			morphia.map(User.class).map(Address.class).map(Family.class);

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

			User dad = new User();
			dad.setFirstName("Steven");
			dad.setLastName("Haines");
			dad.setAge(39);
			dad.setAddress(address);

			// Insert the user into the database
			ds.save(dad);

			User mom = new User();
			mom.setFirstName("Linda");
			mom.setLastName("Haines");
			mom.setAddress(address);
			ds.save(mom);

			User son = new User();
			son.setFirstName("Michael");
			son.setLastName("Haines");
			son.setAge(9);
			son.setAddress(address);
			ds.save(son);

			User daughter = new User();
			daughter.setFirstName("Rebecca");
			daughter.setLastName("Haines");
			daughter.setAge(1);
			daughter.setAddress(address);
			ds.save(daughter);

			// Build the family
			Family family = new Family();
			family.setSurname("Haines");
			family.setDad(dad);
			family.setMom(mom);
			family.getChildren().add(son);
			family.getChildren().add(daughter);
			ds.save(family);

			// Query for all users in the database
			System.out.println("Users after save:");
			users = ds.find(User.class);
			for (User u : users.fetch()) {
				System.out.println("User: " + u);
			}

			// Test querying for families
			Query<Family> familyQuery = ds.find(Family.class);
			for (Family f : familyQuery.fetch()) {
				System.out.println("Family: " + f.getSurname());
				System.out.println("- Dad: " + f.getDad());
				System.out.println("- Mom: " + f.getMom());
				List<User> children = f.getChildren();
				System.out.println("Children (" + children.size() + ")");
				for (User child : children) {
					System.out.println("\t" + child);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}