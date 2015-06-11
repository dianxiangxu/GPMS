package gpms.model.test;

import static org.junit.Assert.assertTrue;
import gpms.model.InvestigatorInfo;
import gpms.model.UserProfile;

import org.junit.Test;

public class InvestigatorInfoTest {
	InvestigatorInfo invInf = new InvestigatorInfo();

	@Test
	public void testPi() {
		UserProfile up = new UserProfile();
		invInf.setPi(up);
		up = new UserProfile();
		assertTrue(invInf.getPi().equals(up));
	}
}
