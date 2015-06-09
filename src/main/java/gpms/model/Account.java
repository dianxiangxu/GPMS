package gpms.model;

import org.mongodb.morphia.annotations.Entity;

import gpms.dao.BaseEntity;

@Entity
public class Account extends BaseEntity {
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


}
