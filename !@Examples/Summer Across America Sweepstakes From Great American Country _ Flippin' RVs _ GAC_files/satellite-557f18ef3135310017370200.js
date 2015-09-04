_satellite.pushAsyncScript(function(event, target, $variables){
  (function(){
  var aamSync = function(partnerId,uid){
 		var aamBaseUrl = 'http://dpm.demdex.net/ibs:',
   	src = aamBaseUrl + 'dpid=' + partnerId + '&dpuuid=' + uid,
    img = document.createElement("img");
    img.src = src;
    document.body.appendChild(img);
  },
  mailid = document.location.search.match(/c32=([^&$]*)/i);
  if ( Array.isArray(mailid) && mailid.length ) {
      aamSync(468,mailid[1]);
  }
})();

});
