package gpms.queue;

import javax.ws.rs.Path;

@Path("/tweet")
public class TweetService {
	// private DataModel dm = null;
	// private final static String queueName = "processing-queue";
	//
	// public TweetService() {
	// dm = new DataModel();
	// }
	//
	// @GET
	// @Produces(MediaType.TEXT_PLAIN)
	// public String sayPlainTextHello() {
	// return "Hello Tweet";
	// }
	//
	// // POST tweet/tweet/:msg POSTS a new tweet, 128 characters max and
	// returns a
	// // unique tweet id for this message.
	// @POST
	// @Path("/PostMessage")
	// @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	// public Response postMessage(@FormParam("update") String tweet,
	// @Context HttpServletRequest req) throws Exception {
	// // message = request.getParameter("tweet");
	// try {
	// HttpSession session = req.getSession();
	// if (session.getAttribute("userid") == null) {
	// java.net.URI location = new java.net.URI(
	// "../index.jsp?msg=error");
	// return Response.seeOther(location).build();
	// } else {
	// int userID = (int) session.getAttribute("userid");
	//
	// PostMessage request = new PostMessage(tweet, userID);
	// TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
	// if (queue != null) {
	// queue.add(request);
	// }
	// while (!request.isCompleted()) {
	// Thread.currentThread();
	// Thread.sleep(5);
	// }
	// int tweetId = request.getResponse();
	//
	// // GetFeedsByUserID(userID);
	// java.net.URI location = new java.net.URI(
	// "../home.jsp?msg=success&tweetId=" + tweetId);
	// return Response.seeOther(location).build();
	// }
	// } catch (Exception e) {
	// throw e;
	// }
	// }
	//
	// @GET
	// @Path("/GetFeeds")
	// @Produces("application/json")
	// public String GetFeedsByUserID(@Context HttpServletRequest req)
	// throws Exception {
	// String feeds = null;
	// ArrayList<FeedObjects> feed = new ArrayList<FeedObjects>();
	// try {
	// HttpSession session = req.getSession();
	// int uid = (int) session.getAttribute("userid");
	// feed = dm.GetFeedsByUserID(uid);
	// feeds = JSONTansformer.ConvertToJSON(feed);
	// } catch (Exception e) {
	// throw e;
	// }
	// return feeds;
	// }
	//
	// // GET tweet/show/:id Returns a single Tweet, specified by the id
	// parameter.
	// @GET
	// @Path("/GetMessageDetails")
	// @Produces(MediaType.TEXT_PLAIN)
	// public String getMessageDetails(@QueryParam("msgid") int msg_id)
	// throws Exception {
	//
	// MessageDetails request = new MessageDetails(msg_id);
	// TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
	// if (queue != null) {
	// queue.add(request);
	// }
	// while (!request.isCompleted()) {
	// Thread.currentThread();
	// Thread.sleep(5);
	// }
	// return request.getResponse();
	// }
	//
	// // POST tweet/destroy/:id Destroys the status specified by the required
	// ID
	// // parameter. The authenticating user must be the author of the specified
	// // status. Returns the destroyed status if successful.
	// @POST
	// @Path("/DeleteMessage")
	// @Produces(MediaType.TEXT_PLAIN)
	// public String deleteMessage(@QueryParam("msgid") int msg_id,
	// @QueryParam("uid") int userID) throws SQLException {
	// String tweet = dm.deleteTweet(msg_id, userID);
	// return tweet;
	//
	// }
	//
	// // POST tweet/retweet/:id Retweets a tweet. Returns the original tweet
	// with
	// // retweet users id embedded.
	// @POST
	// @Path("/RetweetThisMessage")
	// @Produces(MediaType.TEXT_PLAIN)
	// public String doRetweetThisMessage(@QueryParam("msgid") int msg_id,
	// @QueryParam("uid") int userID) throws Exception {
	// RetweetObjects message = dm.doRetweet(msg_id, userID);
	// String retweet = JSONTansformer.RetweetJSONInfo(message);
	// retweet = "{\"Retweet\":" + retweet + "}";
	// return retweet;
	//
	// }
}
