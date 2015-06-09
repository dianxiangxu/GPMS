package gpms.model;

import gpms.DAL.ProposalDAO;

import java.util.ArrayList;

import org.bson.types.ObjectId;

import com.google.code.morphia.annotations.Embedded;
import com.google.code.morphia.annotations.Entity;
import com.google.code.morphia.annotations.Id;
import com.google.code.morphia.annotations.Reference;

@Entity(value = ProposalDAO.COLLECTION_NAME)
public class Proposal {
	@Id
	private ObjectId proposalId;
	private String proposalNo;
	private String dateReceived;
	//private String proposalStatus;
	@Embedded
	private InvestigatorInfo investigatorInfo;
	@Embedded
	private ProjectInfo projectInfo;
	@Embedded
	private SponsorAndBudgetInfo sponsorAndBudgetInfo;
	@Embedded
	private CostShareInfo costShareInfo;
	@Embedded
	private UniversityCommitments universityCommitments;
	@Embedded
	private ConflictOfInterest conflicOfInterest;
	@Embedded
	private ComplianceInfo complianceInfo;

	public Proposal(String proposalNo, String dateReceived,
			String proposalStatus,
			InvestigatorInfo investigatorInfo,
			ProjectInfo projectInfo,
			SponsorAndBudgetInfo sponsorAndBudgetInfo,
			CostShareInfo costShareInfo) 
	{
		this.proposalNo = proposalNo;
		this.dateReceived = dateReceived;
		//this.proposalStatus = proposalStatus;

		// TODO:: need to do in loop of the list object
		this.investigatorInfo = investigatorInfo;
		this.projectInfo = projectInfo;
		this.sponsorAndBudgetInfo = sponsorAndBudgetInfo;
	}

	public Proposal(String proposalNo, String dateReceived/*,String proposalStatus*/) {
		this.proposalNo = proposalNo;
		this.dateReceived = dateReceived;
		//this.proposalStatus = proposalStatus;
	}

	public Proposal() {

	}

	// TODO: add more class object as per document
	public ObjectId get_id() {
		return proposalId;
	}

//	public void set_id(ObjectId _id) {
//		this._id = _id;
//	}

	public String getProposalNo() {
		return proposalNo;
	}

	public void setProposalNo(String proposalNo) {
		this.proposalNo = proposalNo;
	}

	public String getDateReceived() {
		return dateReceived;
	}

	public void set_dateReceived(String _dateReceived) {
		this._dateReceived = _dateReceived;
	}

	public String get_proposalStatus() {
		return _proposalStatus;
	}

	public void set_proposalStatus(String _proposalStatus) {
		this._proposalStatus = _proposalStatus;
	}

	public ArrayList<InvestigatorInfo> get_investigatorInfo() {
		return _investigatorInfo;
	}

	public void set_investigatorInfo(
			ArrayList<InvestigatorInfo> _investigatorInfo) {
		this._investigatorInfo = _investigatorInfo;
	}

	public ArrayList<ProjectInfo> get_projectInfo() {
		return _projectInfo;
	}

	public void set_projectInfo(ArrayList<ProjectInfo> _projectInfo) {
		this._projectInfo = _projectInfo;
	}

	public ArrayList<SponsorAndBudgetInfo> get_sponsorAndBudgetInfo() {
		return _sponsorAndBudgetInfo;
	}

	public void set_sponsorAndBudgetInfo(
			ArrayList<SponsorAndBudgetInfo> _sponsorAndBudgetInfo) {
		this._sponsorAndBudgetInfo = _sponsorAndBudgetInfo;
	}

	public ArrayList<CostShareInfo> get_costShareInfo() {
		return _costShareInfo;
	}

	public void set_costShareInfo(ArrayList<CostShareInfo> _costShareInfo) {
		this._costShareInfo = _costShareInfo;
	}

	@Override
	public String toString() {
		return this.get_proposalNo() + " " + this.get_dateReceived() + " "
				+ this.get_proposalStatus();
	}
}
