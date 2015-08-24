package gpms.dao.test;

import gpms.DAL.MongoDBConnector;
import gpms.dao.UserProfileDAO;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class MethodTest {
	private final static Logger logger = LoggerFactory
			.getLogger(MongoDBConnector.class);

	private MongoClient mongo;
	private Morphia morphia;
	private UserProfileDAO userProfileDao;
	private final String dbName = "GPMS";
	Datastore datastore;
	Query<UserProfile> query = null;
	UserProfile up = new UserProfile();
	List<UserProfile> ups = new ArrayList<UserProfile>();

	public MethodTest() {
	}

	@Before
	public void initiate() throws UnknownHostException, MongoException {
		mongo = MongoDBConnector.getMongo();
		mongo.dropDatabase(dbName);

		morphia = new Morphia();
		morphia.map(UserProfile.class);
		// morphia.mapPackage("gpms.model");

		userProfileDao = new UserProfileDAO(mongo, morphia, dbName);
		datastore = morphia.createDatastore(mongo, dbName);
		// ensureIndexes(): validates that an index exists for all fields
		// annotated with the @Indexed annotation, and if not it creates them
		datastore.ensureIndexes();

		query = datastore.createQuery(UserProfile.class);
		up = new UserProfile();
		ups = new ArrayList<UserProfile>();
	}

	@Test
	public void test() throws UnknownHostException {
		List<UserProfile> upList = userProfileDao.findAll();
		for (UserProfile u : upList) {
			System.out.println("User Profile: " + u);
		}
	}

}
