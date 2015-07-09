package gpms.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

@Embedded
public class FundingSource {
	@Property("federal")
	private boolean federal;

	@Property("federal flow-through")
	private boolean federalFlowThrough;

	@Property("Sate of Idaho entity")
	private boolean sateOfIdahoEntity;

	@Property("private for profit")
	private boolean privateForProfit;

	@Property("non-profit organization")
	private boolean nonProfitOrganization;

	@Property("non-Idaho State entity")
	private boolean nonIdahoStateEntity;

	@Property("college or university")
	private boolean collegeOrUniversity;

	@Property("local entity")
	private boolean localEntity;

	@Property("non-Idaho local entity")
	private boolean nonIdahoLocalEntity;

	@Property("tirbal government")
	private boolean tirbalGovernment;

	@Property("foreign")
	private boolean foreign;

	public FundingSource() {
	}

	public boolean isFederal() {
		return federal;
	}

	public void setFederal(boolean federal) {
		this.federal = federal;
	}

	public boolean isFederalFlowThrough() {
		return federalFlowThrough;
	}

	public void setFederalFlowThrough(boolean federalFlowThrough) {
		this.federalFlowThrough = federalFlowThrough;
	}

	public boolean isSateOfIdahoEntity() {
		return sateOfIdahoEntity;
	}

	public void setSateOfIdahoEntity(boolean sateOfIdahoEntity) {
		this.sateOfIdahoEntity = sateOfIdahoEntity;
	}

	public boolean isPrivateForProfit() {
		return privateForProfit;
	}

	public void setPrivateForProfit(boolean privateForProfit) {
		this.privateForProfit = privateForProfit;
	}

	public boolean isNonProfitOrganization() {
		return nonProfitOrganization;
	}

	public void setNonProfitOrganization(boolean nonProfitOrganization) {
		this.nonProfitOrganization = nonProfitOrganization;
	}

	public boolean isNonIdahoStateEntity() {
		return nonIdahoStateEntity;
	}

	public void setNonIdahoStateEntity(boolean nonIdahoStateEntity) {
		this.nonIdahoStateEntity = nonIdahoStateEntity;
	}

	public boolean isCollegeOrUniversity() {
		return collegeOrUniversity;
	}

	public void setCollegeOrUniversity(boolean collegeOrUniversity) {
		this.collegeOrUniversity = collegeOrUniversity;
	}

	public boolean isLocalEntity() {
		return localEntity;
	}

	public void setLocalEntity(boolean localEntity) {
		this.localEntity = localEntity;
	}

	public boolean isNonIdahoLocalEntity() {
		return nonIdahoLocalEntity;
	}

	public void setNonIdahoLocalEntity(boolean nonIdahoLocalEntity) {
		this.nonIdahoLocalEntity = nonIdahoLocalEntity;
	}

	public boolean isTirbalGovernment() {
		return tirbalGovernment;
	}

	public void setTirbalGovernment(boolean tirbalGovernment) {
		this.tirbalGovernment = tirbalGovernment;
	}

	public boolean isForeign() {
		return foreign;
	}

	public void setForeign(boolean foreign) {
		this.foreign = foreign;
	}

}
