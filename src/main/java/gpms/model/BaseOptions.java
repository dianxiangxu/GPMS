package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class BaseOptions {
	@Property("yes")
	private boolean yes;

	@Property("no")
	private boolean no;

	@Property("not applicable")
	private boolean notApplicable;

	public BaseOptions() {
	}

	public boolean isYes() {
		return yes;
	}

	public void setYes(boolean yes) {
		this.yes = yes;
	}

	public boolean isNo() {
		return no;
	}

	public void setNo(boolean no) {
		this.no = no;
	}

	public boolean isNotApplicable() {
		return notApplicable;
	}

	public void setNotApplicable(boolean notApplicable) {
		this.notApplicable = notApplicable;
	}

}
