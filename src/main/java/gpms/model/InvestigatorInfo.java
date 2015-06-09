//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.ArrayList;

//import org.bson.types.ObjectId;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Reference;

@Embedded
public class InvestigatorInfo
{
	private final int max_co_pi_num = 4;
	private final int max_senior_personnel_num = 10;
	
	@Reference
	private UserProfile pi;
	@Reference
	private ArrayList<UserProfile> co_pi;
	@Reference
	private ArrayList<UserProfile> senior_personnel;
	
	public InvestigatorInfo()
	{}

	public UserProfile get_pi() 
	{
		return pi;
	}

	public void set_pi(UserProfile pi) 
	{
		this.pi = pi;
	}

	public ArrayList<UserProfile> get_co_pi() 
	{
		return co_pi;
	}
	
	public void add_co_pi(UserProfile co_pi)
	{
		if(this.co_pi.size() <= max_co_pi_num)
		{
			this.co_pi.add(co_pi);
		}
	}

	public void set_co_pi(ArrayList<UserProfile> co_pi) 
	{
		if(co_pi.size() <= max_co_pi_num)
		{
			this.co_pi = co_pi;
		}
	}

	public ArrayList<UserProfile> get_senior_personnel()
	{
		return senior_personnel;
	}
	
	public void add_senior_personnel(UserProfile senior_personnel)
	{
		if(this.senior_personnel.size() <= max_senior_personnel_num)
		{
			this.senior_personnel.add(senior_personnel);
		}
	}

	public void set_senior_personnel(ArrayList<UserProfile> senior_personnel) 
	{
		if(senior_personnel.size() <= max_senior_personnel_num)
		{
			this.senior_personnel = senior_personnel;
		}
	}
}
