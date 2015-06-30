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

	@Override
	public String toString() {
		String outPut = "";
		outPut += "Off-Campus : " + offCampus + "\n";
		outPut += "On-Campus  : " + onCampus;
		return outPut;
	}

	public boolean equals(ProjectLocation pl) {
		return this.offCampus == pl.offCampus && this.onCampus == pl.onCampus;
	}
	
	@Override
	public ProjectLocation clone()
	{
		ProjectLocation copy = new ProjectLocation();
		
		copy.setOnCampus(this.onCampus);
		copy.setOffCampus(this.offCampus);
		
		return copy;
	}
}
