jQuery(document).ready(function($) {

	var callbackFormWidth = $('.callback-btn').attr('data-formwidth');

	if(!callbackFormWidth) {
		callbackFormWidth = '400px';
	}

	$('.inline-container').width(callbackFormWidth);

	if($.isFunction($.colorbox)){
		$(".callback-form-show").colorbox({
			width:callbackFormWidth
		});
	}
	jQuery(document).ready(function($) {
		$('.callback-form-container').submit(function() {
			var formInputs = $(this).find('.validate');
			var errors = '';

			$(formInputs).each(function() {
				if($.trim(this.value) == '') {
					fieldLabel = $(this).parent().find('span.label-text').html();
					errors += '- ' + fieldLabel + '\n';
				}
			});

			if(errors.length > 0) {
				alert('The following information is missing:\n\n' + errors);
				return false;
			}
			else {
				$('.submit-button').val('Please wait...');
				$('.submit-button').attr('disabled', 'disabled');
				return true;
			}
		});
	});
    jQuery('.callback-date').datepicker({
        format: 'm/d/yyyy',
        daysOfWeekDisabled: [0,6],
        autoclose: true,
        startDate: '0d',
        endDate: '+14d',
        todayHighlight: true,
        weekStart: 7
    });
});