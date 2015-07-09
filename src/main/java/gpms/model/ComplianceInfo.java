package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class ComplianceInfo {
	@Property("involve use of human subjects")
	private boolean involveUseOfHumanSubjects;

	@Property("IRB")
	private String IRB = new String();

	@Property("IRB pending status")
	private boolean IRBPending;

	@Property("involve use of vertebrate animals")
	private boolean involveUseOfVertebrateAnimals;

	@Property("IACUC")
	private String IACUC = new String();

	@Property("IACUC pending status")
	private boolean IACUCPending;

	@Property("involve biosafety concerns")
	private boolean involveBiosafetyConcerns;

	@Property("IBC")
	private String IBC = new String();

	@Property("IBC pending status")
	private boolean IBCPending;

	@Property("involve environmental health and safety concerns")
	private boolean involveEnvironmentalHealthAndSafetyConcerns;

	public ComplianceInfo() {

	}

	public boolean isInvolveUseOfHumanSubjects() {
		return involveUseOfHumanSubjects;
	}

	public void setInvolveUseOfHumanSubjects(boolean involveUseOfHumanSubjects) {
		this.involveUseOfHumanSubjects = involveUseOfHumanSubjects;
	}

	public String getIRB() {
		return IRB;
	}

	public void setIRB(String iRB) {
		IRB = iRB;
	}

	public boolean isIRBPending() {
		return IRBPending;
	}

	public void setIRBPending(boolean iRBPending) {
		IRBPending = iRBPending;
	}

	public boolean isInvolveUseOfVertebrateAnimals() {
		return involveUseOfVertebrateAnimals;
	}

	public void setInvolveUseOfVertebrateAnimals(
			boolean involveUseOfVertebrateAnimals) {
		this.involveUseOfVertebrateAnimals = involveUseOfVertebrateAnimals;
	}

	public String getIACUC() {
		return IACUC;
	}

	public void setIACUC(String iACUC) {
		IACUC = iACUC;
	}

	public boolean isIACUCPending() {
		return IACUCPending;
	}

	public void setIACUCPending(boolean iACUCPending) {
		IACUCPending = iACUCPending;
	}

	public boolean isInvolveBiosafetyConcerns() {
		return involveBiosafetyConcerns;
	}

	public void setInvolveBiosafetyConcerns(boolean involveBiosafetyConcerns) {
		this.involveBiosafetyConcerns = involveBiosafetyConcerns;
	}

	public String getIBC() {
		return IBC;
	}

	public void setIBC(String iBC) {
		IBC = iBC;
	}

	public boolean isIBCPending() {
		return IBCPending;
	}

	public void setIBCPending(boolean iBCPending) {
		IBCPending = iBCPending;
	}

	public boolean isInvolveEnvironmentalHealthAndSafetyConcerns() {
		return involveEnvironmentalHealthAndSafetyConcerns;
	}

	public void setInvolveEnvironmentalHealthAndSafetyConcerns(
			boolean involveEnvironmentalHealthAndSafetyConcerns) {
		this.involveEnvironmentalHealthAndSafetyConcerns = involveEnvironmentalHealthAndSafetyConcerns;
	}

}
