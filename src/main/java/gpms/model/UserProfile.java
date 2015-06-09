/**
 * @author Thomas Volz
 */

package gpms.model;

import gpms.dao.BaseEntity;

import java.util.ArrayList;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Entity
public class UserProfile extends BaseEntity {

	@Property("First Name")
	private String firstName;

	@Property("Middle Name")
	private String middleName;

	@Property("Last Name")
	private String lastName;

	@Embedded
	@Property("Details")
	private ArrayList<PositionDetails> details;

	@Property("Phone Number")
	private ArrayList<String> phoneNumber;

	@Property("Email")
	private ArrayList<String> email;

	@Reference
	private UserAccount userId;

	/**
	 * Overloaded constructor
	 * 
	 * @param first_Name First Name of the User
	 * @param middle_Name Middle Name of the User
	 * @param last_Name Last Name of the User
	 * @param userDetails List of Job Type / Position
	 * @param phone_Number Phone Numbers of the User
	 * @param userEmail Emails of the user
	 */
	public UserProfile(String first_Name, String middle_Name, String last_Name,
			ArrayList<PositionDetails> userDetails, ArrayList<String> phone_Number,
			ArrayList<String> userEmail) 
	{
		firstName = first_Name;
		middleName = middle_Name;
		lastName = last_Name;
		details = userDetails;
		phoneNumber = phone_Number;
		email = userEmail;
	}

	/**
	 * Constructor for creating user profile with name only
	 * 
	 * @param firstName First name of the user
	 * @param middleName Middle name of the user
	 * @param lastName Last name of the user
	 */
	public UserProfile(String first_Name, String middle_Name, String last_Name) 
	{
		firstName = first_Name;
		middleName = middle_Name;
		lastName = last_Name;
	}

	/**
	 * Non-Parameterized constructor, needed for @id assignment	
	 */
	public UserProfile() 
	{
	}

	/**
	 * 
	 * @return the moba generated ID
	 */
	public UserAccount getUserId() 
	{
		return userId;
	}

	/**
	 * 
	 * @return First name of the user
	 */
	public String getFirstName() 
	{
		return firstName;
	}

	/**
	 * Changes the first name of the user
	 * @param newName the new first name
	 */
	public void setFirstName(String newName) 
	{
		firstName = newName;
	}


	/**
	 * 
	 * @return the middle name of the user
	 */
	public String getMiddleName() 
	{
		return middleName;
	}

	/**
	 * Changes the middle name of the user
	 * @param newName the new middle name
	 */
	public void setMiddleName(String newName) 
	{
		middleName = newName;
	}

	/**
	 * 
	 * @return the last name of the user
	 */
	public String getLastName() 
	{
		return lastName;
	}

	/**
	 * Changes the last name of the user
	 * @param newName the new last name
	 */
	public void setLastName(String newName) 
	{
		lastName = newName;
	}

	/**
	 * 
	 * @return the array list of details
	 */
	public ArrayList<PositionDetails> getDetails() 
	{
		return details;
	}

	/**
	 * Should not be used
	 * @param details
	 */
	public void setDetails(ArrayList<PositionDetails> theDetails) 
	{
		details = theDetails;
	}

	/**
	 * Add a collection of position details to the existing array list
	 * @param positionDetails
	 */
	public void addDetails(PositionDetails positionDetails)
	{
		details.add(positionDetails);
	}
	
	/**
	 * 
	 * @return the array list of phone numbers
	 */
	public ArrayList<String> getPhoneNumber() 
	{
		return phoneNumber;
	}

	/**
	 * Should not be used
	 * @param phoneNumber
	 */
	public void setPhoneNumber(ArrayList<String> phoneNumber) 
	{
		this.phoneNumber = phoneNumber;
	}

	/**
	 * 
	 * @param number the phone number to be added to the list
	 */
	public void addPhoneNumber(String number) 
	{
		phoneNumber.add(number);
	}

	/**
	 * 
	 * @return the array list of email addresses
	 */
	public ArrayList<String> getEmail() 
	{
		return email;
	}

	/**
	 * Should not be used
	 * @param setEmail
	 */
	public void setEmail(ArrayList<String> setEmail) 
	{
		email = setEmail;
	}

	/**
	 * Add an email string to the email array list
	 * @param addEmail the new email to add
	 */
	public void addEmail(String addEmail)
	{
		email.add(addEmail);
	}
	
	/**
	 * toString returns full user name
	 * @return full name of the user
	 */
	@Override
	public String toString() 
	{
		String userInfo="";
		userInfo+=firstName + " " + middleName + " " + lastName;
		return userInfo;
	
	}
}
