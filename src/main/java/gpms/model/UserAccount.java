//Edited by: Hector C. Ortiz

package gpms.model;

//import java.util.Date;

import gpms.DAL.UserDAO;

import org.bson.types.ObjectId;

import com.google.code.morphia.annotations.Entity;
import com.google.code.morphia.annotations.Id;

@Entity(value = UserDAO.COLLECTION_NAME)
public class UserAccount 
{
	@Id
	private ObjectId userId;
	private String userName;
	private String password;

	public UserAccount(String userName, String password) 
	{
		this.userName = userName;
		this.password = password;
		// TODO:: encrypt the password
		//this.set_uid(id);
	}

	public UserAccount(String userName) 
	{
		this.userName = userName;
		this.password = "123456789"; // TODO:: user random password generator
	}

	public UserAccount() 
	{
	}

	public ObjectId getUserId() 
	{
		return userId;
	}

//	public void set_uid(ObjectId _id) 
//	{
//		this._id = _id;
//	}

	public String getUserName() 
	{
		return userName;
	}

	public void setUserName(String userName)
	{
		this.userName = userName;
	}

	public String getPassword() 
	{
		return password;
	}

	public void setPassword(String password) 
	{
		this.password = password;
	}

//	@Override
//	public String toString()
//	{
//		return this.get_user_name() + " " + this.get_password();
//	}
}
