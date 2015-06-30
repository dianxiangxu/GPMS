package gpms.dao.test;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({ addNewProposalDAOTest.class, editProposalDAOTest.class, 
		deleteProposalDAOTest.class, actualProposalDeleteDAOTest.class})
public class AllProposalTests 
{

}
