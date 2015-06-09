package gpms.model;

import gpms.dao.BaseEntity;
import gpms.dao.ProposalDAO;

import java.util.ArrayList;
import java.util.Date;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Entity
public class Proposal extends BaseEntity {
	@Property("proposal no")
	private String proposalNo;
	@Property("date received")
	private Date dateReceived;
	@Property("proposal status")
	private String proposalStatus;
	@Reference
	@Property("investigator info")
	private ArrayList<InvestigatorInfo> investigatorInfo;
	@Reference
	@Property("project info")
	private ArrayList<ProjectInfo> projectInfo;
	@Reference
	@Property("sponsor and budget info")
	private ArrayList<SponsorAndBudgetInfo> sponsorAndBudgetInfo;
	@Reference
	@Property("cost share info")
	private ArrayList<CostShareInfo> costShareInfo;

	public Proposal(String proposalNo, Date dateReceived,
			String proposalStatus,
			ArrayList<InvestigatorInfo> investigatorInfo,
			ArrayList<ProjectInfo> projectInfo,
			ArrayList<SponsorAndBudgetInfo> sponsorAndBudgetInfo,
			ArrayList<CostShareInfo> costShareInfo) {
		this.proposalNo = proposalNo;
		this.dateReceived = dateReceived;
		this.proposalStatus = proposalStatus;

		// TODO:: need to do in loop of the list object
		this.investigatorInfo = investigatorInfo;
		this.projectInfo = projectInfo;
		this.sponsorAndBudgetInfo = sponsorAndBudgetInfo;
		this.costShareInfo = costShareInfo;

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

	public ArrayList<InvestigatorInfo> getInvestigatorInfo() {
		return investigatorInfo;
	}

	public void setInvestigatorInfo(ArrayList<InvestigatorInfo> investigatorInfo) {
		this.investigatorInfo = investigatorInfo;
	}

	public ArrayList<ProjectInfo> getProjectInfo() {
		return projectInfo;
	}

	public void setProjectInfo(ArrayList<ProjectInfo> projectInfo) {
		this.projectInfo = projectInfo;
	}

	public ArrayList<SponsorAndBudgetInfo> getSponsorAndBudgetInfo() {
		return sponsorAndBudgetInfo;
	}

	public void setSponsorAndBudgetInfo(
			ArrayList<SponsorAndBudgetInfo> sponsorAndBudgetInfo) {
		this.sponsorAndBudgetInfo = sponsorAndBudgetInfo;
	}

	public ArrayList<CostShareInfo> getCostShareInfo() {
		return costShareInfo;
	}

	public void setCostShareInfo(ArrayList<CostShareInfo> costShareInfo) {
		this.costShareInfo = costShareInfo;
	}
}
