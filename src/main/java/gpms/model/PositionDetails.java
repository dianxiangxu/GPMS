//Edited by: Hector C. Ortiz

package gpms.model;

//import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Embedded;

@Embedded
public class PositionDetails
{
	private String position_type;
	private String position_title;
	private String department;
	private String college;

	public String get_position_type() 
	{
		return position_type;
	}

	public void set_position_type(String position_type) 
	{
		this.position_type = position_type;
	}

	public String get_position_title() 
	{
		return position_title;
	}

	public void set_position_title(String position_title) 
	{
		this.position_title = position_title;
	}

	public String get_department() 
	{
		return department;
	}

	public void set_department(String department) 
	{
		this.department = department;
	}

	public String get_college() 
	{
		return college;
	}

	public void set_college(String college) 
	{
		this.college = college;
	}

}
