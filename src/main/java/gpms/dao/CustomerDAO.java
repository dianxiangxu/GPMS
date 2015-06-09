package gpms.dao;

import java.util.List;

import gpms.model.Customer;
import gpms.model.Family;
import gpms.model.UserProfile;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.QueryResults;

import com.mongodb.MongoClient;

public class CustomerDAO extends BasicDAO<Customer, String> {
	// private static final String DBNAME = "GPMS";
	// public static final String COLLECTION_NAME = "user";

	// private static Morphia morphia;
	// private static Datastore ds;

	// String dbName = new String("bank");
	// MongoClient mongo = new MongoClient();
	// Morphia morphia = new Morphia();
	// Datastore datastore = morphia.createDatastore(mongo, dbName);

	public CustomerDAO(Morphia morphia, MongoClient mongo, String dbName) {
		super(mongo, morphia, dbName);
	}

	public List findAll() {
		return ds.find(Customer.class).asList();
	}
}
