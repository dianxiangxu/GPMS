//Written by: Hector C. Ortiz

package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class TypeOfRequest 
{
	@Property("pre-proposal")
	private boolean isPreProposal;
	@Property("new proposal")
	private boolean isNewProposal;
	@Property("continuation")
	private boolean isContinuation;
	@Property("supplement")
	private boolean isSupplement;

	public TypeOfRequest() 
	{
	}

	public boolean isPreProposal() 
	{
		return isPreProposal;
	}

	public void setPreProposal(boolean isPreProposal)
	{
		this.isPreProposal = isPreProposal;
	}

	public boolean isNewProposal() 
	{
		return isNewProposal;
	}

	public void setNewProposal(boolean isNewProposal)
	{
		this.isNewProposal = isNewProposal;
	}

	public boolean isContinuation() 
	{
		return isContinuation;
	}

	public void setContinuation(boolean isContinuation) 
	{
		this.isContinuation = isContinuation;
	}

	public boolean isSupplement() 
	{
		return isSupplement;
	}

	public void setSupplement(boolean isSupplement)
	{
		this.isSupplement = isSupplement;
	}

	public String toString()
	{
		String outPut = "";
		outPut += "pre-proposal : " + isPreProposal + "\n";
		outPut += "new proposal : " + isNewProposal + "\n";
		outPut += "continuation : " + isContinuation + "\n";
		outPut += "supplement   : " + isSupplement;
		return outPut;
	}
	
	public boolean equals(TypeOfRequest tor)
	{
		return this.isContinuation == tor.isContinuation && this.isNewProposal == tor.isNewProposal
				&& this.isPreProposal == tor.isPreProposal && this.isSupplement == tor.isSupplement;
	}
}
