_satellite.pushAsyncScript(function(event, target, $variables){
  modLinkClicked = window.modLinkClicked;
modOnPage = window.modOnPage;

$('div[data-modproperty]').on( "click", function( event ) {
modLinkClicked = $(event.target).closest('a').attr('href');
modOnPage = $(this).data('modproperty');
_satellite.track('modclicked');
});
});
