package gpms.model;

import gpms.DAL.UserProfileDAO;

import java.util.ArrayList;

import org.bson.types.ObjectId;

import com.google.code.morphia.annotations.Embedded;
import com.google.code.morphia.annotations.Entity;
import com.google.code.morphia.annotations.Id;
import com.google.code.morphia.annotations.Reference;

@Entity(value = UserProfileDAO.COLLECTION_NAME)
public class UserProfile
{
	@Id
	private ObjectId _id;

	private String firstname, middlename, lastname;
	//	private String 
	private ArrayList<PositionDetails> _details;
	private ArrayList<String> _phoneNumbers;
	private ArrayList<String> _email;

//	private UserAccount thisAccount;



	/**
	 * This creates a profile for a user in the system
	 * @param firstname First Name of the User
	 * @param middlename Middle Name of the User
	 * @param lastname Last Name of the User
	 * @param details
	 * @param phonenumber
	 * @param email
	 * @param id
	 */
	public UserProfile(String _firstname, String _middlename, String _lastname,
			ArrayList<PositionDetails> details, String phoneNumber, String email) 
	{
		this.firstname = _firstname;
		this.middlename = _middlename;
		this.lastname = _lastname;
		this._details = details;
		addNumber(phoneNumber);
		addEmail(email);
		//this.set_uid changed from original format, use id's at this time will
		//not be passed in but created by the system.
		//		this.set_uid(_id);

	}

	/**
	 * Creates a User Profile with only name as parameters
	 * @param firstname First Name of the User
	 * @param middlename Middle Name of the User
	 * @param lastname Surname of the User
	 */
	public UserProfile(String _firstname, String _middlename, String _lastname) {
		this.firstname = _firstname;
		this.middlename = _middlename;
		this.lastname = _lastname;
		//		this.set_uid(_id);
	}


	/**
	 * Parameter-less constructor, required for ObjectId creation.
	 */
	public UserProfile() 
	{

	}

	/**
	 * @return the unique id of the user
	 */
	public ObjectId getId() {
		return _id;
	}

	//	/**
	//	 * Used for manually setting the id of the user
	//	 */
	//	public void set_uid(ObjectId _id) {
	//		this._id = _id;
	//	}

	/**
	 * 
	 * @return Given name of the user
	 */
	public String get_firstname() 
	{
		return firstname;
	}

	/**
	 * 
	 * @param _firstname set the given name of the user
	 */
	public void set_firstname(String _firstname) 
	{
		firstname = _firstname;
	}

	/**
	 * 
	 * @return middle name of the user
	 */
	public String get_middlename()
	{
		return middlename;
	}

	/**
	 * 
	 * @param _middlename sets the middlename of the user
	 */
	public void set_middlename(String _middlename) 
	{
		middlename = _middlename;
	}

	/**
	 * 
	 * @return the surname of the user
	 */
	public String get_lastname() 
	{
		return lastname;
	}

	/**
	 * 
	 * @param _lastname set the surname of the user
	 */
	public void set_lastname(String _lastname) 
	{
		lastname = _lastname;
	}

	public ArrayList<PositionDetails> get_details() 
	{
		return _details;
	}

	/**
	 * Set details
	 * @param _details
	 */
	public void set_details(ArrayList<PositionDetails> _details) {
		this._details = _details;
	}

	/**
	 * Adds a phone number to the list of phone numbers
	 * @param number 
	 */
	public void addNumber(String number)
	{
		_phoneNumbers.add(number);
	}

	/**
	 * 
	 * @return the array list of phone numbers
	 */
	public ArrayList<String> get_phonenumber() 
	{
		return _phoneNumbers;
	}

	//	public void set_phonenumber(ArrayList<String> phonenumber) {
	//		_phoneNumber.add(phoneNumber);
	//	}


	public void addEmail(String email)
	{
		_email.add(email);
	}

	/**
	 * Method for getting email of the user
	 * @return the email of the user
	 */
	public ArrayList<String> get_email() {
		return _email;
	}

	//	public void set_email(ArrayList<String> _email) 
	//	{
	//		this._email = _email;
	//	}

//	/**
//	 * sets the user account info for this user
//	 * @param account the account object to be added
//	 */
//	public void setUserAccount(UserAccount account)
//	{
//		thisAccount = account;
//	}
	
	/**
	 * @return toString format for user profile, name of user.
	 */
	@Override
	public String toString() {
		return this.get_firstname() + " " + this.get_middlename() + " "
				+ this.get_lastname();
	}


}
