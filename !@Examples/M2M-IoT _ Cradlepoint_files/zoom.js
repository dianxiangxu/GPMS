 jQuery(document).ready(function ($) {
	$("#main_img").bind("click", function(e){
		$.colorbox({href:$("#main_img").attr('data-zoom-image')});
		e.preventDefault();
		});	
		
	$('#gallery_01 a[href^="#"]').bind("click", function(e){
		$small = $(this).attr('data-image');
		$large = $(this).attr('data-zoom-image');
		$("#main_img").attr("src",$small);
		$("#main_img").attr("data-zoom-image",$large);
		//$("#main_img").css('width',458);
		//$("#main_img").css('height',298);
		return false; 
	});	 	
});