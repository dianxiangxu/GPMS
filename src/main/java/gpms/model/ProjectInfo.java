//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.Date;

//import org.bson.types.ObjectId;

import com.google.code.morphia.annotations.Embedded;
//import com.google.code.morphia.annotations.Id;

@Embedded
public class ProjectInfo
{
	private String project_title;
	// private ArrayList<ProjectType> _projectType;
	@Embedded
	private ProjectType project_type;
	// private ArrayList<RequestType> _requestType;
	@Embedded
	private TypeOfRequest type_of_request;
	private Date due_date;
	// private ArrayList<ProjectPeriod> _projectPeriod;
	@Embedded
	private ProjectPeriod project_period;
	// private ArrayList<ProjectLocation> _projectLocation;
	//private boolean _offCampus;
	private boolean on_campus;
	
	public ProjectInfo()
	{}

	public String get_project_title() 
	{
		return project_title;
	}

	public void set_project_title(String project_title) 
	{
		this.project_title = project_title;
	}

	// public ArrayList<ProjectType> get_projectType() {
	// return _projectType;
	// }
	//
	// public void set_projectType(ArrayList<ProjectType> _projectType) {
	// this._projectType = _projectType;
	// }
	
	public void set_project_type(ProjectType project_type)
	{
		this.project_type = project_type;
	}
	
	public ProjectType get_project_type()
	{
		return project_type;
	}

	//
	// public ArrayList<RequestType> get_requestType() {
	// return _requestType;
	// }
	//
	// public void set_requestType(ArrayList<RequestType> _requestType) {
	// this._requestType = _requestType;
	// }
	
	public void set_type_of_request(TypeOfRequest type_of_request)
	{
		this.type_of_request = type_of_request;
	}
	
	public TypeOfRequest get_type_of_request()
	{
		return type_of_request;
	}

	public Date get_due_date() 
	{
		return due_date;
	}

	public void set_due_date(Date due_date) 
	{
		this.due_date = due_date;
	}

	// public ArrayList<ProjectPeriod> get_projectPeriod() {
	// return _projectPeriod;
	// }
	//
	// public void set_projectPeriod(ArrayList<ProjectPeriod> _projectPeriod) {
	// this._projectPeriod = _projectPeriod;
	// }

	public void set_project_period(ProjectPeriod project_period)
	{
		this.project_period = project_period;
	}
	
	public ProjectPeriod get_project_period()
	{
		return project_period;
	}

	// public ArrayList<ProjectLocation> get_projectLocation() {
	// return _projectLocation;
	// }
	//
	// public void set_projectLocation(ArrayList<ProjectLocation>
	// _projectLocation) {
	// this._projectLocation = _projectLocation;
	// }

//	public boolean is_off_campus() {
//		return off_campus;
//	}
//
//	public void set_off_campus(boolean off_campus) {
//		this.off_campus = off_campus;
//	}

	public boolean is_on_campus() 
	{
		return on_campus;
	}

	public void set_on_campus(boolean on_campus) 
	{
		this.on_campus = on_campus;
	}
}
