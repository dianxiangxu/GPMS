//Written by: Hector C. Ortiz

package gpms.model;

import java.util.Date;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class ProjectPeriod {
	@Property("from")
	private Date from;
	@Property("to")
	private Date to;

	public ProjectPeriod() {
		from = new Date();
		to = new Date();
	}

	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}
	
	public String toString()
	{
		String outPut = "";
		outPut += "From : " + from.toString() + "\n";
		outPut += "To   : " + to.toString();
		return outPut;
	}

	public boolean equals(ProjectPeriod pp)
	{
		return this.from.equals(pp.from) && this.to.equals(pp.to);
	}
}
