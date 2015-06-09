package gpms.model;

import gpms.dao.BaseEntity;

import java.util.ArrayList;
import java.util.List;

public class SponsorAndBudgetInfo {
	private List<String> grantingAgency = new ArrayList<String>();
	private double directCosts;
	private double faCosts;
	private double totalCosts;
	private double faRate;

	public List<String> getGrantingAgency() {
		return grantingAgency;
	}

	public void setGrantingAgency(List<String> grantingAgency) {
		this.grantingAgency = grantingAgency;
	}

	public double getDirectCosts() {
		return directCosts;
	}

	public void setDirectCosts(double directCosts) {
		this.directCosts = directCosts;
	}

	public double getFaCosts() {
		return faCosts;
	}

	public void setFaCosts(double faCosts) {
		this.faCosts = faCosts;
	}

	public double getTotalCosts() {
		return totalCosts;
	}

	public void setTotalCosts(double totalCosts) {
		this.totalCosts = totalCosts;
	}

	public double getFaRate() {
		return faRate;
	}

	public void setFaRate(double faRate) {
		this.faRate = faRate;
	}
}
