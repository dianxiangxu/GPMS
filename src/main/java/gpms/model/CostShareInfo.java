//Written by: Hector C. Ortiz

package gpms.model;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class CostShareInfo {
	@Property("institutional committed")
	boolean institutionalCommitted;
	@Property("third party committed")
	boolean thirdPartyCommitted;

	public CostShareInfo() {
	}

	public boolean isInstitutionalCommitted() {
		return institutionalCommitted;
	}

	public void setInstitutionalCommitted(boolean institutionalCommitted) {
		this.institutionalCommitted = institutionalCommitted;
	}

	public boolean isThirdPartyCommitted() {
		return thirdPartyCommitted;
	}

	public void setThirdPartyCommitted(boolean thirdPartyCommitted) {
		this.thirdPartyCommitted = thirdPartyCommitted;
	}

}
