package gpms.dao;

import gpms.model.UserAccount;

import java.net.UnknownHostException;
import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;

public class UserAccountDAO extends BasicDAO<UserAccount, String> {
	private static final String DBNAME = "GPMS";
	public static final String COLLECTION_NAME = "User Account";
	private static Morphia morphia;	
	private static Datastore ds;


	public UserAccountDAO(Morphia morphia, MongoClient mongo, String dbName) {
		super(mongo, morphia, dbName);
	}



	public List<UserAccount> getAllUserAccounts() throws UnknownHostException 
	{
		Datastore ds = getDatastore();
		return ds.createQuery(UserAccount.class).asList();
	}

}