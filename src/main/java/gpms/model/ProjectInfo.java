//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.Date;

//import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

//import org.mongodb.morphia.annotations.Id;

@Embedded
public class ProjectInfo {

	@Property("project title")
	//@Indexed(value = IndexDirection.ASC, name = "proposalTitleIndex", unique = true)
	private String projectTitle;

	@Embedded("project type")
	private ProjectType projectType;

	@Embedded("type of request")
	private TypeOfRequest typeOfRequest;

	@Property("due date")
	private Date dueDate;

	@Embedded("project period")
	private ProjectPeriod projectPeriod;

	@Embedded("location of project")
	private ProjectLocation projectLocation;

	public ProjectInfo() {
		projectTitle = new String();
		projectType = new ProjectType();
		typeOfRequest = new TypeOfRequest();
		dueDate = new Date();
		projectPeriod = new ProjectPeriod();
		projectLocation = new ProjectLocation();
	}

	public String getProjectTitle() {
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

	public ProjectType getProjectType() {
		return projectType;
	}

	public void setProjectType(ProjectType projectType) {
		this.projectType = projectType;
	}

	public TypeOfRequest getTypeOfRequest() {
		return typeOfRequest;
	}

	public void setTypeOfRequest(TypeOfRequest typeOfRequest) {
		this.typeOfRequest = typeOfRequest;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public ProjectPeriod getProjectPeriod() {
		return projectPeriod;
	}

	public void setProjectPeriod(ProjectPeriod projectPeriod) {
		this.projectPeriod = projectPeriod;
	}

	public ProjectLocation getProjectLocation() {
		return projectLocation;
	}

	public void setProjectLocation(ProjectLocation projectLocation) {
		this.projectLocation = projectLocation;
	}

	@Override
	public String toString() {
		String outPut = "";
		outPut += "Project Title       : " + projectTitle + "\n";
		outPut += "Project Type        : " + "\n";
		outPut += projectType.toString() + "\n";
		outPut += "Type Of Request     : " + "\n";
		outPut += typeOfRequest.toString() + "\n";
		outPut += "Due Date            : " + "\n";
		outPut += dueDate.toString() + "\n";
		outPut += "Project Period      : " + "\n";
		outPut += projectPeriod.toString() + "\n";
		outPut += "Location of Project : " + "\n";
		outPut += projectLocation.toString();
		return outPut;
	}

	public boolean equals(ProjectInfo pinf) {
		return this.dueDate.equals(pinf.dueDate)
				&& this.projectLocation.equals(pinf.projectLocation)
				&& this.projectPeriod.equals(pinf.projectPeriod)
				&& this.projectTitle.equals(pinf.projectTitle)
				&& this.projectType.equals(pinf.projectType)
				&& this.typeOfRequest.equals(pinf.typeOfRequest);
	}
	
	@Override
	public ProjectInfo clone()
	{
		ProjectInfo copy = new ProjectInfo();

		copy.setProjectTitle(this.projectTitle);
		copy.setProjectType(this.projectType.clone());
		copy.setTypeOfRequest(this.typeOfRequest.clone());
		copy.setDueDate(new Date(this.dueDate.getTime()));
		copy.setProjectPeriod(this.projectPeriod.clone());
		copy.setProjectLocation(this.projectLocation.clone());
		
		return copy;
	}
}
