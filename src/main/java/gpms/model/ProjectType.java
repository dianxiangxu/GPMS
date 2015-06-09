//Written by: Hector C. Ortiz

package gpms.model;

import com.google.code.morphia.annotations.Embedded;
import com.google.code.morphia.annotations.Id;

@Embedded
public class ProjectType 
{
	private boolean is_research_basic;
	private boolean is_research_applied;
	private boolean is_research_development;
	private boolean is_instruction;
	private boolean is_other_sposored_activity;
	
	public ProjectType()
	{
		is_research_basic = true;
	}
	
	public void set_is_research_basic(boolean is_research_basic)
	{
		if(!this.is_research_basic && is_research_basic)
		{
			this.is_research_basic = is_research_basic;
			is_research_applied = false;
			is_research_development = false;
			is_instruction = false;
			is_other_sposored_activity = false;
		}
	}
	
	public boolean get_is_research_basic()
	{
		return is_research_basic;
	}
	
	public void set_is_research_applied(boolean is_research_applied)
	{
		if(!this.is_research_applied && is_research_applied)
		{
			is_research_basic = false;
			this.is_research_applied = is_research_applied;
			is_research_development = false;
			is_instruction = false;
			is_other_sposored_activity = false;
		}
	}
	
	public boolean get_is_research_applied()
	{
		return is_research_applied;
	}
	
	public void set_is_research_development(boolean is_research_development)
	{
		if(!this.is_research_development && is_research_development)
		{
			is_research_basic = false;
			is_research_applied = false;
			this.is_research_development = is_research_development;
			is_instruction = false;
			is_other_sposored_activity = false;
		}
	}
	
	public boolean get_is_research_development()
	{
		return is_research_development;
	}
	
	public void set_is_instruction(boolean is_instruction)
	{
		if(!this.is_instruction && is_instruction)
		{
			is_research_basic = false;
			is_research_applied = false;
			is_research_development = false;
			this.is_instruction = is_instruction;
			is_other_sposored_activity = false;
		}
	}
	
	public boolean get_is_instruction()
	{
		return is_instruction;
	}
	
	public void set_is_other_sposored_activity(boolean is_other_sposored_activity)
	{
		if(!this.is_other_sposored_activity && is_other_sposored_activity)
		{
			is_research_basic = false;
			is_research_applied = false;
			is_research_development = false;
			is_instruction = false;
			this.is_other_sposored_activity = is_other_sposored_activity;
		}
	}
	
	public boolean get_is_other_sposored_activity()
	{
		return is_other_sposored_activity;
	}
}
