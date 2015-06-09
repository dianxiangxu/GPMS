//Edited by: Hector C. Ortiz

package gpms.model;

import gpms.dao.UserProfileDAO;

import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;


@Entity(value = UserProfileDAO.COLLECTION_NAME)
public class UserProfile
{
	@Id
	private ObjectId ProfileId;
	private String firstName;
	private String middleName;
	private String lastName;
	
	@Embedded
	private ArrayList<PositionDetails> details;
	
	private ArrayList<String> phoneNumber;
	private ArrayList<String> email;
	
	@Reference
	private UserAccount userId;

	public UserProfile(String firstName, String middleName, String lastName,
			ArrayList<PositionDetails> details, ArrayList<String> phoneNumber,
			ArrayList<String> email, UserAccount userId) 
	{
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.details = details;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.userId = userId;
	}

	public UserProfile(String firstName, String middleName, String lastName) 
	{
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
	}

	public UserProfile() 
	{}

	public UserAccount getUserId() 
	{
		return userId;
	}

	public String getFirstName() 
	{
		return firstName;
	}

	public void setFirstName(String firstName) 
	{
		this.firstName = firstName;
	}

	public String getMiddleName() 
	{
		return middleName;
	}

	public void setMiddleName(String middleName) 
	{
		this.middleName = middleName;
	}

	public String getLastName() 
	{
		return lastName;
	}

	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}

	public ArrayList<PositionDetails> getDetails() 
	{
		return details;
	}

	public void setDetails(ArrayList<PositionDetails> details) 
	{
		this.details = details;
	}

	public ArrayList<String> getPhoneNumber() 
	{
		return phoneNumber;
	}

	public void setPhoneNumber(ArrayList<String> phoneNumber) 
	{
		this.phoneNumber = phoneNumber;
	}
	
	public void addPhoneNumber(String phone)
	{
		this.phoneNumber.add(phone);
	}

	public ArrayList<String> getEmail() 
	{
		return email;
	}

	public void setEmail(ArrayList<String> email) 
	{
		this.email = email;
	}

	@Override
	public String toString() 
	{
		return this.getFirstName() + " " + this.getMiddleName() + " "
				+ this.getLastName();
	}
}
