// JavaScript Document
//v001
$( document ).ready(function() {
	//display EZ Unsub logos only if optins are displayed on page
	if($('#optinWrap ul.SpectrumOptinList li').length == 0){
		$("#buttonOptin").hide();
	}
});