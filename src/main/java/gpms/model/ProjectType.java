//Written by: Hector C. Ortiz

package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class ProjectType {
	@Property("research-basic")
	private boolean isResearchBasic;
	@Property("research-applied")
	private boolean isResearchApplied;
	@Property("research-development")
	private boolean isResearchDevelopment;
	@Property("instruction")
	private boolean isInstruction;
	@Property("other sponsored activity")
	private boolean isOtherSponsoredActivity;

	public ProjectType() {
		isResearchBasic = true;
	}

	public void setIsResearchBasic(boolean is_research_basic) {
		if (!this.isResearchBasic && is_research_basic) {
			this.isResearchBasic = is_research_basic;
			isResearchApplied = false;
			isResearchDevelopment = false;
			isInstruction = false;
			isOtherSponsoredActivity = false;
		}
	}

	public boolean getIsResearchBasic() {
		return isResearchBasic;
	}

	public void setIsResearchApplied(boolean is_research_applied) {
		if (!this.isResearchApplied && is_research_applied) {
			isResearchBasic = false;
			this.isResearchApplied = is_research_applied;
			isResearchDevelopment = false;
			isInstruction = false;
			isOtherSponsoredActivity = false;
		}
	}

	public boolean getIsResearchApplied() {
		return isResearchApplied;
	}

	public void setIsResearchDevelopment(boolean is_research_development) {
		if (!this.isResearchDevelopment && is_research_development) {
			isResearchBasic = false;
			isResearchApplied = false;
			this.isResearchDevelopment = is_research_development;
			isInstruction = false;
			isOtherSponsoredActivity = false;
		}
	}

	public boolean getIsResearchDevelopment() {
		return isResearchDevelopment;
	}

	public void setIsInstruction(boolean is_instruction) {
		if (!this.isInstruction && is_instruction) {
			isResearchBasic = false;
			isResearchApplied = false;
			isResearchDevelopment = false;
			this.isInstruction = is_instruction;
			isOtherSponsoredActivity = false;
		}
	}

	public boolean getIsInstruction() {
		return isInstruction;
	}

	public void setIsOtherSponsoredActivity(boolean is_other_sposored_activity) {
		if (!this.isOtherSponsoredActivity && is_other_sposored_activity) {
			isResearchBasic = false;
			isResearchApplied = false;
			isResearchDevelopment = false;
			isInstruction = false;
			this.isOtherSponsoredActivity = is_other_sposored_activity;
		}
	}

	public boolean getIsOtherSponsoredActivity() {
		return isOtherSponsoredActivity;
	}

	@Override
	public String toString() {
		String outPut = "";
		outPut += "Research-Basic           : " + isResearchBasic + "\n";
		outPut += "Reseach-Applied          : " + isResearchApplied + "\n";
		outPut += "Research-Development     : " + isResearchDevelopment + "\n";
		outPut += "Instruction              : " + isInstruction + "\n";
		outPut += "Other Sponsored Activity : " + isOtherSponsoredActivity;
		return outPut;
	}

	public boolean equals(ProjectType pt) {
		return this.isResearchBasic == pt.isResearchBasic
				&& this.isResearchApplied == pt.isResearchApplied
				&& this.isResearchDevelopment == pt.isResearchDevelopment
				&& this.isInstruction == pt.isInstruction
				&& this.isOtherSponsoredActivity == pt.isOtherSponsoredActivity;
	}
	
	@Override
	public ProjectType clone()
	{
		ProjectType copy = new ProjectType();
		
		copy.setIsResearchBasic(this.isResearchBasic);
		copy.setIsResearchApplied(this.isResearchApplied);
		copy.setIsResearchDevelopment(this.isResearchDevelopment);
		copy.setIsInstruction(this.isInstruction);
		copy.setIsOtherSponsoredActivity(this.isOtherSponsoredActivity);
		
		return copy;
	}
}
