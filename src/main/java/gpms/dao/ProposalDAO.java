//Written by : Hector C. Ortiz 

package gpms.dao;

import gpms.DAL.MongoDBConnector;
import gpms.model.AuditLog;
import gpms.model.InvestigatorInfo;
import gpms.model.ProjectInfo;
import gpms.model.Proposal;
import gpms.model.SponsorAndBudgetInfo;
import gpms.model.Status;
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
				ds = getMorphia().createDatastore(MongoDBConnector.getMongo(),
						DBNAME);
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

	public void setEditProposalNumber(Proposal proposal, String number, UserProfile author) 
	{
		if(!proposal.getProposalNo().equals(number))
		{
			Datastore ds = getDatastore();
			proposal.setProposalNo(number);
			AuditLog entry = new AuditLog(author, "Edited Proposal Number", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditDateReceivedr(Proposal proposal, Date date, UserProfile author) 
	{
		if(!proposal.getDateReceived().equals(date))
		{
			Datastore ds = getDatastore();
			proposal.setDateReceived(date);
			AuditLog entry = new AuditLog(author, "Edited Date Received", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public List<Proposal> findAll() throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).asList();
	}

	public void setEditInvestigatorInfo(Proposal proposal, InvestigatorInfo invInf, UserProfile author)
	{
		if(!proposal.getInvestigatorInfo().equals(invInf))
		{
			Datastore ds = getDatastore();
			proposal.setInvestigatorInfo(invInf);
			AuditLog entry = new AuditLog(author, "Edited Investogator Information", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditProjectInfo(Proposal proposal, ProjectInfo projInf, UserProfile author) 
	{
		if(!proposal.getProposalStatus().equals(projInf))
		{
			Datastore ds = getDatastore();
			proposal.setProjectInfo(projInf);
			AuditLog entry = new AuditLog(author, "Edited Project Information", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}

	public void setEditSponsorAndBudgetInfo(Proposal proposal, SponsorAndBudgetInfo sponAndBudgInf, UserProfile author)
	{
		if(!proposal.getSponsorAndBudgetInfo().equals(sponAndBudgInf))
		{
			Datastore ds = getDatastore();
			proposal.setSponsorAndBudgetInfo(sponAndBudgInf);
			AuditLog entry = new AuditLog(author, "Edited Sponsor and Budget Information", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}
	
	public void setEditProposalStatus(Proposal proposal, Status status, UserProfile author)
	{
		if(!proposal.getProposalStatus().equals(status))
		{
			Datastore ds = getDatastore();
			proposal.setProposalStatus(status);
			AuditLog entry = new AuditLog(author, "Edited Proposal Status", new Date());
			proposal.addEntryToAuditLog(entry);
			ds.save(proposal);
		}
	}
	
	public void deleteProposal(Proposal proposal, UserProfile author)
	{
		Datastore ds = getDatastore();
		proposal.setProposalStatus(Status.DELETED);
		AuditLog entry = new AuditLog(author, "Deleted Proposal", new Date());
		proposal.addEntryToAuditLog(entry);
		ds.save(proposal);
	}

	public List<Proposal> proposalByPiId(UserProfile piId) throws UnknownHostException 
	{
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("investigator info.PI").equal(piId).asList();
	}

	public List<Proposal> proposalByCoPiId(UserProfile coPiId)
			throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("investigator info.CO-PI")
				.equal(coPiId).asList();
	}

	public List<Proposal> proposalBySeniorPersonnelId(
			UserProfile seniorPersonnelId) throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class)
				.field("investigator info.senior personnel")
				.equal(seniorPersonnelId).asList();
	}

	public Proposal proposalById(ObjectId id) throws UnknownHostException {
		Datastore ds = getDatastore();
		return ds.createQuery(Proposal.class).field("_id").equal(id).get();
	}
}