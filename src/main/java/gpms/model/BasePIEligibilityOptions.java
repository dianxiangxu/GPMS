package gpms.model;

import org.mongodb.morphia.annotations.Property;

public class BasePIEligibilityOptions {

	@Property("yes")
	private boolean yes;

	@Property("no")
	private boolean no;

	@Property("not applicable")
	private boolean notApplicable;

	@Property("this proposal only")
	private boolean thisProposalOnly;

	@Property("blanket")
	private boolean blanket;

	public BasePIEligibilityOptions() {
	}

	public boolean isYes() {
		return yes;
	}

	public void setYes(boolean yes) {
		this.yes = yes;
	}

	public boolean isNo() {
		return no;
	}

	public void setNo(boolean no) {
		this.no = no;
	}

	public boolean isNotApplicable() {
		return notApplicable;
	}

	public void setNotApplicable(boolean notApplicable) {
		this.notApplicable = notApplicable;
	}

	public boolean isThisProposalOnly() {
		return thisProposalOnly;
	}

	public void setThisProposalOnly(boolean thisProposalOnly) {
		this.thisProposalOnly = thisProposalOnly;
	}

	public boolean isBlanket() {
		return blanket;
	}

	public void setBlanket(boolean blanket) {
		this.blanket = blanket;
	}

}
