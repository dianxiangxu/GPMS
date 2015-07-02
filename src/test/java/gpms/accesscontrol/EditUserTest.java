package gpms.accesscontrol;

public class EditUserTest {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Accesscontrol ac = new Accesscontrol();
		ac.initBalana();
		String decision = ac.getXACMLdecision("Admin", "Edit","AllowsStaffView");
		System.out.println(decision);
	}

}
