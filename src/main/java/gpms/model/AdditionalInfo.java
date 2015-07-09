package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class AdditionalInfo {
	@Property("anticipates foreign nationals payment")
	private boolean anticipatesForeignNationalsPayment;
	@Property("anticipates course release time")
	private boolean anticipatesCourseReleaseTime;
	@Property("related to center for advanced energy studies")
	private boolean relatedToCenterForAdvancedEnergyStudies;

	public AdditionalInfo() {
	}

	public boolean isAnticipatesForeignNationalsPayment() {
		return anticipatesForeignNationalsPayment;
	}

	public void setAnticipatesForeignNationalsPayment(
			boolean anticipatesForeignNationalsPayment) {
		this.anticipatesForeignNationalsPayment = anticipatesForeignNationalsPayment;
	}

	public boolean isAnticipatesCourseReleaseTime() {
		return anticipatesCourseReleaseTime;
	}

	public void setAnticipatesCourseReleaseTime(
			boolean anticipatesCourseReleaseTime) {
		this.anticipatesCourseReleaseTime = anticipatesCourseReleaseTime;
	}

	public boolean isRelatedToCenterForAdvancedEnergyStudies() {
		return relatedToCenterForAdvancedEnergyStudies;
	}

	public void setRelatedToCenterForAdvancedEnergyStudies(
			boolean relatedToCenterForAdvancedEnergyStudies) {
		this.relatedToCenterForAdvancedEnergyStudies = relatedToCenterForAdvancedEnergyStudies;
	}

}
