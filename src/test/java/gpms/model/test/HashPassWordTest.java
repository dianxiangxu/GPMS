package gpms.model.test;

import static org.junit.Assert.assertTrue;
import gpms.model.PasswordHash;
import gpms.model.UserAccount;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Scanner;

/**
 * 
 * This is created to test the open sourced hashing tool I found. Let's see if
 * it can create a hashed and salted password as well as retrieve it.
 * 
 * @author Thomas Volz
 * 
 *
 */
public class HashPassWordTest {

	public static void main(String args[]) throws NoSuchAlgorithmException,
			InvalidKeySpecException {

		String firstPassword;
		String secondPassword;
		// We'll create an arbitrary user
		// Then we'll have a password that we type in
		// Then simulate the "login" process and type that password again.
		Scanner keyb = new Scanner(System.in);

		System.out
				.println("Welcome to the system, we are registering you as a user:");

		System.out
				.println("You have been registered as userOne.\n  Please enter a password: ");
		firstPassword = keyb.nextLine();

		UserAccount newUser = new UserAccount();
		newUser.setUserName("userOne");
		newUser.setPassword(firstPassword);

		System.out.println("We have created the user!");
		System.out.println("Now we must log in");
		System.out.println("Welcome: " + newUser.getUserName());
		System.out.println("Your password is: " + firstPassword);
		// This of course is not the password as it is stored in the system,
		// which is hashed.
		// Just what was originally typed in for ease of remembering and
		// comparison.
		System.out.println("Enter password: ");
		secondPassword = keyb.nextLine();

		PasswordHash checkHash = new PasswordHash();

		System.out.println("Passwords match: "
				+ PasswordHash.validatePassword(secondPassword,
						newUser.getPassword()));

		assertTrue(PasswordHash.validatePassword(secondPassword,
				newUser.getPassword()));
	}

}
