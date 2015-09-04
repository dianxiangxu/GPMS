/* 
 * Matrix Show/hide
 */

 (function($){

 	$.fn.showHideContent = function() {

 		// Hide all content of show/hide boxes
 		$('.matrix-show-hide-content')
 		.hide();

 		$(this)
	 		.click(function() {

	 			// toggle hidden content next in line
	 			$(this)
	 				.closest('.matrix-show-hide-trigger')
	 				.next('.matrix-show-hide-content')
	 				.slideToggle();

	 			// prevent anchor from scrolling the page
	 			return false;

	 		});
 	};

})(jQuery);

/* 
 * Matrix Center form
 */

(function($){
	$.fn.centerForms = function() {
		if( $(this).length){
		  $('.elsevier-matrix-form')
		  	.wrap('<div class="row"><div class="large-12 columns"></div></div>');
		}
	};
})(jQuery);


/*
 * Execute commands
 */

jQuery(document)
	.ready(function($){
		$('.toggle-hidden-content')
			.showHideContent();
		$('.elsevier-matrix-form')
			.centerForms();
	});

/*
 * Spine color
 */

jQuery(document).ready(function($) {
      $( document ).ready(function() {
        $('.main-navigation')
         .find('a')
         .each(function( k, v ) {
           if( $(v).text()=='Elsevier Store' || $(v).text()=='Author Services' ){
              $(v).parent('li').css({
                 'background-color': 'grey',
               });
           }
         });
      });
    });