jQuery( document ).ready( function() {
	var ssl_right = jQuery( '#ss-likebox-left' ).css('right' );
	var ssl_left = jQuery( '#ss-likebox-left' ).css('left' );
	var ssl_bottom = jQuery( '#ss-likebox-left' ).css('bottom' );
	var ssr_right = jQuery( '#ss-likebox-right' ).css('right' );
	var ssr_left = jQuery( '#ss-likebox-right' ).css('left' );
	var ssr_bottom = jQuery( '#ss-likebox-right' ).css('bottom' );
	var is_left = false;

	// For conner left
	jQuery( '#arc-left-bottom' ).mouseover (
		function() {
			is_left = true;
			jQuery( '#ss-likebox-left' ).stop( true, false ).animate( { left : 0, bottom : 0 } );
		}
	);

	jQuery( '#arc-left-bottom' ).mousedown (
		function() {
			is_left = true;
			jQuery( '#ss-likebox-left' ).animate( { left: 0, bottom: 0 } );            
			jQuery( '#ss-likebox-left' ).delay( 1800 ).animate( { left : ssl_left, bottom : ssl_bottom }, "slow" );
		}
	);

	jQuery( '#logo-left-bottom' ).mouseover (
		function() {
			is_left = true;
			jQuery( '#ss-likebox-left' ).stop( true, false ).animate( { left : 0, bottom : 0 } );
		}
	);

	jQuery( '#logo-left-bottom' ).mousedown (
		function() {
			is_left = true;

			jQuery( '#ss-likebox-left' ).animate( { left : 0, bottom : 0 } );            
            jQuery( '#ss-likebox-left' ).delay( 1800 ).animate( { left : ssl_left, bottom : ssl_bottom }, "slow" );
		}
	);
	
	// For conner right
	jQuery( '#arc-right-bottom' ).mouseover (
		function() {
			is_left = false;
			jQuery( '#ss-likebox-right' ).stop( true, false ).animate( { right: 0, bottom: 0 } );
		}
	);

	jQuery( '#arc-right-bottom' ).mousedown (
		function() {
			is_left = false;
			jQuery( '#ss-likebox-right' ).animate( { right: 0, bottom: 0 } );
			
			jQuery( '#ss-likebox-right' ).delay( 1800 ).animate( { right: ssr_right, bottom: ssr_bottom }, "slow" );
		}
	);
		
	jQuery( '#logo-right-bottom' ).mouseover (
		function() {
			is_left = false;
			jQuery( '#ss-likebox-right' ).stop( true, false ).animate( { right: 0, bottom: 0 } );
		}
	);
	
	jQuery( '#logo-right-bottom' ).mousedown (
		function() {
			is_left = false;
			jQuery( '#ss-likebox-right' ).animate( { right: 0, bottom: 0 } );
			
			jQuery( '#ss-likebox-right' ).delay( 1800 ).animate( { right : ssr_right, bottom : ssr_bottom }, "slow" );
		}
	);
	
	// For mouse out
	jQuery( '#ss-likebox-left' ).mouseout (
		function() {
			if ( true === is_left)
				jQuery( '#ss-likebox-left' ).stop( true, false ).animate( { left : ssl_left, bottom : ssl_bottom }, "slow" );
			else
				jQuery( '#ss-likebox-left' ).stop( true, false ).animate( { right : ssl_right, bottom : ssl_bottom }, "slow" );
		}
	);
	jQuery( '#ss-likebox-right' ).mouseout (
		function() {
			if ( true === is_left)
				jQuery( '#ss-likebox-right' ).stop( true, false ).animate( { left: ssr_left, bottom: ssr_bottom }, "slow" );
			else
				jQuery( '#ss-likebox-right' ).stop( true, false ).animate( { right: ssr_right, bottom: ssr_bottom }, "slow" );
		}
	);
});