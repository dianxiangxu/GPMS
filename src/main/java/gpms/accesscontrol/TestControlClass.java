package gpms.accesscontrol;

public class TestControlClass 
{
	/**
	 * @param args
	 * @throws Exception 
	 */
	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		Accesscontrol ac = new Accesscontrol();
		Accesscontrol.initBalana();
		//if listOfAdmin.contains(user)
		//string isAdmin="Admin"
		//else isAdmin="Non"
		String decision = ac.getXACMLdecision("Admin", "UserProfile","edi");
		System.out.println(decision);
	}


}
