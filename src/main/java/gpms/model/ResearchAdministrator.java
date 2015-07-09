package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class ResearchAdministrator {
	@Property("DF")
	private boolean DF;

	@Property("LG")
	private boolean LG;

	@Property("LN")
	private boolean LN;

	public ResearchAdministrator() {
	}

	public boolean isDF() {
		return DF;
	}

	public void setDF(boolean dF) {
		DF = dF;
	}

	public boolean isLG() {
		return LG;
	}

	public void setLG(boolean lG) {
		LG = lG;
	}

	public boolean isLN() {
		return LN;
	}

	public void setLN(boolean lN) {
		LN = lN;
	}

}
