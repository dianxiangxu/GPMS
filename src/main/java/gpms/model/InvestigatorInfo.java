//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.ArrayList;

//import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Reference;

@Embedded
public class InvestigatorInfo {
	public final int MAX_NUM_CO_PI = 4;
	public final int MAX_NUM_SENIOR_PERSONNEL = 10;

	@Reference(value = "PI", lazy = true)
	private UserProfile pi = new UserProfile();
	@Reference(value = "CO-PI", lazy = true)
	private ArrayList<UserProfile> co_pi = new ArrayList<UserProfile>();
	@Reference(value = "senior personnel", lazy = true)
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
		if (co_pi.size() <= MAX_NUM_CO_PI) {
			this.co_pi = co_pi;
		}
	}

	public void addCo_pi(UserProfile co_pi) {
		if (this.co_pi.size() < MAX_NUM_CO_PI)
			this.co_pi.add(co_pi);
	}

	public ArrayList<UserProfile> getSeniorPersonnel() {
		return seniorPersonnel;
	}

	public void addSeniorPersonnel(UserProfile seniorPersonnel) {
		if (this.seniorPersonnel.size() < MAX_NUM_SENIOR_PERSONNEL) {
			this.seniorPersonnel.add(seniorPersonnel);
		}
	}

	public void setSeniorPersonnel(ArrayList<UserProfile> seniorPersonnel) {
		if (seniorPersonnel.size() <= MAX_NUM_SENIOR_PERSONNEL) {
			this.seniorPersonnel = seniorPersonnel;
		}
	}

	public String toString() {
		int count = 0;
		String outPut = "";
		outPut += "PI               : " + "\n";
		outPut += pi.toString() + "\n";
		outPut += "CO-PI            : " + "\n";
		for (UserProfile coPi : co_pi) {
			outPut += "Co-Pi number : " + count + "\n";
			outPut += coPi.toString() + "\n";
			count++;
		}
		count = 0;
		outPut += "senior personnel : " + "\n";
		for (UserProfile sp : seniorPersonnel) {
			outPut += "Senior Personel number : " + count + "\n";
			outPut += sp.toString() + "\n";
			count++;
		}
		return outPut;
	}

	public boolean equals(InvestigatorInfo invInf) {
		return this.pi.equals(invInf.pi) && this.co_pi.equals(invInf.co_pi)
				&& this.seniorPersonnel.equals(invInf.seniorPersonnel);
	}

}
