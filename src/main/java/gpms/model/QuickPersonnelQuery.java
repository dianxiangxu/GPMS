package gpms.model;

import org.bson.types.ObjectId;

/**
 * This class is used to build a quick object used along with the 
 * Supervisory Personnel Search from the ProposalDAO Class
 * it should return a format of ID, Name
 * 
 * @author Thomas Volz
 *
 */



public class QuickPersonnelQuery 
{
	ObjectId personnelID=null;
	String personnelName="";
	
	/**
	 * Constructor
	 */
	public QuickPersonnelQuery()
	{
		
	}
	
	/**
	 * Parameterized constructor
	 * @param id id of the person
	 * @param name of the person
	 */
	public QuickPersonnelQuery(ObjectId id, String name)
	{
		
	}
	
	/**
	 * 
	 * @param id sets the id of this object
	 */
	public void setID(ObjectId id)
	{
		personnelID = id;
	}
	
	/**
	 * 
	 * @return the ID
	 */
	public ObjectId getID()
	{
		return personnelID;
	}
	
	/**
	 * 
	 * @param name sets the name of this object by concatenating first and last name
	 */
	public void setName(String firstName, String lastName)
	{
		personnelName = firstName+" "+lastName;
	}
	
	/**
	 * 
	 * @return the name of this object
	 */
	public String getName()
	{
		return personnelName;
	}
	
	/**
	 * @return A string of id, Name
	 */
	public String toString()
	{
		String personnelString = personnelID.toString()+ " " +personnelName;
		
		return personnelString;
	}

}
