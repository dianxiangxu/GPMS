//Written by: Hector C. Ortiz

package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class UniversityCommitments {

	@Property("new renovated facilities required")
	private boolean newRenovatedFacilitiesRequired;
	@Property("rental space required")
	private boolean rentalSpaceRequired;
	@Property("institutional commitment required")
	private boolean institutionalCommitmentRequired;

	public UniversityCommitments() {
	}

	public boolean isNewRenovatedFacilitiesRequired() {
		return newRenovatedFacilitiesRequired;
	}

	public void setNewRenovatedFacilitiesRequired(
			boolean newRenovatedFacilitiesRequired) {
		this.newRenovatedFacilitiesRequired = newRenovatedFacilitiesRequired;
	}

	public boolean isRentalSpaceRequired() {
		return rentalSpaceRequired;
	}

	public void setRentalSpaceRequired(boolean rentalSpaceRequired) {
		this.rentalSpaceRequired = rentalSpaceRequired;
	}

	public boolean isInstitutionalCommitmentRequired() {
		return institutionalCommitmentRequired;
	}

	public void setInstitutionalCommitmentRequired(
			boolean institutionalCommitmentRequired) {
		this.institutionalCommitmentRequired = institutionalCommitmentRequired;
	}

}
