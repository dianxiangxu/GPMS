package gpms.model;

import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Reference;

public class InvestigatorInfo extends Proposal {
	private ObjectId _id;
	@Reference
	private User _pi;
	@Reference
	private ArrayList<User> _copi;
	@Reference
	private ArrayList<User> _seniorPersonnel;

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public User get_pi() {
		return _pi;
	}

	public void set_pi(User _pi) {
		this._pi = _pi;
	}

	public ArrayList<User> get_copi() {
		return _copi;
	}

	public void set_copi(ArrayList<User> _copi) {
		this._copi = _copi;
	}

	public ArrayList<User> get_seniorPersonnel() {
		return _seniorPersonnel;
	}

	public void set_seniorPersonnel(ArrayList<User> _seniorPersonnel) {
		this._seniorPersonnel = _seniorPersonnel;
	}
}
