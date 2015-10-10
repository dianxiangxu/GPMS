package gpms.dao;

import java.net.UnknownHostException;
import java.util.List;

import gpms.DAL.MongoDBConnector;
import gpms.model.UserAccount;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoException;

public class UserDAO {
	private static final String DBNAME = "db_gpms";
	public static final String COLLECTION_NAME = "user";

	private static Morphia morphia;
	private static Datastore ds;

	private static Morphia getMorphia() throws UnknownHostException,
			MongoException {
		if (morphia == null) {
			morphia = new Morphia().map(UserAccount.class);
		}
		return morphia;
	}

	private static Datastore getDatastore() throws UnknownHostException,
			MongoException {
		if (ds == null) {
			ds = getMorphia().createDatastore(MongoDBConnector.getMongo(),
					DBNAME);
		}
		return ds;
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
		ds = getDatastore();
		return ds.createQuery(UserAccount.class).asList();
	}

	public void setUserName(UserAccount account, String newName)
			throws UnknownHostException, MongoException {
		ds = getDatastore();
		account.setUserName(newName);
		ds.save(account);
	}

	public void setPassword(UserAccount account, String password)
			throws UnknownHostException, MongoException {
		ds = getDatastore();
		account.setPassword(password);
		ds.save(account);
	}

	// public List<AttributesBasicInfo> GetAttributesList(int offset, int limit,
	// AttributeBindInfo attrbuteBindObj, AspxCommonInfo aspxCommonObj)
	// {
	// try
	// {
	// List<AttributesBasicInfo> lstAttrBasic =
	// AspxItemAttrMgntController.GetItemAttributes(offset, limit,
	// attrbuteBindObj, aspxCommonObj);
	// return lstAttrBasic;
	// }
	// catch (Exception e)
	// {
	// throw e;
	// }
	// }

}
