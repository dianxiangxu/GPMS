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

	private String _firstname, _middlename, _lastname;
//	private String 
	private ArrayList<PositionDetails> _details;
	private ArrayList<String> _phoneNumbers;
	private ArrayList<String> _email;

	@Embedded
	private UserAccount account;



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
	public UserProfile(String firstname, String middlename, String lastname,
			ArrayList<PositionDetails> details, String phonenumber,
			ArrayList<String> email) {
		this._firstname = firstname;
		this._middlename = middlename;
		this._lastname = lastname;
		this._details = details;
		
		this._email = email;
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
	public UserProfile(String firstname, String middlename, String lastname) {
		this._firstname = firstname;
		this._middlename = middlename;
		this._lastname = lastname;
		//		this.set_uid(_id);
	}


	/**
	 * Parameter-less constructor, required for ObjectId creation.
	 */
	public UserProfile() {

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
		return _firstname;
	}

	/**
	 * 
	 * @param _firstname set the given name of the user
	 */
	public void set_firstname(String _firstname) 
	{
		this._firstname = _firstname;
	}

	/**
	 * 
	 * @return middle name of the user
	 */
	public String get_middlename()
	{
		return _middlename;
	}

	/**
	 * 
	 * @param _middlename sets the middlename of the user
	 */
	public void set_middlename(String _middlename) 
	{
		this._middlename = _middlename;
	}

	/**
	 * 
	 * @return the surname of the user
	 */
	public String get_lastname() 
	{
		return _lastname;
	}

	/**
	 * 
	 * @param _lastname set the surname of the user
	 */
	public void set_lastname(String _lastname) 
	{
		this._lastname = _lastname;
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

	/**
	 * Method for getting email of the user
	 * @return the email of the user
	 */
	public ArrayList<String> get_email() {
		return _email;
	}

	public void set_email(ArrayList<String> _email) {
		this._email = _email;
	}

	/**
	 * @return toString format for user profile, name of user.
	 */
	@Override
	public String toString() {
		return this.get_firstname() + " " + this.get_middlename() + " "
				+ this.get_lastname();
	}

}
