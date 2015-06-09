//Edited by: Hector C. Ortiz

package gpms.model;

import gpms.dao.ProposalDAO;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
//import org.mongodb.morphia.annotations.Reference;
import org.mongodb.morphia.annotations.Embedded;

//import java.util.ArrayList;

import org.bson.types.ObjectId;

@Entity(value = ProposalDAO.COLLECTION_NAME)
public class Proposal 
{
	@Id
	private ObjectId proposalId;
	private String proposalNo;
	private String dateReceived;
	private String proposalStatus;
	@Embedded
	private InvestigatorInfo investigatorInfo;
	@Embedded
	private ProjectInfo projectInfo;
	@Embedded
	private SponsorAndBudgetInfo sponsorAndBudgetInfo;
	
	/*
	@Embedded
	private CostShareInfo costShareInfo;
	@Embedded
	private UniversityCommitments universityCommitments;
	@Embedded
	private ConflictOfInterest conflicOfInterest;
	@Embedded
	private ComplianceInfo complianceInfo;
	*/

	public Proposal(String proposalNo, String dateReceived,
			String proposalStatus,
			InvestigatorInfo investigatorInfo,
			ProjectInfo projectInfo,
			SponsorAndBudgetInfo sponsorAndBudgetInfo/*,
			CostShareInfo costShareInfo*/) 
	{
		this.proposalNo = proposalNo;
		this.dateReceived = dateReceived;
		this.proposalStatus = proposalStatus;

		// TODO:: need to do in loop of the list object
		this.investigatorInfo = investigatorInfo;
		this.projectInfo = projectInfo;
		this.sponsorAndBudgetInfo = sponsorAndBudgetInfo;
	}

	public Proposal(String proposalNo, String dateReceived,String proposalStatus)
	{
		this.proposalNo = proposalNo;
		this.dateReceived = dateReceived;
		this.proposalStatus = proposalStatus;
	}

	public Proposal() 
	{}

	// TODO: add more class object as per document
	public ObjectId getId() 
	{
		return proposalId;
	}

//	public void set_id(ObjectId _id) {
//		this._id = _id;
//	}

	public String getProposalNo() 
	{
		return proposalNo;
	}

	public void setProposalNo(String proposalNo) 
	{
		this.proposalNo = proposalNo;
	}

	public String getDateReceived()
	{
		return dateReceived;
	}

	public void setDateReceived(String dateReceived) 
	{
		this.dateReceived = dateReceived;
	}

	public String getProposalStatus() 
	{
		return proposalStatus;
	}

	public void setProposalStatus(String proposalStatus) 
	{
		this.proposalStatus = proposalStatus;
	}

	public InvestigatorInfo getInvestigatorInfo()
	{
		return investigatorInfo;
	}

	public void setInvestigatorInfo(InvestigatorInfo investigatorInfo) 
	{
		this.investigatorInfo = investigatorInfo;
	}

	public ProjectInfo getProjectInfo()
	{
		return projectInfo;
	}

	public void setProjectInfo(ProjectInfo projectInfo) 
	{
		this.projectInfo = projectInfo;
	}

	public SponsorAndBudgetInfo getSponsorAndBudgetInfo()
	{
		return sponsorAndBudgetInfo;
	}

	public void setSponsorAndBudgetInfo(
			SponsorAndBudgetInfo sponsorAndBudgetInfo)
	{
		this.sponsorAndBudgetInfo = sponsorAndBudgetInfo;
	}

//	public CostShareInfo getCostShareInfo() 
//	{
//		return costShareInfo;
//	}

//	public void setCostShareInfo(CostShareInfo costShareInfo)
//	{
//		this.costShareInfo = costShareInfo;
//	}

	@Override
	public String toString() {
		return this.getProposalNo() + " " + this.getDateReceived() + " "
				+ this.getProposalStatus();
	}
}
