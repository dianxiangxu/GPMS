package gpms.dao.test;

import gpms.DAL.MongoDBConnector;
import gpms.dao.UserProfileDAO;
import gpms.model.UserInfo;

import java.net.UnknownHostException;
import java.util.List;

import org.junit.Test;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class UserProfileMethodTest {

	@Test
	public void test() throws UnknownHostException {
		MongoClient mongo;
		Morphia morphia;
		mongo = MongoDBConnector.getMongo();
		morphia = new Morphia();
		UserProfileDAO upDAO = new UserProfileDAO(mongo, morphia, "GPMS");

		List<UserInfo> upList = upDAO.findAllForUserGrid(0, 10, null, null,
				"Computer", "T", null, null);

		for (UserInfo up : upList) {
			System.out.println(up.toString());
		}
	}

}
