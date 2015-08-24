/* 20140814RF */
$(function() {

	window.citi = window.citi || {};

	window.citi.tooltipPlugin = (function() {

		var tooltipManager = {
			id: 0,
			getId: function() {
				return tooltipManager.id++;
			},
			modules: {}
		};

		var Tooltip = function(el) {
			this.self = el;
			this.container = this.self.parent();
			this.latency = 175;
			this.id = tooltipManager.getId();

			// flags
			this.bubbleHovered = false;
			this.iconHovered = false;
			this.inputFocused = false;
			this.inputHovered = false;
			this.positionSet = false;

			// elements
			this.tooltipIcon = null;
			this.tooltipBubble = null;
			this.tooltipMessage = null;
			this.associatedInputs = null;
			this.associatedLabel = null;

			// positioning
			this.positionOfContainer = null;
			this.positionOfIcon = null;
			this.tooltipBottom = null;
			this.tooltipHeight = null;
			this.tooltipTypeClass = null;

			this.init();
		};

		Tooltip.prototype = {
			init: function() {
				var _this = this;
				this.gatherAssociatedInputs();
				this.gatherAssociatedLabels();
				this.generateTooltips();
				this.scrunch();
				this.positionTooltip();
				this.setEventHandlers(_this);

				tooltipManager.modules[this.id] = this;
			},
			// methods
			gatherAssociatedInputs: function() {
				this.associatedInputs = this.container.find('input:not([type=hidden])');
				// ensures that non-input options, which never have multiple inputs, are not ignored.
				if (this.associatedInputs.length < 2) {
					this.associatedInputs = this.self;
				}
			},
			gatherAssociatedLabels: function() {
				if (this.self.is('input')) {
					if (this.container.find('legend').length > 0) {
						// first, check to make sure this isn't a radio group by looking for a legend
						this.associatedLabel = this.container.find('legend');
					} else {
						// otherwise, get only the label related to the first input. This will later have visuallyhidden content for screen readers placed in it.
						this.associatedLabel = this.container.find('label[for=' + this.self.attr('id') + ']');
					}
				}
			},
			generateTooltips: function() {
				var elem = this.associatedInputs,
					tooltipIconHTML = '<div class="tooltip"></div>',
					tooltipContainerHTML = '<div aria-hidden="true" class="tooltip_container"></div>';

				this.tooltipIcon = this.container.find('.tooltip');
				this.tooltipBubble = this.container.find('.tooltip_container');

				if (!this.tooltipIcon.length) {
					this.tooltipIcon = $(tooltipIconHTML).appendTo(this.container);
					this.tooltipBubble = $(tooltipContainerHTML).appendTo(this.container);
				}

				if (elem.is('div.password-meter')) {
					this.tooltipMessage = elem.attr('password_title');
					this.container.find('.pw_label').append(' <span class="visuallyhidden">' + this.tooltipMessage + '</span>');
				} else {
					var message = elem.attr('title').split('--');
					if (message[1] === undefined) {
						this.tooltipMessage = elem.attr('title');
						if (this.associatedLabel !== undefined) {
							this.associatedLabel.append(' <span class="visuallyhidden">' + this.tooltipMessage + '</span>');
						}
						elem.removeAttr("title");

					} else {
						this.tooltipMessage = message[1];
					}
				}

				this.tooltipBubble.append('<div class="tooltip_top"></div><div class="tooltip_center"><p>' + this.tooltipMessage + '</p></div>' + '<div class="tooltip_bottom"></div>');
				this.tooltipBottom = this.tooltipBubble.find('.tooltip_bottom');
			},
			getTooltipPosition: function() {
				this.positionOfIcon = this.tooltipIcon.offset();
				this.positionOfContainer = this.container.offset();
				this.left = this.positionOfIcon.left - this.positionOfContainer.left;
				this.top = this.positionOfIcon.top - this.positionOfContainer.top;
				this.tooltipTypeClass = this.positionOfContainer.left > $(window).width() / 2 ? 'tooltip_bottom_reverse' : 'tooltip_bottom';
				this.tooltipHeight = parseInt(this.tooltipBubble.css('height'), 10);
			},
			hideTooltip: function(e) {
				if (!(this.inputFocused || this.inputHovered || this.iconHovered || this.bubbleHovered)) {
					this.tooltipBubble.hide();
					this.container.css('z-index', '1');
				}
			},
			positionTooltip: function() {
				// If we haven't already correctly set the position, set it.
				if (!this.positionSet) {
					this.getTooltipPosition();
					this.setTooltipPosition();
					if (this.tooltipHeight !== 0 && this.left !== 0) {
						this.positionSet = true;
					}
				}
			},
			revealTooltip: function(e) {
				if (!(this.inputFocused && this.inputHovered && this.iconHovered )) {
					this.tooltipBubble.show();
					this.container.css('z-index', '3');
				}
			},
			scrunch: function() {
				// corrects Chrome bug in which br tag messes up position of tooltip icon
				var br = $('br:first', this.container);
				if (br.prev().is('label')) {
					var label = br.prev();
					br.remove();
					label.after('<br>');
				}
			},
			setEventHandlers: function(_this) {
				this.associatedInputs.on('focus', function() {
					_this.inputFocused = true;
					_this.positionTooltip();
					_this.revealTooltip();
				});

				this.associatedInputs.on('blur', function() {
					_this.inputFocused = false;
					_this.hideTooltip();
				});

				this.associatedInputs.on('mouseenter', function() {
					_this.inputHovered = true;
					setTimeout(function() {
						// require that the user hovers over it for half a second before displaying the tooltip
						if (_this.inputHovered) {
							_this.positionTooltip();
							_this.revealTooltip();
						}
					}, 500);
				});

				this.associatedInputs.on('mouseleave', function() {
					_this.inputHovered = false;
					setTimeout(function() {
						_this.hideTooltip();
					}, _this.latency);
				});

				this.tooltipIcon.on('mouseenter', function() {
					_this.iconHovered = true;
					_this.positionTooltip();
					_this.revealTooltip();
				});

				this.tooltipIcon.on('mouseleave', function() {
					_this.iconHovered = false;
					setTimeout(function() {
						_this.hideTooltip();
					}, _this.latency);
				});

				// Adding events here prevents flickering
				this.tooltipBubble.on('mouseenter', function() {
					_this.bubbleHovered = true;
				});

				this.tooltipBubble.on('mouseleave', function() {
					_this.bubbleHovered = false;
					setTimeout(function() {
						_this.hideTooltip();
					}, _this.latency);
				});
			},
			setTooltipPosition: function() {
				var elem = this.associatedInputs,
					vOffset = this.container.children('input').hasClass('error-textbox')? 140 : 150,
					hOffset = this.positionOfContainer.left > $(window).width() / 2 ? this.container.width() - this.tooltipBubble.width() + 35 : this.left - 30;
				this.tooltipBubble.css('top', this.top - this.tooltipHeight);
				this.tooltipBubble.css('left', hOffset);

				if (elem.hasClass('password-meter')) {
					this.tooltipIcon.css('margin-top', '18px');
					this.tooltipBubble.css('margin-top', '10px');
				}
				if (this.tooltipTypeClass == 'tooltip_bottom_reverse') {
					this.tooltipBottom
						.removeClass('tooltip_bottom')
						.addClass(this.tooltipTypeClass);
				}
			}
		};

		return {
			'init': function() {
				var elements = $('input[type=text], input[type=password], input[type=radio], select, div');

				elements.each(function (event) {
					var elem = $(this);
					if ((elem.attr('title') !== undefined && elem.parent().children('.tooltip').length === 0 && elem.attr('notooltip') === undefined) || (elem.attr('password_title') !== undefined)) {
						new Tooltip($(this));
					}
				});
			},
			'manager': tooltipManager
		};

	})();

	




	var methods = {
		init: function() {
			// keeping the structure of initiating tooltips
			window.citi.tooltipPlugin.init();
		},
		flyoutCounter: 0,
		flyout: function() {
			$(".flyout").each(function(event) {
				var elem = $(this),
					flyoutCounter = methods.flyoutCounter++,
					flyout_id = 'flyout_' + flyoutCounter;

				elem.append("<div class='flyout_content'></div>");


				var innerText = elem.parent().children('#flyout-' + elem.attr("id"));

				var flyoutBubble = elem.children(".flyout_content");

				flyoutBubble
					.attr('role', 'dialog')
					.hide()
					.attr('aria-hidden', 'true')
					.attr('aria-labelledby', flyout_id);

				flyoutBubble.append("<div class='flyout_spike'></div>");
				flyoutBubble.append("<div class='flyout_body_wrapper'><div class='flyout_top'></div> <div class='flyout_center'><div class='flyout_text' id=" + flyout_id + ">" + innerText.html() + "</div></div><div class='flyout_bottom'></div></div>");

				// extract Close button from content and place as sibling above
				var flyoutCenter = flyoutBubble.find('.flyout_center');
				var closeButton = flyoutCenter.find('.flyout-close-btn');
				closeButton
					.remove()
					.prependTo(flyoutCenter);

				var flyoutSpike = flyoutBubble.children(".flyout_spike");
				var flyoutWrapper = flyoutBubble.children(".flyout_body_wrapper");
				var flyoutCenter = flyoutBubble.children(".flyout_body_wrapper").children(".flyout_center");


				if (flyoutBubble.height() <= 120) {
					flyoutBubble.css("top", "-40px");
					flyoutSpike.css("top", "15px");
				} else {
					flyoutBubble.css("top", "-90px");
				}



				flyoutBubble.css("left", "3px");

				elem.children("a").click(function(event) {
					event.preventDefault();

					//Hides all other flyouts
					$(".flyout_content")
						.hide()
						.attr('aria-hidden', 'true');

					//Shows container that was clicked
					flyoutBubble
						.show()
						.attr('aria-hidden', 'false');

					// focus on first focusable item
					flyoutBubble.find("a[href], input, textarea, select, button, *[tabindex]").filter(":visible").first().focus();


					return false;
				});

				$(".flyout-close-btn").click(function(event) {
					var id = $(this).parent().parent().parent();
					event.preventDefault();
					id
						.hide()
						.attr('aria-hidden', 'true');
					id.parent().children("a").focus();
				});

			});

		}

	};

	$.fn.tooltip = function(method) {
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist in this plugin');
			console.log($.error);
		}
		//** End of Plugin **//
	};
});