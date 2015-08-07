package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class ConfidentialInfo {
	@Property("contain confidential information")
	private boolean containConfidentialInformation;

	@Property("patentable")
	private boolean patentable;

	@Property("copyrightable")
	private boolean copyrightable;

	public ConfidentialInfo() {
	}

	public boolean isContainConfidentialInformation() {
		return containConfidentialInformation;
	}

	public void setContainConfidentialInformation(
			boolean containConfidentialInformation) {
		this.containConfidentialInformation = containConfidentialInformation;
	}

	public boolean isPatentable() {
		return patentable;
	}

	public void setPatentable(boolean patentable) {
		this.patentable = patentable;
	}

	public boolean isCopyrightable() {
		return copyrightable;
	}

	public void setCopyrightable(boolean copyrightable) {
		this.copyrightable = copyrightable;
	}

	@Override
	public String toString() {
		return "ConfidentialInfo [containConfidentialInformation="
				+ containConfidentialInformation + ", patentable=" + patentable
				+ ", copyrightable=" + copyrightable + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ (containConfidentialInformation ? 1231 : 1237);
		result = prime * result + (copyrightable ? 1231 : 1237);
		result = prime * result + (patentable ? 1231 : 1237);
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
		ConfidentialInfo other = (ConfidentialInfo) obj;
		if (containConfidentialInformation != other.containConfidentialInformation)
			return false;
		if (copyrightable != other.copyrightable)
			return false;
		if (patentable != other.patentable)
			return false;
		return true;
	}
	
}
