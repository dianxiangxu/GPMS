//Edited by: Hector C. Ortiz
/**
 * @author Thomas Volz
 */

package gpms.model;

import gpms.dao.BaseEntity;
import gpms.dao.UserProfileDAO;

import java.util.ArrayList;
import java.util.List;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;
import org.mongodb.morphia.utils.IndexDirection;

@Entity(value = UserProfileDAO.COLLECTION_NAME, noClassnameStored = true)
public class UserProfile extends BaseEntity {
	@Property("first name")
	@Indexed(value = IndexDirection.ASC, name = "firstNameIndex")
	private String firstName = new String();

	@Property("middle name")
	// @Indexed(value = IndexDirection.ASC, name = "middleNameIndex")
	private String middleName = new String();

	@Property("last name")
	@Indexed(value = IndexDirection.ASC, name = "lastNameIndex")
	private String lastName = new String();

	@Embedded("details")
	private List<PositionDetails> details = new ArrayList<PositionDetails>();

	@Property("office number")
	private List<String> officeNumbers = new ArrayList<String>();

	@Property("mobile number")
	private List<String> mobileNumbers = new ArrayList<String>();

	@Property("home number")
	private List<String> homeNumbers = new ArrayList<String>();

	@Embedded("address")
	private Address address = new Address();

	@Property("work email")
	// @Indexed(value = IndexDirection.ASC, name = "workEmailsIndex", unique =
	// true)
	private List<String> workEmails = new ArrayList<String>();

	@Property("personal email")
	// @Indexed(value = IndexDirection.ASC, name = "personalEmailsIndex", unique
	// = true)
	private List<String> personalEmails = new ArrayList<String>();

	@Reference(value = "user id", lazy = true)
	private UserAccount userAccount = new UserAccount();

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
			ArrayList<PositionDetails> details,
			ArrayList<String> setOfficeNumbers,
			ArrayList<String> setHomeNumbers,
			ArrayList<String> setMobileNumbers, ArrayList<String> emails,
			UserAccount userAccount) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.details = details;
		officeNumbers = setOfficeNumbers;
		homeNumbers = setHomeNumbers;
		mobileNumbers = setMobileNumbers;

		this.userAccount = userAccount;
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

	}

	/**
	 * Non-Parameterized constructor, needed for @id assignment
	 */
	public UserProfile() {

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
	 * @param newName
	 *            the new first name
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
	public List<PositionDetails> getDetailsList() {
		return details;
	}

	/**
	 * Will return a PositionDetails object from the list, for manipulation
	 * 
	 * @param index
	 *            index to find
	 * @return PositionDetails object to return
	 */
	public PositionDetails getDetails(int index) {
		return details.get(index);
	}

	/**
	 * Add a collection of position details to the existing array list
	 * 
	 * @param positionDetails
	 */
	public void addDetails(PositionDetails positionDetails) {
		details.add(positionDetails);
	}

	public void deleteDetails(PositionDetails positionDetails) {
		int deleteInd = details.indexOf(positionDetails);
		details.remove(deleteInd);
	}

	/**
	 * Adds a new office number to the arraylist
	 * 
	 * @param officeNumber
	 *            Office Number to be added
	 */
	public void addOfficeNumber(String officeNumber) {
		officeNumbers.add(officeNumber);
	}

	/**
	 * Adds a new office number with an EXT: to the arraylist
	 * 
	 * @param officeNumber
	 *            Office Number to be added
	 */
	public void addOfficeNumber(String officeNumber, String extention) {
		officeNumber = officeNumber + " ext: " + extention;
		officeNumbers.add(officeNumber);
	}

	/**
	 * Will delete the number from a list
	 * 
	 * @param deleteNumber
	 *            the number to be deleted
	 */
	public void deleteOfficeNumber(String deleteNumber) {
		deleteNumber(officeNumbers, deleteNumber);
	}

	/**
	 * 
	 * @return the list of office numbers
	 */
	public List<String> getOfficeNumbers() {
		return officeNumbers;
	}

	/**
	 * Used for changing the mobile number
	 * 
	 * @param oldNumber
	 *            number to change
	 * @param newNumber
	 *            number to become
	 */
	public void setOfficeNumber(String oldNumber, String newNumber) {
		setNumber(officeNumbers, oldNumber, newNumber);
	}

	/**
	 * Adds a new mobile number to the arraylist
	 * 
	 * @param mobileNumber
	 *            mobile Number to be added
	 */
	public void addMobileNumber(String mobileNumber) {
		mobileNumbers.add(mobileNumber);
	}

	/**
	 * 
	 * @return the list of office numbers
	 */
	public List<String> getMobileNumbers() {
		return mobileNumbers;
	}

	/**
	 * Used for changing the mobile number
	 * 
	 * @param oldNumber
	 *            number to change
	 * @param newNumber
	 *            number to become
	 */
	public void setMobileNumber(String oldNumber, String newNumber) {
		setNumber(mobileNumbers, oldNumber, newNumber);
	}

	/**
	 * Will delete the number from a list
	 * 
	 * @param deleteNumber
	 *            the number to be deleted
	 */
	public void deleteMobileNumber(String deleteNumber) {
		deleteNumber(mobileNumbers, deleteNumber);
	}

	/**
	 * Adds a new home number to the arraylist
	 * 
	 * @param homeNumber
	 *            Home Number to be added
	 */
	public void addHomeNumber(String homeNumber) {
		homeNumbers.add(homeNumber);
	}

	/**
	 * Used for changing the home number
	 * 
	 * @param oldNumber
	 *            number to change
	 * @param newNumber
	 *            number to become
	 */
	public void setHomeNumber(String oldNumber, String newNumber) {
		setNumber(homeNumbers, oldNumber, newNumber);
	}

	/**
	 * Will delete the number from a list
	 * 
	 * @param deleteNumber
	 *            the number to be deleted
	 */
	public void deleteHomeNumber(String deleteNumber) {
		deleteNumber(homeNumbers, deleteNumber);
	}

	/**
	 * 
	 * @return the list of home numbers
	 */
	public List<String> getHomeNumbers() {
		return homeNumbers;
	}

	/**
	 * 
	 * Change an existing number to a new one
	 * 
	 * @param numberString
	 *            the list of either office, home, mobile, etc
	 * @param newNumber
	 *            number to change the old number to
	 */
	private void setNumber(List<String> numberString, String oldNumber,
			String newNumber) {
		int index = numberString.indexOf(oldNumber);
		numberString.set(index, newNumber);
	}

	/**
	 * 
	 * Will delete a number from a list
	 * 
	 * @param numberString
	 *            number list to delete from
	 * @param deleteNumber
	 *            number to delete
	 */
	private void deleteNumber(List<String> numberString, String deleteNumber) {
		int index = numberString.indexOf(deleteNumber);
		System.out.println("Inside of delete number method: ");
		System.out.println("The number to delete is " + deleteNumber + " from list ");
		System.out.println("List before operation: " + numberString.toString());
		numberString.remove(index);
		System.out.println("List after operation: " + numberString.toString());
	}

	/**
	 * Set the address for the user
	 * 
	 * @param setAddress
	 *            address obj to add
	 */
	public void setAddress(Address setAddress) {
		address = setAddress;
	}

	/**
	 * Returns the address for use
	 * 
	 * @return the address object
	 */
	public Address getAddress() {
		return address;
	}

	/**
	 * 
	 * @return the array list of email addresses
	 */

	public List<String> getWorkEmails() {
		return workEmails;
	}

	public List<String> getPersonalEmails() {
		return personalEmails;
	}

	/**
	 * Add an email string to the email array list
	 * 
	 * @param addEmail
	 *            the new email to add
	 */
	public void addWorkEmail(String addEmail) {
		workEmails.add(addEmail);
	}

	public void setWorkEmail(String oldEmail, String newEmail) {
		int index = workEmails.indexOf(oldEmail);
		workEmails.set(index, newEmail);
	}

	public void deleteWorkEmail(String email) {
		deleteEmail(workEmails, email);
	}

	public void deletePersonalEmail(String email) {
		deleteEmail(personalEmails, email);
	}

	public void setPersonalEmail(String oldEmail, String newEmail) {
		int index = personalEmails.indexOf(oldEmail);
		personalEmails.set(index, newEmail);
	}

	public void addPersonalEmail(String addEmail) {
		personalEmails.add(addEmail);
	}

	private void deleteEmail(List<String> emailString, String deleteEmail) {
		int index = emailString.indexOf(deleteEmail);
		emailString.remove(index);
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
				+ this.getLastName() + ", Account name: "
				+ userAccount.getUserName();
	}

	public boolean equals(UserProfile up) {
		return this.userAccount.equals(up.getUserAccount())
				&& this.firstName.equals(up.firstName)
				&& this.middleName.equals(up.middleName)
				&& this.lastName.equals(up.lastName)
				&& this.details.equals(up.details);
		// && this.phoneNumbers.equals(up.phoneNumbers)

	}
	
	public UserProfile clone()
	{
		UserProfile copy = new UserProfile(this.firstName, this.middleName, this.lastName);
		for(PositionDetails pd : this.details)
		{
			copy.addDetails(pd.clone());
		}
		for(String phone : this.officeNumbers)
		{
			copy.addOfficeNumber(phone);
		}
		for(String phone : this.mobileNumbers)
		{
			copy.addMobileNumber(phone);
		}
		for(String phone : this.homeNumbers)
		{
			copy.addHomeNumber(phone);
		}
		for(String email : this.workEmails)
		{
			copy.addWorkEmail(email);
		}
		for(String email : this.personalEmails)
		{
			copy.addPersonalEmail(email);
		}
		copy.setUserId(this.userAccount.clone());
		copy.setAddress(this.address.clone());
		copy.setId(this.getId());
		
		return copy;
	}
}
