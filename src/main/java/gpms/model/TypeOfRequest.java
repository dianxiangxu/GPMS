//Written by: Hector C. Ortiz

package gpms.model;

import org.mongodb.morphia.annotations.Embedded;

@Embedded
public class TypeOfRequest 
{
	private boolean isPreProposal;
	private boolean isNewProposal;
	private boolean isContinuation;
	private boolean isSupplement;
	
	public TypeOfRequest()
	{}
	
	public void setIsPreProposal(boolean isPreProposal)
	{
		this.isPreProposal = isPreProposal;
	}
	
	public boolean getIsPreProposal()
	{
		return isPreProposal;
	}
	
	public void setIsNewProposal(boolean isNewProposal)
	{
		this.isNewProposal = isNewProposal;
	}
	
	public boolean getIsNewProposal()
	{
		return isNewProposal;
	}
	
	public void setIsContinuation(boolean isContinuation)
	{
		this.isContinuation = isContinuation;
	}
	
	public boolean getIsContinuation()
	{
		return isContinuation;
	}
	
	public void setIsSupplement(boolean isSupplement)
	{
		this.isSupplement = isSupplement;
	}
	
	public boolean getIsSupplement()
	{
		return isSupplement;
	}
}
