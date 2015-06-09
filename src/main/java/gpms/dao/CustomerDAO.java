package gpms.dao;

import gpms.model.Customer;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;

public class CustomerDAO extends BasicDAO<Customer, String> {
	public CustomerDAO(Morphia morphia, MongoClient mongo, String dbName) {
		super(mongo, morphia, dbName);
	}

	public List<Customer> findAll() {
		Datastore ds = getDatastore();
		return ds.find(Customer.class).asList();
	}
//	findingLastContain()
//	{
//		
//	}
}
