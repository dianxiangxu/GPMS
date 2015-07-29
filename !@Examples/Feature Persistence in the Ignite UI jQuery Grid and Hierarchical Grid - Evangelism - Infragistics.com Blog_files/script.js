/* Author:

*/

/* add the tab id to the url so it can be shared.
*/
function loadTabImages(event, ui) {
	$('img', ui.panel).trigger('imageShow');
	if (event.type == 'tabsselect') {
		document.location.hash = ui.panel.id;
	}
}
function accordionScrollToSelected(event, ui) {
	if (!ui.options.active) { return; }
	var scrollPosition = ui.newHeader.offset().top - 1;
	$('html:not(:animated),body:not(:animated)').animate(
        { scrollTop: scrollPosition },
        1000
    );
}