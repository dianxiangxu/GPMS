//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.ArrayList;

//import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Reference;

@Embedded
public class InvestigatorInfo {
	private static final int MAX_CO_PI_NUM = 4;
	private static final int MAX_SENIOR_PERSONNEL_NUM = 10;
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

	// TODO: family.getChildren().add(son); can't we do like this?
	public void addCo_pi(UserProfile co_pi) {
		if (this.co_pi.size() <= MAX_CO_PI_NUM) {
			this.co_pi.add(co_pi);
		}
	}

	public ArrayList<UserProfile> getSeniorPersonnel() {
		return seniorPersonnel;
	}

	public void addSeniorPersonnel(UserProfile seniorPersonnel) {
		if (this.seniorPersonnel.size() <= MAX_SENIOR_PERSONNEL_NUM) {
			this.seniorPersonnel.add(seniorPersonnel);
		}
	}

	public void setSeniorPersonnel(ArrayList<UserProfile> seniorPersonnel) {
		if (seniorPersonnel.size() <= MAX_SENIOR_PERSONNEL_NUM) {
			this.seniorPersonnel = seniorPersonnel;
		}
	}

}
