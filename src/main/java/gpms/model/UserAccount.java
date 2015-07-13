//Edited by: Hector C. Ortiz

package gpms.model;

//import java.util.Date;

import gpms.dao.UserAccountDAO;

import java.util.Date;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.utils.IndexDirection;

//{"id":null,"version":null,"auditLog":[],
//"userName":"","password":"","isDeleted":false}

@Entity(value = UserAccountDAO.COLLECTION_NAME, noClassnameStored = true)
public class UserAccount extends BaseEntity {
	@Property("username")
	@Indexed(value = IndexDirection.ASC, name = "userNameIndex", unique = true)
	private String userName = new String();
	@Property("password")
	private String password = new String();
	@Property("is deleted")
	private boolean isDeleted;

	@Property("added on")
	private Date addedOn = new Date();

	public UserAccount() {
	}

	public UserAccount(String userName, String password) {
		this.userName = userName;
		this.password = password;
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

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Date getAddedOn() {
		return addedOn;
	}

	public void setAddedOn(Date addedOn) {
		this.addedOn = addedOn;
	}

	@Override
	public String toString() {
		return new StringBuffer(" User Name : ").append(this.getUserName())
				.append(" Password : ").append(this.getPassword()).toString();
	}

	public boolean equals(UserAccount ua) {
		return this.userName.equals(ua.userName)
				&& this.password.equals(ua.password);
	}

	@Override
	public UserAccount clone() {
		UserAccount copy = new UserAccount(this.userName, this.password);
		copy.setId(this.getId());
		copy.setVersion(this.getVersion());
		copy.setDeleted(this.isDeleted());
		for (AuditLog entry : this.getAuditLog()) {
			copy.addEntryToAuditLog(entry);
		}
		return copy;
	}
}
