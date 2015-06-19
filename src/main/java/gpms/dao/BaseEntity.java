package gpms.dao;

import java.util.List;

import gpms.model.Auditlog;

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

	@Embedded
	private List<Auditlog> auditLog;

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

	public List<Auditlog> getAuditLog() {
		return auditLog;
	}

	public void setAuditLog(List<Auditlog> auditLog) {
		this.auditLog = auditLog;
	}
}
