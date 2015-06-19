package gpms.model;

import gpms.dao.BaseEntity;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

/**
 * 
 * @author shaines
 */
@Entity("What Name Faamily")
public class Family extends BaseEntity {
	@Property("Sur Name")
	private String surname;

	@Reference(value = "Dad", lazy = true)
	private User dad;

	@Reference(value = "Mommy", lazy = true)
	private User mom;

	@Reference(value = "Children", lazy = true)
	private List<User> children = new ArrayList<User>();

	public Family() {
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public User getDad() {
		return dad;
	}

	public void setDad(User dad) {
		this.dad = dad;
	}

	public User getMom() {
		return mom;
	}

	public void setMom(User mom) {
		this.mom = mom;
	}

	public List<User> getChildren() {
		return children;
	}
}