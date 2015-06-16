package gpms.dao;

import gpms.model.UserAccount;

import java.util.Date;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Version;

public abstract class BaseEntity {
	@Id
	@Property("id")
	protected ObjectId id;

	@Version
	@Property("version")
	private Long version;

	private Boolean isDeleted;
	private Boolean isUpdated;
	private Date deletedOn;
	private Date updatedOn;
	private UserAccount deletedBy;
	private UserAccount updatedBy;

	public BaseEntity() {
		super();
	}

	public ObjectId getId() {
		return id;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

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

	public UserAccount getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(UserAccount deletedBy) {
		this.deletedBy = deletedBy;
	}

	public UserAccount getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(UserAccount updatedBy) {
		this.updatedBy = updatedBy;
	}

}
