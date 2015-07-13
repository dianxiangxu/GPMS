package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Embedded
public class InvestigatorRefAndPosition {
	@Reference(value = "user profile")
	UserProfile userRef;
	@Property("college")
	private String college = new String();
	@Property("department")
	private String department = new String();
	@Property("position type")
	private String positionType = new String();
	@Property("position title")
	private String positionTitle = new String();

	public InvestigatorRefAndPosition() {

	}

	public InvestigatorRefAndPosition(UserProfile userRef, String college,
			String department, String positionType, String positionTitle) {
		this.userRef = userRef;
		this.college = college;
		this.department = department;
		this.positionType = positionType;
		this.positionTitle = positionTitle;
	}

	public UserProfile getUserRef() {
		return userRef;
	}

	public void setUserRef(UserProfile userRef) {
		this.userRef = userRef;
	}

	public String getCollege() {
		return college;
	}

	public void setCollege(String college) {
		this.college = college;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getPositionType() {
		return positionType;
	}

	public void setPositionType(String positionType) {
		this.positionType = positionType;
	}

	public String getPositionTitle() {
		return positionTitle;
	}

	public void setPositionTitle(String positionTitle) {
		this.positionTitle = positionTitle;
	}

	@Override
	public String toString() {
		String output = "";
		output += "User Reference : " + userRef + "\n";
		output += "College        : " + college + "\n";
		output += "Department     : " + department + "\n";
		output += "Position Type  : " + positionType + "\n";
		output += "Position Title : " + positionTitle;

		return output;
	}

	public boolean equals(InvestigatorRefAndPosition irap) {
		if (this.userRef == null || irap.userRef == null)
			return false;
		return this.userRef.equals(irap.userRef)
				&& this.college.equals(irap.college)
				&& this.department.equals(irap.department)
				&& this.positionType.equals(irap.positionType)
				&& this.positionTitle.equals(irap.positionTitle);
	}

	public InvestigatorRefAndPosition clone() {
		InvestigatorRefAndPosition copy = new InvestigatorRefAndPosition();
		copy.setUserRef(userRef);
		copy.setCollege(college);
		copy.setDepartment(department);
		copy.setPositionType(positionType);
		copy.setPositionTitle(positionTitle);
		return copy;
	}
}