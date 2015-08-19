//Written by: Hector C. Ortiz

package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

import com.google.gson.annotations.Expose;

@Embedded
public class TypeOfRequest {
	@Expose
	@Property("pre-proposal")
	private boolean isPreProposal;
	
	@Expose
	@Property("new proposal")
	private boolean isNewProposal;
	
	@Expose
	@Property("continuation")
	private boolean isContinuation;
	
	@Expose
	@Property("supplement")
	private boolean isSupplement;

	public TypeOfRequest() {
	}

	public boolean isPreProposal() {
		return isPreProposal;
	}

	public void setPreProposal(boolean isPreProposal) {
		this.isPreProposal = isPreProposal;
	}

	public boolean isNewProposal() {
		return isNewProposal;
	}

	public void setNewProposal(boolean isNewProposal) {
		this.isNewProposal = isNewProposal;
	}

	public boolean isContinuation() {
		return isContinuation;
	}

	public void setContinuation(boolean isContinuation) {
		this.isContinuation = isContinuation;
	}

	public boolean isSupplement() {
		return isSupplement;
	}

	public void setSupplement(boolean isSupplement) {
		this.isSupplement = isSupplement;
	}

	@Override
	public String toString() {
		String outPut = "";
		outPut += "pre-proposal : " + isPreProposal + "\n";
		outPut += "new proposal : " + isNewProposal + "\n";
		outPut += "continuation : " + isContinuation + "\n";
		outPut += "supplement   : " + isSupplement;
		return outPut;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (isContinuation ? 1231 : 1237);
		result = prime * result + (isNewProposal ? 1231 : 1237);
		result = prime * result + (isPreProposal ? 1231 : 1237);
		result = prime * result + (isSupplement ? 1231 : 1237);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TypeOfRequest other = (TypeOfRequest) obj;
		if (isContinuation != other.isContinuation)
			return false;
		if (isNewProposal != other.isNewProposal)
			return false;
		if (isPreProposal != other.isPreProposal)
			return false;
		if (isSupplement != other.isSupplement)
			return false;
		return true;
	}

	@Override
	public TypeOfRequest clone() throws CloneNotSupportedException {
		TypeOfRequest copy = new TypeOfRequest();

		copy.setContinuation(this.isContinuation);
		copy.setNewProposal(this.isNewProposal);
		copy.setPreProposal(this.isPreProposal);
		copy.setSupplement(this.isSupplement);

		return copy;
	}

}
