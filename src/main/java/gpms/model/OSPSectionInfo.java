package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class OSPSectionInfo {
	@Property("list agency")
	private String listAgency = new String();

	@Embedded("funding source")
	private FundingSource fundingSource = new FundingSource();

	@Property("CFDA no")
	private String CFDANo = new String();

	@Property("program no")
	private String programNo = new String();

	@Property("program title")
	private String programTitle = new String();

	@Embedded("recovery")
	private Recovery recovery = new Recovery();

	@Embedded("base")
	private Base base = new Base();

	@Property("is PI salary included")
	private boolean isPISalaryIncluded;

	@Property("PI salary")
	private double PISalary;

	@Property("PI fringe")
	private double PIFringe;

	@Property("department id")
	private String departmentId = new String();

	@Embedded("institutional cost share documented")
	private BaseOptions institutionalCostDocumented = new BaseOptions();

	@Embedded("third party cost share documented")
	private BaseOptions thirdPartyCostDocumented = new BaseOptions();

	@Property("is anticipated subrecipients")
	private boolean isAnticipatedSubRecipients;

	@Property("anticipated subrecipients names")
	private boolean anticipatedSubRecipientsNames;

	@Embedded("PI eligibility waiver on file")
	private BasePIEligibilityOptions PIEligibilityWaiver = new BasePIEligibilityOptions();

	@Embedded("conflict of interest forms on file")
	private BaseOptions conflictOfInterestForms = new BaseOptions();

	@Embedded("excluded party list checked")
	private BaseOptions excludedPartyListChecked = new BaseOptions();

	@Property("proposal notes")
	private String proposalNotes = new String();

	@Embedded("research administrator")
	private ResearchAdministrator researchAdministrator = new ResearchAdministrator();

	public OSPSectionInfo() {
	}

	public String getListAgency() {
		return listAgency;
	}

	public void setListAgency(String listAgency) {
		this.listAgency = listAgency;
	}

	public FundingSource getFundingSource() {
		return fundingSource;
	}

	public void setFundingSource(FundingSource fundingSource) {
		this.fundingSource = fundingSource;
	}

	public String getCFDANo() {
		return CFDANo;
	}

	public void setCFDANo(String cFDANo) {
		CFDANo = cFDANo;
	}

	public String getProgramNo() {
		return programNo;
	}

	public void setProgramNo(String programNo) {
		this.programNo = programNo;
	}

	public String getProgramTitle() {
		return programTitle;
	}

	public void setProgramTitle(String programTitle) {
		this.programTitle = programTitle;
	}

	public Recovery getRecovery() {
		return recovery;
	}

	public void setRecovery(Recovery recovery) {
		this.recovery = recovery;
	}

	public Base getBase() {
		return base;
	}

	public void setBase(Base base) {
		this.base = base;
	}

	public boolean isPISalaryIncluded() {
		return isPISalaryIncluded;
	}

	public void setPISalaryIncluded(boolean isPISalaryIncluded) {
		this.isPISalaryIncluded = isPISalaryIncluded;
	}

	public double getPISalary() {
		return PISalary;
	}

	public void setPISalary(double pISalary) {
		PISalary = pISalary;
	}

	public double getPIFringe() {
		return PIFringe;
	}

	public void setPIFringe(double pIFringe) {
		PIFringe = pIFringe;
	}

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public BaseOptions getInstitutionalCostDocumented() {
		return institutionalCostDocumented;
	}

	public void setInstitutionalCostDocumented(
			BaseOptions institutionalCostDocumented) {
		this.institutionalCostDocumented = institutionalCostDocumented;
	}

	public BaseOptions getThirdPartyCostDocumented() {
		return thirdPartyCostDocumented;
	}

	public void setThirdPartyCostDocumented(BaseOptions thirdPartyCostDocumented) {
		this.thirdPartyCostDocumented = thirdPartyCostDocumented;
	}

	public boolean isAnticipatedSubRecipients() {
		return isAnticipatedSubRecipients;
	}

	public void setAnticipatedSubRecipients(boolean isAnticipatedSubRecipients) {
		this.isAnticipatedSubRecipients = isAnticipatedSubRecipients;
	}

	public boolean isAnticipatedSubRecipientsNames() {
		return anticipatedSubRecipientsNames;
	}

	public void setAnticipatedSubRecipientsNames(
			boolean anticipatedSubRecipientsNames) {
		this.anticipatedSubRecipientsNames = anticipatedSubRecipientsNames;
	}

	public BasePIEligibilityOptions getPIEligibilityWaiver() {
		return PIEligibilityWaiver;
	}

	public void setPIEligibilityWaiver(
			BasePIEligibilityOptions pIEligibilityWaiver) {
		PIEligibilityWaiver = pIEligibilityWaiver;
	}

	public BaseOptions getConflictOfInterestForms() {
		return conflictOfInterestForms;
	}

	public void setConflictOfInterestForms(BaseOptions conflictOfInterestForms) {
		this.conflictOfInterestForms = conflictOfInterestForms;
	}

	public BaseOptions getExcludedPartyListChecked() {
		return excludedPartyListChecked;
	}

	public void setExcludedPartyListChecked(BaseOptions excludedPartyListChecked) {
		this.excludedPartyListChecked = excludedPartyListChecked;
	}

	public String getProposalNotes() {
		return proposalNotes;
	}

	public void setProposalNotes(String proposalNotes) {
		this.proposalNotes = proposalNotes;
	}

	public ResearchAdministrator getResearchAdministrator() {
		return researchAdministrator;
	}

	public void setResearchAdministrator(
			ResearchAdministrator researchAdministrator) {
		this.researchAdministrator = researchAdministrator;
	}

}
