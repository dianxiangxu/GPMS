//Edited by: Hector C. Ortiz
/**
 * @author Thomas Volz
 */

package gpms.model;

import gpms.dao.UserProfileDAO;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;
import org.mongodb.morphia.utils.IndexDirection;

//{"id":null,"version":null,"auditLog":[],
//"firstName":"Milson","middleName":"","lastName":"Munakami",
//"officeNumbers":[],"mobileNumbers":[],"homeNumbers":[],
//"address":{"street":"","city":"","state":"","zipcode":"","country":""},
//"workEmails":[],"personalEmails":[],
//"userAccount":{"id":null,"version":null,"auditLog":[],"userName":"","password":"","isDeleted":false},
//"isDeleted":false,"detailsList":[]}
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

	@Property("date of birth")
	private Date dateOfBirth = new Date();

	@Property("gender")
	private String gender = new String();

	@Embedded("details")
	private List<PositionDetails> details = new ArrayList<PositionDetails>();

	@Property("office number")
	private List<String> officeNumbers = new ArrayList<String>();

	@Property("mobile number")
	private List<String> mobileNumbers = new ArrayList<String>();

	@Property("home number")
	private List<String> homeNumbers = new ArrayList<String>();

	@Property("other number")
	private List<String> otherNumbers = new ArrayList<String>();

	@Embedded("addresses")
	private List<Address> addresses = new ArrayList<Address>();

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

	@Property("is deleted")
	private boolean isDeleted;

	/**
	 * Non-Parameterized constructor, needed for @id assignment
	 */
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

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public List<PositionDetails> getDetails() {
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

	public void setDetails(List<PositionDetails> details) {
		this.details = details;
	}

	public List<String> getOfficeNumbers() {
		return officeNumbers;
	}

	public void setOfficeNumbers(List<String> officeNumbers) {
		this.officeNumbers = officeNumbers;
	}

	public List<String> getMobileNumbers() {
		return mobileNumbers;
	}

	public void setMobileNumbers(List<String> mobileNumbers) {
		this.mobileNumbers = mobileNumbers;
	}

	public List<String> getHomeNumbers() {
		return homeNumbers;
	}

	public void setHomeNumbers(List<String> homeNumbers) {
		this.homeNumbers = homeNumbers;
	}

	public List<String> getOtherNumbers() {
		return otherNumbers;
	}

	public void setOtherNumbers(List<String> otherNumbers) {
		this.otherNumbers = otherNumbers;
	}

	public List<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}

	public List<String> getWorkEmails() {
		return workEmails;
	}

	public void setWorkEmails(List<String> workEmails) {
		this.workEmails = workEmails;
	}

	public List<String> getPersonalEmails() {
		return personalEmails;
	}

	public void setPersonalEmails(List<String> personalEmails) {
		this.personalEmails = personalEmails;
	}

	public UserAccount getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(UserAccount userAccount) {
		this.userAccount = userAccount;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public void setUserId(UserAccount newUserAccount) {
		userAccount = newUserAccount;
	}

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
			Date dateOfBirth, String gender,
			ArrayList<PositionDetails> details,
			ArrayList<String> setOfficeNumbers,
			ArrayList<String> setHomeNumbers,
			ArrayList<String> setMobileNumbers,
			ArrayList<String> setOtherNumbers, ArrayList<String> emails,
			UserAccount userAccount) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.details = details;
		officeNumbers = setOfficeNumbers;
		homeNumbers = setHomeNumbers;
		mobileNumbers = setMobileNumbers;
		otherNumbers = setOtherNumbers;

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
	 * @throws ParseException
	 */
	public UserProfile(String firstName, String middleName, String lastName,
			String dateOfBirth, String gender) throws ParseException {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh.mm.ss");
		Date dob = df.parse(dateOfBirth);

		this.dateOfBirth = dob;
		this.gender = gender;
	}

	/**
	 * toString returns full user name
	 * 
	 * @return full name of the user
	 */
	@Override
	public String toString() {
		return new StringBuffer(" First Name : ").append(this.getFirstName())
				.append(" Middle Name : ").append(this.getMiddleName())
				.append(" Last Name : ").append(this.getLastName())
				.append(" Date of Birth : ").append(this.getDateOfBirth())
				.append(" Gender : ").append(this.getGender())
				.append(" Account name: ").append(userAccount.getUserName())
				.toString();
	}

	public boolean equals(UserProfile up) {
		return this.firstName.equals(up.firstName)
				&& this.middleName.equals(up.middleName)
				&& this.lastName.equals(up.lastName)
				&& this.dateOfBirth.equals(up.dateOfBirth)
				&& this.gender.equals(up.gender)
				&& this.details.equals(up.details)
				&& this.officeNumbers.equals(up.officeNumbers)
				&& this.mobileNumbers.equals(up.mobileNumbers)
				&& this.homeNumbers.equals(up.homeNumbers)
				&& this.otherNumbers.equals(up.otherNumbers)
				&& this.addresses.equals(up.addresses)
				&& this.workEmails.equals(up.workEmails)
				&& this.personalEmails.equals(up.personalEmails)
				&& this.userAccount.equals(up.userAccount);
	}

	@Override
	public UserProfile clone() {
		UserProfile copy = new UserProfile();
		copy.setFirstName(firstName);
		copy.setMiddleName(middleName);
		copy.setLastName(lastName);
		copy.setDateOfBirth(dateOfBirth);
		copy.setGender(gender);

		for (PositionDetails pd : this.details) {
			copy.getDetails().add(pd.clone());
		}
		for (String phone : this.officeNumbers) {
			copy.getOfficeNumbers().add(phone);
		}
		for (String phone : this.mobileNumbers) {
			copy.getMobileNumbers().add(phone);
		}
		for (String phone : this.homeNumbers) {
			copy.getHomeNumbers().add(phone);
		}
		for (String phone : this.otherNumbers) {
			copy.getOtherNumbers().add(phone);
		}
		for (String email : this.workEmails) {
			copy.getWorkEmails().add(email);
		}
		for (String email : this.personalEmails) {
			copy.getPersonalEmails().add(email);
		}

		for (Address address : this.addresses) {
			copy.getAddresses().add(address);
		}

		copy.setUserId(this.userAccount.clone());
		copy.setId(this.getId());
		copy.setVersion(this.getVersion());
		copy.setDeleted(this.isDeleted());
		for (AuditLog entry : this.getAuditLog()) {
			copy.addEntryToAuditLog(entry);
		}

		return copy;
	}
}
