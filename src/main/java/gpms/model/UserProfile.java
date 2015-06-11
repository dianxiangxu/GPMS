//Edited by: Hector C. Ortiz
/**
 * @author Thomas Volz
 */

package gpms.model;

import gpms.dao.BaseEntity;

import java.util.ArrayList;
import java.util.List;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Entity
public class UserProfile extends BaseEntity 
{
	@Property("first name")
	private String firstName = new String();
	
	@Property("middle name")
	private String middleName = new String();
	
	@Property("last name")
	private String lastName = new String();
	
	@Embedded("details")
	private List<PositionDetails> details = new ArrayList<PositionDetails>();
	
	@Property("phone numbers")
	private List<String> phoneNumbers = new ArrayList<String>();
	
	@Property("emails")
	private List<String> emails = new ArrayList<String>();

	@Reference("user id")
	private UserAccount userId = new UserAccount();
	
	@Property("deleted")
	private boolean isDeleted = false;
	
	/**
	 * Non-Parameterized constructor, needed for @id assignment
	 */
	public UserProfile() 
	{
	}
	
	/**
	 * Overloaded constructor
	 * 
	 * @param firstName First Name of the User
	 * @param middleName Middle Name of the User
	 * @param lastName Last Name of the User
	 * @param details List of Job Type / Position
	 * @param phoneNumbers Phone Numbers of the User
	 * @param emails Emails of the user
	 */
	public UserProfile(String firstName, String middleName, String lastName,
<<<<<<< HEAD
			ArrayList<PositionDetails> details, ArrayList<String> phoneNumbers,
			ArrayList<String> emails, UserAccount userId) 
	{
=======
			List<PositionDetails> details, List<String> phoneNumbers,
			List<String> emails, UserAccount userId) {
>>>>>>> 0fbea801f7f6f24c3a7bbfbd759871a1038d48c4
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.details = details;
		this.phoneNumbers = phoneNumbers;
		this.emails = emails;
		this.userId = userId;
		 
	}

	/**
	 * Constructor for creating user profile with name only
	 * 
	 * @param firstName
	 *            First name of the user
	 * @param middleName
	 *            Middle name of the user
	 * @param lastName
	 *            Last name of the user
	 */
	public UserProfile(String firstName, String middleName, String lastName) 
	{
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
	}
<<<<<<< HEAD
	
=======

	/**
	 * Non-Parameterized constructor, needed for @id assignment
	 */
	public UserProfile() 
	{
		firstName = null;
		middleName = null;
		lastName = null;
	}
>>>>>>> 0fbea801f7f6f24c3a7bbfbd759871a1038d48c4

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
	 * 
	 * @param newName
	 *            the new first name
	 */
	public void setFirstName(String firstName) 
	{
		this.firstName = firstName;
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
	 * 
	 * @param newName
	 *            the new middle name
	 */
	public void setMiddleName(String middleName) 
	{
		this.middleName = middleName;
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
	 * 
	 * @param newName
	 *            the new last name
	 */
	public void setLastName(String lastName) 
	{
		this.lastName = lastName;
	}

	/**
	 * 
	 * @return the array list of details
	 */
	public List<PositionDetails> getDetails()
	{
		return details;
	}

	/**
	 * Should not be used
	 * 
	 * @param details
	 */
	public void setDetails(List<PositionDetails> details) 
	{
		this.details = details;
	}

	/**
	 * Add a collection of position details to the existing array list
	 * 
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
	public List<String> getPhoneNumbers() 
	{
		return phoneNumbers;
	}

	/**
	 * Should not be used
	 * 
	 * @param phoneNumber
	 */
	public void setPhoneNumbers(List<String> phoneNumbers) 
	{
		this.phoneNumbers = phoneNumbers;
	}

	/**
	 * 
	 * @param number
	 *            the phone number to be added to the list
	 */
	public void addPhoneNumber(String number)
	{
		phoneNumbers.add(number);
	}

	/**
	 * 
	 * @return the array list of email addresses
	 */

	public List<String> getEmails() 
	{
		return emails;
	}

	/**
	 * Should not be used
	 * 
	 * @param setEmail
	 */
	public void setEmails(List<String> emails)
	{
		this.emails = emails;
	}

	/**
	 * Add an email string to the email array list
	 * 
	 * @param addEmail
	 *            the new email to add
	 */
	public void addEmail(String addEmail) 
	{
		emails.add(addEmail);
	}
	
	public void setIsDeleted(boolean isDeleted)
	{
		this.isDeleted = isDeleted;
	}
	
	public boolean getIsDeleted()
	{
		return isDeleted;
	}

	/**
	 * toString returns full user name
	 * 
	 * @return full name of the user
	 */
	@Override
	public String toString() 
	{
<<<<<<< HEAD
		return this.getFirstName() + " " + this.getMiddleName() + " "
				+ this.getLastName();
=======
		String name = firstName + " " + middleName + " " + lastName;
		return name;
	
>>>>>>> 0fbea801f7f6f24c3a7bbfbd759871a1038d48c4
	}
	
	public boolean equals(UserProfile up)
	{
		return this.userId.equals(up.userId) && this.firstName.equals(up.firstName) && this.middleName.equals(up.middleName)
				&& this.lastName.equals(up.lastName) && this.details.equals(up.details)
				&& this.phoneNumbers.equals(up.phoneNumbers) && this.emails.equals(up.emails)
				&& this.isDeleted == up.isDeleted;
	}
}
