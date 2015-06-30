package gpms.application;

import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class MainDriverTest 
{

	public static void main(String argsp[])
	{
		UserAccountDAO activeLog = null;
		UserAccount loggedInAs = null;
		UserProfile loggedInProfile = null;
		UserProfileDAO newProfile;
		MongoClient mongoClient = MongoDBConnector.getMongo();
		Morphia morphia = new Morphia();
		String dbName = "GPMS";
		boolean endProgram = false;
		RestMode restMode = null;
		Scanner keyb = new Scanner(System.in);
		int loginType = 0;
		NewUserRegistration newUserRegistration;
		
		
		String username = null;
		String password = null;





		System.out.println("Loading and initializing resources: ");

		//		mongoClient = MongoDBConnector.getMongo();
		//		morphia = new Morphia();
		//		morphia.map(UserProfile.class).map(UserAccount.class);
		//		//datastore = morphia.createDatastore(mongoClient, dbName);
		//		
		//		newUserProfileDAO = new UserProfileDAO(mongoClient, morphia, dbName);



		System.out.println("Welcome to the GPMS Database");
		System.out.println("Please Log-in or register to continue");


		boolean begin = false;

		while(!begin)
		{
			keyb = new Scanner(System.in);
			System.out.println("Please type the number for your choice:");
			System.out.println("1: Log-in");
			System.out.println("2: Register");
			if(keyb.hasNextInt())
			{
				loginType = keyb.nextInt();
			}
			if(loginType == 1 || loginType == 2)
			{
				begin = true;
			}
			else
			{
				System.out.println("Invalid argument length or type.");	
			}
		}

		System.out.println("You have chosen: " + loginType);

		if(loginType == 1)
		{
			//Log in to the system.

			System.out.println("Please type in your user name to continue:");

			activeLog = new UserAccountDAO(mongoClient, morphia, dbName);
			newProfile = new UserProfileDAO(mongoClient, morphia, dbName);
			boolean userFound = false;

			while(!userFound && loginType == 1)
			{
				keyb = new Scanner(System.in);
				username = keyb.nextLine();
				if(username.equals("NEWUSER"))
				{
					loginType = 2;
					System.out.println("Moving to registration");
					break;
				}
				if(activeLog.findByUserName(username) != null)
				{
					userFound = true;
					loggedInAs = activeLog.findByUserName(username);
					loggedInProfile = newProfile.findByUserAccount(loggedInAs);
				}
				else
				{
					if(!userFound)
					{	
						System.out.println("User name not found\nPlease re-enter your user name, or type NEWUSER to go to registration");
					}
				}
			}

			if(loginType == 2 && (!userFound))
			{
				System.out.println("Skpping a step");
			}
			else
			{	
				System.out.println("Username : " + username);
				System.out.println("Please enter your password.");

				boolean verified = false;
				int attemptsRemaining = 3;

				while(!verified && attemptsRemaining > 0)
				{
					password = keyb.next();
					if(password.equals(loggedInAs.getPassword()))
					{
						verified = true;
					}
					else
					{
						System.out.println("incorrect password: please try again");
						attemptsRemaining--;
						System.out.println("Attempts remaining " + attemptsRemaining);
					}
				}

				if(attemptsRemaining == 0 && (!verified))
				{
					System.out.println("Failed 3 log in attempts.  Exiting system for security reasons");
					System.exit(1);
				}

				System.out.println("Verified username and password");
				newProfile = new UserProfileDAO(mongoClient, morphia, dbName);
				loggedInProfile = newProfile.findByUserAccount(loggedInAs);

				System.out.println("Welcome " + loggedInProfile.getFirstName() + " " + loggedInProfile.getLastName());
				System.out.println("What would you like to do today?");
				restMode = new RestMode(loggedInProfile);
				
			}

		}

		if(loginType == 2)
		{
			newUserRegistration = new NewUserRegistration();
			restMode = new RestMode(newUserRegistration.getUserProfile());
		}

		while(!endProgram)
		{
			restMode.runIdleOperation();
			endProgram = restMode.stopRunning();
		}
		
		//Close Input
		keyb.close();
	}//End Main Class

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////     END MAIN DRIVER CLASS AND BEGIN STATIC METHODS     ///////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	/**
	 * Totally stole this from a stack overflow post
	 * This will check for "illegal characters" that we list
	 * @param toExamine the string that is to be examined
	 * @return true if illegal characters are found in the string
	 */
	public static boolean containsIllegals(String toExamine) 
	{
		Pattern pattern = Pattern.compile("[~#@*+%{}<>\\[\\]|\"\\_^]");
		Matcher matcher = pattern.matcher(toExamine);
		return matcher.find();
	}

}


