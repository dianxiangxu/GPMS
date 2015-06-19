//Written by : Hector C. Ortiz
package gpms.model;

import java.util.Date;

import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

public class AuditLog 
{
	@Property("action")
	private String action;
	@Property("when")
	private Date when;
	@Reference("user id")
	private UserProfile who;
	
	public AuditLog(String action, Date when, UserProfile who)
	{
		this.action = action;
		this.when = when;
		this.who = who;
	}
	
	public String getAction()
	{
		return action;
	}
	
	public Date getWhen()
	{
		return when;
	}
	
	public UserProfile getWho()
	{
		return who;
	}
}
