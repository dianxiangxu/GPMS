//Edited by: Hector C. Ortiz

package gpms.model;

//import java.util.Date;

import gpms.dao.BaseEntity;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Property;

@Entity
public class UserAccount extends BaseEntity {
	@Property("username")
	private String userName;
	@Property("password")
	private String password;

	public UserAccount(String userName, String password) {
		this.userName = userName;
		this.password = password;
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

	public UserAccount() 
	{
		
	}


}
