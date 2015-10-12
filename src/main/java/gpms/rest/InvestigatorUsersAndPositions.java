package gpms.rest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.common.collect.LinkedListMultimap;
import com.google.common.collect.Multimap;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_NULL)
@JsonSerialize(as = InvestigatorUsersAndPositions.class)
@JsonDeserialize(as = InvestigatorUsersAndPositions.class)
public class InvestigatorUsersAndPositions {
	@JsonProperty
	private String id;
	@JsonProperty
	private String fullName;
	@JsonProperty
	private String mobileNumber = new String();
	@JsonProperty
	private Multimap<String, Multimap<String, Multimap<String, String>>> positions = LinkedListMultimap
			.create();

	public InvestigatorUsersAndPositions() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public Multimap<String, Multimap<String, Multimap<String, String>>> getPositions() {
		return positions;
	}

	public void setPositions(
			Multimap<String, Multimap<String, Multimap<String, String>>> ht) {
		this.positions = ht;
	}

}
