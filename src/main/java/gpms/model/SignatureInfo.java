package gpms.model;

import java.util.Date;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

import com.google.gson.annotations.Expose;

@Embedded
public class SignatureInfo {
	@Expose
	@Property("id")
	private String id = new String();

	@Expose
	@Property("full name")
	private String fullName = new String();

	@Expose
	@Property("position title")
	private String positionTitle = new String();

	@Expose
	@Property("signed date")
	private Date signedDate = new Date();

	@Expose
	@Property("is delegated")
	private boolean isDelegated = false;

	@Expose
	@Property("delegated as")
	private String delegatedAs = new String();

	public SignatureInfo() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPositionTitle() {
		return positionTitle;
	}

	public void setPositionTitle(String positionTitle) {
		this.positionTitle = positionTitle;
	}

	public Date getSignedDate() {
		return signedDate;
	}

	public void setSignedDate(Date signedDate) {
		this.signedDate = signedDate;
	}

	public boolean isDelegated() {
		return isDelegated;
	}

	public void setDelegated(boolean isDelegated) {
		this.isDelegated = isDelegated;
	}

	public String getDelegatedAs() {
		return delegatedAs;
	}

	public void setDelegatedAs(String delegatedAs) {
		this.delegatedAs = delegatedAs;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((delegatedAs == null) ? 0 : delegatedAs.hashCode());
		result = prime * result
				+ ((fullName == null) ? 0 : fullName.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + (isDelegated ? 1231 : 1237);
		result = prime * result
				+ ((positionTitle == null) ? 0 : positionTitle.hashCode());
		result = prime * result
				+ ((signedDate == null) ? 0 : signedDate.hashCode());
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
		SignatureInfo other = (SignatureInfo) obj;
		if (delegatedAs == null) {
			if (other.delegatedAs != null)
				return false;
		} else if (!delegatedAs.equals(other.delegatedAs))
			return false;
		if (fullName == null) {
			if (other.fullName != null)
				return false;
		} else if (!fullName.equals(other.fullName))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (isDelegated != other.isDelegated)
			return false;
		if (positionTitle == null) {
			if (other.positionTitle != null)
				return false;
		} else if (!positionTitle.equals(other.positionTitle))
			return false;
		if (signedDate == null) {
			if (other.signedDate != null)
				return false;
		} else if (!signedDate.equals(other.signedDate))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "SignatureInfo [id=" + id + ", fullName=" + fullName
				+ ", positionTitle=" + positionTitle + ", signedDate="
				+ signedDate + ", isDelegated=" + isDelegated
				+ ", delegatedAs=" + delegatedAs + "]";
	}

}
