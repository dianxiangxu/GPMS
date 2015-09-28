package gpms.dao.test;

import org.junit.Before;
import org.junit.Test;


import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;

import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

/**
 * 
 * I'm building this to look for duplication errors when a user is saved.
 * We're starting at the ground level, making sure that the DAO's themselves aren't duplicating. 
 * @author Tommy
 *
 */
public class EditXUsers 
{
	@Before
	public void initiate()
	{
		MongoClient mongoClient = new MongoClient();
		Morphia morphia = new Morphia();
		String db = "GPMS";
	}
	
	@Test
	public void EditTest()
	{
		
	}

}
