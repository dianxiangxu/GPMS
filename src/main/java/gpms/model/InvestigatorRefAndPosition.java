package gpms.model;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;

@Embedded
public class InvestigatorRefAndPosition
{
	
	ObjectId id;
	private String college = new String();
	private String department = new String();
	private String positionTitle = new String();
	private String positionType = new String();
	
	public InvestigatorRefAndPosition() 
	{
		super();
	}
	
	public InvestigatorRefAndPosition(ObjectId id, String college,String department, String positionTitle, String positionType) 
	{
		super();
		this.id = id;
		this.college = college;
		this.department = department;
		this.positionTitle = positionTitle;
		this.positionType = positionType;
	}

	public ObjectId getId() 
	{
		return id;
	}
	
	public void setId(ObjectId id) 
	{
		this.id = id;
	}
	
	public String getCollege() 
	{
		return college;
	}
	
	public void setCollege(String college) 
	{
		this.college = college;
	}
	
	public String getDepartment()
	{
		return department;
	}
	
	public void setDepartment(String department) 
	{
		this.department = department;
	}
	
	public String getPositionTitle() 
	{
		return positionTitle;
	}
	
	public void setPositionTitle(String positionTitle)
	{
		this.positionTitle = positionTitle;
	}
	
	public String getPositionType() 
	{
		return positionType;
	}
	
	public void setPositionType(String positionType) 
	{
		this.positionType = positionType;
	}

	@Override
	public String toString() 
	{
		String output = "";
		output += "Id             : " + id + "\n";
		output += "College        : " + college + "\n";
		output += "Department     : " + department + "\n";
		output += "Position Title : " + positionTitle + "\n";
		output += "Position Type  : " + positionType;
		return output;
	}
	
	public boolean equals(InvestigatorRefAndPosition irap)
	{
		if(this.id == null || irap.id == null)
			return false;
		return this.id.equals(irap.id) && this.college.equals(irap.college)
				&& this.department.equals(irap.department) && this.positionTitle.equals(irap.positionTitle)
				&& this.positionType.equals(irap.positionType);
	}
	
	public InvestigatorRefAndPosition clone()
	{
		InvestigatorRefAndPosition copy = new InvestigatorRefAndPosition();
		copy.setId(id);
		copy.setCollege(college);
		copy.setDepartment(department);
		copy.setPositionTitle(positionTitle);
		copy.setPositionType(positionType);
		return copy;
	}
}