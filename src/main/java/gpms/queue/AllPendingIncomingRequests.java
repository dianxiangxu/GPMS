package gpms.queue;


public class AllPendingIncomingRequests implements WorkItem {

	public boolean process() throws Exception {
		// TODO Auto-generated method stub
		return false;
	}
	// boolean isProcessed = false;
	//
	// private DataModel dm = null;
	// String pendingIncoming = null;
	// int userId = 0;
	//
	// public AllPendingIncomingRequests(int userId) {
	// this.dm = new DataModel();
	// this.userId = userId;
	// }
	//
	// @Override
	// public boolean process() throws Exception {
	// ArrayList<FriendsObjects> incomingUsers = new
	// ArrayList<FriendsObjects>();
	// try {
	// incomingUsers = dm.getPendingIncomingRequests(userId);
	// pendingIncoming = JSONTansformer.ConvertToJSON(incomingUsers);
	// isProcessed = true;
	// } catch (Exception e) {
	// throw e;
	// }
	// return isProcessed;
	// }
	//
	// public boolean isCompleted() {
	// return isProcessed;
	// }
	//
	// public String getResponse() {
	// return pendingIncoming;
	// }
}
