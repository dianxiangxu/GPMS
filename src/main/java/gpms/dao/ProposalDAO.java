package gpms.dao;

import gpms.DAL.MongoDBConnector;
import gpms.model.Proposal;
import gpms.model.Todo;

import java.net.UnknownHostException;
import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class ProposalDAO extends BasicDAO<Proposal, String> {
	private static final String DBNAME = "GPMS";
	public static final String COLLECTION_NAME = "proposal";

	private static Morphia morphia;
	private static Datastore ds;

	private static Morphia getMorphia() throws UnknownHostException,
			MongoException {
		if (morphia == null) {
			morphia = new Morphia().map(Proposal.class);
		}
		return morphia;
	}

	@Override
	public Datastore getDatastore() {
		if (ds == null) {
			try {
				ds = getMorphia().createDatastore(MongoDBConnector.getMongo(), DBNAME);
			} catch (UnknownHostException | MongoException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return ds;
	}

	public ProposalDAO(MongoClient mongo, Morphia morphia, String dbName) {
		super(mongo, morphia, dbName);
	}

	public List<Proposal> findAll() throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).asList();
	}
	
	public List<Proposal> proposalByPiId(ObjectId piId) throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("investigator info.PI.$id").equal(piId).asList();
	}
}