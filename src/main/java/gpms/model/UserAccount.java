//Edited by: Hector C. Ortiz

package gpms.model;

//import java.util.Date;

import gpms.dao.BaseEntity;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Property;

@Entity
public class UserAccount extends BaseEntity 
{
	@Property("username")
	private String userName;
	@Property("password")
	private String password;
	@Property("is deleted")
	private Boolean isDeleted;

<<<<<<< HEAD
	public UserAccount() 
	{
		userName = new String();
		password = new String();
	}
	
	public UserAccount(String userName, String password) 
	{
=======
	public UserAccount(String userName, String password, Boolean isDeleted) {
>>>>>>> 0fbea801f7f6f24c3a7bbfbd759871a1038d48c4
		this.userName = userName;
		this.password = password;
		this.isDeleted = isDeleted;
		// TODO:: encrypt the password
		// this.set_uid(id);
	}

	public UserAccount(String userName)
	{
		this.userName = userName;
		this.password = "123456789"; // TODO:: user random password generator
	}

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

<<<<<<< HEAD
	@Override
	public String toString() 
	{
		return this.getUserName() + " " + this.getPassword();
	}
	
	public boolean equals(UserAccount ua)
	{
		return this.userName.equals(ua.userName) && this.password.equals(ua.password);
	}
=======
	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public UserAccount() {

	}

	@Override
	public String toString() {
		return super.toString();
	}

>>>>>>> 0fbea801f7f6f24c3a7bbfbd759871a1038d48c4
}
