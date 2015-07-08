package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class Address {
	@Property("street")
	private String street = new String();
	@Property("city")
	private String city = new String();
	@Property("state")
	private String state = new String();
	@Property("zipcode")
	private String zipcode = new String();
	@Property("country")
	private String country = new String();

	public Address() {

	}

	public Address(String setStreet, String setCity, String setState,
			String setZipcode, String setCountry) {
		street = setStreet;
		city = setCity;
		state = setState;
		zipcode = setZipcode;
		country = setCountry;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	@Override
	public String toString() {
		String output = "";
		output += "street  : " + street + "\n";
		output += "city    : " + city + "\n";
		output += "state   : " + state + "\n";
		output += "zipcode : " + zipcode + "\n";
		output += "country : " + country + "\n";
		return output;
	}

	public boolean equals(Address address) {
		return this.country.equals(address.street)
				&& this.state.equals(address.city)
				&& this.zipcode.equals(address.state)
				&& this.city.equals(address.zipcode)
				&& this.street.equals(address.country);
	}

	@Override
	public Address clone() {
		return new Address(this.street, this.city, this.state, this.zipcode,
				this.country);
	}
}
