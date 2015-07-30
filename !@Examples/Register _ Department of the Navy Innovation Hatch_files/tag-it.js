(function($) {
  $.fn.autoGrowInput = function(o) {
    o = $.extend({
      maxWidth: 1000,
      minWidth: 0,
      comfortZone: 70
    }, o);

    this.filter('input:text').each(function() {

      var minWidth = o.minWidth || $(this).width(),
              val = '',
              input = $(this),
              testSubject = $('<tester/>').css({
                position: 'absolute',
                top: -9999,
                left: -9999,
                width: 'auto',
                fontSize: input.css('fontSize'),
                fontFamily: input.css('fontFamily'),
                fontWeight: input.css('fontWeight'),
                letterSpacing: input.css('letterSpacing'),
                whiteSpace: 'nowrap'
              }),
              check = function() {

                if (val === (val = input.val())) {
                  return;
                }

                // Enter new content into testSubject
                var escaped = val.replace(/&/g, '&amp;').replace(/\s/g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                testSubject.html(escaped);

                // Calculate new width + whether to change
                var testerWidth = testSubject.width(),
                        newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
                        currentWidth = input.width(),
                        isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
                                || (newWidth > minWidth && newWidth < o.maxWidth);

                // Animate width
                if (isValidWidthChange) {
                  input.width(newWidth);
                }

              };

      testSubject.insertAfter(input);

      $(this).bind('keyup keydown blur update', check);
    });

    return this;
  };

  $.fn.tagit = function(options) {
    options = $.extend({
      autocompleteClose: function() {
      },
      autocompleteFocus: function() {
      },
      configAutocomplete: function() {
      },
      autocompleteGetValue: function(item) {
        return item.value;
      },
      getLabelForValue: function(value) {
        return value;
      },
      getValueForInput: function(input) {
        return input;
      },
      minLength: 2
    }, options);

    var el = this;

		var BACKSPACE	= 8;
    var TAB       = 9;
		var ENTER			= 13;
		var COMMA			= 44;
		var SPACE			= 32;

		// add the tagit CSS class.

		// create the input field.
		var html_input_field = "<li class=\"tagit-new\"><input class=\"tagit-input\" type=\"text\" /></li>";

    var backingField = null;

    if(el.get(0).tagName.toLowerCase() === 'input') {
      backingField = el;
		  backingField.addClass('backing-field');
      el = $('<ul class="tagit">').insertBefore(backingField);
      el.html(html_input_field).find('.tagit-input').attr('id', backingField.attr('id'));
      backingField.removeAttr('id');
    }
    else {
		  el.addClass("tagit");
      el.html (html_input_field);
    }

    var tag_input = el.find(".tagit-new > .tagit-input");

    tag_input.autoGrowInput({comfortZone:20});

    if (backingField) {
      var tags = backingField.val().split(',');
      for(var i = 0; i < tags.length; ++i) {
        var tagValue = tags[i];
        if(tagValue) createChoiceByValue(tagValue);
      }
    }

    function checkAndCreateTag() {
      var input = tag_input.val();
      input = input.replace(/,+$/, "");
      input = input.trim();

      if (input != "") {
        tag_input.val("");
        tag_input.css('width', 'auto');

        var value = options.getValueForInput(input);
        if (value !== false && isNew(value)) {
          createChoiceByValue(value);
          return;
        }
      }

      justCreatedOnBlur = false;
    }

    $(el).click(function(e){
			if (e.target.tagName == 'A') {
				// Removes a tag when the little 'x' is clicked.
				// Event is bound to the UL, otherwise a new tag (LI > A) wouldn't have this event attached to it.
				$(e.target).parent().remove();
        updateBackingField();
			}
			else {
				// Sets the focus() to the input field, if the user clicks anywhere inside the UL.
				// This is needed because the input field needs to be of a small size.
				tag_input.focus();
			}
		});

    tag_input.keydown(function (event) {
      switch (event.which) {
        case BACKSPACE:
          if (tag_input.val() == "") {
            // When backspace is pressed, the last tag is deleted.
            removeLastTag();
          }
          break;
        case TAB:
          if (tag_input.val() != "") {
            event.preventDefault();
          }
          break;
        default:
          break;
      }
    });

		tag_input.keypress(function(event){
      switch(event.which) {
        case COMMA:
          checkAndCreateTag();
          event.preventDefault();
          break;
        case SPACE:
          checkAndCreateTag();
          event.preventDefault();
          break;
        case ENTER:
          if (tag_input.val() != "") {
            checkAndCreateTag();
          }
          break;
        default:
          break;
      }
		});

    var justCreatedOnBlur = false;
    tag_input.blur(function () { justCreatedOnBlur = true; checkAndCreateTag(); });

		tag_input.autocomplete({
      autoFocus: true,
			source: options.availableTags,
      close: options.autocompleteClose,
      focus: options.autocompleteFocus,
      minLength: options.minLength,
			select: function(event,ui){
        if(justCreatedOnBlur) {
          justCreatedOnBlur = false;

          //the tag created on blur will be replaced by the one selected
          clearTimeout(delayedHighlightOnExistingTag);
          removeLastTag();
        }

        var value = options.autocompleteGetValue(ui.item);
        if (isNew(value)) {
          createChoiceByValue(value);
        }
        // Cleaning the input.
				tag_input.val("");

				// Preventing the tag input to be update with the chosen value.
				return false;
			}
		});

    options.configAutocomplete(tag_input);

    var delayedHighlightOnExistingTag = null;

    function isNew(value) {
      var _new = true;
      tag_input.parents("ul").children(".tagit-choice").each(function() {
        var tag = $(this);
        if (value == tag.children("input").val()) {
          delayedHighlightOnExistingTag = setTimeout(function() {
            tag.effect('pulsate');
          }, 100);
          _new = false;
        }
      });
      return _new;
    }

    function updateBackingField() {
      if (backingField) {
        var tagValues = '';
        el.find('.tagit-choice > input').each(function() {
          tagValues += ',' + $(this).val();
        });

        backingField.val(tagValues);
      }
    }

    function removeLastTag() {
      el.children(".tagit-choice:last").remove();

      updateBackingField();
    }

    function createChoiceByValue(value) {
      var tag = $("<li class=\"tagit-choice\">" + options.getLabelForValue(value) +
              "<a class=\"close\">x</a>" +
              "<input type=\"hidden\" name=\"item[tags][]\">" +
              "</li>");
      tag.find('input').val(value);
      tag.insertBefore(tag_input.parent());

      tag_input.val("");

      updateBackingField();
    }
  };

	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g,"");
	};

})(jQuery);
