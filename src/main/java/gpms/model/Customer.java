package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;

import java.util.List;

@Entity("customer")
public class Customer extends BaseEntity {
	private String name;
	private List<Account> accounts;
	@Embedded
	private IndianAddress address;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<Account> accounts) {
		this.accounts = accounts;
	}

	public IndianAddress getAddress() {
		return address;
	}

	public void setAddress(IndianAddress address2) {
		this.address = address2;
	}

	@Override
	public String toString() {
		return name + " lives @ " + address.getPostcode();
	}
}
