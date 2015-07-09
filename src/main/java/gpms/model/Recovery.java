package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class Recovery {

	@Property("full recovery")
	private boolean fullRecovery;

	@Property("no recovery normal sponsor policy")
	private boolean noRecoveryNormalSponsorPolicy;

	@Property("no recovery institutional waiver")
	private boolean noRecoveryInstitutionalWaiver;

	@Property("limited recovery normal sponsor policy")
	private boolean limitedRecoveryNormalSponsorPolicy;

	@Property("limited recovery institutional waiver")
	private boolean limitedRecoveryInstitutionalWaiver;

	public Recovery() {
	}

	public boolean isFullRecovery() {
		return fullRecovery;
	}

	public void setFullRecovery(boolean fullRecovery) {
		this.fullRecovery = fullRecovery;
	}

	public boolean isNoRecoveryNormalSponsorPolicy() {
		return noRecoveryNormalSponsorPolicy;
	}

	public void setNoRecoveryNormalSponsorPolicy(
			boolean noRecoveryNormalSponsorPolicy) {
		this.noRecoveryNormalSponsorPolicy = noRecoveryNormalSponsorPolicy;
	}

	public boolean isNoRecoveryInstitutionalWaiver() {
		return noRecoveryInstitutionalWaiver;
	}

	public void setNoRecoveryInstitutionalWaiver(
			boolean noRecoveryInstitutionalWaiver) {
		this.noRecoveryInstitutionalWaiver = noRecoveryInstitutionalWaiver;
	}

	public boolean isLimitedRecoveryNormalSponsorPolicy() {
		return limitedRecoveryNormalSponsorPolicy;
	}

	public void setLimitedRecoveryNormalSponsorPolicy(
			boolean limitedRecoveryNormalSponsorPolicy) {
		this.limitedRecoveryNormalSponsorPolicy = limitedRecoveryNormalSponsorPolicy;
	}

	public boolean isLimitedRecoveryInstitutionalWaiver() {
		return limitedRecoveryInstitutionalWaiver;
	}

	public void setLimitedRecoveryInstitutionalWaiver(
			boolean limitedRecoveryInstitutionalWaiver) {
		this.limitedRecoveryInstitutionalWaiver = limitedRecoveryInstitutionalWaiver;
	}

}
