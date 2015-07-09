package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class Base {

	@Property("MTDC")
	private boolean MTDC;

	@Property("TDC")
	private boolean TDC;

	@Property("TC")
	private boolean TC;

	@Property("other")
	private boolean other;

	@Property("not applicable")
	private boolean notApplicable;

	public Base() {
	}

	public boolean isMTDC() {
		return MTDC;
	}

	public void setMTDC(boolean mTDC) {
		MTDC = mTDC;
	}

	public boolean isTDC() {
		return TDC;
	}

	public void setTDC(boolean tDC) {
		TDC = tDC;
	}

	public boolean isTC() {
		return TC;
	}

	public void setTC(boolean tC) {
		TC = tC;
	}

	public boolean isOther() {
		return other;
	}

	public void setOther(boolean other) {
		this.other = other;
	}

	public boolean isNotApplicable() {
		return notApplicable;
	}

	public void setNotApplicable(boolean notApplicable) {
		this.notApplicable = notApplicable;
	}

}
