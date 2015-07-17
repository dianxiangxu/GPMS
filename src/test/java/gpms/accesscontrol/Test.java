package gpms.accesscontrol;


public class Test
{
	/**
	 * @param args
	 */
	public static void main(String[] args)
	{
		// TODO Auto-generated method stub
		Accesscontrol ac = new Accesscontrol();
		Accesscontrol.initBalana();
		
		//ac.getXACMLdecision("Tenured", "Proposal", "Create");
		//ac.getXACMLdecision("Research Staff", "Proposal", "Create");
		//ac.getXACMLdecision("Tenured", "Proposal", "Delete");
		//ac.getXACMLdecision("PI", "Proposal", "Delete");
		//ac.getXACMLdecision("PI", "Co-PI-List", "Edit");
		//ac.getXACMLdecision("PI", "Co-PI-List", "View");
		//ac.getXACMLdecision("Co-PI", "Co-PI-List", "Edit");
		//ac.getXACMLdecision("Co-PI", "Co-PI-List", "View");
		//ac.getXACMLdecision("Senior-Personnel", "Co-PI-List", "Edit");
		//ac.getXACMLdecision("Senior-Personnel", "Co-PI-List", "View");
		//ac.getXACMLdecision("PI", "Senior-Personnel-List", "View");
		//ac.getXACMLdecision("PI", "Senior-Personnel-List", "View");
		//ac.getXACMLdecision("Co-PI", "Senior-Personnel-List", "Edit");
		//ac.getXACMLdecision("Co-PI", "Senior-Personnel-List", "View");
		//ac.getXACMLdecision("Senior-Personnel", "Senior-Personnel-List", "Edit");
		//ac.getXACMLdecision("Senior-Personnel", "Senior-Personnel-List", "View");
		//ac.getXACMLdecision("PI", "Project-Info", "View");
		ac.getXACMLdecision("PI", "Project-Info", "Edit");
		//ac.getXACMLdecision("Co-PI", "Project-Info", "View");
		//ac.getXACMLdecision("Co-PI", "Project-Info", "Edit");
		//ac.getXACMLdecision("Senior-Personnel", "Project-Info", "View");
		//ac.getXACMLdecision("Research-Administrator", "OSP-Section", "Edit");
		
		//String decision = ac.getXACMLdecision("PI", "Project-Info", "View");
		//System.out.println(decision);
	}
}
