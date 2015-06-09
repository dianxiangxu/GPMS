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

}
