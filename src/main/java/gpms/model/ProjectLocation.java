package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class ProjectLocation {
	@Property("off-campus")
	private boolean offCampus;
	@Property("on-campus")
	private boolean onCampus;

	public boolean isOffCampus() {
		return offCampus;
	}

	public void setOffCampus(boolean offCampus) {
		this.offCampus = offCampus;
	}

	public boolean isOnCampus() {
		return onCampus;
	}

	public void setOnCampus(boolean onCampus) {
		this.onCampus = onCampus;
	}

}
