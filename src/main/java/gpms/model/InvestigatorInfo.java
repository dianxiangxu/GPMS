//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.ArrayList;

//import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Reference;

@Embedded
public class InvestigatorInfo {
	@Reference("PI")
	private UserProfile pi;
	@Reference("CO-PI")
	private ArrayList<UserProfile> co_pi = new ArrayList<UserProfile>();
	@Reference("senior personnel")
	private ArrayList<UserProfile> seniorPersonnel = new ArrayList<UserProfile>();

	public InvestigatorInfo() {
	}

	public UserProfile getPi() {
		return pi;
	}

	public void setPi(UserProfile pi) {
		this.pi = pi;
	}

	public ArrayList<UserProfile> getCo_pi() {
		return co_pi;
	}

	public void setCo_pi(ArrayList<UserProfile> co_pi) {
		this.co_pi = co_pi;
	}

	public void addCo_pi(UserProfile co_pi) {
		this.co_pi.add(co_pi);
	}

	public ArrayList<UserProfile> getSeniorPersonnel() {
		return seniorPersonnel;
	}

	public void addSeniorPersonnel(UserProfile seniorPersonnel) {
		this.seniorPersonnel.add(seniorPersonnel);
	}

	public void setSeniorPersonnel(ArrayList<UserProfile> seniorPersonnel) {
		this.seniorPersonnel = seniorPersonnel;
	}

}
