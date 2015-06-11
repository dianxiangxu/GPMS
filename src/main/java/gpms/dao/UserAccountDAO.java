package gpms.dao;

import gpms.model.UserAccount;

import java.net.UnknownHostException;
import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;

public class UserAccountDAO extends BasicDAO<UserAccount, String> 
{
	
	public UserAccountDAO(Morphia morphia, MongoClient mongo, String dbName) 
	{
		super(mongo, morphia, dbName);
	}

	public List<UserAccount> findAll() throws UnknownHostException 
	{
		Datastore ds = getDatastore();
		return ds.createQuery(UserAccount.class).asList();
	}

}