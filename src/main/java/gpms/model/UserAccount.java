package gpms.model;

import java.util.Date;

import gpms.dao.BaseEntity;
import gpms.dao.UserAccountDAO;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity(value = UserAccountDAO.COLLECTION_NAME)
public class UserAccount extends BaseEntity {
	private String _username;
	private String _password;

	public UserAccount(String username, String password) {
		this._username = username;
		this._password = password;
	}

	public UserAccount(String username) {
		this._username = username;
		this._password = "123456789"; // TODO:: user random password generator
	}

	public UserAccount() {
	}

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
