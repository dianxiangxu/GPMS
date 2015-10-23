package gpms.gui;

import gpms.dao.FamilyDao;
import gpms.dao.UserExampleDao;
import gpms.model.Address;
import gpms.model.Family;
import gpms.model.User;

import java.util.List;

import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class MorphiaExampleUsingDAO {

	public static void main(String[] args) {
		try {
			// Create a Mongo instance that points to the MongoDB running on
			// local host
			MongoClient mongo = new MongoClient("localhost");

			// Create a Morphia object and map our model classes
			Morphia morphia = new Morphia();
			morphia.map(User.class).map(Address.class).map(Family.class);

			// Create a DAOs
			UserExampleDao userDao = new UserExampleDao(mongo, morphia);
			FamilyDao familyDao = new FamilyDao(mongo, morphia);

			// Query for all users in the database
			System.out.println("Users before we start:");
			List<User> users = userDao.find().asList();
			for (User u : users) {
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
			userDao.save(dad);
			User mom = new User();
			mom.setFirstName("Linda");
			mom.setLastName("Haines");
			mom.setAddress(address);
			userDao.save(mom);

			User son = new User();
			son.setFirstName("Michael");
			son.setLastName("Haines");
			son.setAge(9);
			son.setAddress(address);
			userDao.save(son);

			User daughter = new User();
			daughter.setFirstName("Rebecca");
			daughter.setLastName("Haines");
			daughter.setAge(1);
			daughter.setAddress(address);
			userDao.save(daughter);

			// Build the family
			Family family = new Family();
			family.setSurname("Haines");
			family.setDad(dad);
			family.setMom(mom);
			family.getChildren().add(son);
			family.getChildren().add(daughter);
			familyDao.save(family);

			// Query for all users in the database
			System.out.println("Users using generic find() method:");
			users = userDao.find().asList();
			for (User u : users) {
				System.out.println("User: " + u);
			}

			// Alternately:
			System.out.println("Users using custom findAll() method:");
			users = userDao.findAll();
			for (User u : users) {
				System.out.println("User: " + u);
			}

			// Find children (under 18)
			System.out.println("Children:");
			users = userDao.findUnderAge(18);
			for (User u : users) {
				System.out.println("User: " + u);
			}

			// Use the FamilyDao
			System.out.println("Families using DAO");
			List<Family> families = familyDao.findBySurname("Haines");
			for (Family f : families) {
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
