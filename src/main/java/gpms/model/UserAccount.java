//Edited by: Hector C. Ortiz

package gpms.model;

//import java.util.Date;

import gpms.DAL.MongoDBConnector;
import gpms.dao.BaseEntity;
import gpms.dao.UserAccountDAO;

import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Property;

import com.mongodb.MongoClient;

@Entity("user")
public class UserAccount extends BaseEntity {
	@Property("username")
	private String userName;
	@Property("password")
	private String password;
	@Property("is deleted")
	private Boolean isDeleted;
	
	public static void main(String[] args)
	{
		MongoClient mongo = MongoDBConnector.getMongo();
		Morphia morphia = new Morphia();
		UserAccountDAO uaDAO = new UserAccountDAO(morphia, mongo, "GPMS");
		
		UserAccount ua = new UserAccount("hector", "hector", false);
		uaDAO.save(ua);
	}

	public UserAccount() {
		userName = new String();
		password = new String();
	}

	public UserAccount(String userName, String password, Boolean isDeleted) {
		this.userName = userName;
		this.password = password;
		this.isDeleted = isDeleted;
		// TODO:: encrypt the password
		// this.set_uid(id);
	}

	public UserAccount(String userName) {
		this.userName = userName;
		this.password = "123456789"; // TODO:: user random password generator
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return this.getUserName() + " " + this.getPassword();
	}

	public boolean equals(UserAccount ua) {
		return this.userName.equals(ua.userName)
				&& this.password.equals(ua.password);
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
}
