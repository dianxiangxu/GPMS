package gpms.dao;

import gpms.DAL.MongoDBConnector;
import gpms.model.InvestigatorInfo;
import gpms.model.PositionDetails;
import gpms.model.ProjectInfo;
import gpms.model.ProjectPeriod;
import gpms.model.ProjectType;
import gpms.model.Proposal;
import gpms.model.SponsorAndBudgetInfo;
import gpms.model.Todo;
import gpms.model.TypeOfRequest;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;

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
	
	public List<Proposal> getResearchAppliedProposal()
	{
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("project info.project type.research-applied").equal(true).asList();
	}

	public List<Proposal> findAll() throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).asList();
	}
	
	public void addPi(Proposal proposal, UserProfile pi)
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		invInf.setPi(pi);
		ds.save(proposal);
	}
	
	public void addCoPiList(Proposal proposal, ArrayList<UserProfile> coPiList) throws UnknownHostException, MongoException 
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		invInf.setCo_pi(coPiList);
		ds.save(proposal);
	}
	
	public void addCoPi(Proposal proposal, UserProfile coPi) throws UnknownHostException, MongoException 
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		invInf.addCo_pi(coPi);
		ds.save(proposal);
	}
	
	public void updateCoPi(Proposal proposal, int coPiIndex, UserProfile CoPi) throws UnknownHostException, MongoException 
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		ArrayList<UserProfile> coPiList = invInf.getCo_pi();
		coPiList.set(coPiIndex, CoPi);
		ds.save(proposal);
	}
	
	public void removeCoPi(Proposal proposal, int coPiIndex) throws UnknownHostException, MongoException 
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		ArrayList<UserProfile> coPiList = invInf.getCo_pi();
		coPiList.remove(coPiIndex);
		ds.save(proposal);
	}
	
	public void removeAllCoPi(Proposal proposal) throws UnknownHostException, MongoException 
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		ArrayList<UserProfile> coPiList = invInf.getCo_pi();
		coPiList.clear();
		ds.save(proposal);
	}
	
	public void addSeniorPersonelList(Proposal proposal, ArrayList<UserProfile> seniorPersonnelList) throws UnknownHostException, MongoException 
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		invInf.setSeniorPersonnel(seniorPersonnelList);
		ds.save(proposal);
	}
	
	public void addSeniorPersonel(Proposal proposal, UserProfile seniorPersonnel) throws UnknownHostException, MongoException 
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		invInf.addSeniorPersonnel(seniorPersonnel);
		ds.save(proposal);
	}
	
	public void updateSeniorPersonnel(Proposal proposal, int seniorPersonnelIndex, UserProfile seniorPersonnel) throws UnknownHostException, MongoException 
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		ArrayList<UserProfile> seniorPersonnelList = invInf.getSeniorPersonnel();
		seniorPersonnelList.set(seniorPersonnelIndex, seniorPersonnel);
		ds.save(proposal);
	}
	
	public void removeSeniorPersonnel(Proposal proposal, int seniorPersonnelIndex) throws UnknownHostException, MongoException 
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		ArrayList<UserProfile> seniorPersonnelList = invInf.getSeniorPersonnel();
		seniorPersonnelList.remove(seniorPersonnelIndex);
		ds.save(proposal);
	}
	
	public void removeAllSeniorPersonnel(Proposal proposal) throws UnknownHostException, MongoException 
	{
		Datastore ds = getDatastore();
		InvestigatorInfo invInf = proposal.getInvestigatorInfo();
		ArrayList<UserProfile> seniorPersonnelList = invInf.getSeniorPersonnel();
		seniorPersonnelList.clear();
		ds.save(proposal);
	}
	
	public Proposal proposalByPiId(ObjectId piId) throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("investigator info.PI.$id").equal(piId).get();
	}
	
	public Proposal proposalById(ObjectId id) throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("_id").equal(id).get();
	}
}