function adjustPowerUpHeight() {
	var bottomHeight = $("#bgImg2").height();
	$("#powerups-content").height(Math.max(500,bottomHeight));
	// if(window.innerWidth>=768) {
	// 	$("#powerups-content").css('max-height',window.innerHeight+"px");
	// }
	if(window.innerWidth<768) {
		$("#powerups-content").height('auto');
		$("#powerups-content").css('max-height',"none");
	}
}
function adjustTopSectionHeight() {
	$("#homepageBg").height($("#bgImg").height()).css('max-height',Math.max(440,window.innerHeight)+"px");
	if(window.innerWidth<768) {
		$("#homepageBg").height(window.innerWidth+"px");
	}
}
function adjustFeaturesDiv() {
	$("#first-white-bkg").css('min-height',window.innerHeight+"px");
}

function topImageLoaded() {
	adjustTopSectionHeight();
	//console.log("Image 1 loaded");
	//start loading tree
	//.logo-column,  .hero-image-text, #hero-caption, $("#hero-content .main-action-double")
	$("#hero-container" ).animate({
	    "opacity": 1,
	    "margin-bottom": "30px"
	 }, 300, function() {
	 	$("#navigation" ).animate({
		    "opacity": 1
		 }, 300, function() {
		 	
		});
	});
}


var bgImg, currentScroll;
var inAnimation = false;
var currentScrollTargets;
var scrollOver;
var doneScrolling = true;

var oldScroll = 0;
var finalScroll = 0;

var currentTarget = 0;

$(document).ready(function() {
	$("#homepageBg").height(window.innerHeight+"px");
	bgImg = $("#bgImg");
	bgImg2 = $("#bgImg2");
	currentScroll = window.scrollY;

	
	window.addEventListener("resize", function() {
		adjustPowerUpHeight();
		adjustTopSectionHeight();
		adjustFeaturesDiv();

		if($("#signin-overlay").css('display')==="none" && 
			window.innerWidth>1024) {
			$("#navigation").show();
		}

		if(window.innerWidth<768) {
			//mobile
			if(window.innerWidth>window.innerHeight) {
				//landscape
				$("#homepageBg").css('height',window.innerHeight+"px");
			}
			else {
				$("#homepageBg").css('height', window.innerWidth+"px");
			}
			//$("#homepageBg").css('min-height', $("#homepageBg").width()+"px");
		}
		else {
			$("#homepageBg").css('min-height', "0px");
		}
	});


	bgImg2[0].onload = function() {
		adjustPowerUpHeight();
	}

	//adjustPowerUpHeight();
	adjustTopSectionHeight();
	adjustFeaturesDiv();
});

var imageObj = new Image();
imageObj.src = "../img-rebrand/home-main-bg2.jpg";
imageObj.onload= (function(){
		document.getElementsByClassName("page-wrap")[0].style.display="block";
		adjustTopSectionHeight();
		$("#homepageBg").css("background-position-x","0px").css("background-position-y","0px").animate(
			{
				opacity: 1
			},200,function(){});

        setTimeout(topImageLoaded, 500);
})();
var disableOverlaySignin = false;
setTimeout(topImageLoaded, 1500);