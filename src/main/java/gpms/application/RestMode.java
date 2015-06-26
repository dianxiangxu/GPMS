package gpms.application;

import gpms.model.UserProfile;

import java.util.Scanner;

/**
 * Defines how the program operates "at rest" while waiting for input
 * @author Tommy
 *
 */
public class RestMode 
{
	private boolean endProgram = false;
	private UserProfile loggedInUser;
	//	private Operation operation;

	public RestMode(UserProfile loggedUser)
	{
		loggedInUser = loggedUser;
		//		Operation operation = new Operation();
	}

	/**
	 * The default "idle" mode
	 */
	public void runIdleOperation()
	{
		while(!endProgram)
		{
			Scanner rest = new Scanner(System.in);
			//Defines how the program operates while waiting for input
			System.out.println("Please select an operation to perform:");
			System.out.println("1: Create A Proposal");
			System.out.println("2: Edit An Existing Proposal");
			System.out.println("3: Create A New User Profile");
			System.out.println("4: Edit A User Profile");
			System.out.println("EXIT : Type EXIT to quit!");
			String choice;
			choice = rest.nextLine();
			if(choice.equals("EXIT"))
			{
				endProgram = true;
			}
			else
			{
				runOperation(choice, loggedInUser);
				System.out.println("Eat babies");
			}
		}
	}

	/**
	 * Used to begin an "Operation"
	 * @param calledOp
	 * @param loggedInProfile
	 */
	private void runOperation(String calledOp, UserProfile loggedInProfile)
	{
		if(calledOp.length() > 0)
		{
			if(calledOp.equals("1"))
			{
				System.out.println("You have chosen the child molester's jelly.");
			}
			if(calledOp.equals("2"))
			{
				System.out.println("Editing a proposal");
			}
			if(calledOp.equals("3"))
			{
				NewUserRegistration newUserRegistration = new NewUserRegistration();
			}
			if(calledOp.equals("4"))
			{
				System.out.println("Hey, stop eating babies.");
			}

			else
			{
				System.out.println("Input not recognized");
			}
		}
		else
		{
			System.out.println("Stop");

		}
	}

	/**
	 * Used for determining if the program should stop or continue
	 * @return true to end the program false to keep running
	 */
	public boolean stopRunning()
	{
		return endProgram;
	}
}