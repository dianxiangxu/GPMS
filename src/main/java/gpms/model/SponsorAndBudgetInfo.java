//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.ArrayList;
import java.util.List;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

//import org.bson.types.ObjectId;

@Embedded
public class SponsorAndBudgetInfo {
	@Property("granting agency")
	private List<String> grantingAgency = new ArrayList<String>();
	@Property("direct costs")
	private double directCosts;
	@Property("F&A costs")
	private double FACosts;
	@Property("total costs")
	private double totalCosts;
	@Property("F&A rate")
	private double FARate;

	public SponsorAndBudgetInfo() {
	}

	public List<String> getGrantingAgency() {
		return grantingAgency;
	}

	public void setGrantingAgency(List<String> grantingAgency) {
		this.grantingAgency = grantingAgency;
	}

	public void addGrantingAgency(String agencyName) {
		this.grantingAgency.add(agencyName);
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

	public String toString() {
		String outPut = "";
		outPut += "Granting Agency : " + grantingAgency.toString() + "\n";
		outPut += "Direct Costs    : " + directCosts + "\n";
		outPut += "F&A costs       : " + FACosts + "\n";
		outPut += "Total Costs     : " + totalCosts + "\n";
		outPut += "F&A rate        : " + FARate;
		return outPut;
	}

	public boolean equals(SponsorAndBudgetInfo sabi) {
		return this.directCosts == sabi.directCosts
				&& this.FACosts == sabi.FACosts && this.FARate == sabi.FARate
				&& this.grantingAgency.equals(sabi.grantingAgency)
				&& this.totalCosts == sabi.totalCosts;
	}
}
