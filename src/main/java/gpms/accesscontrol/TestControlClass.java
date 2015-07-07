package gpms.accesscontrol;

import org.wso2.balana.Balana;
import org.wso2.balana.ctx.AbstractResult;

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
