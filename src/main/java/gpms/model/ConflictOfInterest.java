//Writen by: Hector C. Ortiz

package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class ConflictOfInterest {
	// c_o_i == conflict_of_interest
	@Property("financial COI")
	private boolean financialCOI;
	// if financial_c_o_i == true
	@Property("conflict disclosed")
	private boolean conflictDisclosed;
	// if disclosure_form_change == true, disclosure must be updated
	@Property("disclosure form change")
	private boolean disclosureFormChange;

	public ConflictOfInterest() {
	}

	public boolean isFinancialCOI() {
		return financialCOI;
	}

	public void setFinancialCOI(boolean financialCOI) {
		this.financialCOI = financialCOI;
	}

	public boolean isConflictDisclosed() {
		return conflictDisclosed;
	}

	public void setConflictDisclosed(boolean conflictDisclosed) {
		this.conflictDisclosed = conflictDisclosed;
	}

	public boolean isDisclosureFormChange() {
		return disclosureFormChange;
	}

	public void setDisclosureFormChange(boolean disclosureFormChange) {
		this.disclosureFormChange = disclosureFormChange;
	}

}
