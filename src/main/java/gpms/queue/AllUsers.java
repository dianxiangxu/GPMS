package gpms.queue;


public class AllUsers implements WorkItem {

	public boolean process() throws Exception {
		// TODO Auto-generated method stub
		return false;
	}
	// boolean isProcessed = false;
	//
	// private DataModel dm = null;
	//
	// String users = null;
	// int userId = 0;
	//
	// public AllUsers(int userID) {
	// this.dm = new DataModel();
	// this.userId = userID;
	// }
	//
	// @Override
	// public boolean process() throws Exception {
	// ArrayList<UsersObjects> userList = new ArrayList<UsersObjects>();
	// try {
	// userList = dm.getAllUsersList(userId);
	// users = JSONTansformer.ConvertToJSON(userList);
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
	// return users;
	// }

}
