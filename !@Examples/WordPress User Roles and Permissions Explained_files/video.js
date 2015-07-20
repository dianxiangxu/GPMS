/* **********************************************
 * Youtube help video
 ********************************************** */
var bridgePlayer;
function onYouTubeIframeAPIReady() {
    var video = 0;
    if ( typeof GlobalVideoID != 'undefined') {
        video = GlobalVideoID;
    }
    else {
        video = 'DJXzq4rUbH4';
    }

    bridgePlayer = new YT.Player('bridgePlayer', {
        height: '450',
        width: '720',
        videoId: video
    });
    //bridgePlayer.setPlaybackQuality('large');
}

function stopBridgeVideo() {
    bridgePlayer.stopVideo();
    jQuery('.videoOverlay').fadeOut(300);
}

function playBridgeVideo() {
    var right = "";
    var top ="";

    var width = parseInt( jQuery(document).width() );
    var height = parseInt( jQuery(document).height() );

    right = (width - 600) / 2;
    right = (right > 0) ? right : 0;

    top = parseInt(jQuery(document).scrollTop()) + 100;

    jQuery('.videoOverlay').css({
        'padding-left': right,
        'padding-top': top,
        'width': width - right,
        'height': height
    });
    jQuery('.videoOverlay').fadeIn(300);

    if ( typeof bridgePlayer == 'object' && bridgePlayer.hasOwnProperty('playVideo') ) {
        bridgePlayer.playVideo();
    }
	
	 jQuery('.overlay').append('<div id="fancybox-under"> <div class="under-left">See your website on another platform!<span>Start <b>Free Demo</b> Migration!</span></div> <form action="//app.cms2cms.com/wizard/?utm_source=VideoFrame&utm_medium=Button&utm_campaign=CMS2CMS_website" method="get" class="under-right"> <input type="hidden" name="utm_source" value="PopUp"><input type="hidden" name="utm_medium" value="Blog"><input type="hidden" name="utm_campaign" value="QuickWizard"><input type="hidden" name="previewTargetType" value="joomla"><input type="text" name="sourceUrl" placeholder="Enter Your Site URL..." value=""><button class="button highlight middle under-video-butt" name="go" src="/qwizard/blank.png">Get Preview</button></form></div>');
	
}
