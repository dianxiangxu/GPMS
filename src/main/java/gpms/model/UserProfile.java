package gpms.model;

import gpms.dao.BaseEntity;
import gpms.dao.UserProfileDAO;

import java.util.ArrayList;
import java.util.List;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Reference;

@Entity(value = UserProfileDAO.COLLECTION_NAME)
public class UserProfile extends BaseEntity {
	private String _firstname;
	private String _middlename;
	private String _lastname;
	private List<PositionDetails> _details = new ArrayList<PositionDetails>();
	private List<String> _phoneNumbers = new ArrayList<String>();
	private List<String> _email = new ArrayList<String>();
	@Reference
	private User _userid;

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
	public UserProfile(String _firstname, String _middlename, String _lastname,
			ArrayList<PositionDetails> details, ArrayList<String> phoneNumbers,
			ArrayList<String> email) {
		this._firstname = _firstname;
		this._middlename = _middlename;
		this._lastname = _lastname;
		this._details = details;
		this._phoneNumbers = phoneNumbers;
		this._email = email;
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
	public UserProfile(String _firstname, String _middlename, String _lastname) {
		this._firstname = _firstname;
		this._middlename = _middlename;
		this._lastname = _lastname;
	}

	/**
	 * Parameter-less constructor, required for ObjectId creation.
	 */
	public UserProfile() {

	}

	public String get_firstname() {
		return _firstname;
	}

	public void set_firstname(String _firstname) {
		this._firstname = _firstname;
	}

	public String get_middlename() {
		return _middlename;
	}

	public void set_middlename(String _middlename) {
		this._middlename = _middlename;
	}

	public String get_lastname() {
		return _lastname;
	}

	public void set_lastname(String _lastname) {
		this._lastname = _lastname;
	}

	public List<PositionDetails> get_details() {
		return _details;
	}

	/**
	 * Set details
	 * 
	 * @param _details
	 */
	public void set_details(ArrayList<PositionDetails> _details) {
		this._details = _details;
	}

	/**
	 * Adds a phone number to the list of phone numbers
	 * 
	 * @param number
	 */
	public void addNumber(String number) {
		_phoneNumbers.add(number);
	}

	/**
	 * 
	 * @return the array list of phone numbers
	 */
	public List<String> get_phonenumber() {
		return _phoneNumbers;
	}

	// public void set_phonenumber(ArrayList<String> phonenumber) {
	// _phoneNumber.add(phoneNumber);
	// }

	public void addEmail(String email) {
		_email.add(email);
	}

	/**
	 * Method for getting email of the user
	 * 
	 * @return the email of the user
	 */
	public List<String> get_email() {
		return _email;
	}

	// public void set_email(ArrayList<String> _email)
	// {
	// this._email = _email;
	// }

	// /**
	// * sets the user account info for this user
	// * @param account the account object to be added
	// */
	// public void setUserAccount(UserAccount account)
	// {
	// thisAccount = account;
	// }

	/**
	 * @return toString format for user profile, name of user.
	 */
	@Override
	public String toString() {
		return this.get_firstname() + " " + this.get_middlename() + " "
				+ this.get_lastname();
	}

}
