package gpms.dao;

//import gpms.DAL.MongoDBConnector;
import gpms.model.Proposal;
//import gpms.model.UserAccount;



import java.net.UnknownHostException;
import java.util.List;

//import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;
//import com.mongodb.MongoException;

public class ProposalDAO extends BasicDAO<Proposal, String> {
	private static final String DBNAME = "GPMS";
	public static final String COLLECTION_NAME = "proposal";

	//private static Morphia morphia;
	//private static Datastore ds;

	public ProposalDAO(MongoClient mongo, Morphia morphia) {
		super(mongo, morphia, DBNAME);
	}

	public ProposalDAO(Morphia morphia, MongoClient mongo, String dbName) {
		super(mongo, morphia, dbName);
	}

//	private static Morphia getMorphia() throws UnknownHostException,
//			MongoException {
//		if (morphia == null) {
//			morphia = new Morphia().map(Proposal.class);
//		}
//		return morphia;
//	}

	// private static Datastore getDatastore() throws UnknownHostException,
	// MongoException {
	// if (ds == null) {
	// ds = getMorphia().createDatastore(MongoDBConnector.getMongo(),
	// DBNAME);
	// }
	// return ds;
	// }

	@SuppressWarnings("deprecation")
	public /*static*/ void saveProposal(Proposal proposal)
			/*throws UnknownHostException*/ {
//		Morphia morphia = getMorphia();
//		Datastore ds = morphia.createDatastore(MongoDBConnector.getMongo(),
//				DBNAME);
		ds.save(proposal);
	}

	@SuppressWarnings("deprecation")
	public /*static*/ List<Proposal> getAllProposals() throws UnknownHostException {
		// Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).asList();
	}
}
