package gpms.application;

import gpms.DAL.MongoDBConnector;
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.Address;
import gpms.model.UserAccount;
import gpms.model.UserProfile;

import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class NewUserRegistration 
{
	UserAccountDAO activeLog = null;
	UserAccount loggedInAs = null;
	UserProfile loggedInProfile = null;
	UserProfileDAO newProfile;
	
	public NewUserRegistration()
	{
		
		MongoClient mongoClient = MongoDBConnector.getMongo();
		Morphia morphia = new Morphia();
		String dbName = "GPMS";
		
		activeLog = new UserAccountDAO(mongoClient, morphia, dbName);
		newProfile = new UserProfileDAO(mongoClient, morphia, dbName);
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
		
		Address address = new Address();
		
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
		
		address.setCity(city);
		address.setState(state);
		address.setStreet(street);
		address.setZipcode(zipcode);
		address.setCountry(country);
		
		System.out.println("What position do you work for?");
		
		//Implementation to come
		
		boolean doneNumbers = false;
		String number = "";
		System.out.println("Please add your office number(s)");
		while(!doneNumbers)
		{
			System.out.println("Please type an office number to add:");
			number = keyb.nextLine();
			newUserProfile.addOfficeNumber(number);
			System.out.println("Number " + number + " added.\n  If you would like to add another number type y"
					+ ", to continue type anything else.");
			String prompt = keyb.nextLine();
			if(!prompt.equals("y"));
			{
				doneNumbers = true;
			}
		}

		doneNumbers = false;
		
		System.out.println("Please add your mobile number(s)");
		while(!doneNumbers)
		{
			System.out.println("Please type a mobile number to add:");
			number = keyb.nextLine();
			newUserProfile.addMobileNumber(number);
			System.out.println("Number " + number + " added.\n  If you would like to add another number type y"
					+ ", to continue type anything else.");
			String prompt = keyb.nextLine();
			if(!prompt.equals("y"));
			{
				doneNumbers = true;
			}
		}

		doneNumbers = false;
		
		System.out.println("Please add your home number(s)");
		while(!doneNumbers)
		{
			System.out.println("Please type a home number to add:");
			number = keyb.nextLine();
			newUserProfile.addHomeNumber(number);
			System.out.println("Number " + number + " added.\n  If you would like to add another number type y"
					+ ", to continue type anything else.");
			String prompt = keyb.nextLine();
			if(!prompt.equals("y"));
			{
				doneNumbers = true;
			}
		}

		doneNumbers = false;
		
		System.out.println("Type in your work email address:");
		String email = keyb.nextLine();
		newUserProfile.addWorkEmail(email);
		System.out.println("Type in your personal email address:");
		email = keyb.nextLine();
		newUserProfile.addPersonalEmail(email);
		
		newUserProfile.setUserId(newUserAccount);
		activeLog.save(newUserAccount);
		newProfile.save(newUserProfile);
		loggedInAs = activeLog.findByUserName(username);
		loggedInProfile = newProfile.findByUserAccount(loggedInAs);
		
		System.out.println("Operation completed.  Added: " + newProfile.findByFirstNameIgnoreCase(firstname));
		

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
	
	public UserProfile getUserProfile()
	{
		return loggedInProfile;
	}

}
