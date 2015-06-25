package gpms.gui;

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

	static String dbName = "GPMS";
	static UserAccountDAO activeLog = null;
	static UserAccount loggedInAs = null;
	static UserProfile loggedInProfile = null;
	static UserProfileDAO newProfile;
	static MongoClient mongoClient = MongoDBConnector.getMongo();
	static Morphia morphia = new Morphia();

	public static void main(String argsp[])
	{
		Scanner keyb = new Scanner(System.in);
		int loginType = 0;
		boolean endRun = false;
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
				newUserRegistration();
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
				keyb.close();
				restMode();
			}

		}

		if(loginType == 2)
		{
			newUserRegistration();
		}

		//Close Input

	}//End Main Class

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////     END MAIN DRIVER CLASS AND BEGIN STATIC METHODS     ///////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Idle Operation for the Database
	 */
	private static void restMode()
	{
		//Defines how the program operates while waiting for input
		System.out.println("If you would like to quit, please type QUIT");
		System.out.println("Otherwise, please select an operation");
		Scanner keyb = new Scanner(System.in);
		String choice = keyb.next();
		operation(choice);
	}

	/**
	 * Method to run to register into the system as a new user 
	 * and then continue to operate.
	 */
	private static void newUserRegistration()
	{
		activeLog = new UserAccountDAO(mongoClient, morphia, dbName);
		System.out.println("Please Register a user name first:");
		String username = null; 
		String password = null; 
		String verifyPassword;
		boolean userFound = true;
		boolean cleanName = false;
		Scanner keyb = new Scanner(System.in);
		System.out.println("Type a user name you would like assigned to you:");
		while(!cleanName && userFound)
		{
			username = keyb.nextLine();
			if(username.contains(" ") || (containsIllegals(username)))
			{
				System.out.println("Don't make dumb user names.  Stick to alphanumerics");
			}
			else
			{
				if(activeLog.findByUserName(username) == null)
				{
					userFound = false;
					cleanName = true;
				}
				else
				{
					System.out.println("Username already exists in system, please try another name.");
				}	
			}

		}
		System.out.println("Username :' " + username +" 'selected");
		boolean passVerify = false;
		while(!passVerify)
		{
			System.out.println("Please type in a password: ");
			password = keyb.nextLine();
			System.out.println("Your password is: " + password);
			System.out.println("Please type your password a second time to verify:");
			verifyPassword = keyb.nextLine();
			if(password.equals(verifyPassword) && !password.contains(" "))
			{
				passVerify = true;
			}
			else
			{
				System.out.println("Look man, don't make weird passwords, try again.");
				System.out.println("Just don't use spaces and we'll be ok.");
			}
		}
		
		System.out.println("Verification successful, creating user account");
		
		UserAccount newUserAccount = new UserAccount();
		newUserAccount.setUserName(username);
		newUserAccount.setPassword(password);

		System.out.println("Now we need to create user information for you.");
		UserProfile newUserProfile = new UserProfile();
		System.out.println("I'm only giving you one try so get this right.");
		System.out.println("You may just press enter if you wish to leave the fields blank");
		System.out.println("Please enter your first name:");
		String firstname = keyb.nextLine();
		System.out.println("Please enter your middle name:");
		String middlename = keyb.nextLine();
		System.out.println("Please enter your last name:");
		String lastname = keyb.nextLine();
		
		newUserProfile.setFirstName(firstname);
		newUserProfile.setLastName(lastname);
		newUserProfile.setMiddleName(middlename);
		
		System.out.println("Please enter your address:");
		System.out.println("City: ");
		String city = keyb.nextLine();
		System.out.println("Street Address:");
		String street = keyb.nextLine();
		System.out.println("State:");
		String state = keyb.nextLine();
		System.out.println("Zipcode:");
		String zipcode = keyb.nextLine();
		System.out.println("Country:");
		String country = keyb.nextLine();
		
	}


	private static void operation(String calledOp)
	{
		//Method to choose actions to perform
		System.out.println("Please select an operation to perform:");
	}

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



