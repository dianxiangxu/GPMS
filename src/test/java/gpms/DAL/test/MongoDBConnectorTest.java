package gpms.DAL.test;

import gpms.DAL.MongoDBConnector;
import junit.framework.TestCase;

public class MongoDBConnectorTest extends TestCase {

	public MongoDBConnectorTest(String name) {
		super(name);
	}

	protected void setUp() throws Exception {
		super.setUp();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}

	public void testGetMongoDBInstance() {
		MongoDBConnector mdb = MongoDBConnector.getMongoDBInstance();
		// assertEquals(mdb, null);
	}

	public void testFindDBObjectDBObjectString() {
		// assertEquals(1, false);
	}
}
