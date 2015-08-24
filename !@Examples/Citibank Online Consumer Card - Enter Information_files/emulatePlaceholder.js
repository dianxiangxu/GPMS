/* 20140814RF */
(function($) {
	
	// emulates placeholder behavior on text inputs in IE 9 and earlier
	$(document).ready(function() {	
	
		if (typeof document.createElement('input').placeholder !== 'string') {
			$('input[type="text"]').each(function() {
				var $this = $(this),
					placeholder = $this.attr('placeholder');
				if (placeholder && placeholder.length > 0) {
					$this
						.on('focus blur', emulatePlaceholder)
						.blur();
				}
			});
			
			function emulatePlaceholder(ev) {
				var $this = $(this);
				switch (ev.type) {
					case 'focus': 
						if ($this.val() == $this.attr('placeholder')) {
							$this
								.val('')
								.removeClass('placeholder');
						}
						break;
					case 'blur':
						if ($this.val() == '') {
							$this
								.val($this.attr('placeholder'))
								.addClass('placeholder');
							ev.preventDefault();
						}
						break;
				}
			}
		}
	
	});
	
})(jQuery);