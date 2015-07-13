package gpms.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

public class ProposalInfo {

	private int rowTotal;
	private String id = new String();

	// Proposal
	private String proposalNo = new String();
	private Date dateReceived = new Date();
	private Status proposalStatus = Status.NEW;

	// ProjectInfo
	private String projectTitle = new String();
	private String projectType = new String();
	private String typeOfRequest = new String();
	private Date dueDate = new Date();
	private Date projectPeriodFrom = new Date();
	private Date projectPeriodTo = new Date();
	private String projectLocation = new String();

	// SponsorAndBudgetInfo
	private String grantingAgencies = new String();
	private double directCosts;
	private double FACosts;
	private double totalCosts;
	private double FARate;

	private Date lastUpdated = new Date();
	private boolean isDeleted = false;

	public ProposalInfo() {

	}

	public int getRowTotal() {
		return rowTotal;
	}

	public void setRowTotal(int rowTotal) {
		this.rowTotal = rowTotal;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public Status getProposalStatus() {
		return proposalStatus;
	}

	public void setProposalStatus(Status proposalStatus) {
		this.proposalStatus = proposalStatus;
	}

	public String getProjectTitle() {
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

	public String getProjectType() {
		return projectType;
	}

	public void setProjectType(String projectType) {
		this.projectType = projectType;
	}

	public String getTypeOfRequest() {
		return typeOfRequest;
	}

	public void setTypeOfRequest(String typeOfRequest) {
		this.typeOfRequest = typeOfRequest;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Date getProjectPeriodFrom() {
		return projectPeriodFrom;
	}

	public void setProjectPeriodFrom(Date projectPeriodFrom) {
		this.projectPeriodFrom = projectPeriodFrom;
	}

	public Date getProjectPeriodTo() {
		return projectPeriodTo;
	}

	public void setProjectPeriodTo(Date projectPeriodTo) {
		this.projectPeriodTo = projectPeriodTo;
	}

	public String getProjectLocation() {
		return projectLocation;
	}

	public void setProjectLocation(String projectLocation) {
		this.projectLocation = projectLocation;
	}

	public String getGrantingAgencies() {
		return grantingAgencies;
	}

	public void setGrantingAgencies(String grantingAgencies) {
		this.grantingAgencies = grantingAgencies;
	}

	public double getDirectCosts() {
		return directCosts;
	}

	public void setDirectCosts(double directCosts) {
		this.directCosts = directCosts;
	}

	public double getFACosts() {
		return FACosts;
	}

	public void setFACosts(double fACosts) {
		FACosts = fACosts;
	}

	public double getTotalCosts() {
		return totalCosts;
	}

	public void setTotalCosts(double totalCosts) {
		this.totalCosts = totalCosts;
	}

	public double getFARate() {
		return FARate;
	}

	public void setFARate(double fARate) {
		FARate = fARate;
	}

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

}
