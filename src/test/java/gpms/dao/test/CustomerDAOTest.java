package gpms.dao.test;

import static org.junit.Assert.*;
import gpms.dao.CustomerDAO;
import gpms.model.Account;
import gpms.model.Customer;
import gpms.model.IndianAddress;

import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.QueryResults;

import com.mongodb.MongoClient;

public class CustomerDAOTest {
	String dbName = new String("bank");
	MongoClient mongo = new MongoClient();
	Morphia morphia = new Morphia();
	Datastore datastore = morphia.createDatastore(mongo, dbName);

	public CustomerDAOTest() {
	}

	@Before
	public void setUp() throws Exception {

	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testAddCustomer() {
		IndianAddress address = new IndianAddress();
		address.setNumber("81");
		address.setStreet("Mongo Street");
		address.setTown("City");
		address.setPostcode("CT81 1DB");

		Account account = new Account();
		account.setName("Personal Account");

		List<Account> accounts = new ArrayList<Account>();
		accounts.add(account);

		Customer customer = new Customer();
		customer.setAddress(address);
		customer.setName("Mr Bank Customer");
		customer.setAccounts(accounts);

		// Using Traditional general saving
		// Key<Customer> savedCustomer = datastore.save(customer);
		// System.out.println(savedCustomer.getId());

		// Using DAO
		CustomerDAO customerDAO = new CustomerDAO(morphia, mongo, dbName);
		customerDAO.save(customer);

		//
		List<Customer> customers = customerDAO.findAll();
		for (Customer c : customers) {
			System.out.println("Customer: " + c);
		}

		//
		Query<Customer> query = datastore.createQuery(Customer.class);
		query.and(query.criteria("accounts.name").equal("Personal Account"),
				query.criteria("address.number").equal("81"),
				query.criteria("name").contains("Bank"));

		QueryResults<Customer> retrievedCustomers = customerDAO.find(query);

		for (Customer retrievedCustomer : retrievedCustomers) {
			System.out.println(retrievedCustomer.getName());
			System.out.println(retrievedCustomer.getAddress().getPostcode());
			System.out
					.println(retrievedCustomer.getAccounts().get(0).getName());
			// customerDAO.delete(retrievedCustomer);
		}

	}

}
