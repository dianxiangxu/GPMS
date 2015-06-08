package gpms.model;

import java.util.Date;

import gpms.DAL.UserDAO;

import org.bson.types.ObjectId;

import com.google.code.morphia.annotations.Embedded;
import com.google.code.morphia.annotations.Entity;
import com.google.code.morphia.annotations.Id;

//@Entity(value = UserDAO.COLLECTION_NAME)
@Embedded
public class UserAccount {
//	@Id
//	private ObjectId _id;
	private String _username;
	private String _password;

	/**
	 * Constructor that builds a user account with username/pass/id
	 * @param username the user name for the account
	 * @param password the password for the user
	 * @param id the unique id for this person
	 */
	public UserAccount(String username, String password, ObjectId id) {
		this._username = username;
		this._password = password;
		// TODO:: encrypt the password
//		this.set_uid(id);
	}

	public UserAccount(String username) {
		this._username = username;
		this._password = "123456789"; // TODO:: user random password generator
	}

	/**
	 * Parameter-less constructor creates nothing
	 */
	public UserAccount() {
	}

//	public ObjectId get_uid() {
//		return _id;
//	}

//	public void set_uid(ObjectId _id) {
//		this._id = _id;
//	}

	public String get_username() {
		return _username;
	}

	public void set_username(String _username) {
		this._username = _username;
	}

	public String get_password() {
		return _password;
	}

	public void set_password(String _password) {
		this._password = _password;
	}

	@Override
	public String toString() {
		return this.get_username() + " " + this.get_password();
	}
}
