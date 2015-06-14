package gpms.model;

import gpms.dao.BaseEntity;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.utils.IndexDirection;

@Entity
public class TestClass extends BaseEntity {
	@Property("Age")
	private int age;
	@Property("Name")
	@Indexed(value = IndexDirection.ASC, name = "testName")
	private String name;
	@Property("Surname")
	private String surname;
	@Property("Email")
	@Indexed(value = IndexDirection.ASC, name = "testEmail", unique = true)
	private String email;
	@Property("Is Completed")
	private Boolean isCompleted = false;

	@Override
	public boolean equals(Object arg0) {
		if (!(arg0 instanceof TestClass)) {
			return false;
		}

		TestClass that = (TestClass) arg0;

		// Custom equality check here.
		return this.email.equals(that.email) && this.name.equals(that.name);
	}

	@Override
	public int hashCode() {
		int hashCode = 1;

		hashCode = hashCode * 37 + this.email.hashCode();
		hashCode = hashCode * 37 + this.name.hashCode();

		return hashCode;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getCompleted() {
		return isCompleted;
	}

	public void setCompleted(Boolean completed) {
		this.isCompleted = completed;
	}

	@Override
	public String toString() {
		return this.getName() + " " + this.getSurname() + " is "
				+ this.getAge() + " years old.";
	}
}
