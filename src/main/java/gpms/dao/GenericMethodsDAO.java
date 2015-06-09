package gpms.dao;

import gpms.model.Customer;
import gpms.model.Family;
import gpms.model.TestClass;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;

public class GenericMethodsDAO extends BasicDAO<TestClass, String> {

	protected GenericMethodsDAO(MongoClient mongoClient, Morphia morphia,
			String dbName) {
		super(mongoClient, morphia, dbName);
		// super(mongoClient, morphia, "TestDB");
	}

	public List<TestClass> findAllTests() {
		return ds.find(TestClass.class).asList();
	}

	public List<TestClass> findTestUnderName(String name) {
		return ds.find(TestClass.class).filter("name = ", name).order("name")
				.asList();
	}

	public List<TestClass> findTestBySurname(String surname) {
		// Execute the query using the underlying datasource
		return ds.find(TestClass.class).field("surname").equal(surname)
				.asList();
	}
}
