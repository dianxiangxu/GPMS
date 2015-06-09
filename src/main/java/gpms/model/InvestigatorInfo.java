package gpms.model;

import gpms.dao.BaseEntity;

import java.util.ArrayList;
import java.util.List;

import org.mongodb.morphia.annotations.Reference;

public class InvestigatorInfo extends BaseEntity {
	@Reference
	private User _pi;
	@Reference
	private List<User> _copi = new ArrayList<User>();
	@Reference
	private List<User> _seniorPersonnel = new ArrayList<User>();

	public User get_pi() {
		return _pi;
	}

	public void set_pi(User _pi) {
		this._pi = _pi;
	}

	public List<User> get_copi() {
		return _copi;
	}

	public void set_copi(ArrayList<User> _copi) {
		this._copi = _copi;
	}

	public List<User> get_seniorPersonnel() {
		return _seniorPersonnel;
	}

	public void set_seniorPersonnel(ArrayList<User> _seniorPersonnel) {
		this._seniorPersonnel = _seniorPersonnel;
	}
}
