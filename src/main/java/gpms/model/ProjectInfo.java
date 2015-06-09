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
	private String projectTitle;

	@Embedded
	@Property("project type")
	private ProjectType projectType;

	@Embedded
	@Property("type of request")
	private TypeOfRequest typeOfRequest;

	@Property("due date")
	private Date dueDate;

	@Embedded
	@Property("project period")
	private ProjectPeriod projectPeriod;

	@Embedded
	@Property("location of project")
	private ProjectLocation projectLocation;

	public ProjectInfo() {
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

}
