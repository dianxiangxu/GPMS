package gpms.accesscontrol;


public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Accesscontrol ac = new Accesscontrol();
		Accesscontrol.initBalana();
		String decision = ac.getXACMLdecision("Faculty", "Proposal", "Create");
		System.out.println(decision);
	}

}
