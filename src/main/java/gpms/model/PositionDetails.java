//Edited by: Hector C. Ortiz

package gpms.model;

//import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class PositionDetails {
	@Property("position title")
	private String positionTitle = new String();
	@Property("position type")
	private String positionType = new String();
	@Property("department")
	private String department = new String();
	@Property("college")
	private String college = new String();;

	public PositionDetails() {
	}

	public PositionDetails(String positionTitle, String positionType,
			String department, String college) {
		this.positionTitle = positionTitle;
		this.positionType = positionType;
		this.department = department;
		this.college = college;
	}

	public String getPositionTitle() {
		return positionTitle;
	}

	public void setPositionTitle(String positionTitle) {
		this.positionTitle = positionTitle;
	}

	public String getPositionType() {
		return positionType;
	}

	public void setPositionType(String positionType) {
		this.positionType = positionType;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getCollege() {
		return college;
	}

	public void setCollege(String college) {
		this.college = college;
	}

	@Override
	public String toString() {
		String posDet = "Position Title: " + positionTitle + "\n";
		posDet += "Position Type: " + positionType + "\n";
		posDet += "College: " + college + "\n";
		posDet += "Department: " + department + "\n";
		return posDet;
	}

	public boolean equals(PositionDetails pd) {
		return this.positionTitle.equals(pd.positionTitle)
				&& this.positionType.equals(pd.positionType)
				&& this.college.equals(pd.college)
				&& this.department.equals(pd.department);
	}

	@Override
	public PositionDetails clone() {
		return new PositionDetails(this.positionTitle, this.positionType,
				this.department, this.college);
	}
}
