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

}
