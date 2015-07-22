//Written by : Hector C. Ortiz
package gpms.model;

import java.util.Date;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.google.gson.annotations.Expose;

@Embedded
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "id")
public class AuditLog {
	@Expose
	@Reference(value = "user id", lazy = true)
	private UserProfile userProfileId = new UserProfile();

	@Expose
	@Property("action")
	private String action = new String();

	@Expose
	@Property("activity on")
	private Date activityDate = new Date();

	public AuditLog() {
	}

	public AuditLog(UserProfile userProfileId, String action, Date activityDate) {
		this.action = action;
		this.activityDate = activityDate;
		this.userProfileId = userProfileId;
	}

	public UserProfile getUserProfileId() {
		return userProfileId;
	}

	public void setUserProfileId(UserProfile userProfileId) {
		this.userProfileId = userProfileId;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public Date getActivityDate() {
		return activityDate;
	}

	public void setActivityDate(Date activityDate) {
		this.activityDate = activityDate;
	}

	@Override
	public AuditLog clone() {
		return new AuditLog(this.userProfileId, this.action, this.activityDate);
	}
}
