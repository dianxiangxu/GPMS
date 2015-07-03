package gpms.model;

import gpms.dao.ProposalDAO;

import java.util.Date;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.utils.IndexDirection;
//{"id":null,"version":null,"auditLog":[],
//"proposalNo":"","dateReceived":1435876850010,"proposalStatus":"NEW",
//"investigatorInfo":{"MAX_NUM_CO_PI":4,"MAX_NUM_SENIOR_PERSONNEL":10,
//"pi":{"id":null,"version":null,"auditLog":[],"firstName":"","middleName":"","lastName":"","officeNumbers":[],"mobileNumbers":[],"homeNumbers":[],"address":{"street":"","city":"","state":"","zipcode":"","country":""},"workEmails":[],"personalEmails":[],"userAccount":{"id":null,"version":null,"auditLog":[],"userName":"","password":"","isDeleted":false},"isDeleted":false,"detailsList":[]},
//"co_pi":[],"seniorPersonnel":[]},
//"projectInfo":{"projectTitle":"",
//"projectType":{"isResearchBasic":true,"isResearchApplied":false,"isResearchDevelopment":false,"isInstruction":false,"isOtherSponsoredActivity":false},
//"typeOfRequest":{"continuation":false,"supplement":false,"preProposal":false,"newProposal":false},
//"dueDate":1435876850022,
//"projectPeriod":{"from":1435876850025,"to":1435876850025},
//"projectLocation":{"offCampus":false,"onCampus":false}},
//"sponsorAndBudgetInfo":{"grantingAgency":[],"directCosts":0.0,"totalCosts":0.0,"facosts":0.0,"farate":0.0},
//"costShareInfo":{"institutionalCommitted":false,"thirdPartyCommitted":false},
//"universityCommitments":{"newRenovatedFacilitiesRequired":false,"rentalSpaceRequired":false,"institutionalCommitmentRequired":false},
//"conflicOfInterest":{"financialCOI":false,"conflictDisclosed":false,"disclosureFormChange":false},
//"complianceInfo":{}}

@Entity(value = ProposalDAO.COLLECTION_NAME, noClassnameStored = true)
public class Proposal extends BaseEntity {
	@Property("proposal no")
	@Indexed(value = IndexDirection.ASC, name = "proposalNoIndex", unique = true)
	private String proposalNo;

	@Property("date received")
	private Date dateReceived;

	@Property("proposal status")
	private Status proposalStatus = Status.NEW;

	@Embedded("investigator info")
	private InvestigatorInfo investigatorInfo;

	@Embedded("project info")
	private ProjectInfo projectInfo;

	@Embedded("sponsor and budget info")
	private SponsorAndBudgetInfo sponsorAndBudgetInfo;

	@Embedded("cost share info")
	private CostShareInfo costShareInfo;
	@Embedded("university commitments")
	private UniversityCommitments universityCommitments;
	@Embedded("conflict of interest and commitment info")
	private ConflictOfInterest conflicOfInterest;
	@Embedded("compliance info")
	private ComplianceInfo complianceInfo;

	public Proposal(String proposalNo, Date dateReceived,
			Status proposalStatus, InvestigatorInfo investigatorInfo,
			ProjectInfo projectInfo, SponsorAndBudgetInfo sponsorAndBudgetInfo,
			CostShareInfo costShareInfo) {
		this.proposalNo = proposalNo;
		this.dateReceived = dateReceived;
		this.proposalStatus = proposalStatus;

		// TODO:: need to do in loop of the list object
		this.investigatorInfo = investigatorInfo;
		this.projectInfo = projectInfo;
		this.sponsorAndBudgetInfo = sponsorAndBudgetInfo;
		this.costShareInfo = new CostShareInfo();
		this.universityCommitments = new UniversityCommitments();
		this.conflicOfInterest = new ConflictOfInterest();
		this.complianceInfo = new ComplianceInfo();
	}

	public Proposal(String proposalNo, Date dateReceived, Status proposalStatus) {
		this.proposalNo = proposalNo;
		this.dateReceived = dateReceived;
		this.proposalStatus = proposalStatus;
		investigatorInfo = new InvestigatorInfo();
		projectInfo = new ProjectInfo();
		sponsorAndBudgetInfo = new SponsorAndBudgetInfo();
		costShareInfo = new CostShareInfo();
		universityCommitments = new UniversityCommitments();
		conflicOfInterest = new ConflictOfInterest();
		complianceInfo = new ComplianceInfo();
	}

	public Proposal() {
		proposalNo = new String();
		dateReceived = new Date();
		investigatorInfo = new InvestigatorInfo();
		projectInfo = new ProjectInfo();
		sponsorAndBudgetInfo = new SponsorAndBudgetInfo();
		costShareInfo = new CostShareInfo();
		universityCommitments = new UniversityCommitments();
		conflicOfInterest = new ConflictOfInterest();
		complianceInfo = new ComplianceInfo();
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
		Date currDate = new Date();
		if (dateReceived.equals(currDate) || dateReceived.after(currDate)) {
			this.dateReceived = dateReceived;
		}
	}

	public Status getProposalStatus() {
		return proposalStatus;
	}

	public void setProposalStatus(Status status) {
		this.proposalStatus = status;
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

	@Override
	public String toString() {
		return new StringBuffer(" Proposal Number : ")
				.append(this.getProposalNo()).append(" Date Received : ")
				.append(this.getDateReceived()).append(" Proposal Status : ")
				.append(this.getProposalStatus()).toString();
	}
}
