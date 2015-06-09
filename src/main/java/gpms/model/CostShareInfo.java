//Written by: Hector C. Ortiz

package gpms.model;

import com.google.code.morphia.annotations.Embedded;

@Embedded
public class CostShareInfo
{
	boolean institutional_committed_cost_share_included;
	boolean third_party_committed_cost_share_included;
	
	public CostShareInfo()
	{}
	
	public void set_institutional_committed_cost_share_included(boolean institutional_committed_cost_share_included)
	{
		this.institutional_committed_cost_share_included = institutional_committed_cost_share_included;
	}
	
	public boolean get_institutional_committed_cost_share_included()
	{
		return institutional_committed_cost_share_included;
	}
	
	public void set_third_party_committed_cost_share_included(boolean third_party_committed_cost_share_included)
	{
		this.third_party_committed_cost_share_included = third_party_committed_cost_share_included;
	}
	
	public boolean get_third_party_committed_cost_share_included()
	{
		return third_party_committed_cost_share_included;
	}
}
