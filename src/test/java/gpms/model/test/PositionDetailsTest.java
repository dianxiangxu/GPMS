package gpms.model.test;

import static org.junit.Assert.assertTrue;
import gpms.model.PositionDetails;

import org.junit.Test;

public class PositionDetailsTest 
{
	PositionDetails pd = new PositionDetails();
	
	@Test
	public void testEquality() 
	{
		PositionDetails pdt = new PositionDetails();
		assertTrue(pd.equals(pdt));
	}
	
	@Test
	public void testPositionType() 
	{
		pd.setPositionType("Professor");
		assertTrue(pd.getPositionType().equals("Professor"));
	}
	
	@Test
	public void testPositionTitle() 
	{
		pd.setPositionTitle("Renouned");
		assertTrue(pd.getPositionTitle().equals("Renouned"));
	}
	
	@Test
	public void testDepartment() 
	{
		pd.setDepartment("Computer Science");
		assertTrue(pd.getDepartment().equals("Computer Science"));
	}
	
	@Test
	public void testCollege() 
	{
		pd.setCollege("Engineering");
		assertTrue(pd.getCollege().equals("Engineering"));
	}
}
