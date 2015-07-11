package gpms.model;

import java.util.Date;

public class UserInfo {
	private int rowTotal;
	private String id = new String();
	private String userName = new String();
	private String fullName = new String();

	private int noOfPIedProposal = 0;
	private int noOfCoPIedProposal = 0;
	private int noOfSenioredProposal = 0;
	private Date addedOn = new Date();
	private Date lastUpdated = new Date();
	private boolean isDeleted = false;

	public UserInfo() {
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public int getNoOfPIedProposal() {
		return noOfPIedProposal;
	}

	public void setNoOfPIedProposal(int noOfPIedProposal) {
		this.noOfPIedProposal = noOfPIedProposal;
	}

	public int getNoOfCoPIedProposal() {
		return noOfCoPIedProposal;
	}

	public void setNoOfCoPIedProposal(int noOfCoPIedProposal) {
		this.noOfCoPIedProposal = noOfCoPIedProposal;
	}

	public int getNoOfSenioredProposal() {
		return noOfSenioredProposal;
	}

	public void setNoOfSenioredProposal(int noOfSenioredProposal) {
		this.noOfSenioredProposal = noOfSenioredProposal;
	}

	public Date getAddedOn() {
		return addedOn;
	}

	public void setAddedOn(Date addedOn) {
		this.addedOn = addedOn;
	}

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
}
