//Written by: Hector C. Ortiz

package gpms.model;

import java.util.Date;

import org.mongodb.morphia.annotations.Embedded;

@Embedded
public class ProjectPeriod 
{
	private Date from;
	private Date to;
	
	public ProjectPeriod()
	{}
	
	public void setFrom(Date from)
	{
		this.from = from;
	}
	
	public Date getFrom()
	{
		return from;
	}
	
	public void setTo(Date to)
	{
		if(to.after(from))
		{
			this.to = to;
		}
	}
	
	public Date getTo()
	{
		return to;
	}
}
