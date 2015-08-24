//Edited by: Hector C. Ortiz

package gpms.model;

//import java.util.Date;

import gpms.dao.UserAccountDAO;

import java.util.Date;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.utils.IndexDirection;

import com.google.gson.annotations.Expose;

//{"id":null,"version":null,"auditLog":[],
//"userName":"","password":"","isDeleted":false}

@Entity(value = UserAccountDAO.COLLECTION_NAME, noClassnameStored = true)
// @JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,
// property = "_id")
public class UserAccount extends BaseEntity {
	@Expose
	@Property("username")
	@Indexed(value = IndexDirection.ASC, name = "userNameIndex", unique = true)
	private String userName = new String();

	@Expose
	@Property("password")
	private String password = new String();

	@Expose
	@Property("is deleted")
	private boolean isDeleted;

	@Expose
	@Property("is active")
	private boolean isActive;

	@Expose
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

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((addedOn == null) ? 0 : addedOn.hashCode());
		result = prime * result + (isActive ? 1231 : 1237);
		result = prime * result + (isDeleted ? 1231 : 1237);
		result = prime * result
				+ ((password == null) ? 0 : password.hashCode());
		result = prime * result
				+ ((userName == null) ? 0 : userName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserAccount other = (UserAccount) obj;
		if (addedOn == null) {
			if (other.addedOn != null)
				return false;
		} else if (!addedOn.equals(other.addedOn))
			return false;
		if (isActive != other.isActive)
			return false;
		if (isDeleted != other.isDeleted)
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (userName == null) {
			if (other.userName != null)
				return false;
		} else if (!userName.equals(other.userName))
			return false;
		return true;
	}

	@Override
	public UserAccount clone() throws CloneNotSupportedException {
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
