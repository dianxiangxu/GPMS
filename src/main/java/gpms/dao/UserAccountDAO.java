package gpms.dao;

import gpms.DAL.MongoDBConnector;
import gpms.model.UserAccount;

import java.net.UnknownHostException;
import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class UserAccountDAO extends BasicDAO<UserAccount, String> {
	private static final String DBNAME = "GPMS";
	public static final String COLLECTION_NAME = "useraccount";

	private static Morphia morphia;
	private static Datastore ds;

	private static Morphia getMorphia() throws UnknownHostException,
			MongoException {
		if (morphia == null) {
			morphia = new Morphia().map(UserAccount.class);
		}
		return morphia;
	}

	@Override
	public Datastore getDatastore() {
		if (ds == null) {
			try {
				ds = getMorphia().createDatastore(MongoDBConnector.getMongo(),
						DBNAME);
				ds.ensureIndexes();
			} catch (UnknownHostException | MongoException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return ds;
	}

	public UserAccountDAO(MongoClient mongo, Morphia morphia, String dbName) {
		super(mongo, morphia, dbName);
	}

	public List<UserAccount> findAll() throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(UserAccount.class).asList();
	}

	public UserAccount findByID(ObjectId id) {
		Datastore ds = getDatastore();
		return ds.createQuery(UserAccount.class).field("id").equal(id).get();
	}

	public UserAccount findByUserName(String userName) {
		Datastore ds = getDatastore();
		return ds.createQuery(UserAccount.class).field("username")
				.equal(userName).get();
	}
}