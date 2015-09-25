package gpms.model.test;

import static org.junit.Assert.assertTrue;

import java.text.ParseException;

import gpms.model.UserAccount;
import gpms.model.UserProfile;

import org.junit.Before;
import org.junit.Test;

public class UserAccountTest {
	UserAccount ua = new UserAccount();

	// @Test
	// public void testId()
	// {
	// ObjectId id = ua.getId();
	// System.out.println(id.toString());
	// System.out.println(ua.getId().toString());
	// assertTrue(ua.getId().equals(id));
	// }

	@Before
	public void initiate() throws ParseException {
		ua.setUserName("Calembo");
		ua.setPassword("cccaaa");
	}

	@Test
	public void testIsEqual() {
		UserAccount testua = new UserAccount();
		testua.setUserName("Calembo");
		testua.setPassword("cccaaa");
		assertTrue(ua.equals(testua));
	}

	@Test
	public void testUserName() {
		assertTrue(ua.getUserName().equals("Calembo"));
	}

	@Test
	public void testPassword() {
		assertTrue(ua.getPassword().equals("cccaaa"));
	}

	// TODO: ERRROR!!!
	// @Test
	// public void testIsDeleted()
	// {
	// assertTrue(ua.getIsDeleted().equals(false));
	// }
}
