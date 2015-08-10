package gpms.model;

import java.util.ArrayList;
import java.util.Date;

public class ProposalInfo {

	private int rowTotal;
	private String id = new String();

	// Proposal
	private String proposalNo = new String();
	private Date dateReceived = new Date();
	private Status proposalStatus = Status.NEW;

	// PI, CO-PI and Senior UserProfiles
	private UserProfile PIUser = new UserProfile();
	private ArrayList<UserProfile> COPIUsers = new ArrayList<UserProfile>();
	private ArrayList<UserProfile> seniorPersonnelUsers = new ArrayList<UserProfile>();

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

	public UserProfile getPIUser() {
		return PIUser;
	}

	public void setPIUser(UserProfile pIUser) {
		PIUser = pIUser;
	}

	public ArrayList<UserProfile> getCOPIUsers() {
		return COPIUsers;
	}

	public void setCOPIUsers(ArrayList<UserProfile> cOPIUsers) {
		COPIUsers = cOPIUsers;
	}

	public ArrayList<UserProfile> getSeniorPersonnelUsers() {
		return seniorPersonnelUsers;
	}

	public void setSeniorPersonnelUsers(
			ArrayList<UserProfile> seniorPersonnelUsers) {
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
