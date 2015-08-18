package gpms.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ProposalInfo {

	private int rowTotal;
	private String id = new String();

	// Proposal
	private String proposalNo = new String();
	private Date dateReceived = new Date();
	private Status proposalStatus = Status.NEW;

	// PI, CO-PI and Senior UserProfiles
	private String PIUser = new String();
	private List<String> COPIUsers = new ArrayList<String>();
	private List<String> seniorPersonnelUsers = new ArrayList<String>();

	// ProjectInfo
	private String projectTitle = new String();
	private String projectType = new String();
	private List<String> typeOfRequest = new ArrayList<String>();
	private Date dueDate = new Date();
	private Date projectPeriodFrom = new Date();
	private Date projectPeriodTo = new Date();
	private String projectLocation = new String();

	// SponsorAndBudgetInfo
	private List<String> grantingAgencies = new ArrayList<String>();
	private double directCosts;
	private double FACosts;
	private double totalCosts;
	private double FARate;

	private Date lastAudited = new Date();
	private String lastAuditedBy = new String();
	private String lastAuditAction = new String();

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

	public String getPIUser() {
		return PIUser;
	}

	public void setPIUser(String pIUser) {
		PIUser = pIUser;
	}

	public List<String> getCOPIUsers() {
		return COPIUsers;
	}

	public void setCOPIUsers(List<String> cOPIUsers) {
		COPIUsers = cOPIUsers;
	}

	public List<String> getSeniorPersonnelUsers() {
		return seniorPersonnelUsers;
	}

	public void setSeniorPersonnelUsers(List<String> seniorPersonnelUsers) {
		this.seniorPersonnelUsers = seniorPersonnelUsers;
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

	public List<String> getTypeOfRequest() {
		return typeOfRequest;
	}

	public void setTypeOfRequest(List<String> typeOfRequest) {
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

	public List<String> getGrantingAgencies() {
		return grantingAgencies;
	}

	public void setGrantingAgencies(List<String> grantingAgencies) {
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

	public Date getLastAudited() {
		return lastAudited;
	}

	public void setLastAudited(Date lastAudited) {
		this.lastAudited = lastAudited;
	}

	public String getLastAuditedBy() {
		return lastAuditedBy;
	}

	public void setLastAuditedBy(String lastAuditedBy) {
		this.lastAuditedBy = lastAuditedBy;
	}

	public String getLastAuditAction() {
		return lastAuditAction;
	}

	public void setLastAuditAction(String lastAuditAction) {
		this.lastAuditAction = lastAuditAction;
	}

}
