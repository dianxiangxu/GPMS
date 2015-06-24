package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class Address {
	@Property("country")
	private String country;
	@Property("state")
	private String state;
	@Property("zipcode")
	private String zipcode;
	@Property("city")
	private String city;
	@Property("street")
	private String street;

	public Address() {
		country = "";
		state = "";
		zipcode = "";
		city = "";
		street = "";
	}

	public Address(String setCountry, String setState, String setZipcode,
			String setCity, String setStreet) {
		country = setCountry;
		state = setState;
		zipcode = setZipcode;
		city = setCity;
		street = setStreet;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}
	
	public String toString()
	{
		String output = "";
		output += "country : " + country + "\n";
		output += "state   : " + state   + "\n";
		output += "zipcode : " + zipcode + "\n";
		output += "city    : " + city    + "\n";
		output += "street  : " + street  + "\n";
		
		return output;
	}
	
	public boolean equals(Address address)
	{
		return this.country.equals(address.country) && this.state.equals(address.state)
				&& this.zipcode.equals(address.zipcode) && this.city.equals(address.city)
				&& this.street.equals(address.street);
	}
	
	public Address clone()
	{
		return new Address(this.country, this.state, this.zipcode, this.city, this.street);
	}
}
