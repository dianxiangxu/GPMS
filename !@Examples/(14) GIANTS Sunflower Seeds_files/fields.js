var FIELDS = (function () {
	var exposed = {};
	
	function init () {
		$(function () {
			$('.video-select .dropdown-menu li a').click(function () {
				var field = $(this).closest('.input-group');
				set_video_type(field, $(this).data('value'));
			});
			$('.text-select').click(function () {
				var field = $(this).closest('.input-group');
				set_file_upload(field, $(this).data('value'));
			});
			$('.video-select').each(function () {
				set_video_type($(this), $(this).find('input[name="video_type"]').val());
			});
			set_labels(true);
		});
		
		exposed.init = null;
	}
	
	set_file_upload = function (field, type) {
      	if (type == 'file')
	      	field.find('input[type="file"]').toggle();
				if (type == 'video') {
	      	field.find('input[type="text"]').toggle();
	      	field.find('i.input-icon').toggle();
	      	field.find('div.input-prepend').toggle();
	      }
     };
      
    set_video_type = function (field, type) {
        var input = field.find('input[type="text"]'),
            icon, classname, tmpname;
        switch (type) {
          case 'youtube':
            classname = 'type-youtube';
            icon = "<i class='input-icon'></i>";
            placeholder = "http://youtu.be/aBcDeF123456";
            tmpname = 'YouTube';
            break;
          case 'vine':
            classname = 'type-vine';
            icon = "<i class='input-icon'></i>";
            placeholder = "http://vine.co/v/aBcDeF123456";
            tmpname = 'Vine';
            break;
          case 'instagram_video':
            classname = 'type-instagram-video';
            icon = "<i class='input-icon'></i>";
            placeholder = "http://instagram.com/p/aBcDeF123456";
            tmpname = 'Instagram';
            break;
        }
        field.removeClass('type-vine type-youtube type-instagram-video').addClass(classname).find('input[name="video_type"]').val(type).end()
          .find('.input-icon').remove().end()
          .find('.btn-group .dropdown-toggle').html(tmpname+' <span class="caret"></span>');
        input.attr('placeholder', placeholder).after(icon);
	};
	
	// Put labels in placeholders for small widths
	set_labels = function (overrideembed) {
		var placeholderlabels = false;
        if (!$('#dialog.embedded').length || overrideembed) {
			if ($(window).width() < 520 || $('#dialog.embedded').length) 
				placeholderlabels = true;
			else 
				placeholderlabels = false;
				
			$('#dialog input[type="text"], #dialog input[type="email"], #dialog textarea').each(function () {
				label = $(this).parent().siblings('.input-label');
				if (placeholderlabels) {
					if (!$(this).attr('placeholder') && label.hasClass('has-placeholder-label')) {
						$(this).attr('placeholder', label.find('label').text());              
					}
				} else {
					if ($(this).attr('placeholder') && label.hasClass('has-placeholder-label')) {
						label.find('label').text($(this).attr('placeholder'));              
						$(this).attr('placeholder', '');            
					}
				}
			});
        }
	};
	
    $(window).on('resize orientationChanged', function () { set_labels(); });

	exposed.init = init;
	
	return exposed;
}());
