package gpms.model;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;

/**
 * 
 * @author shaines
 */
@Entity
public class Family {
	@Id
	private ObjectId id;

	private String surname;

	@Reference
	private User dad;

	@Reference
	private User mom;

	@Reference
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

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
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