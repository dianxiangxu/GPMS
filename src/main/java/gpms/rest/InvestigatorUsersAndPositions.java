package gpms.rest;

import gpms.model.PositionDetails;

import java.util.ArrayList;
import java.util.List;

import org.mongodb.morphia.annotations.Property;

public class InvestigatorUsersAndPositions {
	@Property("id")
	protected String id;

	@Property("full name")
	protected String fullName;

	@Property("mobile number")
	private String mobileNumber = new String();

	@Property("positions")
	private List<PositionDetails> positions = new ArrayList<PositionDetails>();

	public InvestigatorUsersAndPositions() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public List<PositionDetails> getPositions() {
		return positions;
	}

	public void setPositions(List<PositionDetails> positions) {
		this.positions = positions;
	}

}
