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
	private double faCosts;
	@Property("total costs")
	private double totalCosts;
	@Property("F&A rate")
	private double faRate;

	public SponsorAndBudgetInfo() {
	}

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
