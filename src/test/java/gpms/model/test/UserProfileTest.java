package gpms.model.test;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import gpms.model.PositionDetails;
import gpms.model.UserProfile;

import org.junit.Test;

public class UserProfileTest
{
	UserProfile up = new UserProfile();
	String fName = "Tom";
	String mName = "Tito";
	String lName = "Perelman";

	@Test
	public void testFirstName() 
	{
		up.setFirstName(fName);
		assertTrue(up.getFirstName().equals(fName));
	}
	
	@Test
	public void testLastName() 
	{
		up.setLastName(lName);
		assertTrue(up.getLastName().equals(lName));
	}
	
	@Test
	public void testMiddleName() 
	{
		up.setMiddleName(mName);
		assertTrue(up.getMiddleName().equals(mName));
	}
	
	@Test
	public void testDetails() 
	{
		List<PositionDetails> pdl = new ArrayList<PositionDetails>();
		pdl.add(new PositionDetails());
		up.setDetails(pdl);
		assertTrue(up.getDetails().equals(pdl));
		
		int count = up.getDetails().size();
		assertTrue(count == 1);			
		
		up.addDetails(new PositionDetails());
		assertTrue((count+1) == up.getDetails().size());
	}
	
	@Test
	public void testPhoneNumbers() 
	{
		List<String> p = new ArrayList<String>();
		p.add("7875430987");
		up.setPhoneNumbers(p);
		assertTrue(up.getPhoneNumbers().equals(p));
		
		int count = up.getPhoneNumbers().size();
		assertTrue(count == 1);			
		
		up.addPhoneNumber("09984848");
		assertTrue((count+1) == up.getPhoneNumbers().size());
	}
	
	@Test
	public void testEmails() 
	{
		List<String> e = new ArrayList<String>();
		e.add("rew@vd.com");
		up.setEmails(e);
		assertTrue(up.getEmails().equals(e));
		
		int count = up.getEmails().size();
		assertTrue(count == 1);			
		
		up.addEmail("mkn@ji.com");
		assertTrue((count+1) == up.getEmails().size());
	}
	
	@Test
	public void testToString()
	{
		String fullName = fName + " " + mName + " " +lName;
		up.setFirstName(fName);
		up.setMiddleName(mName);
		up.setLastName(lName);
		assertTrue(up.toString().equals(fullName));
	}
}