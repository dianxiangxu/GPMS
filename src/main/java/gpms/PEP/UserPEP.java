package gpms.PEP;


/**
 * @author Thomas Volz
 * 
 */
import gpms.dao.UserAccountDAO;
import gpms.dao.UserProfileDAO;
import gpms.model.UserAccount;
import gpms.model.UserProfile;


public class UserPEP 
{
	UserAccount loggedAccount;
	UserProfile loggedProfile;
	UserAccountDAO account;
	UserProfileDAO profile;
	
	public UserPEP()
	{
		account = new UserAccountDAO(null, null, null);
		profile = new UserProfileDAO(null,null,null);
	}
	
//	public findAllUserAccounts() 
//	{
//		return 
//	}
//
//	public UserAccount findByID(ObjectId id) 
//	{
//		
//	}
//	public UserAccount findByUserName(String userName) 
//	{
//		
//	}

}
