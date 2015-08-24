package gpms.dao;

import gpms.model.Family;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;

public class FamilyDao extends BasicDAO<Family, String> {
	public FamilyDao(MongoClient mongo, Morphia morphia) {
		super(mongo, morphia, "morphiaexample");
	}

	public List<Family> findBySurname(String surname) {
		// Execute the query using the underlying datasource
		Datastore ds = getDatastore();
		return ds.find(Family.class).field("surname").equal(surname).asList();
	}
}
