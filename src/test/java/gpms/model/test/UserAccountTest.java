package gpms.model.test;

import static org.junit.Assert.*;
import gpms.model.UserAccount;

import org.junit.Test;

public class UserAccountTest 
{
	UserAccount ua = new UserAccount("Calembo", "cccaaa");
	
//	@Test
//	public void testId() 
//	{	
//		ObjectId id = ua.getId();
//		System.out.println(id.toString());
//		System.out.println(ua.getId().toString());
//		assertTrue(ua.getId().equals(id));
//	}
	
	@Test
	public void testUserName() 
	{	
		assertTrue(ua.getUserName().equals("Calembo"));
	}
	
	@Test
	public void testPassword() 
	{
		assertTrue(ua.getPassword().equals("cccaaa"));
	}
}
