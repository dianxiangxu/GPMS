//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.ArrayList;

import org.mongodb.morphia.annotations.Embedded;

//import org.bson.types.ObjectId;

@Embedded
public class SponsorAndBudgetInfo
{
	private ArrayList<String> grantingAgency;
	private double directCosts;
	private double FACosts;
	private double totalCosts;
	private double FARate;
	
	public SponsorAndBudgetInfo()
	{}

	public ArrayList<String> getGrantingAgency() 
	{
		return grantingAgency;
	}

	public void setGrantingAgency(ArrayList<String> grantingAgency) 
	{
		this.grantingAgency = grantingAgency;
	}
	
	public void addGrantingAgency(String agencyName)
	{
		this.grantingAgency.add(agencyName);
	}

	public double getDirectCosts() 
	{
		return directCosts;
	}

	public void setDirectCosts(double directCosts) 
	{
		this.directCosts = directCosts;
	}

	public double getFACosts()
	{
		return FACosts;
	}

	public void setFACosts(double FACosts)
	{
		this.FACosts = FACosts;
	}

	public double getTotalCosts()
	{
		return totalCosts;
	}

	public void setTotalCosts(double totalCosts) 
	{
		this.totalCosts = totalCosts;
	}

	public double getFARate()
	{
		return FARate;
	}

	public void setFARate(double FARate) 
	{
		this.FARate = FARate;
	}

}
