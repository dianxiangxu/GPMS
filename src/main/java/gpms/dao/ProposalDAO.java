//Written by : Hector C. Ortiz 

package gpms.dao;

import gpms.DAL.MongoDBConnector;
import gpms.model.InvestigatorInfo;
import gpms.model.ProjectInfo;
import gpms.model.Proposal;
import gpms.model.SponsorAndBudgetInfo;
import gpms.model.UserProfile;

import java.net.UnknownHostException;
import java.util.Date;
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

	private static Morphia getMorphia() throws UnknownHostException, MongoException 
	{
		if (morphia == null) 
		{
			morphia = new Morphia().map(Proposal.class);
		}
		return morphia;
	}

	@Override
	public Datastore getDatastore()
	{
		if (ds == null) 
		{
			try 
			{
				ds = getMorphia().createDatastore(MongoDBConnector.getMongo(), DBNAME);
			}
			catch (UnknownHostException | MongoException e) 
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return ds;
	}

	public ProposalDAO(MongoClient mongo, Morphia morphia, String dbName) 
	{
		super(mongo, morphia, dbName);
	}
	
	public void setEditProposalNumber(Proposal proposal, String number)
	{
		Datastore ds = getDatastore();
		proposal.setProposalNo(number);
		ds.save(proposal);
	}
	
	public void setEditDateReceivedr(Proposal proposal, Date date)
	{
		Datastore ds = getDatastore();
		proposal.setDateReceived(date);
		ds.save(proposal);
	}

	public List<Proposal> findAll() throws UnknownHostException
	{
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).asList();
	}
	
	public void setEditInvestigatorInfo(Proposal proposal, InvestigatorInfo invInf)
	{
		Datastore ds = getDatastore();
		proposal.setInvestigatorInfo(invInf);
		ds.save(proposal);
	}
	
	public void setEditProjectInfo(Proposal proposal, ProjectInfo projInf)
	{
		Datastore ds = getDatastore();
		proposal.setProjectInfo(projInf);
		ds.save(proposal);
	}
	
	public void setEditSponsorAndBudgetInfo(Proposal proposal, SponsorAndBudgetInfo sponAndBudgInf)
	{
		Datastore ds = getDatastore();
		proposal.setSponsorAndBudgetInfo(sponAndBudgInf);
		ds.save(proposal);
	}
	
	public List<Proposal> proposalByPiId(UserProfile piId) throws UnknownHostException 
	{
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("investigator info.PI").equal(piId).asList();
	}
	
	public List<Proposal> proposalByCoPiId(UserProfile coPiId) throws UnknownHostException 
	{
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("investigator info.CO-PI").equal(coPiId).asList();
	}
	
	public List<Proposal> proposalBySeniorPersonnelId(UserProfile seniorPersonnelId) throws UnknownHostException 
	{
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("investigator info.senior personnel").equal(seniorPersonnelId).asList();
	}
	
	public Proposal proposalById(ObjectId id) throws UnknownHostException 
	{
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("_id").equal(id).get();
	}
}