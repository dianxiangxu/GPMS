_satellite.pushAsyncScript(function(event, target, $variables){
  (function() {
		var aamSync = function (res) {
  		var aamBaseUrl = 'http://dpm.demdex.net/ibs:',
    	//Please replace partnerId with your partnerId
    	partnerId ='12971',
    	src = aamBaseUrl + 'dpid=' + partnerId + '&dpuuid=' + res.UID,
    	img = document.createElement("img");
    	img.src = src;
    	document.body.appendChild(img);
      gigya.accounts.setAccountInfo({data:{internalAamIdSyncResponseCode: 'true'}});
   };
  if ( typeof gigya === "object" && gigya.accounts ) {
		gigya.accounts.addEventHandlers( {onLogin:aamSync} ); 
  }
})();


});
