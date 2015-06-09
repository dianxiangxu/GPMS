//Written by: Hector C. Ortiz

package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Id;

@Embedded
public class TypeOfRequest 
{
	private boolean is_pre_proposal;
	private boolean is_new_proposal;
	private boolean is_continuation;
	private boolean is_supplement;
	
	public TypeOfRequest()
	{}
	
	public void set_is_pre_proposal(boolean is_pre_proposal)
	{
		this.is_pre_proposal = is_pre_proposal;
	}
	
	public boolean get_is_pre_proposal()
	{
		return is_pre_proposal;
	}
	
	public void set_is_new_proposal(boolean is_new_proposal)
	{
		this.is_new_proposal = is_new_proposal;
	}
	
	public boolean get_is_new_proposal()
	{
		return is_new_proposal;
	}
	
	public void set_is_continuation(boolean is_continuation)
	{
		this.is_continuation = is_continuation;
	}
	
	public boolean get_is_continuation()
	{
		return is_continuation;
	}
	
	public void set_is_supplement(boolean is_supplement)
	{
		this.is_supplement = is_supplement;
	}
	
	public boolean get_is_supplement()
	{
		return is_supplement;
	}
}
