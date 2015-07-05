//Written by : Hector C. Ortiz
package gpms.model;

import java.util.Date;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Embedded
public class AuditLog {
	@Reference("user id")
	private UserProfile userProfileId;
	@Property("action")
	private String action;
	@Property("activity on")
	private Date activityDate;

	public AuditLog() {
		userProfileId = new UserProfile();
		action = new String();
		activityDate = new Date();
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
