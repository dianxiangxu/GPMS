package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class CollaborationInfo {
	@Property("involve non-funded collaborations")
	private boolean involveNonFundedCollab;

	@Property("involve collaborators")
	private String involvedCollaborators = new String();

	public CollaborationInfo() {
	}

	public boolean isInvolveNonFundedCollab() {
		return involveNonFundedCollab;
	}

	public void setInvolveNonFundedCollab(boolean involveNonFundedCollab) {
		this.involveNonFundedCollab = involveNonFundedCollab;
	}

	public String getInvolvedCollaborators() {
		return involvedCollaborators;
	}

	public void setInvolvedCollaborators(String involvedCollaborators) {
		this.involvedCollaborators = involvedCollaborators;
	}

}
