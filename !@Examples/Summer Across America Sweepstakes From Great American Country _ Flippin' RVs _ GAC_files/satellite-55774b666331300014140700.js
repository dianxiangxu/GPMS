_satellite.pushAsyncScript(function(event, target, $variables){
  (function($) {
	// white ops tag
	var traffic_source_name = document.referrer ? document.referrer.replace(/[^/]+\/\/(?:(?:[^.]+?\.)?(.*?)\.([a-z]+))\/.*/i,"$1") : "",
		section_name = typeof mdManager === "object" && mdManager.getCategoryDspName(),
		page_url = document.location.href ? document.location.href.replace(/[^/]+\/\//,"") : "",
		cookie_id = typeof s === "object" &&  typeof s.visitor === "object" ? s.visitor.getMarketingCloudVisitorID() : typeof Visitor === "function" ? Visitor.getInstance("BC501253513148ED0A490D45@AdobeOrg").getMarketingCloudVisitorID() : "",
		script_url;
    section_name = section_name.replace("&amp;","&");
  	script_url = "http://s.tagsrvcs.com/2/286671/analytics.js?pp=" + encodeURIComponent(traffic_source_name) + "&sn=" + encodeURIComponent(section_name) + "&c1=" + encodeURIComponent(page_url) + "&ui=" + encodeURIComponent(cookie_id) + "&dt=2866711433349891350000";
		$.getScript(script_url);
	}
)(jQuery);
});
