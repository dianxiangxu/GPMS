//v006

$(document).ready(function(){
     $("#copyright").html(new Date(SERVER_DATE).getFullYear());	
	 
	 if($("body.regReturn,body.regNew").length){ 
		fUpdatePersonalization();
		$('#disclosureBox').appendTo($('#mainWrap'));
		$('#disclosureBox').css({'display':'block'});
	 }						   						   
	
	if($("body.regReturn").length){ 
		bindLegacyForm();
		}	
	if($("body.shellProduct").length){
		if(typeof mpLoad == 'function'){
			$("#productWrap").show("fast",function(){
				mpLoad();
				$(".submitWrap, .disclaimersWrap").show();
			});
			
		}
	}	
		 
});


function fSpecialUpdatePersonalization(){
	updateLegacyForm();
}
