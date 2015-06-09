package gpms.dao;

import gpms.model.TestClass;

import java.net.UnknownHostException;
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
		Datastore ds = getDatastore();
		return ds.find(TestClass.class).asList();
	}

	public List<TestClass> findUnderAge(int age) {
		// Filter by age less than the specified age and then order by the age
		// (youngest to oldest)
		Datastore ds = getDatastore();
		return ds.find(TestClass.class).filter("age < ", age).order("age")
				.asList();
	}

	public List<TestClass> findTestUnderName(String name) {
		Datastore ds = getDatastore();
		return ds.find(TestClass.class).filter("name = ", name).order("name")
				.asList();
	}

	public List<TestClass> findTestBySurname(String surname) {
		// Execute the query using the underlying datasource
		Datastore ds = getDatastore();
		return ds.find(TestClass.class).field("surname").equal(surname)
				.asList();
	}

	public TestClass findByEmail(String email) {
		Datastore ds = getDatastore();
		return ds.find(TestClass.class).filter("email = ", email).get();
	}

	public List<TestClass> getOpenTodos() throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(TestClass.class).field("completed")
				.equal(Boolean.FALSE).asList();
	}

	public void setTestAsCompleted(TestClass testRef)
			throws UnknownHostException {
		Datastore ds = getDatastore();
		ds.update(
				ds.createQuery(TestClass.class).field("id")
						.equal(testRef.getId()),
				ds.createUpdateOperations(TestClass.class).set("completed",
						Boolean.TRUE));
	}

}
