//Written by: Hector C. Ortiz

package gpms.model;

import org.mongodb.morphia.annotations.Embedded;

@Embedded
public class UniversityCommitments 
{
	private boolean new_renovated_facilities_required;
	private boolean rental_space_required;
	
	public UniversityCommitments()
	{}
	
	public void set_new_renovated_facilities_required(boolean new_renovated_facilities_required)
	{
		this.new_renovated_facilities_required = new_renovated_facilities_required;
	}
	
	public boolean get_new_renovated_facilities_required()
	{
		return new_renovated_facilities_required;
	}
	
	public void set_rental_space_required(boolean rental_space_required)
	{
		this.rental_space_required = rental_space_required;
	}
	
	public boolean get_rental_space_required()
	{
		return rental_space_required;
	}
}
