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
public class UserProfile extends BaseEntity {
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
	private UserAccount userAccount;
	
	@Property("deleted")
	private boolean isDeleted = false;

	


	/**
	 * Overloaded constructor
	 * 
	 * @param firstName
	 *            First Name of the User
	 * @param middleName
	 *            Middle Name of the User
	 * @param lastName
	 *            Last Name of the User
	 * @param details
	 *            List of Job Type / Position
	 * @param phoneNumbers
	 *            Phone Numbers of the User
	 * @param emails
	 *            Emails of the user
	 */
	public UserProfile(String firstName, String middleName, String lastName,
			ArrayList<PositionDetails> details, ArrayList<String> phoneNumbers,
			ArrayList<String> emails, UserAccount userId) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.details = details;
		this.phoneNumbers = phoneNumbers;
		this.emails = emails;
		userAccount = userId;
	
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
	public UserProfile(String firstName, String middleName, String lastName) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		details = null;
		phoneNumbers = null;
		emails = null;
	}

	/**
	 * Non-Parameterized constructor, needed for @id assignment
	 */
	public UserProfile() {
		firstName = null;
		middleName = null;
		lastName = null;
		details = null;
		phoneNumbers = null;
		emails = null;
	}

	/**
	 * 
	 * @return First name of the user
	 */
	public String getFirstName() {
		return firstName;

	}

	/**
	 * Changes the first name of the user
	 * 
	 * @param newName the new first name
	 * 
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * 
	 * @return the middle name of the user
	 */
	public String getMiddleName() {
		return middleName;
	}

	/**
	 * Changes the middle name of the user
	 * 
	 * @param newName
	 *            the new middle name
	 */
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	/**
	 * 
	 * @return the last name of the user
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * Changes the last name of the user
	 * 
	 * @param newName
	 *            the new last name
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/**
	 * 
	 * @return the array list of details
	 */
	public List<PositionDetails> getDetails() {
		return details;
	}

	/**
	 * Should not be used
	 * 
	 * @param details
	 */
	public void setDetails(List<PositionDetails> details) {
		this.details = details;
	}

	/**
	 * Add a collection of position details to the existing array list
	 * 
	 * @param positionDetails
	 */
	public void addDetails(PositionDetails positionDetails) {
		details.add(positionDetails);
	}

	/**
	 * 
	 * @return the array list of phone numbers
	 */
	public List<String> getPhoneNumbers() {
		return phoneNumbers;
	}

	/**
	 * Should not be used
	 * 
	 * @param phoneNumber
	 */
	public void setPhoneNumbers(List<String> phoneNumbers) {
		this.phoneNumbers = phoneNumbers;
	}

	/**
	 * 
	 * @param number
	 *            the phone number to be added to the list
	 */
	public void addPhoneNumber(String number) {
		phoneNumbers.add(number);
	}

	/**
	 * 
	 * @return the array list of email addresses
	 */

	public List<String> getEmails() {
		return emails;
	}

	/**
	 * Should not be used
	 * 
	 * @param setEmail
	 */
	public void setEmails(List<String> emails) {
		this.emails = emails;
	}

	/**
	 * Add an email string to the email array list
	 * 
	 * @param addEmail
	 *            the new email to add
	 */
	public void addEmail(String addEmail) {
		emails.add(addEmail);
	}

	public UserAccount getUserAccount() {
		return userAccount;
	}

	public void setUserId(UserAccount newUserAccount) {
		userAccount = newUserAccount;
	}

	/**
	 * toString returns full user name
	 * 
	 * @return full name of the user
	 */
	@Override
	public String toString() {
		return this.getFirstName() + " " + this.getMiddleName() + " "
				+ this.getLastName();
	}

	public boolean equals(UserProfile up) {
		return userAccount.equals(up.getUserAccount())
				&& this.firstName.equals(up.firstName)
				&& this.middleName.equals(up.middleName)
				&& this.lastName.equals(up.lastName)
				&& this.details.equals(up.details)
				&& this.phoneNumbers.equals(up.phoneNumbers)
				&& this.emails.equals(up.emails);
	}
}
