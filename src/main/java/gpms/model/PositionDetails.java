//Edited by: Hector C. Ortiz

package gpms.model;

//import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class PositionDetails 
{
	@Property("position type")
	private String positionType;
	@Property("position title")
	private String positionTitle;
	@Property("department")
	private String department;
	@Property("college")
	private String college;
	
	public PositionDetails()
	{
		positionType = new String();
		positionTitle = new String();
		department = new String();
		college = new String();
	}
	
	PositionDetails(String positionType, String positionTitle, String department, String college)
	{
		this.positionType = positionType;
		this.positionTitle = positionTitle;
		this.department = department;
		this.college = college;
	}

	public String getPositionType() 
	{
		return positionType;
	}

	public void setPositionType(String positionType) 
	{
		this.positionType = positionType;
	}

	public String getPositionTitle()
	{
		return positionTitle;
	}

	public void setPositionTitle(String positionTitle) 
	{
		this.positionTitle = positionTitle;
	}

	public String getDepartment() 
	{
		return department;
	}

	public void setDepartment(String department)
	{
		this.department = department;
	}

	public String getCollege() 
	{
		return college;
	}

	public void setCollege(String college) 
	{
		this.college = college;
	}

	public String toString()
	{
		String posDet = "Position Title : " + positionTitle + "\n";
			   posDet +="PositionType   : " + positionType + "\n";
			   posDet +="College        : " + college + "\n";
			   posDet +="Department     : " + department + "\n";
		return posDet;
	}
	
	public boolean equals(PositionDetails pd)
	{
		return this.positionType.equals(pd.positionType) && this.positionTitle.equals(pd.positionTitle)
				&& this.college.equals(pd.college) && this.department.equals(pd.department);
	}
}
