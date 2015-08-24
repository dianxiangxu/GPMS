package gpms.dao;

import gpms.model.User;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;

public class UserExampleDao extends BasicDAO<User, String> {
	public UserExampleDao(MongoClient mongo, Morphia morphia) {
		super(mongo, morphia, "morphiaexample");
	}

	public List<User> findAll() {
		Datastore ds = getDatastore();
		return ds.find(User.class).asList();
	}

	public List<User> findUnderAge(int age) {
		// Filter by age less than the specified age and then order by the age
		// (youngest to oldest)
		Datastore ds = getDatastore();
		return ds.find(User.class).filter("age < ", age).order("age").asList();
	}
}
