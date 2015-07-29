if (window.addEventListener) {
    window.addEventListener('load', LoadShareButtonAnimation, false);
}
else {
    window.attachEvent('onload', LoadShareButtonAnimation);
}

var addthis_config;

function LoadShareButtonAnimation() {
	$('.custom_hover').parent().click(function () {
		var hoverMenu = $('.hover_menu', $(this));
		$('.custom_button', $(this)).addClass('active');

		// Since we have moved this control to the top of a blog entry, there may not be enough room
		//	to render the links above the button.  In which case we will render the links below.
		if ($(this).position().top - hoverMenu.height() - 10 >= 0) {
			hoverMenu.css("top", ($(this).position().top - hoverMenu.height()) - 10)
				.css("left", ($(this).position().left - hoverMenu.width() - 10) + $(this).width())
				.fadeIn('fast');
		}
		else {
			hoverMenu.css("top", ($(this).position().bottom))
				.css("left", ($(this).position().left - hoverMenu.width() - 10) + $(this).width())
				.fadeIn('fast');
		}

		if ($(this).width() > $(this).position().left) {
			hoverMenu.css("left", ($(this).position().left));
		}
	}).mouseleave(function () {
		$('.hover_menu', $(this)).fadeOut('fast');
		$('.custom_button', $(this).parent()).removeClass('active');
    });

    //Set addthis plugin google analytics tracking settings
    common.isLoaded(function () { return typeof (_gaqAccountID) != 'undefined'; }, function () {
        addthis_config = {
            data_ga_property: _gaqAccountID,
            data_ga_social: true
        };
    });
}

