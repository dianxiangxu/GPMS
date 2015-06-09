package gpms.dao;

import gpms.DAL.MongoDBConnector;
import gpms.model.UserAccount;

import java.net.UnknownHostException;
import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class UserAccountDAO extends BasicDAO<UserAccount, String> {
	private static final String DBNAME = "GPMS";
	public static final String COLLECTION_NAME = "user";

	private static Morphia morphia;
	private static Datastore ds;
	
	public UserAccountDAO(MongoClient mongo, Morphia morphia) {
		super(mongo, morphia, DBNAME);
	}
	
	public UserAccountDAO(Morphia morphia, MongoClient mongo, String dbName) {
		super(mongo, morphia, dbName);
	}

	private static Morphia getMorphia() throws UnknownHostException,
			MongoException {
		if (morphia == null) {
			morphia = new Morphia().map(UserAccount.class);
		}
		return morphia;
	}

	public static void saveUserAccount(UserAccount userAccount)
			throws UnknownHostException {
		Morphia morphia = getMorphia();
		morphia.map(UserAccount.class);
		Datastore ds = morphia.createDatastore(MongoDBConnector.getMongo(),
				DBNAME);
		ds.save(userAccount);
	}

	public static List<UserAccount> getAllUserAccounts()
			throws UnknownHostException {
		return ds.createQuery(UserAccount.class).asList();
	}
}
