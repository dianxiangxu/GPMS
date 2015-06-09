package gpms.model;

import gpms.dao.BaseEntity;
import gpms.dao.UserAccountDAO;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Property;

@Entity(value = UserAccountDAO.COLLECTION_NAME)
public class UserAccount extends BaseEntity {
	@Property("username")
	private String username;
	@Property("password")
	private String password;

	public UserAccount(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public UserAccount(String username) {
		this.username = username;
		this.password = "123456789"; // TODO:: user random password generator
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserAccount() {
	}

	@Override
	public String toString() {
		return this.getUsername() + " " + this.getPassword();
	}
}
