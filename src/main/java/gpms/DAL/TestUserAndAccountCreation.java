package gpms.DAL;

import java.net.UnknownHostException;
import java.util.List;

import com.mongodb.MongoException;

import gpms.model.UserAccount;
import gpms.model.UserProfile;

public class TestUserAndAccountCreation 
{
	public static void main(String args[]) throws UnknownHostException, MongoException
	{
		MongoDBConnector newConn = new MongoDBConnector("GPMS");
		UserProfile newProfile;
		newProfile = new UserProfile("Maximillian", "Genius", "Sterling");
		
		UserAccount newAccount = new UserAccount("mgenius", "veritech", newProfile.getId());
		
	
		
		UserProfileDAO newUserDAO = new UserProfileDAO();
		newUserDAO.saveUserProfile(newProfile);
		
		UserDAO newUserAccount = new UserDAO();
		newUserAccount.saveUserAccount(newAccount);
		
		//With the information added, attempt to retrieve the same id from both sources.
		//Will also want to see if the user account is a sub collection of userprofile
		//or if they need to be 'mapped' via morphia
		
		List<UserProfile> updateQuery = newConn.readDatabase().find(UserProfile.class).field("firstname").equal("Maximillian").asList();
		int num = 0;
		for(UserProfile user : updateQuery)
		{
			System.out.println(num);
			System.out.println(user.getId());
			System.out.println(user.get_firstname());
			System.out.println(user.get_lastname());
			num++;
		}
		
		List<UserAccount> updateQuery2 = newConn.readDatabase().find(UserAccount.class).field("userId").equal(newProfile.getId()).asList();
		for(UserAccount user : updateQuery2)
		{
			System.out.println(user.get_username());
		}
	}
}
