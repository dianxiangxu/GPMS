package gpms.dao;

import gpms.model.User;

import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

import java.util.List;

public class UserExampleDao extends BasicDAO<User, String> {
	public UserExampleDao(MongoClient mongo, Morphia morphia) {
		super(mongo, morphia, "morphiaexample");
	}

	public List findAll() {
		return ds.find(User.class).asList();
	}

	public List findUnderAge(int age) {
		// Filter by age less than the specified age and then order by the age
		// (youngest to oldest)
		return ds.find(User.class).filter("age < ", age).order("age").asList();
	}
}
