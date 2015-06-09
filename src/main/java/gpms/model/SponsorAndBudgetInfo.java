//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.ArrayList;

import com.google.code.morphia.annotations.Embedded;

//import org.bson.types.ObjectId;

@Embedded
public class SponsorAndBudgetInfo
{
	private ArrayList<String> granting_agency;
	private double direct_costs;
	private double f_a_costs;
	private double total_costs;
	private double f_a_rate;
	
	public SponsorAndBudgetInfo()
	{}

	public ArrayList<String> get_granting_agency() 
	{
		return granting_agency;
	}

	public void set_granting_agency(ArrayList<String> granting_agency) 
	{
		this.granting_agency = granting_agency;
	}
	
	public void add_granting_agency(String agency_name)
	{
		this.granting_agency.add(agency_name);
	}

	public double get_direct_costs() 
	{
		return direct_costs;
	}

	public void set_direct_costs(double direct_costs) 
	{
		this.direct_costs = direct_costs;
	}

	public double get_f_a_costs()
	{
		return f_a_costs;
	}

	public void set_f_a_costs(double f_a_costs)
	{
		this.f_a_costs = f_a_costs;
	}

	public double get_total_costs()
	{
		return total_costs;
	}

	public void set_total_costs(double total_costs) 
	{
		this.total_costs = total_costs;
	}

	public double get_f_a_rate()
	{
		return f_a_rate;
	}

	public void set_faRate(double f_a_rate) 
	{
		this.f_a_rate = f_a_rate;
	}

}
