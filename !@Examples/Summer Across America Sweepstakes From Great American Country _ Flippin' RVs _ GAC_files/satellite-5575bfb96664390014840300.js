_satellite.pushAsyncScript(function(event, target, $variables){
  //Latest version 6/30
var adObj = document.getElementById('dfp_bigbox');
//initial ad height check
if ( adObj && adObj.offsetHeight > 30) {
	localStorage.setItem("adBlocking", "no ad blocking detected | 0");
}
//continue to check ad height each second for 5 seconds if initially < 30
else {
	var counter=1;
	var check = setInterval(function(){adBlockDetect()},1000);
}

function adBlockDetect() {
	adObj = adObj || document.getElementById('dfp_bigbox');
	if (adObj && adObj.offsetHeight > 30) {
		clearInterval(check);
		localStorage.setItem("adBlocking", "no ad blocking detected | " + counter);
	}
	else {
		if (counter < 5) {
			localStorage.setItem("adBlocking", "undetermined  | " + counter); //set undetermined in localStorage in case user leaves page before ad blocking is verified (before 5 seconds)... this should limit "None" entries in the report
			counter=counter+1;
		}
		else {
			clearInterval(check);
			localStorage.setItem("adBlocking", "ad blocking detected");  //if div height is still < 30 after 5 seconds - very likely that ad blocking is enabled
		}
	}
}
});
