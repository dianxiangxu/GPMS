/* 20140930RF */
// Link Helper looks for all links on the page with a `target="_blank"`, as well as `href`s and `onclick`s that may use inline javascript to open the link in a new window and appends visuallyhidden helper text to the link's contents to notify screen reader users that the link opens in a new window.

$(function() {

	var linkHelperText = '';

	try {
		linkHelperText = '<span class="visuallyhidden">' + ' - ' + window.citi.form_messages.link_helper_text + '</span>';
	} catch(err) {}

	if (linkHelperText.length > 0) {
		$('a').each(function() {
			var target = $(this).attr('target'),
				href = $(this).attr('href'),
				onclick = $(this).attr('onclick');
			if ((target && target == '_blank') || (href && href == 'javascript:openNewWindow();') || (href && href.indexOf('javascript:void(window.open')) !== -1 || (onclick && onclick.indexOf('javascript:void(window.open') !== -1)) {
				$(this).append(linkHelperText);
			}
		});
	}

});