//Written by: Hector C. Ortiz

package gpms.model;

import java.util.Date;

import com.google.code.morphia.annotations.Embedded;

@Embedded
public class ProjectPeriod 
{
	private Date from;
	private Date to;
	
	public ProjectPeriod()
	{}
	
	public void set_from(Date from)
	{
		this.from = from;
	}
	
	public Date get_from()
	{
		return from;
	}
	
	public void set_to(Date to)
	{
		if(to.after(from))
		{
			this.to = to;
		}
	}
	
	public Date get_to()
	{
		return to;
	}
}
