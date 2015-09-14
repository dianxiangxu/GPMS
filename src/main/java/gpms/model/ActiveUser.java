package gpms.model;

/**
 * 
 * @author Thomas Volz
 * thomascvolz@gmail.com
 *
 */
public class ActiveUser 
{
	//This class is used to keep track of simple details of a "logged in" user in the system.
	//This is used so that we know who does what, and so we don't have to continually re-access the
	//database when we load new pages or perform other operations.  
	
	private String firstName;
	private String lastName;
	private String id;
	
	public ActiveUser()
	{
		
	}
	
	public ActiveUser(UserProfile loggedProfile)
	{
		firstName = loggedProfile.getFirstName();
		lastName = loggedProfile.getLastName();
		id = loggedProfile.getId().toString();
	}
	
	public String getFirstName()
	{
		return firstName;
	}
	
	public void setFirstName(String name)
	{
		firstName = name;
	}
	
	public void setLastName(String name)
	{
		lastName = name;
	}
	
	public String getLastName()
	{
		return lastName;
	}

	public String getID()
	{
		return id;
	}
	
	
	
}
