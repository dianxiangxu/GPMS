package gpms.model;

import java.util.Date;

import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

public class Auditlog {
	@Property("is deleted")
	private Boolean isDeleted;
	@Property("is updated")
	private Boolean isUpdated;
	@Property("deleted on")
	private Date deletedOn;
	@Property("updated on")
	private Date updatedOn;
	@Reference(value = "deleted by", lazy = true)
	private UserProfile deletedBy;
	@Reference(value = "updated by", lazy = true)
	private UserProfile updatedBy;

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Boolean getIsUpdated() {
		return isUpdated;
	}

	public void setIsUpdated(Boolean isUpdated) {
		this.isUpdated = isUpdated;
	}

	public Date getDeletedOn() {
		return deletedOn;
	}

	public void setDeletedOn(Date deletedOn) {
		this.deletedOn = deletedOn;
	}

	public Date getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	public UserProfile getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(UserProfile deletedBy) {
		this.deletedBy = deletedBy;
	}

	public UserProfile getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(UserProfile updatedBy) {
		this.updatedBy = updatedBy;
	}

}
