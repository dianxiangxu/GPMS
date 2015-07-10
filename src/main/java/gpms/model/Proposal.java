package gpms.model;

import gpms.dao.ProposalDAO;

import java.util.Date;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.utils.IndexDirection;

@Entity(value = ProposalDAO.COLLECTION_NAME, noClassnameStored = true)
public class Proposal extends BaseEntity {
	@Property("proposal no")
	@Indexed(value = IndexDirection.ASC, name = "proposalNoIndex", unique = true)
	private String proposalNo = new String();

	@Property("date received")
	private Date dateReceived = new Date();

	@Property("proposal status")
	private Status proposalStatus = Status.NEW;

	@Embedded("investigator info")
	private InvestigatorInfo investigatorInfo = new InvestigatorInfo();

	@Embedded("project info")
	private ProjectInfo projectInfo = new ProjectInfo();

	@Embedded("sponsor and budget info")
	private SponsorAndBudgetInfo sponsorAndBudgetInfo = new SponsorAndBudgetInfo();

	@Embedded("cost share info")
	private CostShareInfo costShareInfo = new CostShareInfo();
	@Embedded("university commitments")
	private UniversityCommitments universityCommitments = new UniversityCommitments();
	@Embedded("conflict of interest and commitment info")
	private ConflictOfInterest conflicOfInterest = new ConflictOfInterest();
	@Embedded("compliance info")
	private ComplianceInfo complianceInfo = new ComplianceInfo();

	private ObjectId proposalKey = this.getId();

	public Proposal() {
	}

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

	/**
	 * When Investigator info is set, we will add a uniquely generated id to
	 * everyone involved at the creation of the proposal this id is the
	 * proposalKey, which is an ObjectId object, but we run the toString to make
	 * it more manageable for our purposes.
	 * 
	 * @param investigatorInfo
	 */
	public void setInvestigatorInfo(InvestigatorInfo investigatorInfo) {
		investigatorInfo.getPi().addProposalKey(proposalKey.toString());
		// Scans the list of co pi's and adds the proposal key if they don't
		// have it already
		if (investigatorInfo.getCo_pi().size() > 0) {
			for (int a = 0; a < investigatorInfo.getCo_pi().size(); a++) {
				if (!investigatorInfo.getCo_pi().get(a).getProposalKeys()
						.contains(proposalKey.toString())) {
					investigatorInfo.getCo_pi().get(a)
							.addProposalKey(proposalKey.toString());
				}
			}
		}
		// Scans the list of senior personnel and adds the proposal key if they
		// don't have it already
		if (investigatorInfo.getSeniorPersonnel().size() > 0) {
			for (int b = 0; b < investigatorInfo.getSeniorPersonnel().size(); b++) {
				if (!investigatorInfo.getSeniorPersonnel().get(b)
						.getProposalKeys().contains(proposalKey.toString())) {
					investigatorInfo.getSeniorPersonnel().get(b)
							.addProposalKey(proposalKey.toString());
				}
			}
		}
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
