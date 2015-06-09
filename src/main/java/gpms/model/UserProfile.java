//Edited by: Hector C. Ortiz

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
	private String firstName;
	@Property("middle name")
	private String middleName;
	@Property("last name")
	private String lastName;
	@Embedded
	@Property("details")
	private List<PositionDetails> details = new ArrayList<PositionDetails>();
	@Property("phone numbers")
	private List<String> phoneNumbers = new ArrayList<String>();
	@Property("emails")
	private List<String> emails = new ArrayList<String>();
	@Reference
	@Property("user id")
	private UserAccount userId;

	public UserProfile(String firstName, String middleName, String lastName,
			ArrayList<PositionDetails> details, ArrayList<String> phoneNumbers,
			ArrayList<String> emails, UserAccount userId) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.details = details;
		this.phoneNumbers = phoneNumbers;
		this.emails = emails;
		this.userId = userId;
	}

	public UserProfile(String firstName, String middleName, String lastName) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
	}

	public UserProfile() {
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	public UserAccount getUserId() {
		return userId;
	}

	public void setUserId(UserAccount userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return this.getFirstName() + " " + this.getMiddleName() + " "
				+ this.getLastName();
	}
}
