package gpms.dao;

import gpms.model.AuditLog;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
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

	@Embedded("audit log")
	private ArrayList<AuditLog> auditLog;

	private boolean isDeleted;

	public BaseEntity() {
		super();
		auditLog = new ArrayList<AuditLog>();
	}

	public ObjectId getId() {
		return id;
	}
	
	public void setId(ObjectId id) {
		this.id = id;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	public List<AuditLog> getAuditLog() {
		return auditLog;
	}

	public void setAuditLog(ArrayList<AuditLog> auditLog) {
		this.auditLog = auditLog;
	}

	public void addEntryToAuditLog(AuditLog entry) {
		auditLog.add(entry);
	}

	public void setIsDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public boolean getIsDeleted() {
		return isDeleted;
	}
}
