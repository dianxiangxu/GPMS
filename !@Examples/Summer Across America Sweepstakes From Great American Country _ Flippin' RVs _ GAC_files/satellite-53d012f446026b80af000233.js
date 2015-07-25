_satellite.pushAsyncScript(function(event, target, $variables){
  (function ($) {  
	var doPost = function(str) {
			parent.postMessage(str, "*");
	}
	//attach listeners on document.ready			
	$(function(){
    if ( $('#xCampaignForm').length > 0 || $('#xSecondaryForm').length > 0  ) {
			doPost("last_element:email");
			$('#xCampaignForm input, #xSecondaryForm input').change(function () {
				doPost("last_element:"+ $(this).attr('name'));
			});
			$('#xCampaignForm select, #xSecondaryForm select').change(function () {
				doPost("last_element:"+ $(this).attr('name'));
			});
			$('#xCampaignForm, #xSecondaryForm').submit(function () {
				doPost("block_abandon");
			});
		}
	});
})(jQuery);	


});
