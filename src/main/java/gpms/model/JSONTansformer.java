package gpms.model;

import java.util.ArrayList;

import com.google.gson.Gson;

public class JSONTansformer {
	public static String ConvertToJSON(ArrayList<?> sendData) {
		String response = null;
		Gson gson = new Gson();
		response = gson.toJson(sendData);
		return response;
	}

	// public static String RetweetJSONInfo(RetweetObjects messageData) {
	// String retweet = null;
	// Gson gson = new Gson();
	// retweet = gson.toJson(messageData);
	// return retweet;
	// }
}
