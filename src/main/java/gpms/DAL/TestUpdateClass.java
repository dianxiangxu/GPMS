package gpms.DAL;

import java.net.UnknownHostException;
import java.util.List;
import java.util.Scanner;

import org.bson.types.ObjectId;

import gpms.model.UserProfile;

import com.google.code.morphia.query.Query;

/**
 * Test class to access / edit information from the db
 * @author Thomas Volz
 *
 */
public class TestUpdateClass 
{
	
	public static void main (String args[]) throws UnknownHostException
	{
		//May need to initialize access to the database
		MongoDBConnector newConn = new MongoDBConnector("GPMS");
		UserProfileDAO queryUser = new UserProfileDAO();
		//Maximillian
		
		//First we want to figure out the name of the person we want
//		Query<UserProfile> updateQuery = newConn.readDatabase().createQuery(UserProfile.class).field("_firstname").equal("Maximillian");
		List<UserProfile> updateQuery = newConn.readDatabase().find(UserProfile.class).field("_firstname").equal("Maximillian").asList();
		int num = 0;
		for(UserProfile user : updateQuery)
		{
			System.out.println(num);
			System.out.println(user.getId());
			System.out.println(user.get_firstname());
			System.out.println(user.get_lastname());
			num++;
		}
		//Second we need to get the unique ID associated with that name
		//5575b0f82867241c04afc76e
		
		//Then we run the update
		System.out.println("Which number?");
		//ObjectId theId = (ObjectId)5575b0f82867241c04afc76e;
		Scanner scan = new Scanner(System.in);
		
		int selection;
		selection = scan.nextInt();
		
		queryUser.changeFirstName(updateQuery.get(selection).getId(), "Miriya");
		
		
		
		
		
		
	}

}
