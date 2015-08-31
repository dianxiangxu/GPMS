package gpms.queue;

public class PostMessage implements WorkItem {

	@Override
	public boolean process() throws Exception {
		// TODO Auto-generated method stub
		return false;
	}
	// boolean isProcessed = false;
	//
	// private DataModel dm = null;
	//
	// int tweetId = 0;
	// String tweet = null;
	// int userId = 0;
	//
	// public PostMessage(String tweet, int userID) {
	// this.dm = new DataModel();
	// this.tweet = tweet;
	// this.userId = userID;
	// }
	//
	// @Override
	// public boolean process() throws Exception {
	// tweetId = dm.InsertMessage(tweet, userId);
	// isProcessed = true;
	// return isProcessed;
	// }
	//
	// public boolean isCompleted() {
	// return isProcessed;
	// }
	//
	// public int getResponse() {
	// return tweetId;
	// }
}
