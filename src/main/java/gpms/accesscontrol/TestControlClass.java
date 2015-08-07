package gpms.accesscontrol;

public class TestControlClass 
{
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Accesscontrol ac = new Accesscontrol();
		Accesscontrol.initBalana();
		String decision = ac.getXACMLdecision("Admin", "UserProfile","edi");
		System.out.println(decision);
	}


}
