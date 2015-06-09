//Edited by: Hector C. Ortiz

package gpms.model;

import java.util.ArrayList;
//import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Embedded
public class InvestigatorInfo {
	private final int max_co_pi_num = 4;
	private final int max_senior_personnel_num = 10;

	@Reference("PI")
	private UserAccount pi;
	@Reference("CO-PI")
	private ArrayList<UserAccount> co_pi;
	@Reference("senior personnel")
	private ArrayList<UserAccount> seniorPersonnel;

	public InvestigatorInfo() {
	}

	public UserAccount get_pi() {
		return pi;
	}

	public void set_pi(UserAccount pi) {
		this.pi = pi;
	}

	public ArrayList<UserAccount> get_co_pi() {
		return co_pi;
	}

	public void add_co_pi(UserAccount co_pi) {
		if (this.co_pi.size() <= max_co_pi_num) {
			this.co_pi.add(co_pi);
		}
	}

	public void set_co_pi(ArrayList<UserAccount> co_pi) {
		if (co_pi.size() <= max_co_pi_num) {
			this.co_pi = co_pi;
		}
	}

	public ArrayList<UserAccount> get_senior_personnel() {
		return seniorPersonnel;
	}

	public void add_senior_personnel(UserAccount senior_personnel) {
		if (this.seniorPersonnel.size() <= max_senior_personnel_num) {
			this.seniorPersonnel.add(senior_personnel);
		}
	}

	public void set_senior_personnel(ArrayList<UserAccount> senior_personnel) {
		if (senior_personnel.size() <= max_senior_personnel_num) {
			this.seniorPersonnel = senior_personnel;
		}
	}
}
