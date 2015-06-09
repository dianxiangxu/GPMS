//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.Date;

//import org.bson.types.ObjectId;

import org.mongodb.morphia.annotations.Embedded;
//import com.google.code.morphia.annotations.Id;

@Embedded
public class ProjectInfo
{
	private String projectTitle;
	// private ArrayList<ProjectType> _projectType;
	@Embedded
	private ProjectType projectType;
	// private ArrayList<RequestType> _requestType;
	@Embedded
	private TypeOfRequest typeOfRequest;
	private Date dueDate;
	// private ArrayList<ProjectPeriod> _projectPeriod;
	@Embedded
	private ProjectPeriod projectPeriod;
	// private ArrayList<ProjectLocation> _projectLocation;
	//private boolean _offCampus;
	private boolean onCampus;
	
	public ProjectInfo()
	{}

	public String getProjectTitle() 
	{
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) 
	{
		this.projectTitle = projectTitle;
	}

	// public ArrayList<ProjectType> get_projectType() {
	// return _projectType;
	// }
	//
	// public void set_projectType(ArrayList<ProjectType> _projectType) {
	// this._projectType = _projectType;
	// }
	
	public void setProjectType(ProjectType projectType)
	{
		this.projectType = projectType;
	}
	
	public ProjectType getProjectType()
	{
		return projectType;
	}

	//
	// public ArrayList<RequestType> get_requestType() {
	// return _requestType;
	// }
	//
	// public void set_requestType(ArrayList<RequestType> _requestType) {
	// this._requestType = _requestType;
	// }
	
	public void setTypeOfRequest(TypeOfRequest typeOfRequest)
	{
		this.typeOfRequest = typeOfRequest;
	}
	
	public TypeOfRequest getTypeOfRequest()
	{
		return typeOfRequest;
	}

	public Date getDueDate() 
	{
		return dueDate;
	}

	public void setDueDate(Date dueDate) 
	{
		this.dueDate = dueDate;
	}

	// public ArrayList<ProjectPeriod> get_projectPeriod() {
	// return _projectPeriod;
	// }
	//
	// public void set_projectPeriod(ArrayList<ProjectPeriod> _projectPeriod) {
	// this._projectPeriod = _projectPeriod;
	// }

	public void setProjectPeriod(ProjectPeriod projectPeriod)
	{
		this.projectPeriod = projectPeriod;
	}
	
	public ProjectPeriod getProjectPeriod()
	{
		return projectPeriod;
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

	public boolean isOnCampus() 
	{
		return onCampus;
	}

	public void setIsOnCampus(boolean onCampus) 
	{
		this.onCampus = onCampus;
	}
}
