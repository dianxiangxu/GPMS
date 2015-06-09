package gpms.model;

import gpms.dao.BaseEntity;
import gpms.dao.UserProfileDAO;

import java.util.ArrayList;
import java.util.List;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Entity(value = UserProfileDAO.COLLECTION_NAME)
public class UserProfile extends BaseEntity {
	@Property("first name")
	private String firstname;
	@Property("middle name")
	private String middlename;
	@Property("last name")
	private String lastname;
	@Property("details")
	private List<PositionDetails> details = new ArrayList<PositionDetails>();
	@Property("phone numbers")
	private List<String> phoneNumbers = new ArrayList<String>();
	@Property("emails")
	private List<String> emails = new ArrayList<String>();
	@Reference
	@Property("user id")
	private User userid;

	/**
	 * This creates a profile for a user in the system
	 * 
	 * @param firstname
	 *            First Name of the User
	 * @param middlename
	 *            Middle Name of the User
	 * @param lastname
	 *            Last Name of the User
	 * @param details
	 * @param phonenumber
	 * @param email
	 * @param id
	 */
	public UserProfile(String firstname, String middlename, String lastname,
			ArrayList<PositionDetails> details, ArrayList<String> phoneNumbers,
			ArrayList<String> emails) {
		this.firstname = firstname;
		this.middlename = middlename;
		this.lastname = lastname;
		this.details = details;
		this.phoneNumbers = phoneNumbers;
		this.emails = emails;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getMiddlename() {
		return middlename;
	}

	public void setMiddlename(String middlename) {
		this.middlename = middlename;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public List<PositionDetails> getDetails() {
		return details;
	}

	public void setDetails(List<PositionDetails> details) {
		this.details = details;
	}

	public List<String> getPhoneNumbers() {
		return phoneNumbers;
	}

	public void setPhoneNumbers(List<String> phoneNumbers) {
		this.phoneNumbers = phoneNumbers;
	}

	public List<String> getEmails() {
		return emails;
	}

	public void setEmails(List<String> emails) {
		this.emails = emails;
	}

	public User getUserid() {
		return userid;
	}

	public void setUserid(User userid) {
		this.userid = userid;
	}

	/**
	 * Creates a User Profile with only name as parameters
	 * 
	 * @param firstname
	 *            First Name of the User
	 * @param middlename
	 *            Middle Name of the User
	 * @param lastname
	 *            Surname of the User
	 */
	public UserProfile(String firstname, String middlename, String lastname) {
		this.firstname = firstname;
		this.middlename = middlename;
		this.lastname = lastname;
	}

	/**
	 * Parameter-less constructor, required for ObjectId creation.
	 */
	public UserProfile() {

	}

	/**
	 * @return toString format for user profile, name of user.
	 */
	@Override
	public String toString() {
		return this.getFirstname() + " " + this.getMiddlename() + " "
				+ this.getLastname();
	}

}
