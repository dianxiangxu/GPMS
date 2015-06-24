//Written by : Hector C. Ortiz
package gpms.model;

import java.util.Date;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Embedded
public class AuditLog 
{
	@Reference("user id")
	private UserProfile who;
	@Property("action")
	private String action;
	@Property("when")
	private Date when;
	
	public AuditLog()
	{
		who = new UserProfile();
		action = new String();
		when = new Date();
	}
	
	public AuditLog(UserProfile who, String action, Date when)
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
	
	public AuditLog clone()
	{
		return new AuditLog(this.who, this.action, this.when);
	}
}
