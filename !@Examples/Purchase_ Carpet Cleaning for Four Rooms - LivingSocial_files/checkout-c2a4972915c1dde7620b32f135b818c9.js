/*
 * jQuery validation plug-in 1.7
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.validate.js 6403 2009-06-17 14:27:16Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}
		
		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator); 
		
		if ( validator.settings.onsubmit ) {
		
			// allow suppresing validation by adding a cancel class to the submit button
			this.find("input, button").filter(".cancel").click(function() {
				validator.cancelSubmit = true;
			});
			
			// when a submitHandler is used, capture the submitting button
			if (validator.settings.submitHandler) {
				this.find("input, button").filter(":submit").click(function() {
					validator.submitButton = this;
				});
			}
		
			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();
					
				function handle() {
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}
					
				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}
		
		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
        if ( $(this[0]).is('form')) {
            return this.validate().form();
        } else {
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() {
				valid &= validator.element(this);
            });
            return valid;
        }
    },
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];
		
		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}
		
		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.metadataRules(element),
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.staticRules(element)
		), element);
		
		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}
		
		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length == 1 ) 
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	if ( arguments.length > 2 && params.constructor != Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor != Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {
	
	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: [],
		ignoreTitle: false,
		onfocusin: function(element) {
			this.lastActive = element;
				
			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				this.errorsFor(element).hide();
			}
		},
		onfocusout: function(element) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element) {
			if ( element.name in this.submitted || element == this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted )
				this.element(element);
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted)
				this.element(element.parentNode);
		},
		highlight: function( element, errorClass, validClass ) {
			$(element).addClass(errorClass).removeClass(validClass);
		},
		unhighlight: function( element, errorClass, validClass ) {
			$(element).removeClass(errorClass).addClass(validClass);
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},
	
	autoCreateRanges: false,
	
	prototype: {
		
		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();
			
			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				$.each(value.split(/\s/), function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});
			
			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				validator.settings[eventType] && validator.settings[eventType].call(validator, this[0] );
			}
			$(this.currentForm)
				.validateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", delegate)
				.validateDelegate(":radio, :checkbox, select, option", "click", delegate);

			if (this.settings.invalidHandler)
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid())
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			this.showErrors();
			return this.valid();
		},
		
		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid(); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.clean( element );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		},
		
		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass );
		},
		
		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},
		
		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},
		
		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},
		
		valid: function() {
			return this.size() == 0;
		},
		
		size: function() {
			return this.errorList.length;
		},
		
		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},
		
		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},
		
		elements: function() {
			var validator = this,
				rulesCache = {};
			
			// select all valid inputs inside the form (no submit or reset buttons)
			// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
			return $([]).add(this.currentForm.elements)
			.filter(":input")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);
			
				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;
				
				rulesCache[this.name] = true;
				return true;
			});
		},
		
		clean: function( selector ) {
			return $( selector )[0];
		},
		
		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},
		
		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},
		
		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},
		
		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},
	
		check: function( element ) {
			element = this.clean( element );
			
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name )[0];
			}
			
			var rules = $(element).rules();
			var dependencyMismatch = false;
			for( method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );
					
					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;
					
					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}
					
					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},
		
		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;
			
			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();
			
			return meta && meta.messages && meta.messages[method];
		},
		
		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},
		
		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},
		
		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},
		
		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message == "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
			}			
			this.errorList.push({
				message: message,
				element: element
			});
			
			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},
		
		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		},
		
		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},
		
		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},
		
		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},
		
		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass().addClass( this.settings.errorClass );
			
				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},
		
		errorsFor: function(element) {
			var name = this.idOrName(element);
    		return this.errors().filter(function() {
				return $(this).attr('for') == name;
			});
		},
		
		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},
		
		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},
		
		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},
	
		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},
	
		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},
		
		optional: function(element) {
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},
		
		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},
		
		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},
		
		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}
		
	},
	
	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},
	
	addClassRules: function(className, rules) {
		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},
	
	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.validator.classRuleSettings) {
				$.extend(rules, $.validator.classRuleSettings[this]);
			}
		});
		return rules;
	},
	
	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);
		
		for (method in $.validator.methods) {
			var value = $element.attr(method);
			if (value) {
				rules[method] = value;
			}
		}
		
		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}
		
		return rules;
	},
	
	metadataRules: function(element) {
		if (!$.metadata) return {};
		
		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},
	
	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},
	
	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});
		
		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});
		
		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});
		
		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}
		
		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) {
			delete rules.messages;
		}
		
		return rules;
	},
	
	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message != undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			
			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;
			
			param = typeof param == "string" && {url:param} || param; 
			
			if ( previous.old !== value ) {
				previous.old = value;
				var validator = this;
				this.startRequest(element);
				var data = {};
				data[element.name] = value;
				$.ajax($.extend(true, {
					url: param,
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					success: function(response) {
						validator.settings.messages[element.name].remote = previous.originalMessage;
						var valid = response === true;
						if ( valid ) {
							var submitted = validator.formSubmitted;
							validator.prepareElement(element);
							validator.formSubmitted = submitted;
							validator.successList.push(element);
							validator.showErrors();
						} else {
							var errors = {};
							var message = (previous.message = response || validator.defaultMessage( element, "remote" ));
							errors[element.name] = $.isFunction(message) ? message(value) : message;
							validator.showErrors(errors);
						}
						previous.valid = valid;
						validator.stopRequest(element, valid);
					}
				}, param));
				return "pending";
			} else if( this.pending[element.name] ) {
				return "pending";
			}
			return previous.valid;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},
        
		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only digits, dashes, and spaces
			if (/[^0-9- ]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i")); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
				$(element).valid();
			});
			return value == target.val();
		}
		
	}
	
});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 
;(function($) {
	var ajax = $.ajax;
	var pendingRequests = {};
	$.ajax = function(settings) {
		// create settings for compatibility with ajaxSetup
		settings = $.extend(settings, $.extend({}, $.ajaxSettings, settings));
		var port = settings.port;
		if (settings.mode == "abort") {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			return (pendingRequests[port] = ajax.apply(this, arguments));
		}
		return ajax.apply(this, arguments);
	};
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target 
;(function($) {
	// only implement if not provided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
		$.each({
			focus: 'focusin',
			blur: 'focusout'	
		}, function( original, fix ){
			$.event.special[fix] = {
				setup:function() {
					this.addEventListener( original, handler, true );
				},
				teardown:function() {
					this.removeEventListener( original, handler, true );
				},
				handler: function(e) {
					arguments[0] = $.event.fix(e);
					arguments[0].type = fix;
					return $.event.handle.apply(this, arguments);
				}
			};
			function handler(e) {
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			}
		});
	};
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
})(jQuery);
;/*
 * Facebox (for jQuery)
 * version: 1.2 (05/05/2008)
 * @requires jQuery v1.2 or later
 *
 * Examples at http://famspam.com/facebox/
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2007, 2008 Chris Wanstrath [ chris@ozmm.org ]
 *
 * Usage:
 *  
 *  jQuery(document).ready(function() {
 *    jQuery('a[rel*=facebox]').facebox() 
 *  })
 *
 *  <a href="#terms" rel="facebox">Terms</a>
 *    Loads the #terms div in the box
 *
 *  <a href="terms.html" rel="facebox">Terms</a>
 *    Loads the terms.html page in the box
 *
 *  <a href="terms.png" rel="facebox">Terms</a>
 *    Loads the terms.png image in the box
 *
 *
 *  You can also use it programmatically:
 * 
 *    jQuery.facebox('some html')
 *
 *  The above will open a facebox with "some html" as the content.
 *    
 *    jQuery.facebox(function($) { 
 *      $.get('blah.html', function(data) { $.facebox(data) })
 *    })
 *
 *  The above will show a loading screen before the passed function is called,
 *  allowing for a better ajaxy experience.
 *
 *  The facebox function can also display an ajax page or image:
 *  
 *    jQuery.facebox({ ajax: 'remote.html' })
 *    jQuery.facebox({ image: 'dude.jpg' })
 *
 *  Want to close the facebox?  Trigger the 'close.facebox' document event:
 *
 *    jQuery(document).trigger('close.facebox')
 *
 *  Facebox also has a bunch of other hooks:
 *
 *    loading.facebox
 *    beforeReveal.facebox
 *    reveal.facebox (aliased as 'afterReveal.facebox')
 *    init.facebox
 *
 *  Simply bind a function to any of these hooks:
 *
 *   $(document).bind('reveal.facebox', function() { ...stuff to do after the facebox and contents are revealed... })
 *
 */
(function($) {
  $.facebox = function(data, klass) {
    $.facebox.loading();

    if (data.ajax) fillFaceboxFromAjax(data.ajax);
    else if (data.image) fillFaceboxFromImage(data.image);
    else if (data.div) fillFaceboxFromHref(data.div, klass);
    else if ($.isFunction(data)) data.call($);
    else $.facebox.reveal(data, klass);
  };

  /*
   * Public, $.facebox methods
   */

  $.extend($.facebox, {
    settings: {
      opacity      : 0.4,
      overlay      : true,
      modal        : false,
      loadingImage : window.location.protocol + '//a1.lscdn.net/deals/images/bingy/facebox/loading.gif',
      closeImage   : window.location.protocol + '//a1.lscdn.net/deals/images/bingy/facebox/closelabel.gif',
      imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
      faceboxHtml  : '\
    <div id="facebox" style="display:none;"> \
      <div class="popup modal"> \
        <a class="close-fb-modal close" href="#">×</a> \
        <table> \
          <tbody> \
            <tr> \
              <td class="tl"/><td class="b"/><td class="tr"/> \
            </tr> \
            <tr> \
              <td class="b"/> \
              <td class="body"> \
                <div class="content"> \
                </div> \
              </td> \
              <td class="b"/> \
            </tr> \
            <tr> \
              <td class="bl"/><td class="b"/><td class="br"/> \
            </tr> \
          </tbody> \
        </table> \
      </div> \
    </div>'
    },

    loading: function() {
      init();
      if ($('#facebox .loading').length == 1) return true;
      showOverlay();
      var leftOffset = 385.5;
      if($("#main").length > 0){
        leftOffset = $("#main").offset().left;
      }
      $('#facebox .content').empty();
      $('#facebox .body').children().hide().end().
        append('<div class="loading"><img src="'+$.facebox.settings.loadingImage+'"/></div>');

      $('#facebox').css({
        top:	getPageScroll()[1] + (getPageHeight() / 10),
        left:	leftOffset
      }).show();

      $(document).bind('keydown.facebox', function(e) {
        if (e.keyCode == 27) $.facebox.close();
        return true;
      });
      $(document).trigger('loading.facebox');
      return false;
    },

    reveal: function(data, klass) {
      $(document).trigger('beforeReveal.facebox');
      if (klass) { 
        $('#facebox').addClass(klass);
        $('#facebox .content').addClass(klass);
      }
      $('#facebox .content').append(data);
      $('#facebox .loading').remove();
      $('#facebox .body').children().fadeIn('normal');
      $('#facebox').css('left', $(window).width() / 2 - ($('#facebox table').width() / 2));
      if($('#facebox').offset().top < 200) {
        $('#facebox').css('top', "200px");
      }
      $(document).trigger('reveal.facebox').trigger('afterReveal.facebox');
    },

    close: function() {
      $(document).trigger('close.facebox');
      return false;
    }
  });

  /*
   * Public, $.fn methods
   */

  $.fn.facebox = function(settings) {
    init(settings);

    function clickHandler() {
      $.facebox.loading(true);

      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/);
      if (klass) klass = klass[1];

      fillFaceboxFromHref(this.href, klass);
      return false;
    }

    return this.click(clickHandler);
  };

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if ($.facebox.settings.inited) return true;
    else $.facebox.settings.inited = true;

    $(document).trigger('init.facebox');
    makeCompatible();

    var imageTypes = $.facebox.settings.imageTypes.join('|');
    $.facebox.settings.imageTypesRegexp = new RegExp('\.' + imageTypes + '$', 'i');

    if (settings) $.extend($.facebox.settings, settings);
    $('body').append($.facebox.settings.faceboxHtml);

    var preload = [ new Image(), new Image() ];
    preload[0].src = $.facebox.settings.closeImage;
    preload[1].src = $.facebox.settings.loadingImage;

    $('#facebox').find('.b:first, .bl, .br, .tl, .tr').each(function() {
      preload.push(new Image());
      preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1');
    });
    $('#facebox .close, #facebox .close-fb-modal').click($.facebox.close);
    $('#facebox .close_image').attr('src', $.facebox.settings.closeImage);
    return false;
  }
  
  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;	
    }
    return new Array(xScroll,yScroll) ;
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight;
    if (self.innerHeight) {	// all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }	
    return windowHeight;
  }

  // Backwards compatibility
  function makeCompatible() {
    var $s = $.facebox.settings;

    $s.loadingImage = $s.loading_image || $s.loadingImage;
    $s.closeImage = $s.close_image || $s.closeImage;
    $s.imageTypes = $s.image_types || $s.imageTypes;
    $s.faceboxHtml = $s.facebox_html || $s.faceboxHtml;
  }

  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
    if (href.match(/#/)) {
      var url    = window.location.href.split('#')[0];
      var target = href.replace(url,'');
      $.facebox.reveal($(target).clone().show(), klass);

    // image
    } else if (href.match($.facebox.settings.imageTypesRegexp)) {
      fillFaceboxFromImage(href, klass);
    // ajax
    } else {
      fillFaceboxFromAjax(href, klass);
    }
  }

  function fillFaceboxFromImage(href, klass) {
    var image = new Image();
    image.onload = function() {
      $.facebox.reveal('<div class="image"><img src="' + image.src + '" /></div>', klass);
    };
    image.src = href;
  }

  function fillFaceboxFromAjax(href, klass) {
    $.get(href, function(data) { $.facebox.reveal(data, klass); }, 'html');
  }

  function skipOverlay() {
    return $.facebox.settings.overlay == false || $.facebox.settings.opacity === null;
  }

  function showOverlay() {
    if (skipOverlay()) return;

    if ($('facebox_overlay').length == 0) 
      $("body").append('<div id="facebox_overlay" class="facebox_hide"></div>');

    $('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', $.facebox.settings.opacity)
      .click(function() { 
        if (!$.facebox.settings.modal) {
          $(document).trigger('close.facebox'); 
        }
      })
      .fadeIn(200);
  }

  function hideOverlay() {
    if (skipOverlay()) return;

    $('#facebox_overlay').fadeOut(100, function(){
      $("#facebox_overlay").removeClass("facebox_overlayBG");
      $("#facebox_overlay").addClass("facebox_hide") ;
      $("#facebox_overlay").remove();
    });
  }

  /*
   * Bindings
   */

  $(document).bind('close.facebox', function() {
    $(document).unbind('keydown.facebox');
    $('#facebox').fadeOut(function() {
      $('#facebox').removeClass();
      $('#facebox .content').removeClass().addClass('content');
      hideOverlay();
      $('#facebox .loading').remove();
      $(document).trigger('afterClose.facebox')
    });
  });

})(jQuery);;// global jquery ajax settings to supports rails respond_to
jQuery.ajaxSetup({
  beforeSend: function (xhr) {xhr.setRequestHeader("Accept", "text/javascript");}
});

$(function() {
  if ($.browser.msie) {
    $('body').addClass('ie').addClass('ie' + $.browser.version.substring(0,1));
  }

  // Account Panel
  var myAccountPanel = $('#my-account');
  var myAccountPanelTop = 35;

  $('#new-badge').delegate('#my-account-handle', 'click', function(e) {
    myAccountPanel = $('#my-account');
    e.preventDefault();
    e.stopPropagation();

    $(this).closest('li').toggleClass('active');
    if (myAccountPanel.is(':visible')) {
      myAccountPanel.hide();
    } else {
      myAccountPanel.
        css({top: (myAccountPanelTop - 10 +'px'), opacity: 0.0}).
        show().
        animate({top: (myAccountPanelTop + 'px'), opacity: 1.0}, {duration: 200});
    }
  });

  $('html').click(function() {
    if (myAccountPanel.is(':visible')) {
      myAccountPanel.hide();
      $('#new-badge .user').removeClass('active');
    }
  });

});

/* Fallback Carousel for Adventures Homepage */
$(function advFallback(){
    $('.adventures-fallback img:gt(0)').hide();
    setInterval(function(){
      $('.adventures-fallback :first-child').fadeOut()
         .next('img').fadeIn()
         .end().appendTo('.adventures-fallback');},
      3000);
});

$('a[rel*=facebox]').facebox();

function appendAsynchScript(src) {
  var _s=document.createElement('script'); _s.async = true;
  _s.src=('https:' == document.location.protocol ? 'https://' : 'http://') + src;
  var _fs = document.getElementsByTagName('script')[0];// script is guarenteed to exist
  _fs.parentNode.insertBefore(_s, _fs);
}

(function($) {
  $.getQueryStringParam = function(name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results ? results[1] : null;
  };

  dls.currency = function(total,options) {
    total  = total.toFixed(2);
    format = options.format;
    format = format.replace(/%n/, total);
    format = format.replace('.', options.separator);
    format = format.replace(/%u/, options.unit);

    return format;
  };

  dls.socialShares = {
    twttrJsAttempts: 1,
    twttrJsMaxAttempts: 10,
    add: function(url, counterId, externalId) {
      $.post(url, { external_id: externalId }, function(data){
        // counter will be incremented out of band
        // just increment on page on success
        var count = parseInt($('#'+counterId).html());
        $('#'+counterId).html(count + 1);
      });
    },
    bindTwttrEvent: function(event) {
      if (dls.socialShares.twttrJsAttempts >= dls.socialShares.twttrJsMaxAttempts) {
        return false;
      } else if (typeof twttr === 'undefined') {
        dls.socialShares.twttrJsAttempts++;
        setTimeout(function()  { dls.socialShares.bindTwttrEvent(event)}, 500);
      } else {
        event();
      }
    }
  };

  dls.widgets = {};
  dls.widgets.counter = function(element, options) {
    this.element = element;
    this.options = options;
    this.units = this.element.find('.num');
    base = 1000;
    interval = (options[2][1] == "s" ? base : 60 * base); //seconds
    var self = this;
    this.timer = setInterval(function(){ self.tick(); }, base);
  };

  dls.widgets.counter.prototype = {
    tick: function() {
      this.options[2][0] -= 1;
      this.refresh(2);
      if (this.options[2][0] < 0) {
      this.options[2][0] = 59;  //works for minutes or seconds
        this.options[1][0] -= 1;
      this.refresh(2);
      this.refresh(1);
        if (this.options[1][0] < 0) {
        flip_number = (this.options[0][1] == "d" ? 23 : 59);
        this.options[1][0] = flip_number;
        this.options[0][0] -= 1;
        this.refresh(1);
        this.refresh(0);
        }
      }
      if (this.expired()) { window.location.reload();}
    },

    expired: function() {
      return this.options[0][0] <= 0 && this.options[1][0] <= 0 && this.options[2][0] <= 0;
    },

    refresh: function(index) {
      value = this.options[index][0];
      if (value.toString().length < 2) {
        value = "0" + value;
      }
      $(this.units.get(index)).html(value);
    }
  };

  dls.creditCard = {
    edit: function(a, add) {
      $(document).one('close.facebox', function() {
        $(document).attr('title', 'My Account - LivingSocial');
      })
      $.facebox({ajax: $(a).attr('href')});
      if (add) {
        $(document).attr('title', 'Add Credit Card - LivingSocial');
      }
      else {
        $(document).attr('title', 'Edit Credit Card - LivingSocial');
      }
      return false;
    },

    destroy: function(form) {
      if (confirm('Are you sure you want to delete this credit card?')) {
        $(form).submit();
      }
      return false;
    },

    submit: function(form) {
      form = $(form);
      form.find('.errors').html(null);
      var method = 'POST';
      if (form.find('input[name=_method]').val() == 'put') {
        method = 'PUT';
      }

      Payment.addCreditCard(
        Payment.serializeHash(form),
        function(data){
          if (method == 'POST') {
            var credit_card = {'token': data.credit_card.token};
            var default_checkbox = form.find('#credit_card_default');
            if (default_checkbox.length && default_checkbox[0].checked) {
              credit_card['default'] = default_checkbox.val();
            }
            $(document)
              .trigger('reload.credit-cards')
              .trigger('close.facebox');
          } else {
            $(document).trigger('reload.credit-cards').trigger('close.facebox');
          }
        },
        function(xhr, message, errorThrown) {
          if(message=='timeout' || (xhr.status+'')=='0') {
	    form.find('.errors').append('<p>our payment processor is temporarily unavailable, please try again soon.</p>');
	  } else {
            data = $.parseJSON(xhr.responseText);
            $(data.errors).each(function(e){ form.find('.errors').append('<p>'+this+'</p>'); });
	  }
        },
        form.attr('action') + '.json'
      )

      return false;
    }
  };

  dls.purchases = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    gift: function(a) {
      console.info(a);
    },
    update_used: function(button, coupon_id) {
      // Show the mask and spinner
      $("#voucher-" + coupon_id).mask();

      // ajax submit the form
      $.post(button.href, {'_method':'put'}, function(data) {
        var voucher_row = $('#voucher-' + coupon_id);
        voucher_row.unmask();
        voucher_row.html(data);
        voucher_row.effect("highlight", {color: '#ffe383'}, 3000);
      }, 'js');

      return false;
    },
    update_gift_card: function(input) {
      var form = $(input).closest('form');
      form.find('.errors').html(null);
      $.post(form.attr('action'), form.serialize(), function(data) {
        if (data.errors) {
          $(data.errors).each(function(e){ form.find('.errors').append('<p>'+this+'</p>'); });
        } else {
          var resp = data.recipient_name;
          if (data.recipient_email.length > 0) {
            var date_items = data.deliver_email_on.split('/');
            var delivery_date = dls.purchases.months[parseInt(date_items[1], 0)-1] + ' ' + date_items[2] + ', ' + date_items[0];
            resp += ' (' + data.recipient_email + ') Delivery date: ' + delivery_date;
          }
          $('#gc-data-'+data.id).html(resp);
          $(document).trigger('close.facebox');
          $('div.system-notice').hide();
        }
      }, 'json');
    },
    claim_code: function(gc_link, purchase_id) {
      var link = $(gc_link);

      $.facebox(jtmpl('tmpl_code_processing',{}));
      $.post(link.attr('href'), function(response){
        var code = response["code"];
        var error = response["error"];
        if (code) {
          code = code.toString();
          $('#amazon-claim-code').html(code);
          $('#amazon-claim-code-link').replaceWith('<a href="/purchases/' + purchase_id + '/amazon_gift_code/register?code=' + code + '" class="button medium buy-now">apply to my Amazon.com account</a>');
        } else {
          $('#amazon-claim-code').html(error.toString());
        }
      }, 'json');
    },
    open_in_modal: function(a) {
       $.facebox({ajax: $(a).attr('href')});

       return false;
     },
     open_in_modal_div: function(a) {
       $.facebox({div: $(a).attr('href')});
     },
     submit: function(form) {
       form = $(form);
       form.find('.errors').html(null);
       $.post(form.attr('action'), form.serialize(), function(data){
         data = jQuery.parseJSON(data);
         if (data.errors) {
           $(data.errors).each(function(e){ form.find('.errors').append('<p>'+this+'</p>'); });
         } else {
           location.reload();
         }
       }, 'js');
     },

     show_fine_print: function() {
       $.facebox(jtmpl('tmpl_fine_print',{}));
       return false;
     },

     create_adventures_option_handlers: function () {
       $('a.cal').click(function(evt){
         $.facebox({ div: '#hidden-cal'}, 'adventures-cal');
         return false;
       });

     },

     create_option_handlers: function (currencyOptions, viewerCredit) {
        function currencyToNumber(currency) {
          return (parseFloat(currency.replace(currencyOptions.delimiter, "").replace(currencyOptions.separator, ".").replace(currencyOptions.unit, "")) || 0.0);
        }

        function numberToCurrency(number) {
          return dls.currency((number || 0.0), currencyOptions);
        }

        function reduce(array, f, initialValue) {
          var acc = initialValue;
          for(var i=0; i < array.length; i++) {
            acc = f(acc, array[i]);
          }
          return acc;
        }

        var $grandTotal = $('#grand_total');
        var $dealBucksUsed = $('#deal_bucks_used');

        $('.option_orders, .option_gifts').each(function(){
          var $tr = $(this);
          var price = currencyToNumber($tr.find('.price span').html());

          if($tr.hasClass('option_gifts')) {
            function toggleGiftDetails() {
              if($tr.find('input.option_gift:checked').val()) {
                var select = $tr.find('.quantity .quantity_field');
                if(select.val() < 1 && !$tr.hasClass('picker-gift')) {
                  select.val(1);
                }
                $tr.find('.option_gift_details').show();
              } else {
                $tr.find('.quantity .quantity_field').val(0);
                $tr.find('.option_gift_details').hide();
              }
            }
            $tr.find('input.option_gift').change(toggleGiftDetails);
            toggleGiftDetails();
          }

          function updateTotal() {
            var quantity = $tr.find('.quantity_field').val();

            var total = numberToCurrency(price * quantity);
            $tr.find('.total .total_value').html(total);

            var grandTotal = reduce($('#purchase td.total .total_value:visible'), function(acc, e) {
              return acc + currencyToNumber($(e).html());
            }, -viewerCredit);
            var dealBucksUsed = Math.min(viewerCredit, grandTotal + viewerCredit);
            grandTotal = Math.max(0, grandTotal);

            $grandTotal.html(numberToCurrency(grandTotal));
            $dealBucksUsed.html('&minus;' + numberToCurrency(dealBucksUsed));
            return grandTotal;
          }

          $(this).change(updateTotal);
          updateTotal();
       });
     },

     create_option_handlers_wide: function (currencyOptions, viewerCredit) {
        function currencyToNumber(currency) {
          return (parseFloat(currency.replace(currencyOptions.delimiter, "").replace(currencyOptions.separator, ".").replace(currencyOptions.unit, "")) || 0.0);
        }

        function numberToCurrency(number) {
          return dls.currency((number || 0.0), currencyOptions);
        }

        function reduce(array, f, initialValue) {
          var acc = initialValue;
          for(var i=0; i < array.length; i++) {
            acc = f(acc, array[i]);
          }
          return acc;
        }

        var $grandTotal = $('#grand_total');
        var $dealBucksUsed = $('#deal_bucks_used');

        $('.option_orders, .option_gifts').each(function(){
          var $tr = $(this);
          var price = currencyToNumber($tr.find('.price').html());

          function toggleGiftDetails() {
            if($tr.find('input.option_gift:checked').val()) {
              var select = $tr.find('.gift.quantity .quantity_field');
              if(select.val() < 1 && !$tr.hasClass('picker-gift')) {
                select.val(1);
              }
              select.show();
              $tr.find('.gift_hint').show();
              $tr.find('.total .total_value').show();
              $tr.prev().find('.gift_hint').show();
            } else {
              $tr.find('.gift.quantity .quantity_field').val(0).hide();
              $tr.find('.gift_hint').hide();
              $tr.find('.total .total_value').hide();
              $tr.prev().find('.gift_hint').hide();
            }
          }
          $tr.find('input.option_gift').change(toggleGiftDetails).change();

          function updateTotal() {
            var quantity = $tr.find('.quantity_field').val();
            var totalValue = price * quantity;
            var total = numberToCurrency(totalValue);
            $tr.find('.total .total_value').html(total);
            if (totalValue === 0.0) {
              $tr.find('.total .total_value').addClass('zero');
            } else {
              $tr.find('.total .total_value').removeClass('zero');
            }

            var totalSelected = reduce($('#purchase td.total .total_value:visible'), function(acc, e) {
              return acc + currencyToNumber($(e).html());
            }, 0);

            if(totalSelected === 0.0) {
              $(document).trigger('deals.purchases.none_selected');
            }
            else {
              $(document).trigger('deals.purchases.some_selected');
            }

            var grandTotal = Math.max(0, totalSelected - viewerCredit);
            var dealBucksUsed = Math.min(viewerCredit, grandTotal + viewerCredit);

            $grandTotal.html(numberToCurrency(grandTotal));
            $dealBucksUsed.html('&minus;' + numberToCurrency(dealBucksUsed));
            $('#grand_total').trigger('grand_total_updated');
            return grandTotal;
          }

          $(this).change(updateTotal);
          updateTotal();
         });
     }
  };

  dls.personAddress = {
    edit: function(url) {
      $.facebox({ajax: url});
      return false;
    },
    submit_email: function(form) {
      form = $(form);
      form.find('.errors').html(null);
    $("#email-submit-button").addClass("disabled").children().first().html("Saving...");
      $.post(form.attr('action') + '.js', form.serialize(), function(data){
      $("#monkey-form-contents").html(data);
      }, 'html');
      return false;
    },
    submit: function(form) {
      form = $(form);
      $.post(form.attr('action') + '.js', form.serialize(), function(data){
      $("#monkey-form-contents").html(data);
      }, 'html');
    }
  };

  dls.cities = {
    subscribe: function(a, url) {
      $(a).closest('.sub').removeClass('unsubscribed').addClass('subscribed');
      $.post(url, {
        email: dls.viewer.email
      }, function(html) {
        $('#subscriptions').html(html);
      });
    },
    add: function() {
      var select = $('#add-another-city');
      $.post(select.val(),{
        email: dls.viewer.email
      }, function(html) {
        $('#subscriptions').html(html);
      });
    },
    show_family_edition_subscription_modal: function() {
      $.facebox.settings.modal = true;
      $.facebox(jtmpl('tmpl_subscribe_to_family',{}));
    },
    add_many: function(form) {
      form = $(form);
      $button = $("#ns_submit_button");
      if($button.hasClass("disabled")) {
        return false;
      } else {
        $button.addClass("disabled");
        $.post(form.attr('action') + '.js', form.serialize(), function(html) {
          $("#subscriptions").html(html);
        });
        return false;
      }
    },
    update_subscription: function(form_id) {
      form = $('#'+form_id);
      $.post(form.attr('action') + '.js', form.serialize(), function(html) {
        $("#subscriptions").html(html);
      });
      return false;
    }
  };

  $.fn.extend({
    counter: function(options) {
      var args = Array.prototype.slice.call(arguments, 1);

      return this.each(function() {
        new dls.widgets.counter($(this), options);
      });
    },

    purchaseFilter: function() {
      return this.each(function() {
        var self = $(this);
        self.bind('click', function(e) {
          $('#purchases-filter li').removeClass('selected');
          self.addClass('selected');
          $("#purchases")
            .removeClass('unused')
            .removeClass('gift-cards')
            .removeClass('all')
            .addClass(self.find('a:first').attr('fid'));
        });
      });
    }
  });
})(jQuery);

$(document).ready(function(){
  //support for cross-browser last-child selection on deal description bullets in
  $('.deal-description ul > li:last-child,.deal-actions .details ul > li:last-child').addClass('last-child');

  //support for external link tracking
  $.expr[':'].external = function(obj){
    return !obj.href.match(/^mailto:/)
      && !(/livingsocial(.com|.co.uk)$/.test(obj.hostname));
  };

  //track external links in deal description ONLY
  $('.track-external a:external').click(function(){
    var datanode = $(this).closest('.track-external');
    var dealtype = datanode.attr('data-dealtype'),dealid = datanode.attr('data-dealid'),merchant = datanode.attr('data-merchant'),market = datanode.attr('data-market');
    var href     = $(this).prop('href');
    var domain   = href.match(/^.*\/\/([^\/]+)/)[1];
    if (domain.match(/facebook.com$/)) {
      _gaq.push(['_trackEvent', 'Deals Description - Merchant External Link FB', dealid+" - "+merchant+ " // "+market+" // "+dealtype, href]);
    } else {
      _gaq.push(['_trackEvent', 'Deals Description - Merchant External Link', dealid+" - "+merchant+ " // "+market+" // "+dealtype, href]);
    }
  });

  //fix for ie7 not wanting to go to links that are within a div.. refactor this at some point
  $('.ie7 .ls-item a img').click(function(e){
    var gotoHref = $(this).closest('a').attr('href');
    if(gotoHref != '#') {
      window.location = $(this).closest('a').attr('href');
    }
  });

  $('body').on('click', '.shipping', function() {
    $('.slideout').slideToggle();
  });

});
;;
if(!Array.prototype.map){Array.prototype.map=function(a,b){var c,d,e;if(this==null){throw new TypeError(" this is null or not defined")}var f=Object(this);var g=f.length>>>0;if({}.toString.call(a)!="[object Function]"){throw new TypeError(a+" is not a function")}if(b){c=b}d=new Array(g);e=0;while(e<g){var h,i;if(e in f){h=f[e];i=a.call(c,h,e,f);d[e]=i}e++}return d}}
if(!Array.prototype.forEach){Array.prototype.forEach=function(a,b){var c,d;if(this==null){throw new TypeError(" this is null or not defined")}var e=Object(this);var f=e.length>>>0;if({}.toString.call(a)!="[object Function]"){throw new TypeError(a+" is not a function")}if(b){c=b}d=0;while(d<f){var g;if(d in e){g=e[d];a.call(c,g,d,e)}d++}}}
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(a){"use strict";if(this==null){throw new TypeError}var b=Object(this);var c=b.length>>>0;if(c===0){return-1}var d=0;if(arguments.length>0){d=Number(arguments[1]);if(d!=d){d=0}else if(d!=0&&d!=Infinity&&d!=-Infinity){d=(d>0||-1)*Math.floor(Math.abs(d))}}if(d>=c){return-1}var e=d>=0?d:Math.max(c-Math.abs(d),0);for(;e<c;e++){if(e in b&&b[e]===a){return e}}return-1}}

if (!Date.prototype.addMonths) {
  Date.prototype.addMonths = function(value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, 30));
    return this;
  }
}
dls.pendingLogin = false;
dls.fbReady = false;
dls.notify_sso = false;
dls.xfbml_render = 0;
dls.fbConnect = {
  fbIsDown : {
    init : function(errorMsg,msgContainerSelector ){
      if ( typeof msgContainerSelector === 'string' ) {
        this.container = msgContainerSelector;
      }
      if ( typeof errorMsg === 'string' && errorMsg !== '' ) {
        this.errorMsg = errorMsg;
      }
    },
    container : '#fb-login-button',
    errorMsg : 'Well nuts. We can\'t seem to connect to Facebook\'s servers to get you logged in. We\'re doing everything we can to get it up and running again, but until then how about browsing some more great deals?',
    html : function(){
      var html =  '<div class="ls-fbDown-errorMsg">' +
                    '<img src="/deals/images/bingy/fbdownfrown.png"/>' +
                    '<p>' + this.errorMsg + '</p>' +
                  '</div>';
      return html;
    },
    hasFBObject : function(){
      return typeof window.FB === 'object' && typeof FB.init === 'function';
    },
    setTimeout : function( timeout ){
      var self = dls.fbConnect.fbIsDown;
      self.timeout = window.setTimeout(function(){
        if ( !self.hasFBObject() ) {
          $(self.container).html(self.html());
        }
      },timeout || 5000);
    },
    clearTimeout : function(){
      var self = dls.fbConnect.fbIsDown;
      window.clearTimeout(self.timeout);
      $(self.container + ' .ls-fbDown-errorMsg').remove();
    }
  },
  init: function(appKey, options) {
    dls.fbConnect.fbIsDown.setTimeout();
    window.fbAsyncInit = function() {
      var fbchannel = window.location.protocol + '//' + window.location.host +"/deals/fbchannel.html?locale=" + dls.fb_locale;

      FB.init({
        appId  : appKey,
        cookie : true,
        status : true,
        xfbml  : true,
        channelUrl: fbchannel,
        oauth  : true
      });

      FB.Event.subscribe('auth.login', dls.fbConnect.AuthResponseHandler);

      FB.Event.subscribe('edge.create', function(response) {
          $("#like-to-buy-subtext").hide();
          $("#like-to-buy-link").hide();
          $("#buy-now-phone").show();
          $("#buy-now-link").show();
        }
      );

      FB.Event.subscribe('comments.add', function(response) {
        $(document).trigger('fbcomment.added');
      });

      FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.status == 'connected') {
          $(document).trigger('fb:connected');
	  /*dls.fbConnect.AuthConnectedResponseHandler(response);*/
        }
      });

      FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          if(Me.id()() == null) {
            dls.fbConnect.AuthResponseHandler(response);
          }
        }
      });

      dls.fbReady = true;
      dls.fbConnect.fbIsDown.clearTimeout();
    };
    appendAsynchScript('connect.facebook.net/' + dls.fb_locale + '/all.js');
  },
  AuthConnectedResponseHandler: function(response) {
  },
  AuthResponseHandler: function(response) {
    if (response.authResponse && response.status == 'connected') {
      var expires = new Date();
      expires.setTime(expires.getTime()+(7*24*60*60*1000));
      document.cookie = "fbls_" + FBAppKey + "= " +
                        encodeURIComponent(JSON.stringify(response.authResponse)) +
                        ";path=/;domain=" + dls.tld +
                        ";expires=" + expires.toGMTString();
      function loginReady() {
        if (!dls.pendingLogin) {
          if(document.cookie.match(/authd=/) && $('#checkout_form')) {
            $('#checkout_form').submit();
	    return;
	  }
          if(dls.redirect_path) { window.location = dls.redirect_path;
				  return;
				}
          if (window.FbRedirectURL) { // for sharing... redirect after a share for example
            if (!window.location.search.match(/[&?]rt=[0-9]/)) {
              window.location = "/login?fba=1&rt=0&dest=" + encodeURI(FbRedirectURL);
            }
            else if (!document.cookie.match(/_lsx=2/)) {
              if (window.location.pathname.match(/deals/) && !window.location.pathname.match(/purchases|login/)) { return; }
              document.cookie = "_lsx=2; path=/; domain=" + dls.tld;
              window.location.reload();
            }
          }
          else if (!document.cookie.match(/_lsx=2/)) {
            if (window.location.pathname.match(/deals.*checkout/)) { return; }
            if (window.location.pathname.match(/deals/) && !window.location.pathname.match(/purchases|login/)) { return; }
            document.cookie = "_lsx=2; path=/; domain=" + dls.tld;
            window.location.reload();
          }
        }
      };

      function updateFBData() {
        FB.api("/fql", { return_ssl_resources:true, q:"SELECT email, first_name, last_name, sex FROM user WHERE uid = me()"}, function(response) {
        if (!response.error) {
          var email = response.data[0].email,
              first_name = response.data[0].first_name,
              last_name = response.data[0].last_name,
              sex = response.data[0].sex;
          $("#fb-login-button").html("Loading...");
          $.post('/mtrc/logins.details.web.facebook.login_page.successful');
          $.post('/mtrc/logins.sessions.finished');
          $.ajax({type:'POST', url: '/deals/update_facebook', data: { "email": email, "first_name": first_name, "last_name": last_name, "sex": sex },
            complete: loginReady,
            success: function(data) {
              if(data['redirect_path']) { dls.redirect_path = data['redirect_path']; }
            } });
        } else {
          loginReady(); // force
          console.error(JSON.stringify(response.error));
          $.post('/mtrc/logins.details.web.facebook.login_page.failed');
        }
       });
      };

      FB.getAuthResponse();
      if(dls.skip_fb_update) {
        dls.skip_fb_update = false;
        loginReady();
        return;
      }
      if(dls.notify_sso) {
        FB.api('/me', function(data) {
          var sso_fb_data = { uid: response.authResponse.userID,
                              token: response.authResponse.accessToken,
                              ref: $.cookie('ref_code'),
                              email: data.email,
                              home_city_id: ($.cookie('preferred_city_id') || $.cookie('last_viewed_city_id')),
                              client_app: 'deals',
                              subscribe: true };
          $.ajax({
            url: '/accounts/fb/authenticate',
            type: 'POST',
            data: sso_fb_data,
            success: function() {
              updateFBData();
              return true;
            },
            error: function(xhr, status) {
              console.log("FB SSO account error!");
              return false;
            }
          });
        });
      } else {
        updateFBData();
      }
    }
  },

  ssologin: function() {
    $.post('/mtrc/logins.sessions.started');
    dls.notify_sso = true;
    FB.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        if(Me.id()() == null) {
          dls.fbConnect.AuthResponseHandler(response);
          return false;
        }
      } else {
        FB.login(function(response) {}, {scope: 'email'});
      }
    });
  },

  login: function(url, callback) {
    $.post('/mtrc/fb_conn.login');
    $.post('/mtrc/logins.sessions.started');
    if (callback && window.console && window.console.error) { console.error("dls.login with callback deprecated."); }
    FB.login(function(response) {
      if (response.session) {
        if (dls.isHomePage) {
          $(document).trigger('reload.session');
        } else {
          window.FbRedirectURL = url;
        }
        if (callback) {
          callback.call();
        }
      }
    });
    return false;
  },

  updateFBEmailRetry: true,
  updateFBEmail: function(successCallback) {
    FB.api("/fql", { return_ssl_resources:true, q:"SELECT email, first_name, last_name, sex FROM user WHERE uid = me()"}, function(response) {
        if (!response.error) {
          if(typeof response.data[0] === 'undefined' && updateFBEmailRetry) {
            updateFBEmailRetry = false;
            setTimeout(function() {
	      dls.fbConnect.updateFBEmail(successCallback);
	    }, 150);
          } else {
            var email = response.data[0].email,
              first_name = response.data[0].first_name,
              last_name = response.data[0].last_name,
              sex = response.data[0].sex;
            $.ajax({type:'POST', url: '/deals/update_facebook', data: { "email": email, "first_name": first_name, "last_name": last_name, "sex": sex },
              complete: function(data) { },
              success: successCallback
            });
         }
       }
    });
  },
  top_friends: function() {
    $.post('/mtrc/fb_conn.top_friends');
    FB.api('/', 'post', {
      batch: [
        {
          relative_url: 'fql?q=' + encodeURIComponent("SELECT uid,name, pic, mutual_friend_count FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())"),
          method: 'get'
        }
      ]
    }, function (batch_response) {
      if ( typeof batch_response[0] !== 'undefined' && typeof batch_response[0].body !== 'undefined' ) {
        // TODO: Look for paging links to get more results if necessary
        var results = JSON.parse(batch_response[0].body);
        results = results.data;
        results.sort(function(a,b){return b.mutual_friend_count - a.mutual_friend_count});
        if ( typeof callback === 'function' ) {
          callback.call(callbackScope || window, results);
        }
      }
    });
  },
  sendMessage : function( friendId, config, callback ) {
    $.post('/mtrc/fb_conn.sendmessage');
    var defaults = {
      name : document.title,
      link : window.location.toString(),
      picture : '',
      method : 'send',
      to : friendId || 0,
      description : ''
    },
    uiOptions = $.extend(defaults,config);
    uiOptions = dls.fbConnect._createFBDialogObj(uiOptions);
    FB.ui(uiOptions,callback);
  },
  // callback: (error, friends)
  friends_posted: function(graph_type, resource_url, callback) {
    $.post('/mtrc/fb_conn.friends_posted');
    var friends = [], referFriends = {};
    FB.api("/fql", {return_ssl_resources: true, q: "SELECT uid, name, sex, pic_square FROM user WHERE is_app_user = 1 and uid IN (SELECT uid2 FROM friend WHERE uid1=me())"}, function(response) {
      if (response.error) { callback(response.error, []); return; }
      var users = response.data;
      if (users) {
        var batch = [];

        if (!window.console) { window.console = { log: function() { } } }

        function findFriendsThatBought() {
          var batchedUsers = {};
          batch.forEach(function(bset) { return batchedUsers[bset.user.uid] = bset.user; });
          FB.api('/?return_ssl_resources=1', 'post', {batch: batch}, function (batch_response) {
            if (batch_response.error) { callback(batch_response.error, []); return; }
            batch_response.forEach(function(bres) {
              if (!bres || !bres.body) { return; }
              JSON.parse(bres.body).data.forEach(function(o) {
                var post = o.data,
                    user = batchedUsers[o.from.id];
                if (!referFriends[user.uid] &&
                    post && post.deal && parseInt(post.deal.url.replace(/.*deals\/(\d+)/,'$1')) ==
                                         parseInt(resource_url.replace(/.*deals\/(\d+)/,'$1'))) {
                  friends.push(user);
                  referFriends[user.uid] = true;
                  return;
                }
              });
            });

            if (friends.length > 1) {
              callback(null, friends);
            } else if (0 == users.length && friends.length <= 1) {
              callback(null, friends);
            } else {
              searchUsers();
            }
          });
        }

        function searchUsers() {
          batch = [];
          while (users.length) {
            var user = users.pop();
            if (user.sex) {
              user.himher = (user.sex == 'male') ? 'him' : 'her';
            } else {
              user.himher = 'them';
            }

            batch.push({
              user: user,
              method: 'get',
              relative_url: (user.uid + '/' + graph_type),
              return_ssl_resources: '1'
            });

            if (batch.length >= 50) {
              findFriendsThatBought();
              return;
            }
          }
          findFriendsThatBought();
        }

        searchUsers();

      }
      else {
        callback(null, friends); // no friends of this app
      }
    });
  },
  _createFBDialogObj : function(options){
    var data = {
       width: '450',
       text: "share",
       link:'http://' +  window.location.host + window.location.pathname,
       caption: 'livingsocial.com'
    };

    if (options) { for (var k in options) { data[k] = options[k]; } }

    if (data.params) {
      var args = [];
      for (var k in data.params) { if (data.params[k]) { args.push(encodeURIComponent(k) + "=" + encodeURIComponent(data.params[k])); } }
      if (data.link.match(/\?/)) { data.link += "&" + args.join("&"); } else { data.link += "?" + args.join("&"); }
    }

    // check for og data tags
    if (!data.image) { data.image = $("meta[property='og:image']").attr("content"); }
    if (!data.title) { data.title = $("meta[property='og:title']").attr("content"); }
    if (!data.description) { data.description = $("meta[property='og:description']").attr("content"); }

    return data;
  }
};

// share buttons
;(function() {
  var refcodes = [],
      __id = function(id) { return document.getElementById(id); };

  function set_refcodes(codes) {
    refcodes = codes;
  }
  set_refcodes(['ref_code', 'ref', 'ref2', 'cm', 'a2u', 'rpi', 'rpt', 'rui', 'ctr']);

  function ref_codes() {
    var ref_params = {},
        parts = window.location.search.split('&');
    for (var i = 0, len = parts.length; i < len; ++i) {
      var kv = parts[i],
          l = kv.split('='),
          k = l[0].replace(/\?/,''),
          v = l[1];
      if (refcodes.indexOf(k) != -1) { ref_params[k] = v; }
    }
    return ref_params;
  }

  function share(id, options, cb) {
    var node = __id(id),
        data = {
                 width: '450',
                 text: "share",
                 href:'http://' +  window.location.host + window.location.pathname,
                 caption: 'livingsocial.com'
               };
    if (!node) { return false; }
    if (options) { for (var k in options) { data[k] = options[k]; } }
    if (data.params) {
      var args = [];
      for (var k in data.params) { if (data.params[k]) { args.push(encodeURIComponent(k) + "=" + encodeURIComponent(data.params[k])); } }
      if (data.href.match(/\?/)) { data.href += "&" + args.join("&"); } else { data.href += "?" + args.join("&"); }
    }
    // check for og data tags
    if (!data.image) { data.image = $("meta[property='og:image']").attr("content"); }
    if (!data.title) { data.title = $("meta[property='og:title']").attr("content"); }
    if (!data.description) { data.description = $("meta[property='og:description']").attr("content"); }

    cb(node, data);
    return true;
  }

  function fb_share_box_show(data, share_count, share_icon, callback) {
    var args = [];
    if (data.params && !data.href.match(/\?/)) {
      for (var k in data.params) { if (data.params[k]) { args.push(encodeURIComponent(k) + "=" + encodeURIComponent(data.params[k])); } }
    }
    if (args.length > 0) {
      if (data.href.match(/\?/)) { data.href += "&" + args.join("&"); } else { data.href += "?" + args.join("&"); }
    }
    var fbShareBundle = {
      method: "feed",
      link: data.href,
      picture: data.image,
      name: data.title,
      description: data.description}
    FB.ui(fbShareBundle, function(r) {
      dls.pendingLogin = false; // restore after ui is displayed
      if (r && r.post_id) {
        if (share_count) { share_count.innerHTML = (parseInt(share_count.innerHTML) + 1); }
        var share_url = "/social_shares?share_type=" + data.share_type;
        if (data.shareable) { share_url += "&shareable_id=" + data.shareable; }
        if (data.shareable_type) { share_url += "&shareable_type=" + data.shareable_type; }
        if (r.post_id) { share_url += "&external_id=" + r.post_id; }
        $.post(share_url, function() { if (!data.prevent_reload) { window.location.reload(); } });
        if (callback) { callback(null, r.post_id); }
      } else {
        if (callback) { callback({cancel:true}, null); }
      }
    });
  }

  function fb_share(id, options) {
    if ($(".social-share-fb").length) {
      return;
    }

    var node, data;
    if (options && options.params && !options.params.ref) { options.params.ref = 'fb_share'; }
    if (!share(id, options, function(n,d) { node = n; data = d; })) {
      return;
    }

    data.share_type = 'FacebookShare';

    var share_icon = document.createElement("a"),
        share_count= document.createElement("span");

    function fbShareClick() {
      dls.pendingLogin = true;
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          data.prevent_reload = true;
          fb_share_box_show(data, share_count, share_icon);
        }
        else {
          FB.login(function(response) {
            if (!FbMe.isfbVisible()()) { data.prevent_reload = true; }
            fb_share_box_show(data, share_count, share_icon);
          });
        }
      });
      return false;
    }

    share_icon.className = "social-share-fb";
    share_icon.title = data.title;
    share_count.className = "social-share-fb-count";
    share_icon.innerHTML = data.text;
    share_count.innerHTML = data.counts;

    node.appendChild(share_icon);
    node.appendChild(share_count);
    node.onclick = fbShareClick;
    _ls.push(['share_counts', data.share_type, data.shareable, function(count) { share_count.innerHTML = count; }]);
  }

  function email_share() {
    $.post('/mtrc/fb_conn.email_share');
    var share_url = '/touch/track?event=share';
    $('#send-to-friends-wrapper a').attr("ping", share_url);
    $('#send-to-friends-wrapper a').click(function(e) {
      if (!("ping" in document.createElement("a"))) {
        $.ajax({
          url: share_url,
          async: false,
          timeout: 800
        });
      }
      return true;
    });
  }

  function tw_share(id, options) {
    $.post('/mtrc/fb_conn.tw_share');
    if ($(".twitter-share-button").length) {
      return;
    }

    var locales = ['nl','en','fr', 'de', 'id', 'it', 'ja', 'ko', 'pt', 'ru', 'es', 'tr'],
        node, data;
    if (options && options.params && !options.params.ref) { options.params.ref = 'tw_share'; }
    if (!share(id, options, function(n,d) { node = n; data = d; })) {
      return;
    }
    data.share_type = 'TwitterShare';
    if (data.href) { data.options.url = data.href; }
    if (data.locale) {
      for (var i = 0; i < locales.length; ++i) {
        if (locales[i].match(data.locale)) {
          data.options.lang = locales[i];
          break;
        }
      }
    }

    var share_icon   = document.createElement("a"),
        share_count  = document.createElement("span"),
        tweet_button = document.createElement('div');

    var tweetCallback = function() {
      $.post('/mtrc/fb_conn.tweet_callback');
      twttr.events.bind('tweet', function(event) {
        if (event) {
          share_count.innerHTML = (parseInt(share_count.innerHTML) + 1);
          var share_url = "/social_shares?share_type=" + data.share_type;
          if (data.shareable) { share_url += "&shareable_id=" + data.shareable; }
          if (data.shareable_type) { share_url += "&shareable_type=" + data.shareable_type; }
          $.post(share_url);
        };
      });
    };
    dls.socialShares.bindTwttrEvent(tweetCallback);

    tweet_button.id = 'tweet-button';
    tweet_button.appendChild(share_icon);
    share_icon.className = "twitter-share-button";
    for (var k in data.options) {
      $(share_icon).attr('data-' + k, data.options[k]);
    }

    share_count.className = "social-share-twitter-count";
    share_count.innerHTML = data.counts;

    node.appendChild(tweet_button);
    node.appendChild(share_count);

    appendAsynchScript('platform.twitter.com/widgets.js');

    _ls.push(['share_counts', data.share_type, data.shareable, function(count) { share_count.innerHTML = count; }]);
  }

  // relace the contents of the given element with the facebook like button, ensure any reference codes are also included
  function fb_like(id, options) {
    $.post('/mtrc/fb_conn.fb_like');
    var node = document.getElementById(id),
        data = {
                 send: 'false',
                 width: '450',
                 'show-faces': false,
                 layout: 'button_count',
                 href: window.location.protocol + '//' +  window.location.host + window.location.pathname
               };
    if (options) { for (var k in options) { data[k] = options[k]; } }

    // fb_ref is special
    if (!data.ref) {
      var refs = ref_codes(); // grab ref params from window.location
      var refstr = [];
      for (var k in refs) {
        refstr.push(k + ':' + refs[k]);
      }
      data.ref = refstr.join("+");
    }

    var data_attrs = [];
    for (var dattr in data) { data_attrs.push("data-" + dattr + "=\"" + data[dattr] + "\""); }
    var button = "<div class='fb-like' " + data_attrs.join(' ') + "></div>";
    node.innerHTML = button;

    if ($.trim($('div.fb-like').html()) =='') {
      FB.XFBML.parse(node);
    }
    return node;
  }

  function fb_send(id, options) {
    var node = document.getElementById(id),
        data = {
                 send: 'false',
                 width: '450',
                 'show-faces': false,
                 layout: 'button_count',
                 href: window.location.protocol + '//' +  window.location.host + window.location.pathname
               };
    if (options) { for (var k in options) { data[k] = options[k]; } }

    // fb_ref is special
    if (!data.ref) {
      var refs = ref_codes(); // grab ref params from window.location
      var refstr = [];
      for (var k in refs) {
        refstr.push(k + ':' + refs[k]);
      }
      data.ref = refstr.join("+");
    }

    var data_attrs = [];
    for (var dattr in data) { data_attrs.push("data-" + dattr + "=\"" + data[dattr] + "\""); }
    var button = "<div class='fb-send' " + data_attrs.join(' ') + "></div>";
    node.innerHTML = button;

    if ($.trim($('div.fb-send').html()) == '') {
      FB.XFBML.parse(node);
    }
    return node;
  }

  var fetchedCounts = null,
      sharefetching = false,
      fetchback = [];

  function share_counts(sharetype, shareid, cb) {
    $.post('/mtrc/fb_conn.share_counts');
    if (fetchedCounts) {
      cb(fetchedCounts[sharetype]);
    }
    else {
      if (sharefetching) {
        fetchback.push([sharetype, shareid, cb]);
      }
      else {
        sharefetching = true;
        $.get("/shares/" + shareid + ".json", function(res) {
          fetchedCounts = {};
          fetchedCounts.TwitterShare = res.tw_count;
          fetchedCounts.FacebookShare = res.fb_count;
          fetchedCounts.DealsSold = res.number_sold;
          fetchedCounts.DealsLeft = res.deals_left;

          cb(fetchedCounts[sharetype]);
          while(fetchback.length > 0) {
            var args = fetchback.shift()
                sharetype = args.shift(),
                shareid = args.shift(),
                cb = args.shift();
            cb(fetchedCounts[sharetype]);
          }
        },'json');
      }
    }
  }

  function ls_reveal(selector, wait_time, animation_start_options, animation_end_options, speed, cb) {
    if (!wait_time) { wait_time = 500; }
    if (!animation_start_options) { animation_start_options = {opacity:0,display:'block'}; }
    if (!animation_end_options) { animation_end_options = {opacity:1}; }
    if (!speed) { speed = 'fast'; }

    setTimeout(function() {
      $(selector).css(animation_start_options);
      $(selector).animate(animation_end_options,'fast', cb);
    }, wait_time);
  }

  function trackEvent(category, action, opt_label, opt_value, opt_noninteraction) {
    _gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);

    var tracking = [];
    var tracker  = new Image();

    for (var a in arguments) { if (arguments[a]) { tracking.push(arguments[a]); } }
    tracker.src = "https://t.livingsocial.com/track/stat.gif?n=" + encodeURIComponent(tracking.join('.'));
  }

  function clip(buttonId, copyLinkId, copyLinkContainerId, options) {
    if ($(copyLinkId).length > 0) {
      options = options ? options : {};
      (function() {
        var copyLinkButton = $(buttonId);
        if (copyLinkButton.length > 0) {
	  $(buttonId).attr("data-clipboard-text",$(copyLinkId).val());
	  // Copy to Clipboard
	  var clip = new ZeroClipboard( document.getElementById(buttonId.replace(/^#/,'')), {
	    moviePath: "/deals/swf/ZeroClipboard.swf"
	  });
	  clip.on('complete', function(client, args) {
	    $(copyLinkId).css({'backgroundColor':'#FFF'});
            copyLinkButton.html('<span>copied</span>');
	  });
        }
      })();
    }
  }

  function ls_share_bar(share) {
    var render_share = function(data) {
      var me = data.body;
      var uid = dls.viewer.id;

      var pid = (function() {
        if (me && me.deals && me.deals[share.deal_id]) {
          var purchases = me.deals[share.deal_id];
          var best = 0, bi = 0;
          for (var i = 0, len = purchases.length; i < len; ++i) {
            var ref_count = purchases[i][2];
            if (ref_count > best) {
              best = ref_count;
              bi = i;
            }
          }
          return purchases[bi][0];
        }
      })();

      _ls.push(['fb_share', 'fbshare', {href: share.share_url,
                                        params: {rpi: pid, rui: uid, deal_share: share.deal_share},
                                        shareable: share.deal_id,
                                        counts: share.fb_share_counts,
                                        shareable_type: share.shareable_type}]);

      _ls.push(['tw_share', 'tweetit', {
        shareable: share.deal_id,
        shareable_type: share.shareable_type,
        params: {rpi: pid, rui: uid},
        locale: share.locale,
        href: share.share_url,
        title: share.twitter_title,
        counts: share.twitter_counts,
        options: {
          counturl: encodeURIComponent(share.deal_url),
          text: share.text,
          count: "none",
          via: 'LivingSocial',
          lang: share.locale,
          width: '60px'
        }
      }]);

      _ls.push(['email_share', '', {}]);
    };
    if (document.cookie.match(/authd/)) {
      MeInfo.bind(render_share);
    } else {
      render_share({body: null, xhr: null});
    }
  }

// register functions

  var ls = {}, fb_deferred = [];
  ls.fb_like = fb_like;
  ls.fb_send = fb_send;
  ls.share_counts = share_counts;
  ls.fb_share = fb_share;
  ls.tw_share = tw_share;
  ls.email_share = email_share;
  ls.ls_reveal = ls_reveal;
  ls.fb_share_show = fb_share_box_show;
  ls._trackEvent = trackEvent;
  ls.clip = clip;
  ls.ls_share_bar = ls_share_bar;

  ls.set_refcodes = set_refcodes;

  function run_fb_deferred() {
    if (!dls.fbReady) {
      setTimeout(run_fb_deferred, 400);
      return;
    }
    // invoke deferred
    while (fb_deferred.length > 0) {
      _ls.push(fb_deferred.shift());
    }
  }

  function runner() { // async runner

    function invoke(run) {
      var func_name = run.shift(), func = ls[func_name];
      if (!dls.fbReady && func_name.match(/^fb/)) {
        run.unshift(func_name);
        fb_deferred.push(run);
      }
      else {
        func.apply(func, run);
      }

      // continue to wait for fb
      if (fb_deferred.length > 0) {
        setTimeout(run_fb_deferred, 100);
      }
    }

//    try {
      while (window._ls.length > 0) {
        invoke(_ls.shift());
      }

      // redefine push to execute immediately
      _ls.push = invoke;
      _ls.queue = invoke; // migrate to this API
//    } catch(e) {
//      setTimeout(runner, 3000);
//      console.error(e);
//    }

  }

  dls.runner = runner;

})();
;// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};

  this.jtmpl = function jtmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.

    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        jtmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
		str.replace(/[\r\t\n]/g, " ")
		   .replace(/'(?=[^#]*#>)/g,"\t")
		   .split("'").join("\\'")
		   .split("\t").join("'")
		   .replace(/<#=(.+?)#>/g, "',$1,'")
		   .split("<#").join("');")
		   .split("#>").join("p.push('")
		   + "');}return p.join('');");


    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();;/* =========================================================
 * Based on bootstrap-modal.js v2.0.0
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function( $ ){

  "use strict"

 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function ( content, options ) {
    this.options = $.extend({}, $.fn.modal.defaults, options)
    this.$element = $(content)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this

        if (this.isShown) return

        $('body').addClass('modal-open')

        this.isShown = true
        this.$element.trigger('show')

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          !that.$element.parent().length && that.$element.appendTo(document.body) //don't move modals dom position

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function ( e ) {
        e && e.preventDefault()

        if (!this.isShown) return

        var that = this
        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element
          .trigger('hide')
          .removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal( that ) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop( callback ) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        // .appendTo(document.body)
        // fix for IE7, see https://github.com/twitter/bootstrap/issues/3217
        // fixed in master, for bootstrap 2.2.0 milestone
        .insertAfter(this.$element)

      if (this.options.backdrop != 'static') {
        this.$backdrop.click($.proxy(this.hide, this))
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if (callback) {
      callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.modal', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.modal')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = typeof option == 'object' && option
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.modal(option)
    })
  })

}( window.jQuery )
;// Encapsulates behavior for the checkout flow.
//
// Each initialization method is called from its associated page in
// app/views/checkouts/<step>.html.erb.
//
checkouts = {
  // Public: Initialize the login and registration forms
  loginForms: function() {

    // initial page state
    $('#login_email').focus().select();

    // toggle between sign up and login forms
    $('#login h3 a').click(function() {
      checkouts.showRegisterForm();
      return false;
    });

	// placeholder support
	$('.checkout-content input, .checkout-content textarea').placeholder();
    // $('#register h3 a').click(function() {
    //   checkouts.showLoginForm();
    //   return false;
    // });

    $('#returning_customer p a').click(function() {
      checkouts.showLoginForm();
      $('#new_customer').show();
      $('#returning_customer').hide();
      return false;
    });

    $('.no_password_link').click(function() {
      checkouts.showRegisterForm();
      $('#returning_customer').show();
      $('#new_customer').hide(); // in case the button isn't in the container that gets .show-form
      return false;
    });

    // $('#account_link').click(function(e){
    //   $('#returning_customer').addClass('show-form');
    //   $('#new_customer').hide(); // in case the button isn't in the container that gets .show-form
    //   return false;
    // });

    function sendLoginErrorToUA(error){
      var dataLayer = window.dataLayer || [];
      dataLayer.push({
        "event": "virtualpageview",
        "checkoutpage": "login",
        "pagetype": "login",
        'errormsg': error
      })
    }

    // ajax login for the login form
    $('#login').submit(function() {
      if($(this).data('disabled')) { return false; }
      $.ajax({
        url: $(this).attr('action'),
        type: 'POST',
        data: $(this).serialize(),
        global: false,
        dataType: 'json',
        beforeSend: function() {
          checkouts.clearErrors('#login');
          $('#login').data('disabled', true);
          $("button#login").attr("disabled", "disabled");
        },
        success: function(data, status, xhr) {
          // login was successful, submit the purchase form to move on
          $('#checkout_form').submit();
        },
        error: function(xhr, status) {
          data = $.parseJSON(xhr.responseText);
          if (data.errors) {
            sendLoginErrorToUA('login error'); // <-- send error info to universal analytics to identify user pain points

            if (data.error_code == "acc3") {
              //post to deals so we can track the event
              var authenticityToken = $("meta[name='csrf-token']").attr("content");
              $.post("/deals_scribe_tracker", { event: "force_pw_reset_on_checkout",
                                                authenticity_token: authenticityToken,
                                                data: { email: $('#login input#login_email').val(),
                                                        sso_return_to_url: sso_return_to_url }
              });
              // password is expired, we redirect the user to SSO forgot password
              window.location = sso_forgot_password_url + "?reset=true&expired=true&email=" + $("#login_email").val() + "&return_to=" + sso_return_to_url;
            } else {
              checkouts.addErrorInline('#login_password', data.errors.join(' & '));
              // if there was a link included with the error, it's for "sign up".
              // Bind that behavior here:
              var errorLink = $('#login_password').closest('.control-group').find('a');
              if(errorLink) {
                errorLink.click(function() {
                  checkouts.showRegisterForm($('#login_email').val());
                  return false;
                });
              }
              $('#login_email').focus().select();
              $("button#login").removeAttr("disabled");
            }
          }
        },
        complete: function(xhr, status) {
          $('#login').data('disabled', false);
        }
      });
      return false;
    });

    // ajax for the registration form
    $('#register').submit(function() {
      if($(this).data('disabled')) { return false; }
      if ($("input#subscribe").is(":not(:checked)") && !$("input#ref").attr('value').match(/nosubs/)) {
        $("input#ref").attr("value", $("input#ref").attr("value") + "_nosubs");
      }
      $.ajax({
        url: $(this).attr('action'),
        type: 'POST',
        data: $(this).serialize(),
        global: false,
        dataType: 'json',
        beforeSend: function() {
          checkouts.clearErrors('#register');
          $('#register').data('disabled', true);
          $("button#register").attr("disabled", "disabled");
        },
        success: function(data, status, xhr) {
          // then submit the purchase form to move on
          $('#checkout_form').submit();
        },
        error: function(xhr, status) {
          data = $.parseJSON(xhr.responseText);
          if(data.errors) {
            sendLoginErrorToUA('signup error'); // <-- send error info to Universal Analytics to identify user pain points

            _.each(data.errors, function(msg, key) {
              checkouts.addErrorInline('#' + key, msg);
            });
          }
          $("button#register").removeAttr("disabled");
        },
        complete: function(xhr, status) {
          $('#register').data('disabled', false);
        }
      });
      return false;
    });
  },

  // Public: Initialize the "where should we send this deal?" email form page
  // (shows up as part of the login step for users who don't have an email on
  // file)

  emailForm: function() {
    $('#person_email').focus().select();

    $('#update_email').submit(function() {
      if($(this).data('disabled')) { return false; }

      $.ajax({
        url: $(this).attr('action'),
        type: 'POST',
        data: $(this).serialize(),
        global: false,
        dataType: 'json',
        beforeSend: function() {
          checkouts.clearErrors('#update_email');
          $('#update_email').data('disabled', 'disabled');
        },
        success: function(data, status, xhr) {

          if(data.error || data.errors) {
            if(data.error && data.error.message) {
              checkouts.addError('#person_email', data.error.message);
              $('#person_email').focus().select();
            }
            else if(data.errors) {
              _.each(data.errors, function(msg, key) {
                checkouts.addError('#person_email', msg);
              });
            }
            if(data.error && data.error.redirect) {
              window.location = data.error.redirect;
            }
          }
          else {
            // registration was successful, submit the purchase form to move on
            $('#checkout_form').submit();
          }
        },
        complete: function(xhr, status) {
          $('#update_email').data('disabled', false);
        }
      });

      return false;
    });

  },

  // Public: Initialize the options selection page, with option selection
  // drop-downs, the "grand total" line, form submission, and error checking.
  //
  // currencyOptions - a JS object representing the currency used on this form
  //                   (for internationalization)
  // viewerCredits   - how many deal bucks a customer has, if applicable
  // promoCode - (the promocode adjustment that is being applied to this purchase)
  optionsPage: function(currencyOptions, viewerCredit, promoCode) {
    checkouts.initFAQ();
    checkouts.adventuresCalendar();
    changedTotal = false;
    
    function currencyToNumber(currency) {
      return (parseFloat(currency.replace(currencyOptions.delimiter, "").replace(currencyOptions.separator, ".").replace(currencyOptions.unit, "")) || 0.0);
    }

    function numberToCurrency(number) {
      return dls.currency((number || 0.0), currencyOptions);
    }

    function customerSelectedAGift() {
      return ($("select option:selected").filter(function() {return this.value > 0;}).parent().filter(function() { return /checkout_gift_quantities_\d+$/.test(this.id); }).length > 0);
    }

    function calcPromoCodeDiscount(total, promoCode, changedTotal){
      var discount = 0;

      if(changedTotal) {
	var promoUrl = $('#checkout_form').attr('action')+'/adjust_promo';
        var checkoutData = $('#checkout_form').serialize(),
	promoCode = JSON.parse($.ajax({
          type: "POST",
	  data: checkoutData,
          url: promoUrl,
          async: false
	}).responseText);
      }
      
      window.code = promoCode;
      if(promoCode && promoCode['discounted_amount']) {
        discount = promoCode['discounted_amount'];
      }

      return discount;
    }

    function getTierValue(total, tiers){
      tiers.sort(function(a,b){
        if(a.min_price < b.min_price){ return 1}
        if(a.min_price > b.min_price){ return -1}
        return 0;
      });

      for (var i = 0; i < tiers.length; i++) {
        if (total >= tiers[i].min_price) return tiers[i].value
      }
      return 0;
    }

    // Note that this is in addition to the 'Checkout, Options, Continue' event; doing this
    // one here since data-ga-data is already used up on the #checkout_form_buy button.
    $("#checkout_form_buy").click(function() {
      if (customerSelectedAGift()) {
        _gaq.push(["_trackEvent", "Checkout", "Gift Selected"]);
      }
    });

    function updateTotal() {
      var total = 0.0;
      var fees  = 0.0;
      var bonusCredits = 0.0;

      $('#grand_total').trigger('before_grand_total_update');

      // gather the total
      $('tr select').each(function() {
        var count = $(this).val();
        if(count > 0) {
          var $price = $(this).closest('tr').find('.price');
          var price;
          if($price.length) {
            price = $price.html();
          }
          else {
            // if this row doesn't have a price in it (it's a gift row), walk back
            // up to the previous row and get the price from there instead.
            price = $(this).closest('tr').prev().find('.price').html();
          }
          total += count * currencyToNumber(price);
        }
      });

      // gather fees
      $('tr select').each(function() {
        var count = $(this).val();
        if(count > 0) {
          var fee = $(this).closest('tr').find('.fee').html();
          if(fee) {
            fees += count * currencyToNumber(fee);
          }
        }
      });

      // gather bonus credits
      $('tr select').each(function() {
        var count = $(this).val();
        if(count > 0) {
          var bonusCredit = $(this).closest('tr').find('.bonus_credit').html();
          if(bonusCredit) {
            bonusCredits += count * currencyToNumber(bonusCredit);
          }
        }
      });

      var promoCodeDiscount = calcPromoCodeDiscount(total, promoCode, changedTotal);
      if(changedTotal==false) {
	changedTotal=true;
      }
      
      var grandTotal = Math.max(0, total - viewerCredit - bonusCredits - promoCodeDiscount) + fees;
      var dealBucksUsed = Math.min(viewerCredit, total - promoCodeDiscount);
      var bonusCreditUsed = Math.min(bonusCredits , total - dealBucksUsed);

      if( dealBucksUsed < 0 ){
        dealBucksUsed = 0;
      }
      var bonusCreditUsed = Math.min(bonusCredits , total - promoCodeDiscount - dealBucksUsed);

      $('#grand_total').html(numberToCurrency(grandTotal));
      $('#deal_bucks_used').html('&minus;' + numberToCurrency(dealBucksUsed));
      $('#promo_code_used').html('&minus;' + numberToCurrency(promoCodeDiscount));
      $('#bonus_credit_used').html('&minus;' + numberToCurrency(bonusCreditUsed));

      if(total > 0 || $('#checkout_form').attr('data-boomerang') == "true") {
        checkouts.enableCheckoutForm();
      }
      else {
        checkouts.disableCheckoutForm();
        $('#deal_bucks_used').html(numberToCurrency(0));
      }

      $('#grand_total').trigger('grand_total_update');
    }
    $('tr select').change(updateTotal);

    $('#checkout_form').submit(function(){
      if($(this).data('disabled')) {
        return false;
      }
    });

    // Update the total once to make sure the button state, total, etc. are all
    // set up correctly.
    updateTotal();
  },

  // Public: disable the checkout form
  disableCheckoutForm: function() {
    // NOTE: disabling the form directly will not work in IE, as it disables
    // all the elements within. Instead, set a "disabled" data attribute,
    // which is checked on form submit.
    $('#checkout_form').data('disabled', true);
    $('#checkout_form_buy').attr('disabled', 'disabled');
  },

  // Public: enable the checkout form
  enableCheckoutForm: function() {
    $('#checkout_form').data('disabled', false);
    $('#checkout_form_buy').removeAttr('disabled');
  },

  // Public: Initialize the payment page
  //
  // creditCardOptions - parameters to initialize the credit card fields
  //
  paymentPage: function(creditCardOptions) {

    var credit_card = CheckoutCreditCard();
    // FIXME change init args to form, payment form, and opts instead of this
    // merge
    credit_card.setup($.extend(
      {},
      creditCardOptions,
      {
        form: $('#checkout_form'),
        paymentForm: $('#new_credit_card')
      }
    ));
    $('#credit_card_cardholder_first_name').focus().select();
    checkouts.fixFormErrors();

    // if there's an error in a modal, open it up and focus on the error:
    var errorModal = $('.control-group.error input').closest('.modal');
    if(errorModal.length) {
      errorModal.modal({backdrop: 'static', keyboard: false});
      errorModal.find('.control-group.error:first input').focus().select();
    }

    // tabbed navigation interaction if alternate payments are present
    $('a[data-toggle="tab"]').on('shown', function (e) {
      $(e.target).find('input').attr('checked', 'checked');
      var firstInput = $(e.target).parents('.tabbable').find('.tab-pane.active input').filter(':visible')[0];
      $(firstInput).focus().select();
      $(e.relatedTarget).find('input').attr('checked', false);
    });
  },

  // Public: Initialize the shipping page
  //
  //
  shippingPage: function() {
    checkouts.fixFormErrors();
    $('#shipping_address_name').focus().select();
  },

  // Public: Initialize the purchase confirmation page
  //
  // modal_path        - path to the change payment modal action
  // creditCardOptions - parameters to initialize the credit card fields, e.g.
  //                     zip code error messages, etc.
  //
  confirmationPage: function(creditCardOptions) {
    checkouts.initFAQ();
    checkouts.paymentModalInteraction();

    var credit_card = CheckoutCreditCard();
    credit_card.setup($.extend(
      {},
      creditCardOptions,
      {
        form: $('#checkout_new_credit_card'),
        paymentForm: $('#new_credit_card')
      }
    ));

    // load and show the initial modal:
    $('#change_payment').click(function(){
      $('#credit_card_form').show();
      $('#new_credit_card_form').hide();
      $('#credit-card-modal').modal();

      var radio_inputs = $('#checkout_choose_payment_method input[type=radio]');
      if (radio_inputs.length == 1) {
        var selector = '#' + radio_inputs.val() + '-modal';
        $(selector).modal();
      }

      return false;
    });

    this.travelerInfoModal();
    this.updateTravelerInformation();

    // purchase form submit button handling is in confirm.html.erb
  },

  optionsPromoCodeForm: function(hasErrors) {
    $('#redeem-promo-code').click(function() {
      $('#js-promo-code-inputs').fadeIn(function() {
        $('#promo-code').focus().select();
      });
      $(this).parent('p').hide();
      return false;
    });

    $('#promo-code').keypress(function(e) {
      if(e.which == 13) {
        checkouts.submitPromoCodeForm();
      }
      return true;
    });

    $('#apply-promo-code').click(function() {
      checkouts.submitPromoCodeForm();
    });

    if(hasErrors) {
      $('#promo-code').focus().select();
    }
  },

  submitPromoCodeForm: function() {
    $('#checkout_form').data('disabled', false);
    $('#promo-code-applied').val('true');
  },

  // promo code form events for confirmation page
  promoCodeForm: function(hasErrors) {
    // move promo code form into purchase form
    // different places on options page vs confirm page
    $('#promo-codes').insertBefore('#confirm-purchase').show();

    $('#redeem-promo-code').click(function() {
      $('#promo_code_form').fadeIn(function() {
        $('#promo-code').focus().select();
      });
      $(this).parent('p').hide();
      return false;
    });

    if(hasErrors) {
      $('#promo-code').focus().select();
    }
  },

  resolveDeclinePage: function(creditCardOptions) {
    var new_credit_card = CheckoutCreditCard();
    new_credit_card.setup($.extend(
      {},
      creditCardOptions,
      {
        form: $('#checkout_new_credit_card'),
        paymentForm: $('#new_credit_card')
      }
    ));

    var existing_credit_card = CheckoutCreditCard();
    existing_credit_card.setup($.extend(
      {},
      creditCardOptions,
      {
        form: $('#checkout_update_credit_card'),
        paymentForm: $('#update_credit_card')
      }
    ));

    this.paymentModalInteraction();

    $('#change_payment').click(function(){
      $('#credit_card_form').show();
      $('#new_credit_card_form').hide();
      $('#update_credit_card_form').hide();
      $('#credit-card-modal').modal();
      return false;
    });

    $('#show_add_new_card').click(function(){
      $('#credit_card_form').hide();
      $('#new_credit_card_form').show();
      $('#update_credit_card_form').hide();
      $('#credit-card-modal').modal();
      $('#credit_card_cardholder_first_name').focus().select();
      return false;
    });

    $('#show_update_card').click(function(){
      $('#credit_card_form').hide();
      $('#new_credit_card_form').hide();
      $('#update_credit_card_form').show();
      $('#credit-card-modal').modal();
      $('#update_credit_card_number').focus().select();
      return false;
    });
  },

  paymentModalInteraction: function() {
    // toggle modals for "add new card"
    $('#add_new_card').click(function(){
      $('#credit_card_form').hide();
      $('#new_credit_card_form').show();
      $('#credit_card_cardholder_first_name').focus().select();
      return false;
    });

    // credit card selection interaction
    $('#credit_card_form tr.credit-card').click(function() {
      $(this).find('input').attr('checked', 'checked').change();
      return true;
    });

    // UI interaction for card selection
    var updateSelectedCard = function() {
      $('#credit_card_form tr').removeClass('current');
      $('#credit_card_form input:checked').closest('tr').addClass('current');
      return true;
    };
    $('#credit_card_form input').change(updateSelectedCard);

    updateSelectedCard();

    // card selection submit, trigger alt. payment forms if needed
    $('#checkout_choose_payment_method').submit(function() {
      var original = $('#selected_card').val();
      var selected = $('#checkout_choose_payment_method input:checked').val();

      if(selected == original) {
        $('#credit-card-modal').modal('hide');
        return false;
      }

      if(selected == 'v_dot_me') {
        $('#credit-card-modal').modal('hide');
        $('button.upay-buy-container-image-only').click();
        return false;
      }
      else if(selected == 'visa_checkout') {
        $('#credit-card-modal').modal('hide');
        $('#visa_checkout_button').click();
        return false;
      }
      // check to see if it's *not* a credit card (that is, it's not numeric)
      else if(!(parseInt(selected, 10) > 0)) {
        $('#checkout_payment_type').val(selected);
      }
      return true;
    });

  },

  travelerInfoModal: function() {

    $('#change-traveler-info').click(function() {
      $('#change-traveler-info-modal').modal();
      return false;
    });

    $('#update_traveler_information').validate({
      onkeyup: false,
      rules: {
        'checkout[escapes_traveler_information][name]': 'required',
        'checkout[escapes_traveler_information][email]': 'required'
      },
      highlight: function(element, errorClass) {
        $(element).closest('.control-group').addClass(errorClass);
      },
      unhighlight: function(element, errorClass) {
        $(element).closest('.control-group').removeClass(errorClass);
      },
      errorElement: "span",
      errorPlacement: function(error, element) {
        error.addClass('help-inline');
        $(element).closest('.control-group').append(error);
      }
    });
  },

  updateTravelerInformation: function() {

    $("#update_travelers input#checkout_traveling_alone_no").bind("click", function() {
      $(".roommate-information").slideDown();
    });
    $("#update_travelers input#checkout_traveling_alone_yes").bind("click", function() {
      $(".roommate-information").slideUp();
    });
    $("#update_travelers input#checkout_traveling_alone_yes").click();

    $('#update_travelers').validate({
      onkeyup: false,
      highlight: function(element, errorClass) {
        $(element).closest('.control-group').addClass(errorClass);
      },
      unhighlight: function(element, errorClass) {
        $(element).closest('.control-group').removeClass(errorClass);
      },
      errorElement: "span",
      errorPlacement: function(error, element) {
        error.addClass('help-inline');
        $(element).closest('.control-group').append(error);
      }
    });

    $(".dated-escape-summary .see-details a").bind("click", function(e) {
      e.preventDefault();
      $(e.target).closest(".flights-container").find(".flight-details").toggle();
      $(e.target).closest(".departing-trip-details").addClass("border");
      $(e.target).closest(".returning-trip-details").addClass("border");
      $(e.target).hide();
    });
  },

  // Private: show the login form, and focus on the email field. Used on login
  // page.
  showLoginForm: function() {
    checkouts.trackPageView("new_Login");
    $('#register').hide(function() {
      $('#login').show(function() {
        $('#login_email').focus().select();
      });
    });
  },

  // Private: show the registration form.
  //
  // email - the email address to pre-fill the email fields with (optional)
  showRegisterForm: function(email) {
    checkouts.trackPageView("new_CreateAccount");
    $('#login').hide(function() {
      if(email) {
        $('#person_email').val(email);
        $('#person_email_confirmation').val(email);
      }

      $('#register').show(function() {
        $('#external_person_first_name').focus().select();
      });
    });
  },

  // Private: tracks the page view for login and registration
  trackPageView: function(pageName) {
    _gaq.push(['_set', 'page', document.URL + '/' + pageName]);
    _gaq.push(['_trackPageview']);
  },

  // Private: attach an error message to the lsui container for a form input.
  //
  // inputSelector - the input element to attach an error to
  // errorMessage  - the error message to display
  //
  addErrorInline: function(inputSelector, errorMessage) {
    var group = $(inputSelector).closest('.control-group');
    group.addClass('error');
    $('<span class="help-inline">' + errorMessage + '</span>').appendTo(group);
  },

  // Private: attach a block-level error message to the lsui container for an
  // input.
  //
  // inputSelector - the input element to which to attach an error
  // errorMessage  - the error message to display
  //
  addError: function(inputSelector, errorMessage) {
    var $input = $(inputSelector);
    var group = $input.closest('.control-group');
    group.addClass('error');
    $('<p class="help-block">' + errorMessage + '</p>').insertAfter($input);
  },

  // Private: remove all error messages and classes for the given form.
  //
  // inputSelector - the input element to clear errors from
  //
  clearErrors: function(inputSelector) {
    $(inputSelector).find('.control-group').removeClass('error').
      find('span.help-inline, p.help-block').remove();
  },

  // since rails' form builder is difficult to use with the new lsui classes,
  // make it work manually:
  fixFormErrors: function() {
    $.each($('.fieldWithErrors'), function(i, div) {
      var $div = $(div);
      $div.closest('.control-group').addClass('error');
      $div.replaceWith($div.html());
    });
    $.each($('.formError'), function(i, div) {
      var $div = $(div);
      $div.replaceWith('<span class="error help-inline">' + $div.html() + '</span>');
    });
  },

  // Private: initialize the FAQ modal
  initFAQ: function() {
    $('#faq_link').click(function() {
      $('#have_a_question').show().modal();
      return false;
    });
    $('#have_a_question p.answer a').attr('target','_blank');
    $('#have_a_question p.question a').click(function(){
      $(this).closest('li').siblings('li').find('.answer').slideUp();
      $(this).closest('p').siblings('.answer').slideToggle();
      return false;
    });
    $('#fine_print_link').click(function() {
      $('#fine_print').show().modal();
      return false;
    });
  },

  adventuresCalendar: function() {
    $('a.cal').click(function(evt){
      $.facebox({ div: '#hidden-cal'}, 'adventures-cal');
      return false;
    });
  },

  vDotMeCallback: function(event, data) {
    if(event == "purchase.init") {
      // modal opened, so disable the purchase form so stray clicks or slow
      // modal closing won't allow the customer to accidentally move forward
      $('#purchase_form').data('disabled', true);
    }
    else if(event == "purchase.cancel" || event == "purchase.pending") {
      // modal is closed, so re-enable the purchase form
      $('#purchase_form').data('disabled', false);
    }
    if(event == "purchase.success") {
      // not reenabling the main form here, since a different form is being
      // submitted:
      $('#v_dot_me-form #checkout_payment_call_id').val(data.callId);
      $('#v_dot_me-form').submit();
    }
  }

};


/* ==========================================================
 * bootstrap-alert.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT DATA-API
  * ============== */

  $(function () {
    $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
  })

}(window.jQuery);

/* ===================================================
 * Based on bootstrap-transition.js v2.0.0
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function( $ ) {

  $(function () {

    "use strict"

    /* CSS TRANSITION SUPPORT (https://gist.github.com/373874)
     * ======================================================= */

    $.support.transition = (function () {
      var thisBody = document.body || document.documentElement
        , thisStyle = thisBody.style
        , support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined

      return support && {
        end: (function () {
          var transitionEnd = "TransitionEnd"
          if ( $.browser.webkit ) {
            transitionEnd = "webkitTransitionEnd"
          } else if ( $.browser.mozilla ) {
            transitionEnd = "transitionend"
          } else if ( $.browser.opera ) {
            transitionEnd = "oTransitionEnd"
          }
          return transitionEnd
        }())
      }
    })()

  })

}( window.jQuery )


/* ========================================================
 * bootstrap-tab.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function ( element ) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}(window.jQuery);
;// Call With
//  $(function () {
//    CheckoutCreditCard().setup();
//  });

var CheckoutCreditCard = function () {

  var setupZipValidation = function(options) {
    if (options.regex !== '') {
      var regex = new RegExp(options.regex);
      var valet = new InputValet({
        regexes: [regex],
        separator:' ',
        preProcess:function (v) {
          return v.toUpperCase();
        }
      });
      valet.defineJQueryValidator('zip', options.invalidMessage);
    }
  };

  var setup = function (options) {
    var purchaseForm = $(options.form);
    var paymentForm = $(options.paymentForm);

    // fix up the checkbox:
    var cc_default = paymentForm.find('#credit_card_default');
    cc_default.prependTo( cc_default.next() );

    $.validator.addMethod(
      'braintree_cc',
      function(value, element, params) {
        if(Payment.creditCardTypeFromNumber(value) != 'UNKNOWN') {
          return true;
        } else {
          return false;
        }
      },
      options.creditCardInvalidMessage || $.validator.messages.creditcard
    );

    var zipRules = {};
    var zipOptions = options.zipValidationOptions;
    if (zipOptions && zipOptions.regex && zipOptions.regex.length) {
      setupZipValidation(options.zipValidationOptions);
      zipRules.required = true;
      zipRules.zip = true;
    }

    var creditCardRules = {};
    if (options.creditCardRequired === undefined || options.creditCardRequired === true) {
      creditCardRules.required = true;
      creditCardRules.braintree_cc = true; // regex format check
      creditCardRules.creditcard = true; // luhn checksum
    }

    paymentForm.validate({
      onkeyup: false,
      rules: {
        'credit_card[card_number]': creditCardRules,
        'credit_card[zip]': zipRules
      },
      groups: {
        citystatezip: 'credit_card[city] credit_card[state] credit_card[zip]'
      },
      debug: true,
      highlight: function(element, errorClass) {
        $(element).closest('.control-group').addClass(errorClass);
      },
      unhighlight: function(element, errorClass) {
        $(element).closest('.control-group').removeClass(errorClass);
      },
      errorElement: "span",
      errorPlacement: function(error, element) {
        error.addClass('help-inline');
        $(element).closest('.control-group').append(error);
      }
    });

    if (options.creditCardInvalidMessage) {
        $.validator.messages.creditcard = options.creditCardInvalidMessage;
    }

    // if there are submit buttons in the payment form, delegate the submit
    // handler for those:
    paymentForm.submit(function() {
      if($(this).data('disabled')) { return false; }
      if (paymentForm.valid()) {
        // FIXME better errors for credit card!
        paymentForm.find('#payment-errors').empty();

        // This is for firefox. It needs to find "form".
        if($(paymentForm).find("form").length == 1) {
          values = Payment.serializeHash($(paymentForm).find("form"));
        }
        else {
          values = Payment.serializeHash($(paymentForm));
        }

        Payment.addCreditCard(
          values,
          function(data) {
            $('#checkout_credit_card_id').val(data.credit_card.id);
            purchaseForm.submit();
          },
          function(xhr, message, errorThrown) {
            if(message=='timeout' || (xhr.status+'')=='0') {
	            paymentForm.find('#payment-errors').append('<p class="alert alert-error">our payment processor is temporarily unavailable, please try again soon.</p>');
	          } else {
              sendCreditCardFormErrorToUA(); // <-- send form data error to universal analytics so we can track user pain points

              data = $.parseJSON(xhr.responseText);
              _.each(_.flatten([data.errors]), function(error) {
                paymentForm.find('#payment-errors').append('<p class="alert alert-error">'+error+'</p>');
              });
	          }
          },
          paymentForm.attr('action') + '.json',
          function() { paymentForm.data('disabled', true); },
          function() { paymentForm.data('disabled', false); }
        )
      }
      return false;
    });
  };

  return {
    setup: setup
  };
};
;$(document).ready(function(){
  // specific to IE (thanks, bootstrap!)
  var isIE = window.ActiveXObject || "ActiveXObject" in window;
  if (isIE) {
      $('.modal').removeClass('fade');
  }
  
  $('#gift_form input, #gift_form textarea').placeholder();
  
  $('.tab-pane').on("click", "label", function() {
    $(this).parents('ul').find('p').removeClass('active');
    $(this).parents('p').addClass("active");
    giftThemeName = $(this).find('.gift_theme_name').html();
    selectedTheme = $(this).attr("class");
    $(".selected_theme_name").html(giftThemeName);
    $("#selected_theme_preview_voucher").attr("src", "//a5.lscdn.net/deals/images/gift_themes/preview_voucher_" + selectedTheme + ".jpg");
    $("#selected_theme_preview_email_1").attr("src", "//a5.lscdn.net/deals/images/gift_themes/preview_glp_" + selectedTheme + ".jpg");
    $("#selected_theme_preview_email_2").attr("src", "//a5.lscdn.net/deals/images/gift_themes/preview_email_" + selectedTheme + ".jpg");
    
    if ($(this).parents('.email_it').length) {
      $("#sample_recipient").modal('show');
     } else {
        if ($(this).parents('.print_it').length) {
          $("#sample_purchaser").modal('show');
        }
     }
  });
  
  $('.next-gift a').on("click", function() {
    var giftCount = parseInt($(this).data("giftcount"))
    var $nextGiftCoupon = $("#gift_"+(giftCount+1))
    var offset = $nextGiftCoupon.offset();
    jQuery('html,body').animate({
          scrollTop: offset.top
    }, 600, 'swing');
  });
  
  $("#gift_container").addClass("ready");
  
  $("#fine_print_container p.title a").on("click",function(e){ 
    e.preventDefault();
    if($("#fine_print").hasClass("open")){
        $("#fine_print").removeClass("open").slideUp(500);
        $("#fine_print_container").removeClass("active");
      } else { 
        $("#fine_print").addClass("open").slideDown(500);
        $("#fine_print_container").addClass("active");
      }
      
  });
});;// InputValet provides a set of functions to both reformat and validate an input
// using a regex and a separator. It also provides pre- and post- hooks for
// altering the input / output values before and after the formatting.
//
// This was written to support the strict zipcode formatting required by AVS
// checks for credit cards in the UK.


// Create a new InputValet.
//
// options - a dictionary of options (all optional):
//           regexes     - a list of regexes to use to reformat and validate the
//                         input
//           separator   - this will be stripped from the string, then replaced
//                         between each matched group in the regexes.
//           preProcess  - a function that takes one argument and returns a
//                         string, if preprocessing of the value is desired.
//           postProcess - a function that takes one argument and returns a
//                         string, if preprocessing of the value is desired.
function InputValet(options) {
    this.regexes = options.regexes || [];
    this.separator = options.separator || '';
    this.preProcess = options.preProcess || null;
    this.postProcess = options.postProcess || null;
}

InputValet.prototype = {

    // Private: retrieve the new value for the input.
    //
    // Applies the formatting and validation to the given value.
    formattedValue: function (value) {
        value = (this.preProcess && value) ? this.preProcess(value) : value;
        value = this.reformat(value);
        return (this.postProcess && value) ? this.postProcess(value) : value;
    },

    // Private: reformat the given value
    //
    // returns a reformatted string, or null if not matched
    reformat: function (value) {
        var stripped = value.replace(new RegExp(this.separator, 'gi'), '');

        // iterate over the regexes until one matches
        for (var i = 0; i < this.regexes.length; i++) {
            var regex = this.regexes[i];

            // when the regex matches, join the matched parts with the
            // separator, and return it.
            if (regex.test(stripped)) {
                match = regex.exec(stripped);
                if (match.length == 1) {
                    return match[0];
                }
                var accum = '';
                for (var j = 1; j < match.length; j++) {
                    if (accum.length > 0) {
                        accum += this.separator;
                    }
                    accum += match[j];
                }
                return accum;
            }
        }
        return null;
    },

    // Public: hook into the keyup event on an input. Useful for debugging.
    hookKeyUp:function (input) {
        var valet = this;
        input.keyup(function () {
            var $input = $(this);
            var formatted = valet.formattedValue($input.val());
            if (formatted === null) {
                $input.css('background-color', 'red');
            }
            else if (input.val() != formatted) {
                $input.css('background-color', 'white');
                $input.val(formatted);
            }
        });
    },

    // Public: define a jQuery validator for this input and configuration.
    //
    // To attach the actual validation to the input, give the input the
    // className class (if used), or bind the validation directly, e.g.
    //
    //   $('form').validate({
    //      rules: {
    //        'inputName': {
    //          ruleName: true
    //        }
    //      }
    //    });
    //
    // ruleName  - the name of the validation rule to add to the validator
    // message   - the error message to display when validation fails
    // className - an optional class name to add for the validation
    defineJQueryValidator:function (ruleName, message, className) {
        var valet = this;

        $.validator.addMethod(ruleName, function (current, element) {
            var formatted = valet.formattedValue(current);
            var valid = formatted !== null;
            if (valid && $(element).val() != formatted) {
                $(element).val(formatted);
            }
            return valid;
        }, message);

        if (className) {
            var hash = {};
            hash[ruleName] = true;
            $.validator.addClassRules(className, hash);
        }
    }
};
;/*
 * jQuery UI Datepicker 1.8.6
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function( $, undefined ) {

$.extend($.ui, { datepicker: { version: "1.8.6" } });

var PROP_NAME = 'datepicker';
var dpuuid = new Date().getTime();

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this.debug = false; // Change this to true to start debugging
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
	this._inlineClass = 'ui-datepicker-inline'; // The name of the inline marker class
	this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
	this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
	this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
	this._disableClass = 'ui-datepicker-disabled'; // The name of the disabled covering marker class
	this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
	this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
	this._dayOverClass = 'ui-datepicker-days-cell-over'; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		closeText: 'Done', // Display text for close link
		prevText: 'Prev', // Display text for previous month link
		nextText: 'Next', // Display text for next month link
		currentText: 'Today', // Display text for current month link
		monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'], // Names of months for drop-down and formatting
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
		weekHeader: 'Wk', // Column header for week of the year
		dateFormat: 'mm/dd/yy', // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: '' // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
		showAnim: 'fadeIn', // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: '', // Display text following the input box, e.g. showing the format
		buttonText: '...', // Text for trigger button
		buttonImage: '', // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: 'c-10:c+10', // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: '+10', // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with '+' for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: 'fast', // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: '', // Selector for an alternate field to store selected dates into
		altFormat: '', // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false // True to size the input for the date format, false to leave as is
	};
	$.extend(this._defaults, this.regional['']);
	this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>');
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: 'hasDatepicker',

	/* Debug logging (if enabled). */
	log: function () {
		if (this.debug)
			console.log.apply('', arguments);
	},

	// TODO rename to "widget" when switching to widget factory
	_widgetDatepicker: function() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
	   @param  settings  object - the new settings to use as defaults (anonymous object)
	   @return the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span
	   @param  settings  object - the new settings to use for this date picker instance (anonymous) */
	_attachDatepicker: function(target, settings) {
		// check for settings on the control itself - in namespace 'date:'
		var inlineSettings = null;
		for (var attrName in this._defaults) {
			var attrValue = target.getAttribute('date:' + attrName);
			if (attrValue) {
				inlineSettings = inlineSettings || {};
				try {
					inlineSettings[attrName] = eval(attrValue);
				} catch (err) {
					inlineSettings[attrName] = attrValue;
				}
			}
		}
		var nodeName = target.nodeName.toLowerCase();
		var inline = (nodeName == 'div' || nodeName == 'span');
		if (!target.id) {
			this.uuid += 1;
			target.id = 'dp' + this.uuid;
		}
		var inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {}, inlineSettings || {});
		if (nodeName == 'input') {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			$('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName))
			return;
		this._attachments(input, inst);
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp).
			bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
		this._autoSize(inst);
		$.data(target, PROP_NAME, inst);
	},

	/* Make attachments based on settings. */
	_attachments: function(input, inst) {
		var appendText = this._get(inst, 'appendText');
		var isRTL = this._get(inst, 'isRTL');
		if (inst.append)
			inst.append.remove();
		if (appendText) {
			inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
			input[isRTL ? 'before' : 'after'](inst.append);
		}
		input.unbind('focus', this._showDatepicker);
		if (inst.trigger)
			inst.trigger.remove();
		var showOn = this._get(inst, 'showOn');
		if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
			var buttonText = this._get(inst, 'buttonText');
			var buttonImage = this._get(inst, 'buttonImage');
			inst.trigger = $(this._get(inst, 'buttonImageOnly') ?
				$('<img/>').addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$('<button type="button"></button>').addClass(this._triggerClass).
					html(buttonImage == '' ? buttonText : $('<img/>').attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? 'before' : 'after'](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
					$.datepicker._hideDatepicker();
				else
					$.datepicker._showDatepicker(input[0]);
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function(inst) {
		if (this._get(inst, 'autoSize') && !inst.inline) {
			var date = new Date(2009, 12 - 1, 20); // Ensure double digits
			var dateFormat = this._get(inst, 'dateFormat');
			if (dateFormat.match(/[DM]/)) {
				var findMax = function(names) {
					var max = 0;
					var maxI = 0;
					for (var i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					'monthNames' : 'monthNamesShort'))));
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
			}
			inst.input.attr('size', this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName))
			return;
		divSpan.addClass(this.markerClassName).append(inst.dpDiv).
			bind("setData.datepicker", function(event, key, value){
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key){
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
	},

	/* Pop-up the date picker in a "dialog" box.
	   @param  input     element - ignored
	   @param  date      string or Date - the initial date to display
	   @param  onSelect  function - the function to call when a date is selected
	   @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	   @param  pos       int[2] - coordinates for the dialog's position within the screen or
	                     event - with x/y coordinates or
	                     leave empty for default (screen centre)
	   @return the manager object */
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {
		var inst = this._dialogInst; // internal instance
		if (!inst) {
			this.uuid += 1;
			var id = 'dp' + this.uuid;
			this._dialogInput = $('<input type="text" id="' + id +
				'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
			this._dialogInput.keydown(this._doKeyDown);
			$('body').append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			var browserWidth = document.documentElement.clientWidth;
			var browserHeight = document.documentElement.clientHeight;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI)
			$.blockUI(this.dpDiv);
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},

	/* Detach a datepicker from its control.
	   @param  target    element - the target input field or division or span */
	_destroyDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		$.removeData(target, PROP_NAME);
		if (nodeName == 'input') {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind('focus', this._showDatepicker).
				unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress).
				unbind('keyup', this._doKeyUp);
		} else if (nodeName == 'div' || nodeName == 'span')
			$target.removeClass(this.markerClassName).empty();
	},

	/* Enable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_enableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = false;
			inst.trigger.filter('button').
				each(function() { this.disabled = false; }).end().
				filter('img').css({opacity: '1.0', cursor: ''});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().removeClass('ui-state-disabled');
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_disableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = true;
			inst.trigger.filter('button').
				each(function() { this.disabled = true; }).end().
				filter('img').css({opacity: '0.5', cursor: 'default'});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().addClass('ui-state-disabled');
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @param  target    element - the target input field or division or span
	   @return boolean - true if disabled, false if enabled */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] == target)
				return true;
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	   @param  target  element - the target input field or division or span
	   @return  object - the associated instance data
	   @throws  error if a jQuery problem getting data */
	_getInst: function(target) {
		try {
			return $.data(target, PROP_NAME);
		}
		catch (err) {
			throw 'Missing instance data for this datepicker';
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span
	   @param  name    object - the new settings to update or
	                   string - the name of the setting to change or retrieve,
	                   when retrieving also 'all' for all instance settings or
	                   'defaults' for all global defaults
	   @param  value   any - the new value for the setting
	                   (omit if above is an object or to retrieve a value) */
	_optionDatepicker: function(target, name, value) {
		var inst = this._getInst(target);
		if (arguments.length == 2 && typeof name == 'string') {
			return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name == 'all' ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}
		var settings = name || {};
		if (typeof name == 'string') {
			settings = {};
			settings[name] = value;
		}
		if (inst) {
			if (this._curInst == inst) {
				this._hideDatepicker();
			}
			var date = this._getDateDatepicker(target, true);
			extendRemove(inst.settings, settings);
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDateDatepicker(target, date);
			this._updateDatepicker(inst);
		}
	},

	// change method deprecated
	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	   @param  target   element - the target input field or division or span
	   @param  date     Date - the new date */
	_setDateDatepicker: function(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	   @param  target     element - the target input field or division or span
	   @param  noDefault  boolean - true if no default date is to be used
	   @return Date - the current date */
	_getDateDatepicker: function(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline)
			this._setDateFromField(inst, noDefault);
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var inst = $.datepicker._getInst(event.target);
		var handled = true;
		var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing)
			switch (event.keyCode) {
				case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
				case 13: var sel = $('td.' + $.datepicker._dayOverClass, inst.dpDiv).
							add($('td.' + $.datepicker._currentClass, inst.dpDiv));
						if (sel[0])
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						else
							$.datepicker._hideDatepicker();
						return false; // don't submit the form
						break; // select the value on enter
				case 27: $.datepicker._hideDatepicker();
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, 'stepBigMonths') :
							-$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, 'stepBigMonths') :
							+$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									-$.datepicker._get(inst, 'stepBigMonths') :
									-$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									+$.datepicker._get(inst, 'stepBigMonths') :
									+$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		else if (event.keyCode == 36 && event.ctrlKey) // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		else {
			handled = false;
		}
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if ($.datepicker._get(inst, 'constrainInput')) {
			var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
			var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
			return event.ctrlKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if (inst.input.val() != inst.lastVal) {
			try {
				var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
					(inst.input ? inst.input.val() : null),
					$.datepicker._getFormatConfig(inst));
				if (date) { // only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			}
			catch (event) {
				$.datepicker.log(event);
			}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
	   @param  input  element - the input field attached to the date picker or
	                  event - if triggered by focus */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
			input = $('input', input.parentNode)[0];
		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
			return;
		var inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst != inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
		}
		var beforeShow = $.datepicker._get(inst, 'beforeShow');
		extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);
		if ($.datepicker._inDialog) // hide cursor
			input.value = '';
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}
		var isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css('position') == 'fixed';
			return !isFixed;
		});
		if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
			$.datepicker._pos[0] -= document.documentElement.scrollLeft;
			$.datepicker._pos[1] -= document.documentElement.scrollTop;
		}
		var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		// determine sizing offscreen
		inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
			left: offset.left + 'px', top: offset.top + 'px'});
		if (!inst.inline) {
			var showAnim = $.datepicker._get(inst, 'showAnim');
			var duration = $.datepicker._get(inst, 'duration');
			var postProcess = function() {
				$.datepicker._datepickerShowing = true;
				var borders = $.datepicker._getBorders(inst.dpDiv);
				inst.dpDiv.find('iframe.ui-datepicker-cover'). // IE6- only
					css({left: -borders[0], top: -borders[1],
						width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()});
			};
			inst.dpDiv.zIndex($(input).zIndex()+1);
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess);
			if (!showAnim || !duration)
				postProcess();
			if (inst.input.is(':visible') && !inst.input.is(':disabled'))
				inst.input.focus();
			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		var self = this;
		var borders = $.datepicker._getBorders(inst.dpDiv);
		inst.dpDiv.empty().append(this._generateHTML(inst))
			.find('iframe.ui-datepicker-cover') // IE6- only
				.css({left: -borders[0], top: -borders[1],
					width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()})
			.end()
			.find('button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a')
				.bind('mouseout', function(){
					$(this).removeClass('ui-state-hover');
					if(this.className.indexOf('ui-datepicker-prev') != -1) $(this).removeClass('ui-datepicker-prev-hover');
					if(this.className.indexOf('ui-datepicker-next') != -1) $(this).removeClass('ui-datepicker-next-hover');
				})
				.bind('mouseover', function(){
					if (!self._isDisabledDatepicker( inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
						$(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
						$(this).addClass('ui-state-hover');
						if(this.className.indexOf('ui-datepicker-prev') != -1) $(this).addClass('ui-datepicker-prev-hover');
						if(this.className.indexOf('ui-datepicker-next') != -1) $(this).addClass('ui-datepicker-next-hover');
					}
				})
			.end()
			.find('.' + this._dayOverClass + ' a')
				.trigger('mouseover')
			.end();
		var numMonths = this._getNumberOfMonths(inst);
		var cols = numMonths[1];
		var width = 17;
		if (cols > 1)
			inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
		else
			inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
		inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
		inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
		if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input &&
				inst.input.is(':visible') && !inst.input.is(':disabled'))
			inst.input.focus();
	},

	/* Retrieve the size of left and top borders for an element.
	   @param  elem  (jQuery object) the element of interest
	   @return  (number[2]) the left and top borders */
	_getBorders: function(elem) {
		var convert = function(value) {
			return {thin: 1, medium: 2, thick: 3}[value] || value;
		};
		return [parseFloat(convert(elem.css('border-left-width'))),
			parseFloat(convert(elem.css('border-top-width')))];
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth();
		var dpHeight = inst.dpDiv.outerHeight();
		var inputWidth = inst.input ? inst.input.outerWidth() : 0;
		var inputHeight = inst.input ? inst.input.outerHeight() : 0;
		var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
		var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();

		offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		// now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
		var inst = this._getInst(obj);
		var isRTL = this._get(inst, 'isRTL');
        while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
            obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
        }
        var position = $(obj).offset();
	    return [position.left, position.top];
	},

	/* Hide the date picker from view.
	   @param  input  element - the input field attached to the date picker */
	_hideDatepicker: function(input) {
		var inst = this._curInst;
		if (!inst || (input && inst != $.data(input, PROP_NAME)))
			return;
		if (this._datepickerShowing) {
			var showAnim = this._get(inst, 'showAnim');
			var duration = this._get(inst, 'duration');
			var postProcess = function() {
				$.datepicker._tidyDialog(inst);
				this._curInst = null;
			};
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess);
			if (!showAnim)
				postProcess();
			var onClose = this._get(inst, 'onClose');
			if (onClose)
				onClose.apply((inst.input ? inst.input[0] : null),
					[(inst.input ? inst.input.val() : ''), inst]);  // trigger custom callback
			this._datepickerShowing = false;
			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
				if ($.blockUI) {
					$.unblockUI();
					$('body').append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst)
			return;
		var $target = $(event.target);
		if ($target[0].id != $.datepicker._mainDivId &&
				$target.parents('#' + $.datepicker._mainDivId).length == 0 &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.hasClass($.datepicker._triggerClass) &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))
			$.datepicker._hideDatepicker();
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		}
		else {
			var date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		inst._selectingMonthYear = false;
		inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
		inst['draw' + (period == 'M' ? 'Month' : 'Year')] =
			parseInt(select.options[select.selectedIndex].value,10);
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Restore input focus after not changing month/year. */
	_clickMonthYear: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (inst.input && inst._selectingMonthYear) {
			setTimeout(function() {
				inst.input.focus();
			}, 0);
		}
		inst._selectingMonthYear = !inst._selectingMonthYear;
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var target = $(id);
		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}
		var inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $('a', td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		this._selectDate(target, '');
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input)
			inst.input.val(dateStr);
		this._updateAlternate(inst);
		var onSelect = this._get(inst, 'onSelect');
		if (onSelect)
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		else if (inst.input)
			inst.input.trigger('change'); // fire the change event
		if (inst.inline)
			this._updateDatepicker(inst);
		else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object')
				inst.input.focus(); // restore focus
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
			var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
			var date = this._getDate(inst);
			var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	   @param  date  Date - the date to customise
	   @return [boolean, string] - is this date selectable?, what is its CSS class? */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ''];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	   @param  date  Date - the date to get the week for
	   @return  number - the number of the week within the year that contains this date */
	iso8601Week: function(date) {
		var checkDate = new Date(date.getTime());
		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
		var time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
	   See formatDate below for the possible formats.

	   @param  format    string - the expected format of the date
	   @param  value     string - the date in the above format
	   @param  settings  Object - attributes include:
	                     shortYearCutoff  number - the cutoff year for determining the century (optional)
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  Date - the extracted date value or null if value is blank */
	parseDate: function (format, value, settings) {
		if (format == null || value == null)
			throw 'Invalid arguments';
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '')
			return null;
		var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var doy = -1;
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Extract a number from the string value
		var getNumber = function(match) {
			lookAhead(match);
			var size = (match == '@' ? 14 : (match == '!' ? 20 :
				(match == 'y' ? 4 : (match == 'o' ? 3 : 2))));
			var digits = new RegExp('^\\d{1,' + size + '}');
			var num = value.substring(iValue).match(digits);
			if (!num)
				throw 'Missing number at position ' + iValue;
			iValue += num[0].length;
			return parseInt(num[0], 10);
		};
		// Extract a name from the string value and convert to an index
		var getName = function(match, shortNames, longNames) {
			var names = (lookAhead(match) ? longNames : shortNames);
			for (var i = 0; i < names.length; i++) {
				if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
					iValue += names[i].length;
					return i + 1;
				}
			}
			throw 'Unknown name at position ' + iValue;
		};
		// Confirm that a literal character matches the string value
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat))
				throw 'Unexpected literal at position ' + iValue;
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					checkLiteral();
			else
				switch (format.charAt(iFormat)) {
					case 'd':
						day = getNumber('d');
						break;
					case 'D':
						getName('D', dayNamesShort, dayNames);
						break;
					case 'o':
						doy = getNumber('o');
						break;
					case 'm':
						month = getNumber('m');
						break;
					case 'M':
						month = getName('M', monthNamesShort, monthNames);
						break;
					case 'y':
						year = getNumber('y');
						break;
					case '@':
						var date = new Date(getNumber('@'));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case '!':
						var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'"))
							checkLiteral();
						else
							literal = true;
						break;
					default:
						checkLiteral();
				}
		}
		if (year == -1)
			year = new Date().getFullYear();
		else if (year < 100)
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				var dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim)
					break;
				month++;
				day -= dim;
			} while (true);
		}
		var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
			throw 'Invalid date'; // E.g. 31/02/*
		return date;
	},

	/* Standard date formats. */
	ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
	COOKIE: 'D, dd M yy',
	ISO_8601: 'yy-mm-dd',
	RFC_822: 'D, d M y',
	RFC_850: 'DD, dd-M-y',
	RFC_1036: 'D, d M y',
	RFC_1123: 'D, d M yy',
	RFC_2822: 'D, d M yy',
	RSS: 'D, d M y', // RFC 822
	TICKS: '!',
	TIMESTAMP: '@',
	W3C: 'yy-mm-dd', // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   o  - day of year (no leading zeros)
	   oo - day of year (three digit)
	   D  - day name short
	   DD - day name long
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   y  - year (two digit)
	   yy - year (four digit)
	   @ - Unix timestamp (ms since 01/01/1970)
	   ! - Windows ticks (100ns since 01/01/0001)
	   '...' - literal text
	   '' - single quote

	   @param  format    string - the desired format of the date
	   @param  date      Date - the date value to format
	   @param  settings  Object - attributes include:
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  string - the date in the above format */
	formatDate: function (format, date, settings) {
		if (!date)
			return '';
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Format a number, with leading zero if necessary
		var formatNumber = function(match, value, len) {
			var num = '' + value;
			if (lookAhead(match))
				while (num.length < len)
					num = '0' + num;
			return num;
		};
		// Format a name, short or long as requested
		var formatName = function(match, value, shortNames, longNames) {
			return (lookAhead(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		if (date)
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						output += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							output += formatNumber('d', date.getDate(), 2);
							break;
						case 'D':
							output += formatName('D', date.getDay(), dayNamesShort, dayNames);
							break;
						case 'o':
							output += formatNumber('o',
								(date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
							break;
						case 'm':
							output += formatNumber('m', date.getMonth() + 1, 2);
							break;
						case 'M':
							output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
							break;
						case 'y':
							output += (lookAhead('y') ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
							break;
						case '@':
							output += date.getTime();
							break;
						case '!':
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'"))
								output += "'";
							else
								literal = true;
							break;
						default:
							output += format.charAt(iFormat);
					}
			}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var chars = '';
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		for (var iFormat = 0; iFormat < format.length; iFormat++)
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					chars += format.charAt(iFormat);
			else
				switch (format.charAt(iFormat)) {
					case 'd': case 'm': case 'y': case '@':
						chars += '0123456789';
						break;
					case 'D': case 'M':
						return null; // Accept anything
					case "'":
						if (lookAhead("'"))
							chars += "'";
						else
							literal = true;
						break;
					default:
						chars += format.charAt(iFormat);
				}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst, noDefault) {
		if (inst.input.val() == inst.lastVal) {
			return;
		}
		var dateFormat = this._get(inst, 'dateFormat');
		var dates = inst.lastVal = inst.input ? inst.input.val() : null;
		var date, defaultDate;
		date = defaultDate = this._getDefaultDate(inst);
		var settings = this._getFormatConfig(inst);
		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			this.log(event);
			dates = (noDefault ? '' : dates);
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(inst, date, defaultDate) {
		var offsetNumeric = function(offset) {
			var date = new Date();
			date.setDate(date.getDate() + offset);
			return date;
		};
		var offsetString = function(offset) {
			try {
				return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
					offset, $.datepicker._getFormatConfig(inst));
			}
			catch (e) {
				// Ignore
			}
			var date = (offset.toLowerCase().match(/^c/) ?
				$.datepicker._getDate(inst) : null) || new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 'd') {
					case 'd' : case 'D' :
						day += parseInt(matches[1],10); break;
					case 'w' : case 'W' :
						day += parseInt(matches[1],10) * 7; break;
					case 'm' : case 'M' :
						month += parseInt(matches[1],10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
					case 'y': case 'Y' :
						year += parseInt(matches[1],10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		};
		date = (date == null ? defaultDate : (typeof date == 'string' ? offsetString(date) :
			(typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
		date = (date && date.toString() == 'Invalid Date' ? defaultDate : date);
		if (date) {
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(date);
	},

	/* Handle switch to/from daylight saving.
	   Hours may be non-zero on daylight saving cut-over:
	   > 12 when midnight changeover, but then cannot generate
	   midnight datetime, so jump to 1AM, otherwise reset.
	   @param  date  (Date) the date to check
	   @return  (Date) the corrected date */
	_daylightSavingAdjust: function(date) {
		if (!date) return null;
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, noChange) {
		var clear = !(date);
		var origMonth = inst.selectedMonth;
		var origYear = inst.selectedYear;
		date = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
		inst.selectedDay = inst.currentDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
		if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
			this._notifyChange(inst);
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? '' : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var today = new Date();
		today = this._daylightSavingAdjust(
			new Date(today.getFullYear(), today.getMonth(), today.getDate())); // clear time
		var isRTL = this._get(inst, 'isRTL');
		var showButtonPanel = this._get(inst, 'showButtonPanel');
		var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
		var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
		var numMonths = this._getNumberOfMonths(inst);
		var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
		var stepMonths = this._get(inst, 'stepMonths');
		var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
		var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		var drawMonth = inst.drawMonth - showCurrentAtPos;
		var drawYear = inst.drawYear;
		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;
		var prevText = this._get(inst, 'prevText');
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));
		var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' +
			' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+ prevText +'"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
		var nextText = this._get(inst, 'nextText');
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));
		var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' +
			' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+ nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
		var currentText = this._get(inst, 'currentText');
		var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
		var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._hideDatepicker();">' + this._get(inst, 'closeText') + '</button>' : '');
		var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
			(this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._gotoToday(\'#' + inst.id + '\');"' +
			'>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
		var firstDay = parseInt(this._get(inst, 'firstDay'),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);
		var showWeek = this._get(inst, 'showWeek');
		var dayNames = this._get(inst, 'dayNames');
		var dayNamesShort = this._get(inst, 'dayNamesShort');
		var dayNamesMin = this._get(inst, 'dayNamesMin');
		var monthNames = this._get(inst, 'monthNames');
		var monthNamesShort = this._get(inst, 'monthNamesShort');
		var beforeShowDay = this._get(inst, 'beforeShowDay');
		var showOtherMonths = this._get(inst, 'showOtherMonths');
		var selectOtherMonths = this._get(inst, 'selectOtherMonths');
		var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
		var defaultDate = this._getDefaultDate(inst);
		var html = '';
		for (var row = 0; row < numMonths[0]; row++) {
			var group = '';
			for (var col = 0; col < numMonths[1]; col++) {
				var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				var cornerClass = ' ui-corner-all';
				var calender = '';
				if (isMultiMonth) {
					calender += '<div class="ui-datepicker-group';
					if (numMonths[1] > 1)
						switch (col) {
							case 0: calender += ' ui-datepicker-group-first';
								cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left'); break;
							case numMonths[1]-1: calender += ' ui-datepicker-group-last';
								cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right'); break;
							default: calender += ' ui-datepicker-group-middle'; cornerClass = ''; break;
						}
					calender += '">';
				}
				calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
					(/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
					(/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					'</div><table class="ui-datepicker-calendar"><thead>' +
					'<tr>';
				var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
				for (var dow = 0; dow < 7; dow++) { // days of the week
					var day = (dow + firstDay) % 7;
					thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
						'<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
				}
				calender += thead + '</tr></thead><tbody>';
				var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7)); // calculate the number of rows to generate
				var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += '<tr>';
					var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' +
						this._get(inst, 'calculateWeek')(printDate) + '</td>');
					for (var dow = 0; dow < 7; dow++) { // create date picker days
						var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
						var otherMonth = (printDate.getMonth() != drawMonth);
						var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += '<td class="' +
							((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
							(otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							' ' + this._dayOverClass : '') + // highlight selected day
							(unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled': '') +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							(unselectable ? '' : ' onclick="DP_jQuery_' + dpuuid + '.datepicker._selectDay(\'#' +
							inst.id + '\',' + printDate.getMonth() + ',' + printDate.getFullYear() + ', this);return false;"') + '>' + // actions
							(otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
							(unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' +
							(printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
							(printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
							(otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>'; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + '</tr>';
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += '</tbody></table>' + (isMultiMonth ? '</div>' +
							((numMonths[0] > 0 && col == numMonths[1]-1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
				group += calender;
			}
			html += group;
		}
		html += buttonPanel + ($.browser.msie && parseInt($.browser.version,10) < 7 && !inst.inline ?
			'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {
		var changeMonth = this._get(inst, 'changeMonth');
		var changeYear = this._get(inst, 'changeYear');
		var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
		var html = '<div class="ui-datepicker-title">';
		var monthHtml = '';
		// month selection
		if (secondary || !changeMonth)
			monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
		else {
			var inMinYear = (minDate && minDate.getFullYear() == drawYear);
			var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
			monthHtml += '<select class="ui-datepicker-month" ' +
				'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' +
				'onclick="DP_jQuery_' + dpuuid + '.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
			 	'>';
			for (var month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) &&
						(!inMaxYear || month <= maxDate.getMonth()))
					monthHtml += '<option value="' + month + '"' +
						(month == drawMonth ? ' selected="selected"' : '') +
						'>' + monthNamesShort[month] + '</option>';
			}
			monthHtml += '</select>';
		}
		if (!showMonthAfterYear)
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
		// year selection
		if (secondary || !changeYear)
			html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
		else {
			// determine range of years to display
			var years = this._get(inst, 'yearRange').split(':');
			var thisYear = new Date().getFullYear();
			var determineYear = function(value) {
				var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
					(value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
					parseInt(value, 10)));
				return (isNaN(year) ? thisYear : year);
			};
			var year = determineYear(years[0]);
			var endYear = Math.max(year, determineYear(years[1] || ''));
			year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
			endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
			html += '<select class="ui-datepicker-year" ' +
				'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' +
				'onclick="DP_jQuery_' + dpuuid + '.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
				'>';
			for (; year <= endYear; year++) {
				html += '<option value="' + year + '"' +
					(year == drawYear ? ' selected="selected"' : '') +
					'>' + year + '</option>';
			}
			html += '</select>';
		}
		html += this._get(inst, 'yearSuffix');
		if (showMonthAfterYear)
			html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
		html += '</div>'; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period == 'Y' ? offset : 0);
		var month = inst.drawMonth + (period == 'M' ? offset : 0);
		var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
		var date = this._restrictMinMax(inst,
			this._daylightSavingAdjust(new Date(year, month, day)));
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period == 'M' || period == 'Y')
			this._notifyChange(inst);
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? minDate : date);
		date = (maxDate && date > maxDate ? maxDate : date);
		return date;
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, 'onChangeMonthYear');
		if (onChange)
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, 'numberOfMonths');
		return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - new Date(year, month, 32).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst);
		var date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
		if (offset < 0)
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, 'shortYearCutoff');
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
			monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day == 'object' ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
	}
});

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props)
		if (props[name] == null || props[name] == undefined)
			target[name] = props[name];
	return target;
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && (($.browser.safari && typeof a == 'object' && a.length) ||
		(a.constructor && a.constructor.toString().match(/\Array\(\)/))));
};

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
                    Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick).
			find('body').append($.datepicker.dpDiv);
		$.datepicker.initialized = true;
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	return this.each(function() {
		typeof options == 'string' ?
			$.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.8.6";

// Workaround for #4055
// Add another global to avoid noConflict issues with inline event handlers
window['DP_jQuery_' + dpuuid] = $;

})(jQuery);



$.fn.extend({
  lsCalendar:function(options){
    var defaults = {};
    var options = $.extend(defaults, options);
    return this.each(function() {
      var $this = $(this);
      var o = options;
      var event_dates = o.event_dates;
      var current_date = o.current_date.replace(/\//g, "-");
      var earliest_date = o.earliest_date;
      var latest_date = o.latest_date;
      var no_available_dates_message = o.no_available_dates_message;
      var deal_id = o.deal_id;
      var multiple_redemption_locations = o.multiple_redemption_locations;
      var dates_allowed = {};
      var months_with_events = {};
      function init() {
        setAllowedDates();
        if(current_date == "" || current_date == undefined) {
          current_date = earliest_date;
        }
        var date = new Date(current_date.replace(/-/g, "/"));
        current_date = dateToString(date.getFullYear(), date.getMonth(), date.getDate());
        $('.datepicker', $this).datepicker("setDate", date);
        if($('.datepicker', $this).datepicker("getDate") != date) {
          $('.datepicker', $this).datepicker("setDate", date);
        }
        rebuildList(dates_allowed[current_date]);
      }

      function setAllowedDates() {
        var current_event_date;
        for(var i = 0; i < event_dates.length; i++){
          current_event_date = event_dates[i];
          for(var day in current_event_date) {
            var curDate = new Date(day.replace(/-/g, "/"));
            months_with_events[dateToString(curDate.getFullYear(), curDate.getMonth() )] = true;
            dates_allowed[day] = current_event_date[day];
          }
        }
      }

      function rebuildList(available_times) {
        var available_days = $(".available-days", $this);
        available_days.html("");
        if (available_times == undefined) {
          available_days.append("<li>"+ no_available_dates_message + "</li>");
        } else {
          $(".current-day span", $this).html(available_times[0].formated_date);
          var time;
          var previous_time;
          var num_available_times = available_times.length - 1, i;
          for(i = 0; i < available_times.length; i++) {
            time = available_times[i];
            var has_options = ((i < num_available_times && available_times[(parseInt(i) + 1)].start_time == time.start_time) || previous_time == time.start_time) ? true : false;
            available_days.append(day_li(time, has_options));
            previous_time = time.start_time;
          }
        }
      }

      function day_li(time_slot, has_options){
        var date = encodeURIComponent(time_slot.event_starts_at);
        var message = (time_slot.in_the_past) ? "" : time_slot.slots_left;
		var withopts = has_options ? "with-options " : ""
		var soldout = (time_slot.sold_out) ? "sold-out " : "available ";
        var li = '<li id="option_' + time_slot.id + '" class="' + withopts + soldout +'"><span class="time">' + time_slot.start_time + '</span> <span class="spots-left">' + message +"</span>";
        /* Enable title on all options */
        if (true || multiple_redemption_locations || deal_id == 386988) {
          li += "<span> | </span><span class='title'>" + time_slot.title+ "</span>";
          if (has_options) {
            li += "<span class='price'>" + time_slot.price + "</span>";
          }
        }
        else if(has_options) {
          li += (time_slot.in_the_past ? "" : "<span> | </span>")+"<span class='title'>" + time_slot.title+ "</span>";
          li += "<span class='price'>" + time_slot.price + "</span>";
        }
        if(!time_slot.sold_out && !time_slot.in_the_past) {
          li += '<a href="/deals/' + deal_id + '/options/'+ time_slot.id +'/purchases/new" id="option_' + time_slot.id + '" class="btn btn-small">book it</a>';
        }
        li += '</li>';

        return li;
      }

      function dateToString(year, month, day){
        month += 1;
        var date = [
            year,
            (month < 10) ? "0" + month : month
        ];
        if(day != undefined) {
          date.push((day < 10) ? "0" + day : day);
        }
        return date.join('-');
      }

      $(".datepicker", $this).datepicker({
        minDate: new Date(earliest_date.replace(/-/g, "/")),
        maxDate: new Date(latest_date.replace(/-/g, "/")),
        beforeShowDay: function(date) {
            var month = date.getMonth();
            var day = date.getDate();
            var date_str = dateToString(date.getFullYear(), month, day);
            if (dates_allowed[date_str]) {
                return [true, 'enabled', ''];
            } else {
                return [false, 'disabled', 'no events'];
            }
        },
        onSelect: function(dateText, inst) {
          var current_day = dateToString(inst.currentYear, inst.currentMonth, inst.currentDay);
          rebuildList(dates_allowed[current_day]);
        },
        onChangeMonthYear: function(year, month, inst) {
          var month = dateToString(year,month-1), times, curr_time, first_date, i, day_date;
          if (months_with_events[month] ) {
            for(var day in dates_allowed) {
              if(day.indexOf(month) != -1){
				times = dates_allowed[day];
				curr_time = false;
				day_date = new Date(day.replace(/-/g, "/"));
				if(!first_date || first_date > day_date) first_date = day_date;
				for(i = 0; i < times.length; i++){
					if(!times[i].in_the_past && !times[i].sold_out){
						curr_time = true;
						break;
					}
				}
				if(curr_time){
			$('.datepicker', $this).datepicker("setDate", day_date );
			rebuildList(times);
			break;
				}
              }
            }
			if(!curr_time){
				$('.datepicker', $this).datepicker("setDate", first_date );
		rebuildList(times);
			}
          } else {
            rebuildList();
          }
        }
      });
      init();
    });
  }
});
;;(function() {
  var flash = {};

  function show(selector, name) {
    if (document.cookie.match(/__fs=y/) || document.cookie.match(/merge_notice/) && $.trim($("#flash").html()).length == 0) {
      $.post("/flash", {name:name}, function(res) {
        var view = {},
            flash = res.flash,
            template = res.template;

        $(selector).hide();
        for (var k in flash) {
          view.key = k;
          view.msg = flash[k];
          $(selector).append(Mustache.to_html(template, view));
        }
        $(selector).fadeIn();
      },'json');
    } else {
      var domains = document.domain.split('.');
      var domain_postfix = domains[domains.length-1];
      var domain_prefix = domains[domains.length-2];
      document.cookie = "__fs=n;path=/;domain="+domain_prefix+"."+domain_postfix+";";
    }
  }

  flash.show = show;

  while (window.__flash && __flash.length > 0) {
    var args = __flash.shift();
    var func = flash[args.shift()];
    func.apply(flash, args);
  }

})();
;dls.setHomeCity = {
  init: function(self) {
    this.appendSwitcher();
    this.attachListeners(self);
    this.attachSetHomeCity(self);
    this.animate();
  },
  appendSwitcher: function() {
    $('.current-city a.market .mkt-switcher').remove(); // ****HACK**** need to pass in an init class name to target just one element
    $('.current-city a.market').append('<span class="mkt-switcher market-button animated">&nbsp;</span>');
  },
  animate: function() {
    if (($.cookie('home_city_fte_012712') == null)) {
      setTimeout(function() {$('.market-button').addClass('swing');}, 2000);
      $.cookie('home_city_fte_012712',1, {path: '/'});
    }
  },
  toggleMenu: function(element) {
    $(element).closest('.city-picker').find('.market-nav').toggleClass('active');
    $('html').one('click', function() {
     $(element).closest('.city-picker').find('.market-nav').add('h2.current-city a').removeClass('active');
    });
  },
  attachListeners: function(self) {
    var _this = this;
    $('.market-nav').bind('home_city:show', function() {
      _gaq.push(['_trackEvent', 'setHomeCity','activateMarketNav',self.currentCity.name,1]);
      _this.toggleMenu(this);
    });
    $('h2.current-city a .mkt-switcher').click(function(e) {
      $('body').trigger('home_city:clicked');
      e.preventDefault();
      e.stopPropagation();
      _gaq.push(['_trackEvent', 'setHomeCity','activateMarketNav',self.currentCity.name,1]);
      _this.toggleMenu(this);
    });

    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        $('.market-nav, h2.current-city a').removeClass('active');
      }
    });
    $('.set-market.is-home-city, .set-market.loading-home-city').delegate('a', 'click', function(e){
      e.preventDefault();
      e.stopPropagation();
    });
    $('li.my-cities li.home').delegate('a', 'click', function(e){
      _gaq.push(['_trackEvent', 'setHomeCity','navToHomeCity',this.text,1]);
    });
    $('li.my-cities li').not('.home').delegate('a', 'click', function(e){
      _gaq.push(['_trackEvent', 'setHomeCity','navToMyCity',this.text,1]);
    });
    $('li.nearby-cities li').delegate('a', 'click', function(e){
      _gaq.push(['_trackEvent', 'setHomeCity','navToNearbyCity',this.text,1]);
    });
  },
  attachSetHomeCity: function(self) {
    $('.set-market.set-home-city').delegate('a','click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var el = $(this);
      el.closest('h2').removeClass('set-home-city').addClass('loading-home-city');
      $.cookie('home_city',self.cookie(), { expires: 1095, path: '/', domain: "." + dls.tld });
      try {
        $('li.my-cities ul li.home').removeClass('home');
        $('li.my-cities ul li.city-id-'+self.currentCity.id).remove();
        $('li.my-cities ul').prepend("<li class='home city-id-"+self.currentCity.id+"'><a href='/'>"+self.currentCity.name+" <span class='home-market'>&nbsp;</span></a></li>");
      } catch(e) {}
      el.text(self.isHomeCityText);
      if (Me.loggedIn()()) {
        $.post(self.updateHomeCityPeoplePath, { city_id: self.currentCity.id });
      }
      _gaq.push(['_trackEvent', 'setHomeCity','setCity',self.currentCity.name,1]);
      setTimeout(function(){
        el.closest('h2').removeClass('loading-home-city set-home-city').addClass('is-home-city');
      }, 500);
    });
  }
}
;