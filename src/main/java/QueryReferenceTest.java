import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.util.Scanner;

import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;


public class QueryReferenceTest 
{
	public static void main(String[] args)
	{
		MongoClient mongoClient = MongoDBConnector.getMongo();
		Morphia morphia = new Morphia();
		boolean isLegit = false;
		String input = "";
		Scanner scan = new Scanner(System.in);
		UserAccount ua = new UserAccount();
		UserAccountDAO uaDAO = new UserAccountDAO(mongoClient, morphia, "GPMS");
		UserProfileDAO upDAO = new UserProfileDAO(mongoClient, morphia, "GPMS");
		
		while(isLegit != true)
		{
			System.out.println("Please enter your user account : ");
			input = scan.nextLine();
			ua = uaDAO.findByUserName(input);
			if(ua != null)
			{
				System.out.println("Please enter your password : ");
				input = scan.nextLine();
				if(input.equals(ua.getPassword()))
				{
					isLegit = true;
				}
			}
		}
		
		UserAccount ua2 = ua.clone();
		ua2.setUserName("fdsfs");

		if(!ua2.getUserName().equals(ua.getUserName()))
		{
			System.out.println("It works!");
		}
		else
		{
			System.out.println("It doesnt work.");
		}
		
		UserProfile up = upDAO.findByUserAccount(ua);
		UserProfile up2 = up.clone();
		up2.setFirstName("fdsfsd");
		if(!up2.getFirstName().equals(up.getFirstName()))
		{
			System.out.println("It works!");
		}
		else
		{
			System.out.println("It doesnt work.");
		}
	}
}
