//Edited by: Hector C. Ortiz

package gpms.model;

//import java.util.Date;

import gpms.dao.BaseEntity;
import gpms.dao.UserAccountDAO;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.utils.IndexDirection;

@Entity(value = UserAccountDAO.COLLECTION_NAME, noClassnameStored = true)
public class UserAccount extends BaseEntity {
	@Property("username")
	//@Indexed(value = IndexDirection.ASC, name = "userNameIndex", unique = true)
	private String userName;
	@Property("password")
	private String password;
	@Property("is deleted")
	private Boolean isDeleted;

	public UserAccount() {
		this.userName = new String();
		this.password = new String();
		this.isDeleted = false;
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
				&& this.password.equals(ua.password)
				&& this.isDeleted == ua.isDeleted;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public void delete() {
		isDeleted = true;
	}

	public void unDelete() {
		isDeleted = false;
	}
}
