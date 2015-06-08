package gpms.model;

import java.util.Date;

import javax.swing.text.StyledEditorKit.ForegroundAction;

import gpms.DAL.UserDAO;

import org.bson.types.ObjectId;

import com.google.code.morphia.annotations.Embedded;
import com.google.code.morphia.annotations.Entity;
import com.google.code.morphia.annotations.Id;

@Entity(value = UserDAO.COLLECTION_NAME)

public class UserAccount {
	@Id
	private ObjectId userId;
	private String username;
	private String password;

	/**
	 * Constructor that builds a user account with username/pass/id
	 * @param username the user name for the account
	 * @param password the password for the user
	 * @param id the unique id for this person
	 */
	public UserAccount(String _username, String _password, ObjectId id) {
		username = _username;
		password = _password;
		// TODO:: encrypt the password
		userId = id;
	}

	public UserAccount(String _username) {
		username = _username;
		password = "123456789"; // TODO:: user random password generator
	}

	/**
	 * Parameter-less constructor, needed for @id annotation
	 */
	public UserAccount() 
	{
	}

//	public ObjectId get_uid() {
//		return _id;
//	}

//	public void set_uid(ObjectId _id) {
//		this._id = _id;
//	}

	
	public void setId(ObjectId theId)
	{
		userId = theId;
	}
	
	public String get_username() 
	{
		return username;
	}

	public void set_username(String _username) 
	{
		username = _username;
	}

	public String get_password() 
	{
		return password;
	}

	public void set_password(String _password) {
		password = _password;
	}

	@Override
	public String toString() {
		return this.get_username() + " " + this.get_password();
	}
}
