package gpms.queue;


public class AllFriends implements WorkItem {

	public boolean process() throws Exception {
		// TODO Auto-generated method stub
		return false;
	}
	// boolean isProcessed = false;
	//
	// private DataModel dm = null;
	//
	// String friends = null;
	// int userId = 0;
	//
	// public AllFriends(int userID) {
	// this.dm = new DataModel();
	// this.userId = userID;
	// }
	//
	// @Override
	// public boolean process() throws Exception {
	// ArrayList<FriendsObjects> friendList = new ArrayList<FriendsObjects>();
	//
	// try {
	// friendList = dm.getAllFriendList(userId);
	// friends = JSONTansformer.ConvertToJSON(friendList);
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
	// // TODO Auto-generated method stub
	// return friends;
	// }

}
