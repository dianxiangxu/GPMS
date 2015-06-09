package gpms.model;

import gpms.dao.BaseEntity;

import java.util.Date;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Property;

@Entity
public class Proposal extends BaseEntity {
	@Property("proposal no")
	private String proposalNo;
	@Property("date received")
	private Date dateReceived;
	@Property("proposal status")
	private String proposalStatus;
	@Embedded
	@Property("investigator info")
	private InvestigatorInfo investigatorInfo;
	@Embedded
	@Property("project info")
	private ProjectInfo projectInfo;
	@Embedded
	@Property("sponsor and budget info")
	private SponsorAndBudgetInfo sponsorAndBudgetInfo;
	@Embedded
	@Property("cost share info")
	private CostShareInfo costShareInfo;
	@Embedded
	@Property("university commitments")
	private UniversityCommitments universityCommitments;
	@Embedded
	@Property("conflict of interest and commitment info")
	private ConflictOfInterest conflicOfInterest;
	@Embedded
	@Property("compliance info")
	private ComplianceInfo complianceInfo;

	public Proposal(String proposalNo, Date dateReceived,
			String proposalStatus, InvestigatorInfo investigatorInfo,
			ProjectInfo projectInfo, SponsorAndBudgetInfo sponsorAndBudgetInfo,
			CostShareInfo costShareInfo) {
		this.proposalNo = proposalNo;
		this.dateReceived = dateReceived;
		this.proposalStatus = proposalStatus;

		// TODO:: need to do in loop of the list object
		this.investigatorInfo = investigatorInfo;
		this.projectInfo = projectInfo;
		this.sponsorAndBudgetInfo = sponsorAndBudgetInfo;
	}

	public Proposal(String proposalNo, Date dateReceived, String proposalStatus) {
		this.proposalNo = proposalNo;
		this.dateReceived = dateReceived;
		this.proposalStatus = proposalStatus;
	}

	public Proposal() {

	}

	@Override
	public String toString() {
		return this.getProposalNo() + " " + this.getDateReceived() + " "
				+ this.getProposalStatus();
	}

	public String getProposalNo() {
		return proposalNo;
	}

	public void setProposalNo(String proposalNo) {
		this.proposalNo = proposalNo;
	}

	public Date getDateReceived() {
		return dateReceived;
	}

	public void setDateReceived(Date dateReceived) {
		this.dateReceived = dateReceived;
	}

	public String getProposalStatus() {
		return proposalStatus;
	}

	public void setProposalStatus(String proposalStatus) {
		this.proposalStatus = proposalStatus;
	}

	public InvestigatorInfo getInvestigatorInfo() {
		return investigatorInfo;
	}

	public void setInvestigatorInfo(InvestigatorInfo investigatorInfo) {
		this.investigatorInfo = investigatorInfo;
	}

	public ProjectInfo getProjectInfo() {
		return projectInfo;
	}

	public void setProjectInfo(ProjectInfo projectInfo) {
		this.projectInfo = projectInfo;
	}

	public SponsorAndBudgetInfo getSponsorAndBudgetInfo() {
		return sponsorAndBudgetInfo;
	}

	public void setSponsorAndBudgetInfo(
			SponsorAndBudgetInfo sponsorAndBudgetInfo) {
		this.sponsorAndBudgetInfo = sponsorAndBudgetInfo;
	}

	public CostShareInfo getCostShareInfo() {
		return costShareInfo;
	}

	public void setCostShareInfo(CostShareInfo costShareInfo) {
		this.costShareInfo = costShareInfo;
	}

	public UniversityCommitments getUniversityCommitments() {
		return universityCommitments;
	}

	public void setUniversityCommitments(
			UniversityCommitments universityCommitments) {
		this.universityCommitments = universityCommitments;
	}

	public ConflictOfInterest getConflicOfInterest() {
		return conflicOfInterest;
	}

	public void setConflicOfInterest(ConflictOfInterest conflicOfInterest) {
		this.conflicOfInterest = conflicOfInterest;
	}

	public ComplianceInfo getComplianceInfo() {
		return complianceInfo;
	}

	public void setComplianceInfo(ComplianceInfo complianceInfo) {
		this.complianceInfo = complianceInfo;
	}
}
