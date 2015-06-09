//Writen by: Hector C. Ortiz

package gpms.model;

import org.mongodb.morphia.annotations.Embedded;

@Embedded
public class ConflictOfInterest {
	// c_o_i == conflict_of_interest
	private boolean financial_c_o_i;
	// if financial_c_o_i == true
	private boolean conflict_disclosed;
	// if disclosure_form_change == true, disclosure must be updated
	private boolean disclosure_form_change;

	public ConflictOfInterest() {
	}

	public void set_financial_c_o_i(boolean financial_c_o_i) {
		this.financial_c_o_i = financial_c_o_i;
	}

	public boolean get_financial_c_o_i() {
		return financial_c_o_i;
	}

	public void set_conflict_disclosed(boolean conflict_disclosed) {
		this.conflict_disclosed = conflict_disclosed;
	}

	public boolean get_conflict_disclosed() {
		return conflict_disclosed;
	}

	public void set_disclosure_form_change(boolean disclosure_form_change) {
		this.disclosure_form_change = disclosure_form_change;
	}

	public boolean get_disclosure_form_change() {
		return disclosure_form_change;
	}
}
